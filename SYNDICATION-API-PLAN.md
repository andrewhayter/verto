# Verto Syndication — API Capabilities & Build Plan
*Last updated: 2026-06-12*
*Sources: Meta Graph API v25.0 docs, Pinterest API v5 docs*

---

## What the Docs Actually Say (The Honest Read)

### Facebook Groups API — DEAD

The `/user/groups` endpoint and the ability to publish to Groups via the Graph API was
**deprecated after v3.2**. The current version is v25.0. The endpoint no longer exists in
any usable form for content publishing. This was killed post-Cambridge Analytica.

**What this means:** You cannot programmatically post to Facebook Groups via any official API.
Any tool that claims to autopost to groups is using browser automation (Puppeteer, Selenium),
which is against Meta's Terms of Service and will get accounts flagged or banned at scale.

**The Content Library API** (the third URL you shared) is a different product entirely —
it's an academic research API that requires approval to access a Secure Research Environment.
It lets approved researchers search public group metadata. It has no publishing capability.

**Bottom line on Groups:** Group posting must stay manual. Build a workflow that makes
manual group posting fast and systematic — not automated.

---

### Facebook Pages API — ALIVE AND USABLE

The official Pages API (Graph API v25.0) supports programmatic publishing to Facebook Pages.

**What you can publish via API:**
- Text posts
- Link posts (URL + description)
- Photo posts
- Video posts (including Reels to Pages, via Video API)

**Permissions required:**
```
pages_manage_posts
pages_manage_metadata
pages_manage_read_engagement
pages_show_list
```

**How it works:**
```
POST https://graph.facebook.com/v25.0/{page-id}/feed
Authorization: Bearer {page-access-token}

{
  "message": "Your post copy here",
  "link": "https://verto.com/calculators/credit-score-cost?utm_source=facebook&utm_medium=page",
}
```

For scheduling (post at a future time):
```json
{
  "message": "Your post copy",
  "link": "https://verto.com/calculators/...",
  "published": false,
  "scheduled_publish_time": 1735689600
}
```

**Rate limits:** Not explicitly published by Meta, but practical limit is ~200 posts/day per page.

---

### Pinterest API v5 — FULLY FUNCTIONAL

Pinterest has a complete, well-documented REST API that supports everything we need.

**Base URL:** `https://api.pinterest.com/v5/`
**Current version:** v5.28.0
**Rate limits:** 1,000 req/min (read) / 100 req/min (write)

**What you can do:**
- Create static pins with image, title, description, and destination link ✅
- Create video pins ✅
- Create boards ✅
- Read pin analytics (impressions, clicks, saves) ✅
- List pins on a board ✅

**Permissions needed:**
```
pins:read
pins:write
boards:read
boards:write
```

**Create a pin:**
```
POST https://api.pinterest.com/v5/pins
Authorization: Bearer {access_token}

{
  "board_id": "549755885175",
  "title": "Credit Score Cost Calculator | See How Much Bad Credit Costs You | 2026",
  "description": "Calculate exactly how much your current credit score is costing you...",
  "link": "https://verto.com/calculators/credit-score-cost?utm_source=pinterest&utm_medium=pin",
  "media_source": {
    "source_type": "image_url",
    "url": "https://verto.com/og/financial.svg"
  }
}
```

**Create a board:**
```
POST https://api.pinterest.com/v5/boards
{
  "name": "Personal Finance Calculators & Tools",
  "description": "Free calculators for credit score cost, loan savings, debt consolidation...",
  "privacy": "PUBLIC"
}
```

---

## What to Actually Build

Given the API constraints, here is the real automation architecture:

```
NEW VERTO CONTENT PUBLISHED
          │
          ▼
    SYNDICATION SCRIPT
    (Node.js / runs on Cloudflare Workers or local cron)
          │
          ├──► PINTEREST API v5
          │    └── Auto-create 3 pin variations per asset
          │        (result card, headline stat, checklist)
          │        pointing to the Verto URL with UTM params
          │
          ├──► FACEBOOK PAGES API
          │    └── Create DRAFT post (not published)
          │        Pre-filled with hook copy + link
          │        Human reviews in Meta Business Suite → one-click publish
          │
          └──► GROUP POST QUEUE (manual but systemized)
               └── Pre-written post copy for each group
                   Saved in a queue file (TOML/JSON)
                   You post manually, one click per group
```

