# Verto

Consumer intelligence publication built on Astro 5, deployed to Cloudflare Pages. Editorial content covering health & wellness, personal finance, legal services, VPNs, insurance, travel, and consumer technology — with affiliate monetization via MaxBounty CPA/CPL offers embedded as the natural outcome of each guide.

**Live site:** https://verto.fun

---

## Stack

- **Astro 5** — static site generator, content collections
- **Tailwind v4** — CSS via `@tailwindcss/vite`
- **Cloudflare Pages** — hosting + `wrangler` deploy
- **MaxBounty** — affiliate network (affiliate ID 784951)
- **GA4** — analytics (G-NP1KGMXP4T)

---

## Site Architecture

### Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — featured article, problem guide grid, recent articles, top offers |
| `/best/[slug]` | Problem landing pages — primary conversion targets. Quiz, offer grid, FAQs, trust stats |
| `/best` | Index of all 25 problem guides |
| `/reviews/[slug]` | Individual offer review pages |
| `/reviews` | All reviews index |
| `/[category]/[slug]` | Article pages — editorial content via `ArticleLayout` |
| `/[category]/` | Category hub — article grid + sidebar |
| `/explore/[pillar]` | Pillar hub pages by topic taxonomy |
| `/explore` | Explore index |
| `/calculators/glp1-cost` | GLP-1 vs brand-name cost calculator |
| `/calculators/glp1-quiz` | GLP-1 program matching quiz |
| `/calculators/loan-savings` | Loan consolidation savings calculator |
| `/calculators/flight-delay` | EU EC 261 flight delay compensation calculator |
| `/topic/[slug]` | Programmatic topic pages (~1,768 topics) |
| `/topics` | Topic index |
| `/categories` | All categories |
| `/about` | About, editorial standards, methodology, affiliate disclosure, author bios |
| `/privacy`, `/terms` | Legal pages |

### Layouts

- **`BaseLayout.astro`** — global wrapper: Organization + WebSite schema, GA4, OG/Twitter meta, Pinterest Rich Pins, canonical
- **`ArticleLayout.astro`** — article wrapper: Article schema, BreadcrumbList, FAQPage schema, UTM-aware H1 swap, mid-page CTA injection, StickyCtaBar, SocialProofBlock, ScrollTracker, related articles

### Components

| Component | Purpose |
|---|---|
| `Header.astro` | Dark nav: logo, Topics mega-nav, intent strip with top problem guides, mobile overlay |
| `Footer.astro` | Brand copy, guide links, category links, affiliate disclosure |
| `OfferCard.astro` | 3 variants (featured/full/compact) — renders affiliate CTAs with tracking URLs |
| `ArticleCard.astro` | 3 variants (default/compact/horizontal) — editorial article previews |
| `QuizEntry.astro` | 3-question intent quiz on problem pages — fires FB/GA events on complete |
| `StickyCtaBar.astro` | Scrolls into view mid-article, persists to bottom |
| `SocialProofBlock.astro` | Category-specific simulated social comments for trust |
| `ScrollTracker.astro` | Fires GA4 + FB events at 25/50/75/100% scroll depth |
| `Newsletter.astro` | Email capture widget |
| `Analytics.astro` | Cloudflare Web Analytics token injection |
| `FeaturedHero.astro` | Homepage featured article hero |
| `CategoryBadge.astro` | Category label pill |

---

## Data Files

| File | Contents |
|---|---|
| `src/data/offers.ts` | 34 affiliate offers (32 approved) with metadata, payout, geos, CTA text, tracking links |
| `src/data/problems.ts` | 25 problem definitions — headline, hook, emoji, gradient, FAQs, trust stats, top offers |
| `src/data/categories.ts` | 25 content categories with name, emoji, gradient, description |
| `src/data/taxonomy.ts` | 8 pillars → clusters → problem/category links (explore nav + pillar pages) |
| `src/data/topics.ts` | ~1,768 programmatic topic entries |
| `src/data/catalog.ts` | Offer catalog metadata |
| `src/data/config.ts` | MaxBounty config, `getAffiliateUrl()`, `getBestUrl()` helpers |
| `src/data/tracking-links.json` | Auto-generated — 562 tracking URLs keyed by offer ID. Refreshed at deploy. |
| `src/data/approved-offers.json` | Full MaxBounty approved offer list (559 entries) — used by `discover` script |

### Affiliate URL Priority

Every affiliate link resolves via `getAffiliateUrl(offer, sub1?)`:

1. **Auto-fetched API link** from `tracking-links.json` — full tracking with `k=` key
2. **Manual `trackingLink`** on the offer object in `offers.ts`
3. **`landingPage`** — direct URL, no commission, fallback only

All links get `&sub1=[problem-slug]` appended for per-problem conversion attribution in MaxBounty reporting.

---

## Content

### Article Collections

```
src/content/articles/
  antivirus-vpn/     6 articles
  financial/        17 articles
  health-wellness/  32 articles
  insurance/         3 articles
  legal-services/    5 articles
  real-estate/       1 article
  shopping-ecommerce/21 articles
  surveys/           6 articles
  sweepstakes-contests/4 articles
  travel/            7 articles
```

