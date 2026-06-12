/**
 * catalog.ts — Full approved offer catalog sourced from the MB API.
 *
 * This is separate from offers.ts (the 34 hand-curated editorial offers).
 * Use this for:
 *   - /offer/[slug] pages for all 500+ approved offers
 *   - Category browse pages showing the full offer set
 *   - Problem/solve pages surfacing additional offers beyond editorial picks
 *
 * Tracking links are pre-fetched by scripts/fetch-tracking-links.mjs and
 * stored in tracking-links.json — no runtime API calls needed.
 */

import rawApproved from './approved-offers.json';
import trackingLinks from './tracking-links.json';
import { MB_AFFILIATE_ID, MB_ACCOUNT_GUID } from './config';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CatalogOffer {
  id: number;
  name: string;
  slug: string;
  description: string;
  epc: number;
  payoutType: 'cps' | 'cpl' | 'cpa' | 'revshare' | string;
  categories: string[];
  geos: string[];
  trackingUrl: string;
  landingPage: string | null;
  // Canonical MB category slug for routing
  categorySlug: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toSlug(name: string, id: number): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) +
    `-${id}`
  );
}

// Map MB category names → our site category slugs
const CAT_MAP: Record<string, string> = {
  'health & wellness':    'health-wellness',
  'diet & nutrition':     'health-wellness',
  'fitness & exercise':   'health-wellness',
  'general wellness':     'health-wellness',
  'financial':            'financial',
  'loans':                'financial',
  'banking':              'financial',
  'investments':          'financial',
  'taxes & accounting':   'financial',
  'travel':               'travel',
  'flights':              'travel',
  'hotels & lodging':     'travel',
  'vacation rentals & timeshare': 'travel',
  'shopping & e-commerce': 'shopping-ecommerce',
  'consumer goods & gadgets': 'shopping-ecommerce',
  'subscriptions & memberships': 'shopping-ecommerce',
  'services':             'shopping-ecommerce',
  'retailer':             'shopping-ecommerce',
  'surveys':              'surveys',
  'sweepstakes & contests': 'sweepstakes-contests',
  'giveaways':            'sweepstakes-contests',
  'freebies':             'sweepstakes-contests',
  'legal services':       'legal-services',
  'insurance':            'insurance',
  'dating':               'dating',
  'niche dating':         'dating',
  'education':            'education',
  'course & school enrollment': 'education',
  'mobile apps':          'apps',
  'utilities':            'apps',
  'software & hosting':   'apps',
  'background check & id protection': 'apps',
  'monitoring':           'apps',
  'antivirus & vpn':      'antivirus-vpn',
  'pets':                 'shopping-ecommerce',
  'b2b':                  'financial',
  'business services':    'financial',
};

function mapCategory(mbCats: string[]): string {
  for (const cat of mbCats) {
    const mapped = CAT_MAP[cat.toLowerCase()];
    if (mapped) return mapped;
  }
  return 'shopping-ecommerce'; // fallback
}

function normalizePayoutType(raw: string | null | undefined): CatalogOffer['payoutType'] {
  const s = (raw ?? '').toLowerCase();
  if (s.includes('per lead') || s.includes('cpl')) return 'cpl';
  if (s.includes('per sale') || s.includes('cps')) return 'cps';
  if (s.includes('per action') || s.includes('cpa')) return 'cpa';
  if (s.includes('revshare') || s.includes('% of sale') || s.includes('revenue')) return 'revshare';
  return s || 'cps';
}

// IDs for the editorial offers already in offers.ts — these get offer pages
// from the rich offers.ts data, not from catalog.ts
const EDITORIAL_IDS = new Set([
  32072, 31644, 31973, 28778, 30785, 31081, 31080, 31071,
  28072, 31617, 31613, 29604, 29640, 31922, 30427, 17722,
  28316, 29132, 26642, 30154, 30444, 31464, 20484, 29920,
  24645, 25474, 31456, 32298, 32356, 30557, 26732, 28149,
  25673, 31584,
]);

// ─── Build catalog ─────────────────────────────────────────────────────────────

const links = trackingLinks as Record<string, string>;

export const catalogOffers: CatalogOffer[] = (rawApproved as any[])
  .filter(o => !EDITORIAL_IDS.has(o.id)) // editorial offers handled by offers.ts
  .map(o => {
    const trackingUrl =
      links[String(o.id)] ??
      // Minimal fallback URL — no k= key so won't track, but won't 404 either
      `https://afflat3e1.com/trk/lnk/${MB_ACCOUNT_GUID}/?o=${o.id}&a=${MB_AFFILIATE_ID}`;

    return {
      id: o.id,
      name: o.name ?? `Offer #${o.id}`,
      slug: toSlug(o.name ?? String(o.id), o.id),
      description: o.description ?? '',
      epc: Number(o.epc ?? 0),
      payoutType: normalizePayoutType(o.payoutType),
      categories: (o.categories ?? []) as string[],
      geos: (o.geos ?? []) as string[],
      trackingUrl,
      landingPage: o.landingPage ?? null,
      categorySlug: mapCategory((o.categories ?? []) as string[]),
    } satisfies CatalogOffer;
  })
  .filter(o => o.name && o.id); // drop any malformed entries

// ─── Indexes ───────────────────────────────────────────────────────────────────

export const catalogById = Object.fromEntries(
  catalogOffers.map(o => [o.id, o])
);

export const catalogBySlug = Object.fromEntries(
  catalogOffers.map(o => [o.slug, o])
);

export const catalogByCategory = catalogOffers.reduce<Record<string, CatalogOffer[]>>(
  (acc, o) => {
    const cat = o.categorySlug;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(o);
    return acc;
  },
  {}
);

// Top offers per category, sorted by EPC
export function topCatalogOffers(category: string, limit = 12): CatalogOffer[] {
  return (catalogByCategory[category] ?? [])
    .sort((a, b) => b.epc - a.epc)
    .slice(0, limit);
}

// All offers across editorial + catalog, sorted by EPC, for a given site category
export function allOffersByCategory(category: string): CatalogOffer[] {
  return (catalogByCategory[category] ?? []).sort((a, b) => b.epc - a.epc);
}