### Why this split?

- Pinterest: fully automated is safe and within ToS — pin volume is the strategy
- Facebook Pages: auto-draft + human approval is the safest path (avoids spam detection)
- Facebook Groups: manual always — automation = account ban risk

---

## The Build: Verto Syndication Script

A single script that runs when you publish new content. Here's the full spec.

### File: `scripts/syndicate.mjs`

**Inputs:** Content slug + type (calculator/article) + cluster
**Outputs:** Pinterest pins created, FB draft queued, group copy printed to terminal

```javascript
// scripts/syndicate.mjs
// Run: node scripts/syndicate.mjs --slug credit-score-cost --type calculator --cluster financial

import { PINTEREST_ACCESS_TOKEN, FB_PAGE_TOKEN, FB_PAGE_ID } from './env.mjs';

const PINTEREST_API = 'https://api.pinterest.com/v5';
const FB_API = 'https://graph.facebook.com/v25.0';

// Board IDs — create these once via API, then hardcode
const BOARD_MAP = {
  'financial':        '549755885175',  // "Personal Finance Calculators & Tools"
  'health-wellness':  '549755885176',  // "GLP-1 & Weight Loss Cost Calculators"
  'travel':           '549755885177',  // "Travel Insurance & Flight Rights"
  'insurance':        '549755885178',  // "Travel Insurance & Flight Rights"
  'shopping-ecommerce': '549755885179', // "Parenting & Kids Online Safety"
  'surveys':          '549755885180',  // "Passive Income & Side Hustle Math"
  'legal-services':   '549755885181',  // "Home Office & Remote Work Savings"
  'antivirus-vpn':    '549755885182',  // "Brain Health & Focus Supplements"
};

// Pin templates per content type
const PIN_TEMPLATES = {
  calculator: [
    {
      suffix: 'result-card',
      titleTemplate: (title) => `${title} | Free Calculator | 2026`,
      descTemplate: (title, url) =>
        `Calculate your exact number with this free ${title.toLowerCase()}. No email required. Results in 90 seconds. Run yours at: ${url}`,
    },
    {
      suffix: 'headline-stat',
      titleTemplate: (title) => `${title} | See Your Number | 2026`,
      descTemplate: (title, url) =>
        `Most people are surprised by the result. This free calculator shows your personalized number instantly. ${url}`,
    },
    {
      suffix: 'how-it-works',
      titleTemplate: (title) => `How the ${title} Works | Step by Step`,
      descTemplate: (title, url) =>
        `3-step process to calculate your ${title.toLowerCase()} result. Free tool, no signup. Get your number here: ${url}`,
    },
  ],
  article: [
    {
      suffix: 'guide',
      titleTemplate: (title) => `${title} | Complete Guide 2026`,
      descTemplate: (title, url) =>
        `Everything you need to know about ${title.toLowerCase()}. Updated for 2026. Full guide: ${url}`,
    },
    {
      suffix: 'checklist',
      titleTemplate: (title) => `${title} Checklist | Save This`,
      descTemplate: (title, url) =>
        `Save this guide for later. ${title} — step by step breakdown with real numbers. ${url}`,
    },
  ],
};

// Facebook post templates by cluster
const FB_TEMPLATES = {
  financial: (title, url) => `I ran this calculator and the number surprised me.

Most people have no idea what their financial situation is actually costing them per year.

This free tool shows you your exact number — no email, no signup, takes 90 seconds.

${url}`,

  'health-wellness': (title, url) => `I wish I'd known this years ago.

After spending way too much time and money on the wrong options, I found a calculator that broke it all down for me.

Free tool, shows your personalized result instantly:

${url}`,

  travel: (title, url) => `Most travelers don't know they're leaving money on the table.

This free calculator shows you exactly what you're entitled to — or what you're at risk of losing.

Takes 2 minutes:

${url}`,

  'shopping-ecommerce': (title, url) => `I built this free tool because I couldn't find anything that gave a real answer.

No email required. Shows your result in under a minute.

