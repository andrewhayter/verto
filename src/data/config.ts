// MaxBounty affiliate config
// Extracted from your tracking links:
//   https://afflat3e1.com/trk/lnk/{GUID}/?o={offer_id}&c={campaign}&a={affiliate_id}&k={key}&l={landing}
export const MB_AFFILIATE_ID = '784951';
export const MB_ACCOUNT_GUID = '8A3315A3-62A1-4C51-A6AA-8C3C27C5B9BB';
export const MB_TRACKING_DOMAIN = 'https://afflat3e1.com';

// MaxBounty load-balances tracking across these host variants. Used client-side to
// detect affiliate links and stamp the inbound social source onto them.
export const MB_AFFILIATE_HOSTS = ['afflat3e1.com', 'afflat3e2.com', 'afflat3e3.com'];

// ── Analytics ────────────────────────────────────────────────────────────────
// Cloudflare Web Analytics beacon token. Get it from:
//   Cloudflare Dashboard → Web Analytics → (site) → "JS snippet" → the `token` value.
// Leave empty to disable the beacon (e.g. you enabled automatic injection on the
// Pages project instead, which needs no code). TODO(owner): paste token when available.
export const CF_WEB_ANALYTICS_TOKEN = '';

// Microsoft Clarity project ID. Get it from:
//   clarity.microsoft.com → Your project → Settings → "Tracking Code" → the `i` param value.
// Leave empty to disable (no script loads). TODO(owner): paste ID when available.
export const CLARITY_PROJECT_ID = '';

// The `k=` parameter is a cryptographic key unique per offer — it must come from
// your MaxBounty dashboard (Offer → Get Link). You cannot construct it from the offer ID alone.
//
// For each offer you want to promote, go to MaxBounty → find the offer → click "Get Link"
// → copy the full tracking URL → paste into the offer's `trackingLink` field in offers.ts.
//
// This function is used as a fallback for any offer without a real tracking link yet.
// It routes to the MaxBounty offer page so the user can at least see it, but does NOT track.
export function trackingUrl(offerId: number, sub1?: string): string {
  // Fallback: MaxBounty offer detail page (not a live tracking link — use offer.trackingLink instead)
  const base = `${MB_TRACKING_DOMAIN}/trk/lnk/${MB_ACCOUNT_GUID}/?o=${offerId}&a=${MB_AFFILIATE_ID}`;
  return sub1 ? `${base}&sub1=${encodeURIComponent(sub1)}` : base;
}

// Helper: picks the best available URL for an offer
// Priority: real tracking link > landing page (with tracking params stripped in for display)
export function getBestUrl(trackingLink: string | undefined, landingPage: string, sub1?: string): string {
  if (trackingLink) {
    return sub1 ? `${trackingLink}&sub1=${encodeURIComponent(sub1)}` : trackingLink;
  }
  // No tracking link yet — return landing page (no commission, for reference only)
  return landingPage;
}
