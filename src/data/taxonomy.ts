// ─────────────────────────────────────────────────────────────────────────────
// TAXONOMY — the parent/child/sibling backbone (Phase 1, GROWTH-PHASES.md)
//
//   PILLAR (parent, money theme)
//     └── CLUSTER (child, buyer intent — maps to social campaigns)
//           └── PAGES (siblings: problem page, calculator, articles, reviews)
//
// This is the single source of truth that ties categories, problems, and offers
// together so a social campaign maps cleanly to a cluster of landing pages.
// It is NOT for SEO siloing — it exists for campaign organisation + a maintainable
// content backlog. Add a cluster here, then point ARTICLE-IDEAS / CONTENT-PLAN at it.
// ─────────────────────────────────────────────────────────────────────────────

export interface Cluster {
  /** url-safe id, unique across the whole site */
  slug: string;
  /** human label used in nav + hub pages */
  name: string;
  /** one-line description for hub pages */
  blurb: string;
  /** problem-page slugs (/best/[slug]) that belong to this cluster */
  problems: string[];
  /** category slugs whose articles belong to this cluster */
  categories: string[];
  /** optional calculator/quiz routes that serve this cluster */
  calculators?: string[];
}

export interface Pillar {
  slug: string;
  name: string;
  emoji: string;
  blurb: string;
  gradient: string;
  clusters: Cluster[];
}

