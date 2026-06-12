#!/usr/bin/env node
/**
 * Fetches all approved MaxBounty offers for this affiliate account.
 *
 * Usage:
 *   node --env-file=.env scripts/fetch-approved-offers.mjs
 *
 * Output: src/data/approved-offers.json
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, '../src/data/approved-offers.json');
const MB_API_BASE = 'https://api.maxbounty.com/affiliates/api';

async function authenticate() {
  const email = process.env.MB_EMAIL;
  const password = process.env.MB_PASSWORD;

  if (!email || !password) {
    throw new Error('Set MB_EMAIL and MB_PASSWORD env vars (copy .env.example to .env).');
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

async function fetchPage(token, cookie, endpoint, page = 1, perPage = 100) {
  const headers = { 'Content-Type': 'application/json', 'x-app-token': token };
  if (cookie) headers['Cookie'] = cookie;

  const url = `${MB_API_BASE}${endpoint}?page=${page}&per_page=${perPage}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.warn(`  ${endpoint} page ${page} → ${res.status} ${body.slice(0, 120)}`);
    return null;
  }

  const data = await res.json();
  const campaigns = Array.isArray(data)
    ? data
    : (data.campaigns ?? data.data ?? data.offers ?? data.results ?? []);

  // total_rows is often embedded in each record — grab it from the first one
  const totalRows = campaigns[0]?.total_rows ?? null;
  return { campaigns, totalRows };
}

async function main() {
  console.log('Authenticating with MaxBounty Affiliate API...');
  const { token, cookie } = await authenticate();
  console.log('OK.\n');

  const ENDPOINT = '/campaigns/approved';
  const PER_PAGE = 100;

  console.log(`Fetching approved campaigns (${PER_PAGE}/page)...`);
  const first = await fetchPage(token, cookie, ENDPOINT, 1, PER_PAGE);
  if (!first) throw new Error('Failed to fetch first page from ' + ENDPOINT);

  const { campaigns: firstPage, totalRows } = first;
  console.log(`  Page 1 → ${firstPage.length} offers${totalRows ? ` (${totalRows} total)` : ''}`);

  let allCampaigns = [...firstPage];

  // API may ignore per_page — use actual page size returned
  const actualPageSize = firstPage.length || PER_PAGE;

  if (totalRows && totalRows > actualPageSize) {
    const totalPages = Math.ceil(totalRows / actualPageSize);
    console.log(`  Fetching ${totalPages - 1} more pages...`);
    for (let page = 2; page <= totalPages; page++) {
      const result = await fetchPage(token, cookie, ENDPOINT, page, PER_PAGE);
      if (!result || result.campaigns.length === 0) break;
      allCampaigns = allCampaigns.concat(result.campaigns);
      console.log(`  Page ${page} → ${result.campaigns.length} more (total so far: ${allCampaigns.length})`);
      await new Promise(r => setTimeout(r, 300));
    }
  } else if (firstPage.length === PER_PAGE) {
    // No total_rows hint — keep paging until dry
    let page = 2;
    while (true) {
      const result = await fetchPage(token, cookie, ENDPOINT, page, PER_PAGE);
      if (!result || result.campaigns.length === 0) break;
      allCampaigns = allCampaigns.concat(result.campaigns);
      console.log(`  Page ${page} → ${result.campaigns.length} more (total so far: ${allCampaigns.length})`);
      if (result.campaigns.length < PER_PAGE) break;
      page++;
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // Normalize the shape slightly so it's easy to read
  const normalized = allCampaigns.map(c => ({
    id: c.campaign_id ?? c.id,
    name: c.campaign_name ?? c.name,
    status: c.status ?? c.approval_status ?? 'approved',
    payout: c.payout ?? c.default_payout,
    payoutType: c.payout_type ?? c.rate_type,
    epc: c.epc ?? null,
    categories: c.categories ?? (c.vertical ? [c.vertical] : []),
    geos: c.countries ?? c.geos ?? c.allowed_countries ?? [],
    trackingLink: c.tracking_link ?? c['tracking-link'] ?? null,
    landingPage: c.preview_url ?? c.landing_page ?? c.offer_url ?? null,
    description: c.description ?? c.short_description ?? null,
    _raw: c,
  }));

  writeFileSync(OUT_PATH, JSON.stringify(normalized, null, 2) + '\n');

  console.log(`\nSaved ${normalized.length} approved offers to src/data/approved-offers.json`);

  // Summary by category
  const byCategory = {};
  for (const o of normalized) {
    const cats = o.categories.length ? o.categories : ['uncategorized'];
    for (const cat of cats) {
      byCategory[cat] = (byCategory[cat] ?? 0) + 1;
    }
  }
  console.log('\nBy category:');
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }
}

main().catch(err => {
  console.error('\nError:', err.message);
  process.exit(1);
});