${url}`,

  surveys: (title, url) => `I make money passively without filling out a single survey.

Here's the exact calculation based on your setup:

${url}`,
};

async function createPinterestPin(boardId, title, description, imageUrl, destinationUrl) {
  const res = await fetch(`${PINTEREST_API}/pins`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PINTEREST_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      board_id: boardId,
      title,
      description,
      link: destinationUrl,
      media_source: {
        source_type: 'image_url',
        url: imageUrl,
      },
    }),
  });
  return res.json();
}

async function draftFacebookPost(message, link) {
  const res = await fetch(`${FB_API}/${FB_PAGE_ID}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      link,
      published: false, // DRAFT — not auto-published
    }),
    // Requires ?access_token= or Authorization header with page token
  });
  return res.json();
}

async function syndicate({ slug, type, cluster, title, imageUrl }) {
  const baseUrl = `https://verto.com/calculators/${slug}`;
  const boardId = BOARD_MAP[cluster];
  const templates = PIN_TEMPLATES[type] || PIN_TEMPLATES.article;

  console.log(`\n=== Syndicating: ${title} ===\n`);

  // 1. Create Pinterest pins (one per template)
  for (const tpl of templates) {
    const pinUrl = `${baseUrl}?utm_source=pinterest&utm_medium=pin&utm_campaign=${slug}-${tpl.suffix}`;
    const pinTitle = tpl.titleTemplate(title);
    const pinDesc = tpl.descTemplate(title, pinUrl);

    const result = await createPinterestPin(boardId, pinTitle, pinDesc, imageUrl, pinUrl);
    console.log(`✅ Pinterest pin created: ${tpl.suffix} → ${result.id}`);

    // Space out writes to stay under 100/min rate limit
    await new Promise(r => setTimeout(r, 700));
  }

  // 2. Draft Facebook Page post
  const fbUrl = `${baseUrl}?utm_source=facebook&utm_medium=page-post&utm_campaign=${slug}`;
  const fbMessage = (FB_TEMPLATES[cluster] || FB_TEMPLATES['shopping-ecommerce'])(title, fbUrl);
  const fbDraft = await draftFacebookPost(fbMessage, fbUrl);
  console.log(`📋 Facebook draft queued: post ID ${fbDraft.id}`);
  console.log(`   Review at: https://business.facebook.com/latest/posts/published_posts`);

  // 3. Print group post copy to terminal (manual posting queue)
  const groupUrl = `${baseUrl}?utm_source=facebook&utm_medium=group&utm_campaign=${slug}`;
  console.log(`\n--- GROUP POST COPY (paste manually) ---`);
  console.log(fbMessage.replace(fbUrl, groupUrl));
  console.log(`\nLink for first comment: ${groupUrl}`);
  console.log(`-----------------------------------------\n`);
}

// CLI entry point
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter(a => a.startsWith('--'))
    .map(a => a.slice(2).split('='))
    .map(([k, v]) => [k, v || true])
);

syndicate({
  slug: args.slug,
  type: args.type || 'calculator',
  cluster: args.cluster || 'financial',
  title: args.title || args.slug,
  imageUrl: args['image-url'] || `https://verto.com/og/${args.cluster || 'default'}.svg`,
});
```

### Usage:
```bash
node scripts/syndicate.mjs \
  --slug credit-score-cost \
  --type calculator \
  --cluster financial \
  --title "Credit Score Cost Calculator"
```

**Output:**
- 3 Pinterest pins created automatically (result-card, headline-stat, how-it-works)
- 1 Facebook Page post drafted (not published — you review + publish from Meta Business Suite)
- Group post copy printed to terminal (copy/paste for manual group posting)

---

## Environment Variables to Add

Add to `.dev.vars` (Cloudflare) or `.env` (local):

```
PINTEREST_ACCESS_TOKEN=your_token_here
PINTEREST_APP_ID=your_app_id
PINTEREST_APP_SECRET=your_app_secret
FB_PAGE_ACCESS_TOKEN=your_page_token
FB_PAGE_ID=your_page_id
```

---

## Pinterest OAuth Setup (One-Time)

1. Go to [developers.pinterest.com](https://developers.pinterest.com)
2. Create a new app
3. Set redirect URI to `http://localhost:3000/callback`
4. Request scopes: `pins:write`, `boards:write`, `pins:read`, `boards:read`
5. Complete OAuth flow → get refresh token (lasts 365 days)
6. Store access token in `.dev.vars`