**Total: 99 articles** — all with FAQs in frontmatter, all with MaxBounty tracking `ctaUrl`, all with `ArticleLayout`.

### Frontmatter Schema

```yaml
title: ""
description: ""
category: ""          # must match a category slug
date: YYYY-MM-DD
updatedDate: YYYY-MM-DD
author: ""            # Elena Park | Alex Kovacs | Sofia Reyes | Rachel Kim |
                      # Maya Okonkwo | David Huang | Thomas Walsh | Priya Nair
featured: false
tags: []
ctaText: ""           # CTA button label
ctaUrl: ""            # MaxBounty tracking URL — afflat3e[1-3].com/trk/lnk/...
readTime: 6
sponsored: true
faqs:
  - q: ""
    a: ""
clusterRole: "problem" | "bridge" | "landing"   # optional
offer: ""                                         # offer slug, optional
```

### Authors

| Author | Territory |
|---|---|
| Elena Park | Health & Wellness Editor |
| Alex Kovacs | Security & Technology Editor |
| Sofia Reyes | Personal Finance Editor |
| Rachel Kim | Consumer Products Editor |
| Maya Okonkwo | Travel Editor |
| David Huang | Commerce & Lifestyle Editor |
| Thomas Walsh | Legal Services & Insurance Editor |
| Priya Nair | Side Income & Surveys Editor |

Author bios and Person schema live in `src/pages/about.astro`.

---

## Scripts

```bash
npm run dev          # Local dev server (port 4321)
npm run build        # Build to ./dist
npm run preview      # Preview build locally
npm run fetch-links  # Pull tracking links from MaxBounty API → tracking-links.json
npm run discover     # Scan MaxBounty for new campaigns not in catalog
npm run deploy       # fetch-links → build → wrangler pages deploy ./dist
```

---

## Setup

1. Copy `.env.example` to `.env` and add MaxBounty credentials:
   ```
   MB_EMAIL=you@maxbounty.com
   MB_PASSWORD=yourpassword
   ```

2. Run `npm run fetch-links` to populate `tracking-links.json` with live tracking URLs.

3. Run `npm run deploy` to build and push to Cloudflare Pages.

---

## Adding Content

### New Article

1. Create `src/content/articles/[category]/[slug].md` with full frontmatter (see schema above)
2. Set `ctaUrl` to the MaxBounty tracking URL for the target offer (find in `tracking-links.json` by offer ID)
3. Include at least 3 FAQs in frontmatter for FAQPage schema
4. Add 2+ internal links to related articles and the relevant `/best/[slug]` problem page

### New Offer

1. Add the offer object to `src/data/offers.ts`
2. Run `npm run fetch-links` — the API will auto-populate `tracking-links.json`
3. If the offer covers a new problem, add a `Problem` entry to `src/data/problems.ts`

### New Problem Page

1. Add a `Problem` to `src/data/problems.ts` with: `slug`, `headline`, `subheadline`, `hook`, `description`, `emoji`, `gradient`, `category`, `audience`, `topOfferIds`, `faqs`, `trustStats`, `seoTitle`, `seoDescription`
2. The `/best/[slug]` page renders automatically from the data
3. Write a problem article (`clusterRole: "problem"`) and bridge article (`clusterRole: "bridge"`) in the relevant category

---

## AI Retrieval Infrastructure

- **`public/llms.txt`** — short index for AI systems: site description, top pages with one-sentence summaries, author entity, usage guidance
- **`public/llms-full.txt`** — comprehensive index: all problem guides, offer reviews, and editorial articles with key data points extracted
- **`public/robots.txt`** — explicitly allows all major AI crawlers: GPTBot, ClaudeBot, PerplexityBot, Bingbot, OAI-SearchBot, Google-Extended, anthropic-ai, Diffbot, and others. Content signal: `search=yes ai-input=yes ai-train=no`

---

## Schema Coverage

| Page type | Schema |
|---|---|
| All pages | Organization, WebSite (via BaseLayout) |
| Articles | Article, Author (Person), BreadcrumbList, FAQPage |
| Problem pages | CollectionPage, BreadcrumbList, FAQPage |
| Category hubs | CollectionPage, BreadcrumbList |
| About | AboutPage, 8× Person (author entities) |
| Homepage | WebPage, BreadcrumbList |

---

## Compliance Rules

- **Health claims:** Never present health outcomes as facts. Attribute to provider: "Winona reports..." + "(individual results vary)"
- **No "Risk-Free"** in health supplement CTAs
- **No "guaranteed"** or absolute outcome language on any health, financial, or legal content
- **All affiliate relationships** disclosed in article body, footer, and `/about#disclosure`
- **All article CTAs** must use MaxBounty tracking URLs — never direct brand domains
- **Winona 80% stat:** Always "Winona reports 80%+ of patients experience [outcome] (individual results vary)"

---

## Deployment

Hosted on Cloudflare Pages. `npm run deploy` runs the full pipeline:

1. `scripts/fetch-tracking-links.mjs` — authenticates with MaxBounty API, refreshes all 559 offer tracking links, saves to `tracking-links.json`
2. `astro build` — static build to `./dist`
3. `npx wrangler pages deploy ./dist` — uploads changed files to Cloudflare Pages CDN
