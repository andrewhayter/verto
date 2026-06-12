// Generates SVG OG cards for each category. Run with: node scripts/gen-og-images.mjs
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const categories = [
  { slug: 'antivirus-vpn', name: 'AntiVirus & VPN', emoji: '🛡️', gradient: ['#2563eb', '#1e40af'] },
  { slug: 'automotive', name: 'Automotive', emoji: '🚗', gradient: ['#dc2626', '#991b1b'] },
  { slug: 'b2b', name: 'B2B', emoji: '💼', gradient: ['#475569', '#1e293b'] },
  { slug: 'background-check-id-protection', name: 'Background Check & ID', emoji: '🔍', gradient: ['#7c3aed', '#4c1d95'] },
  { slug: 'business-opportunities', name: 'Business Opportunities', emoji: '📈', gradient: ['#059669', '#064e3b'] },
  { slug: 'dating', name: 'Dating', emoji: '❤️', gradient: ['#ec4899', '#9d174d'] },
  { slug: 'education', name: 'Education', emoji: '🎓', gradient: ['#d97706', '#92400e'] },
  { slug: 'email-submits', name: 'Email Submits', emoji: '📧', gradient: ['#f97316', '#c2410c'] },
  { slug: 'financial', name: 'Financial', emoji: '💰', gradient: ['#16a34a', '#14532d'] },
  { slug: 'gambling', name: 'Gambling', emoji: '🎰', gradient: ['#9333ea', '#581c87'] },
  { slug: 'gaming', name: 'Gaming', emoji: '🎮', gradient: ['#6d28d9', '#3b0764'] },
  { slug: 'health-wellness', name: 'Health & Wellness', emoji: '💊', gradient: ['#0d9488', '#134e4a'] },
  { slug: 'insurance', name: 'Insurance', emoji: '🏥', gradient: ['#0284c7', '#0c4a6e'] },
  { slug: 'legal-services', name: 'Legal Services', emoji: '⚖️', gradient: ['#4b5563', '#111827'] },
  { slug: 'mobile-apps', name: 'Mobile Apps', emoji: '📱', gradient: ['#0891b2', '#0e7490'] },
  { slug: 'pets', name: 'Pets', emoji: '🐾', gradient: ['#f59e0b', '#b45309'] },
  { slug: 'real-estate', name: 'Real Estate', emoji: '🏠', gradient: ['#0f766e', '#042f2e'] },
  { slug: 'seasonal', name: 'Seasonal', emoji: '🎄', gradient: ['#e11d48', '#881337'] },
  { slug: 'shopping-ecommerce', name: 'Shopping & E-Commerce', emoji: '🛍️', gradient: ['#a21caf', '#701a75'] },
  { slug: 'software-downloads', name: 'Software & Downloads', emoji: '💿', gradient: ['#3b82f6', '#1e3a8a'] },
  { slug: 'spiritual', name: 'Spiritual', emoji: '🌙', gradient: ['#8b5cf6', '#4c1d95'] },
  { slug: 'streaming-services', name: 'Streaming Services', emoji: '📺', gradient: ['#dc2626', '#7f1d1d'] },
  { slug: 'surveys', name: 'Surveys', emoji: '📊', gradient: ['#ca8a04', '#713f12'] },
  { slug: 'sweepstakes-contests', name: 'Sweepstakes & Contests', emoji: '🏆', gradient: ['#ea580c', '#7c2d12'] },
  { slug: 'travel', name: 'Travel', emoji: '✈️', gradient: ['#0284c7', '#075985'] },
];

for (const cat of categories) {
  const [c1, c2] = cat.gradient;
  // Escape XML entities in name
  const safeName = cat.name.replace(/&/g, '&amp;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="628" viewBox="0 0 1200 628">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="100%" style="stop-color:${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="628" fill="url(#bg)"/>
  <rect width="1200" height="628" fill="rgba(0,0,0,0.45)"/>
  <!-- Verto wordmark -->
  <text x="60" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="rgba(255,255,255,0.6)" letter-spacing="6">VERTO</text>
  <!-- Emoji -->
  <text x="60" y="360" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif" font-size="120" fill="white">${cat.emoji}</text>
  <!-- Category name -->
  <text x="60" y="480" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="800" fill="white">${safeName}</text>
  <!-- Tagline -->
  <text x="60" y="556" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="400" fill="rgba(255,255,255,0.65)">Expert-reviewed offers · verto.pages.dev</text>
</svg>`;

  const outPath = join(__dirname, `../public/og/${cat.slug}.svg`);
  writeFileSync(outPath, svg, 'utf8');
  console.log(`✓ ${cat.slug}.svg`);
}

console.log(`\nGenerated ${categories.length} OG images in public/og/`);
