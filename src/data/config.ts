// MaxBounty affiliate tracking config
// Replace YOUR_MB_AFFILIATE_ID with your actual MaxBounty affiliate ID
export const MB_AFFILIATE_ID = 'YOUR_MB_AFFILIATE_ID';

export function trackingUrl(offerId: number, sub1?: string): string {
  const base = `https://track.maxbounty.com/signup/?affiliate_id=${MB_AFFILIATE_ID}&offer_id=${offerId}`;
  return sub1 ? `${base}&sub1=${encodeURIComponent(sub1)}` : base;
}
