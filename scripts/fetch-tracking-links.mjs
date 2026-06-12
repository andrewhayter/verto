#!/usr/bin/env node
/**
 * Fetches MaxBounty tracking links for ALL approved offers.
 *
 * Sources offer IDs from src/data/approved-offers.json (run fetch-approved-offers.mjs first).
 * Falls back to the hardcoded FALLBACK_IDS list if the JSON is absent.
 *
 * Usage:
 *   node --env-file=.env scripts/fetch-tracking-links.mjs
 *
 * Output: src/data/tracking-links.json  (imported by offers.ts + catalog.ts at build time)
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '../src/data/tracking-links.json');
const APPROVED_PATH = path.join(__dirname, '../src/data/approved-offers.json');
const MB_API_BASE = 'https://api.maxbounty.com/affiliates/api';

// Fallback: manually curated offers if approved-offers.json is missing
const FALLBACK_IDS = [
  32072, 31644, 31973, 28778, 30785, 31081, 31080, 31071,
  28072, 31617, 31613, 29604, 29640, 31922, 30427, 17722,
  28316, 29132, 26642, 30154, 30444, 31464, 20484, 29920,
  24645, 25474, 31456, 32298, 32356, 30557, 26732, 28149,
  25673, 31584,
];

function getOfferIds() {
  if (existsSync(APPROVED_PATH)) {
    const data = JSON.parse(readFileSync(APPROVED_PATH, 'utf8'));
    const ids = data.map(o => o.id).filter(Boolean);
    console.log(`Loaded ${ids.length} offer IDs from approved-offers.json`);
    return ids;
  }
  console.warn('approved-offers.json not found — using fallback list of', FALLBACK_IDS.length, 'offers');
  console.warn('Run: node --env-file=.env scripts/fetch-approved-offers.mjs');
  return FALLBACK_IDS;
}

async function authenticate() {
  const email = process.env.MB_EMAIL;
  const password = process.env.MB_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'Set MB_EMAIL and MB_PASSWORD env vars.\n' +
      'Copy .env.example to .env and fill in your MaxBounty credentials.'
    );
  }

  const res = await fetch(`${MB_API_BASE}/authenticationApp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const rawBody = await res.text();
  if (!res.ok) throw new Error(`Auth failed ${res.status}: ${rawBody.slice(0, 300)}`);

  let data;
  try { data = JSON.parse(rawBody); }
  catch { throw new Error(`Auth returned non-JSON (${res.status}):\n${rawBody.slice(0, 400)}`); }

  if (!data.success) throw new Error('Auth rejected: ' + JSON.stringify(data.errors ?? data));

  const token = data['mb-app-token'] ?? data['mb-api-token'] ?? data.token;
  if (!token) throw new Error('No token in auth response: ' + JSON.stringify(data));

  const setCookie = res.headers.get('set-cookie');
  const cookie = setCookie
    ? setCookie.split(',').map(c => c.split(';')[0].trim()).join('; ')
    : '';

  return { token, cookie };
}

async function fetchLink(token, cookie, offerId) {
  const headers = {
    'Content-Type': 'application/json',
    'x-app-token': token,
  };
  if (cookie) headers['Cookie'] = cookie;

  const res = await fetch(`${MB_API_BASE}/trackinglink`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ campaign_id: offerId, traffic_type: 'Social Media' }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { link: null, error: `${res.status} ${body.slice(0, 60)}` };
  }

  const data = await res.json();
  const link = data['tracking-link'] ?? null;
  return { link, error: link ? null : 'No tracking-link field in response' };
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const offerIds = getOfferIds();

  // Load existing links — preserve any we already have so a partial run is resumable
  const existing = existsSync(OUT_PATH)
    ? JSON.parse(readFileSync(OUT_PATH, 'utf8'))
    : {};

  const skipExisting = process.argv.includes('--skip-existing');
  if (skipExisting) {
    const alreadyHave = offerIds.filter(id => existing[String(id)]);
    console.log(`--skip-existing: skipping ${alreadyHave.length} already-fetched offers`);
  }

  console.log('\nAuthenticating with MaxBounty Affiliate API...');
  const { token, cookie } = await authenticate();
  console.log('OK.\n');

  const toFetch = skipExisting
    ? offerIds.filter(id => !existing[String(id)])
    : offerIds;

  console.log(`Fetching tracking links for ${toFetch.length} offers...`);
  console.log(`(~${Math.ceil(toFetch.length * 0.3 / 60)} min at 300ms/req)\n`);

  const results = { ...existing };
  let fetched = 0;
  let skipped = 0;
  let failed = 0;
  const failures = [];

  for (let i = 0; i < toFetch.length; i++) {
    const id = toFetch[i];
    const pct = Math.round(((i + 1) / toFetch.length) * 100);
    process.stdout.write(`  [${pct}%] Offer ${id}... `);

    const { link, error } = await fetchLink(token, cookie, id);

    if (link) {
      results[String(id)] = link;
      process.stdout.write('✓\n');
      fetched++;
    } else {
      process.stdout.write(`✗ ${error}\n`);
      failures.push({ id, error });
      failed++;
    }

    // Save incrementally every 50 offers so a crash doesn't lose progress
    if ((i + 1) % 50 === 0) {
      writeFileSync(OUT_PATH, JSON.stringify(results, null, 2) + '\n');
      console.log(`  → Checkpoint saved (${Object.keys(results).length} total links)\n`);
    }

    await sleep(300); // ~3 req/sec — polite rate limit
  }

  // Final save
  writeFileSync(OUT_PATH, JSON.stringify(results, null, 2) + '\n');

  console.log('\n' + '─'.repeat(60));
  console.log(`DONE`);
  console.log(`  Fetched:  ${fetched}`);
  console.log(`  Failed:   ${failed}`);
  console.log(`  Total in tracking-links.json: ${Object.keys(results).length}`);
  console.log(`  Saved to: src/data/tracking-links.json`);

  if (failures.length > 0) {
    console.log(`\nFailed offer IDs (not approved or campaign unavailable):`);
    for (const f of failures) {
      console.log(`  ${f.id}: ${f.error}`);
    }
    // Save failures for inspection
    const failPath = path.join(__dirname, '../src/data/tracking-link-failures.json');
    writeFileSync(failPath, JSON.stringify(failures, null, 2) + '\n');
    console.log(`\nFailures saved to src/data/tracking-link-failures.json`);
  }
}

main().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
