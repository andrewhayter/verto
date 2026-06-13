# Syndication Implementation Notes
*Reference doc for when we build this out — 2026-06-12*

---

## Facebook

### What works via official API
- Post to **Facebook Pages** (text, links, photos, video) via Graph API v25.0
- Create **draft posts** (set `"published": false`) so a human can review before going live
- Schedule posts by passing a `scheduled_publish_time` Unix timestamp

### What does NOT work via API
- **Groups API is dead** — deprecated after v3.2, current version is v25.0
- No programmatic posting to Groups, no reading member lists, nothing
- Any third-party tool claiming to autopost to Groups uses browser automation = ToS violation = ban risk
- **Group posting must always be manual**

### Permissions you'll need (Pages)
```
pages_manage_posts
pages_manage_metadata
pages_manage_read_engagement
pages_show_list
```

### Page Access Token
- Short-lived tokens expire. Exchange for a long-lived token once and store it.
- Long-lived page tokens don't expire — generate once, store in `.dev.vars`
- Exchange endpoint: `GET /oauth/access_token?grant_type=fb_exchange_token&...`

### Algorithm notes (Andromeda, 2026)
- Link posts are suppressed in feed — put URLs in the **first comment**, not the post body
- Saves > Shares > Comments > Likes in ranking weight
- Reposts and unoriginal content are actively demoted — always original copy
- Reels get 10–50x the organic reach of any other format
- Page organic reach is only 1–6% of followers — Groups (manual) are the real reach lever
- Group reach is 20–40% of members per post

---

## Pinterest

### API is fully functional
- Pinterest REST API v5.28.0
- Base URL: `https://api.pinterest.com/v5/`
- Rate limits: **1,000 req/min read / 100 req/min write**
- Create pins, boards, read analytics — all supported

### Permissions needed
```
pins:read
pins:write
boards:read
boards:write
```

### OAuth
- Redirect URI: `http://localhost:3000/callback` (for local setup)
- Refresh tokens last **365 days** — set a calendar reminder to refresh
- Add a `refresh-pinterest-token.mjs` script for this

### Pin creation endpoint
```
POST https://api.pinterest.com/v5/pins
{
  "board_id": "...",
  "title": "...",        // format: [Keyword] | [Benefit] | [Year]
  "description": "...", // 300–450 chars, naturally include 3–5 keywords
  "link": "...",        // always include UTM params
  "media_source": {
    "source_type": "image_url",
    "url": "..."        // 1000×1500px preferred (2:3 ratio)
  }
}
```

### Pinterest algorithm notes (2026)
- Pinterest is a **search engine**, not a social feed — pins rank for 6–18 months
- Traffic has a 60–90 day lag before first meaningful clicks
- Compounds at 9–18 months — the more you pin, the stronger older pins get
- Post 5–10 pins/day during ramp-up period
- Create 3–5 pin variations per piece of content (different designs, same destination)
- Keywords must appear in: board title, board description, pin title, pin description
- 85% of weekly Pinterest users make purchases based on pins — high purchase intent

### Pin image specs
- Vertical: **1000×1500px** (2:3 ratio) — Pinterest's preferred format
- Current OG images (`/public/og/*.svg`) are 1200×630 (landscape) — **wrong ratio for Pinterest**
- Need to create dedicated Pinterest-format images per calculator before launching
- Canva Pro has Pinterest pin templates built in

---

## The Syndication Script Plan (`scripts/syndicate.mjs`)

When we build this, it should:
1. Accept `--slug`, `--type`, `--cluster`, `--title` as CLI args
2. Create 3 Pinterest pin variations via API (result-card, headline-stat, how-it-works)
3. Create 1 Facebook Page **draft** post (not auto-published)
4. Print ready-to-paste group post copy to terminal for manual group seeding

Full spec and code scaffold is in `SYNDICATION-API-PLAN.md`.

---

## UTM Parameters — Set These Before Anything Else

Every outbound URL needs UTM params so you know what's converting.

| Source | Format |
|---|---|
| Pinterest static pin | `?utm_source=pinterest&utm_medium=pin&utm_campaign={slug}-{pin-variant}` |
| Facebook Page post | `?utm_source=facebook&utm_medium=page-post&utm_campaign={slug}` |
| Facebook Group post | `?utm_source=facebook&utm_medium=group&utm_campaign={slug}` |
| Facebook Reel | `?utm_source=facebook&utm_medium=reel&utm_campaign={slug}` |

Without this you cannot tell which platform or which post format is actually driving revenue.

---

## One-Time Setup Checklist (Do Before Building the Script)

- [ ] Create Pinterest Developer app at developers.pinterest.com
- [ ] Complete Pinterest OAuth, store refresh token in `.dev.vars`
- [ ] Run board creation script to create all 11 boards, capture IDs for `BOARD_MAP`
- [ ] Create Facebook Developer app at developers.facebook.com
- [ ] Get long-lived Page Access Token, store in `.dev.vars`
- [ ] Create 11 Pinterest-format (1000×1500) pin templates in Canva
- [ ] Set up Tailwind account (official Pinterest partner, $14.99/mo) for smart scheduling
- [ ] Connect Google Analytics 4 to Verto for UTM conversion tracking

---

## Tools to Use

| Tool | Purpose | Cost |
|---|---|---|
| Tailwind | Pinterest smart scheduling + analytics | $14.99/mo |
| Canva Pro | Pin design (has 1000×1500 Pinterest templates) | $15/mo |
| CapCut | Reel editing for Facebook (free, mobile) | Free |
| Pinterest Trends | Free keyword research for pin titles/descriptions | Free |
| Meta Business Suite | Review + publish Facebook drafts | Free |
| GA4 | UTM conversion tracking | Free |

---

## Related Docs in This Repo

- `SYNDICATION-STRATEGY.md` — full platform strategy, post formats, group list, 90-day plan
- `SYNDICATION-API-PLAN.md` — full code scaffold for the syndication script
- `CALCULATOR-PLAN.md` — all 30 calculators prioritized (this is what gets syndicated)
- `FB-TRAFFIC-STRATEGY.md` — FB post copy templates, group seeding approach