// NOTE: only reference problem slugs that have a real Problem entry (a /best/ page),
// and category slugs that have real content, so hub pages never link to dead routes.
export const pillars: Pillar[] = [
  {
    slug: 'health',
    name: 'Health & Body',
    emoji: '💊',
    blurb: 'Weight loss, hormones, focus, and feeling better — backed by real options.',
    gradient: 'linear-gradient(135deg, #0d9488, #134e4a)',
    clusters: [
      {
        slug: 'weight-loss',
        name: 'Weight Loss & GLP-1',
        blurb: 'GLP-1 programs, keto, and blood-sugar support that actually move the needle.',
        problems: ['cant-lose-weight', 'blood-sugar-control', 'diabetes-support', 'keto-weight-loss'],
        categories: ['health-wellness'],
        calculators: ['/calculators/glp1-cost', '/calculators/glp1-quiz'],
      },
      {
        slug: 'quit-vaping',
        name: 'Quit Vaping',
        blurb: 'Nicotine replacement built for vapers, not 1990s cigarette smokers.',
        problems: ['quit-vaping'],
        categories: ['health-wellness'],
      },
      {
        slug: 'mens-health',
        name: "Men's Health",
        blurb: 'Energy, hormones, and hair-loss treatments men actually ask about.',
        problems: ['low-energy-men', 'mens-hair-loss'],
        categories: ['health-wellness'],
      },
      {
        slug: 'womens-health',
        name: "Women's Health 40+",
        blurb: 'Menopause, HRT, and fitness that works after 40.',
        problems: ['menopause-symptoms', 'fitness-women-over-40'],
        categories: ['health-wellness'],
      },
      {
        slug: 'brain-focus',
        name: 'Brain & Focus',
        blurb: 'Memory, clarity, and nootropics for foggy days.',
        problems: ['brain-fog-memory'],
        categories: ['health-wellness'],
      },
      {
        slug: 'pain-relief',
        name: 'Joint, Pain & Heart Health',
        blurb: 'Natural relief for joints, chronic pain, and cardiovascular support.',
        problems: ['joint-pain-relief', 'heart-health'],
        categories: ['health-wellness'],
      },
    ],
  },
  {
    slug: 'money',
    name: 'Money & Credit',
    emoji: '💰',
    blurb: 'Loans, credit, and investing — the numbers people actually search for.',
    gradient: 'linear-gradient(135deg, #16a34a, #14532d)',
    clusters: [
      {
        slug: 'loans',
        name: 'Loans, Bad Credit & Repair',
        blurb: 'Personal loans, lenders for thin credit, and tools to rebuild your score.',
        problems: ['need-personal-loan', 'bad-credit-loan', 'credit-repair'],
        categories: ['financial'],
        calculators: ['/calculators/loan-savings'],
      },
      {
        slug: 'credit-cards',
        name: 'Credit Cards & Rewards',
        blurb: 'Cash-back and rewards cards worth carrying.',
        problems: ['best-credit-card'],
        categories: ['financial'],
      },
      {
        slug: 'investing',
        name: 'Investing & Brokerages',
        blurb: 'Commission-free trading and sign-up bonuses.',
        problems: ['start-investing'],
        categories: ['financial'],
      },
    ],
  },
  {
    slug: 'travel',
    name: 'Travel',
    emoji: '✈️',
    blurb: 'Booking, insurance, and getting paid back when flights go wrong.',
    gradient: 'linear-gradient(135deg, #0284c7, #075985)',
    clusters: [
      {
        slug: 'travel-protection',
        name: 'Travel Insurance & Flight Rights',
        blurb: 'Trip protection plus claiming compensation for delays.',
        problems: ['travel-insurance'],
        categories: ['travel', 'insurance'],
        calculators: ['/calculators/flight-delay'],
      },
    ],
  },
  {
    slug: 'home',
    name: 'Home & Lifestyle',
    emoji: '🏠',
    blurb: 'Food, connectivity, and the upgrades that make daily life better.',
    gradient: 'linear-gradient(135deg, #a21caf, #701a75)',
    clusters: [
      {
        slug: 'rural-internet',
        name: 'Rural & RV Internet',
        blurb: 'Real broadband for the 21M Americans big ISPs ignore.',
        problems: ['rural-internet'],
        categories: ['shopping-ecommerce'],
      },
      {
        slug: 'better-living',
        name: 'Food, Learning & Upgrades',
        blurb: 'Food subscriptions, self-improvement, and expert advice on demand.',
        problems: ['self-improvement', 'expert-advice-online'],
        categories: ['shopping-ecommerce'],
      },
    ],
  },
  {
    slug: 'earn',
    name: 'Make Money',
    emoji: '📈',
    blurb: 'Passive income and side hustles that pay without a second job.',
    gradient: 'linear-gradient(135deg, #ca8a04, #713f12)',
    clusters: [
      {
        slug: 'passive-income',
        name: 'Passive Income Apps',
        blurb: 'Get paid from your phone — surveys, panels, and background apps.',
        problems: ['earn-from-phone'],
        categories: ['surveys'],
      },
    ],
  },
  {
    slug: 'safety',
    name: 'Safety & Privacy',
    emoji: '🛡️',
    blurb: 'Protect your family online and lock down your data.',
    gradient: 'linear-gradient(135deg, #2563eb, #1e40af)',
    clusters: [
      {
        slug: 'parental-controls',
        name: 'Kids Online Safety',
        blurb: 'Monitoring that flags real risks without spying on every message.',
        problems: ['kids-online-safety'],
        categories: ['shopping-ecommerce'],
      },
      {
        slug: 'vpn-privacy',
        name: 'VPN & Privacy',
        blurb: 'Stop your ISP tracking you; stream and browse privately.',
        problems: ['online-privacy'],
        categories: ['antivirus-vpn'],
      },
    ],
  },
  {
    slug: 'legal',
    name: 'Legal & Business',
    emoji: '⚖️',
    blurb: 'LLCs, legal documents, and answers without lawyer rates.',
    gradient: 'linear-gradient(135deg, #4b5563, #111827)',
    clusters: [
      {
        slug: 'legal-docs',
        name: 'Legal Documents & LLCs',
        blurb: 'Form an LLC or draft documents the cheap, correct way.',
        problems: ['legal-documents-cheap'],
        categories: ['legal-services'],
      },
    ],
  },
  {
    slug: 'play',
    name: 'Play & Win',
    emoji: '🏆',
    blurb: 'Sweepstakes and casino offers worth your time.',
    gradient: 'linear-gradient(135deg, #ea580c, #7c2d12)',
    clusters: [
      {
        slug: 'sweepstakes',
        name: 'Sweepstakes & Casino',
        blurb: 'Legit sweeps and online casino sign-up bonuses.',
        problems: [],
        categories: ['sweepstakes-contests'],
      },
    ],
  },
];

// ── Derived lookups ──────────────────────────────────────────────────────────

export const pillarBySlug = Object.fromEntries(pillars.map((p) => [p.slug, p]));

export const allClusters: Array<Cluster & { pillarSlug: string }> = pillars.flatMap(
  (p) => p.clusters.map((c) => ({ ...c, pillarSlug: p.slug }))
);

export const clusterBySlug = Object.fromEntries(allClusters.map((c) => [c.slug, c]));

/** Reverse map: problem slug → cluster (for tagging pages with their parent). */
export const clusterByProblem: Record<string, (typeof allClusters)[number]> = (() => {
  const map: Record<string, (typeof allClusters)[number]> = {};
  for (const c of allClusters) for (const p of c.problems) map[p] = c;
  return map;
})();

/** Every category slug referenced by a live cluster (plus extras kept for content). */
export const LIVE_CATEGORIES: ReadonlySet<string> = new Set<string>([
  ...allClusters.flatMap((c) => c.categories),
  // categories with standalone articles but no cluster yet:
  'real-estate',
]);

export function pillarOfCategory(categorySlug: string): Pillar | undefined {
  return pillars.find((p) => p.clusters.some((c) => c.categories.includes(categorySlug)));
}