Refresh tokens automatically. Add a `refresh-pinterest-token.mjs` script that runs monthly.

---

## Facebook Pages Setup (One-Time)

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a new app → select "Business" type
3. Add "Facebook Login" and "Pages API" products
4. Request permissions: `pages_manage_posts`, `pages_show_list`, `pages_manage_metadata`
5. Get a Page Access Token via Graph API Explorer
6. Long-lived page tokens (never expire) — generate once via:
   ```
   GET /oauth/access_token?grant_type=fb_exchange_token&
       client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}
   ```
7. Store in `.dev.vars`

---

## Board Creation Script (Run Once)

Run this once to create all 11 Pinterest boards and capture their IDs for `BOARD_MAP`:

```bash
node scripts/create-pinterest-boards.mjs
```

Boards to create (paste these into the script):
```javascript
const boards = [
  { name: 'Personal Finance Calculators & Tools', cluster: 'financial' },
  { name: 'GLP-1 & Weight Loss Cost Calculators', cluster: 'health-wellness' },
  { name: "Women's Health After 40", cluster: 'womens-health' },
  { name: "Men's Health & Hormone Support", cluster: 'mens-health' },
  { name: 'Travel Insurance & Flight Rights', cluster: 'travel' },
  { name: 'Parenting & Kids Online Safety', cluster: 'shopping-ecommerce' },
  { name: 'Passive Income & Side Hustle Math', cluster: 'surveys' },
  { name: 'Quit Vaping — The Real Cost', cluster: 'quit-vaping' },
  { name: 'Home Office & Remote Work Savings', cluster: 'legal-services' },
  { name: 'Rural Internet & Connectivity', cluster: 'rural-internet' },
  { name: 'Brain Health & Focus Supplements', cluster: 'antivirus-vpn' },
];
```

---

## What the APIs Cannot Do (Do Not Waste Time Here)

| Thing | API Status | Why |
|---|---|---|
| Post to Facebook Groups | ❌ Deprecated v3.2 | Privacy policy change post-Cambridge Analytica |
| Read Group member lists | ❌ Unavailable | Same reason |
| Auto-post to multiple groups | ❌ ToS violation | Account ban risk |
| Schedule Pinterest pins natively | ✅ Use Tailwind | Pinterest API allows creation but Tailwind handles smart scheduling |
| Post Facebook Reels via API | ⚠️ Video API only | Requires `video_upload` permission, complex chunked upload flow |
| Get Group analytics | ❌ Content Library API only | Research-only, not for marketing automation |

---

## Recommended Implementation Order

1. **Pinterest board creation script** — 30 min. Unblocks all Pinterest automation.
2. **Pinterest pin creation in syndicate.mjs** — 2 hours. Start auto-pinning immediately.
3. **FB page draft post in syndicate.mjs** — 1 hour. Removes friction from page posting.
4. **Manual group posting workflow** — No code. Build the habit using the copy printed by the script.
5. **OG image per calculator** — Dedicated 1200×630 images for each calculator (currently using category SVGs). Pinterest performs significantly better with unique images per pin.
6. **Analytics tracking** — UTM → GA4 → see which pins and posts are converting.

---

Sources:
- [Graph API /user/groups — Meta Developers](https://developers.facebook.com/docs/graph-api/reference/user/groups/)
- [Meta Developer Docs (all products)](https://developers.facebook.com/docs/)
- [Facebook Content Library API — FB Groups Guide](https://developers.facebook.com/docs/content-library-and-api/content-library-api/guides/fb-groups/)
- [Pinterest API v5 — Create Pins](https://developers.pinterest.com/docs/api/v5/pins-create/)
- [Pinterest API v5 — Introduction](https://developers.pinterest.com/docs/api/v5/introduction/)
- [Pinterest API 2026 — Zernio](https://zernio.com/blog/pinterest-api)
- [Pinterest Posting API: Python & Node.js — Zernio](https://zernio.com/blog/pinterest-posting-api)
