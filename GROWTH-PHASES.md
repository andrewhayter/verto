# Verto Growth Engine — The 5-Phase Plan to Maximize Traffic in 2026
> Last updated: 2026-06-12
> Domain: https://verto.fun (Astro 5 → Cloudflare Pages)
> Supersedes scattered guidance in CONTENT-PLAN / FB-TRAFFIC-STRATEGY / SYNDICATION-STRATEGY for **sequencing**.
> Those docs remain the *content/tactic* reference. This doc is the *execution order*.

---

## The Strategic Truth (read this first)

**Organic SEO is dead to us. We do not optimize for Google rankings, topical authority, or AI-search
citations.** The only traffic model is: **social distribution + traffic leaks → verto.fun landing pages
→ aggressive outbound linking → MaxBounty offers.** Every decision below is judged by "does this put a
clickable link in front of more humans," not "does this rank."

Verto has been **over-investing in supply** (2,441 built pages, 96 articles, 8 optimizer sessions) and
**under-investing in two things that actually produce revenue**:

1. **A maintainable campaign structure** — there is no parent/child/sibling hierarchy today, so the idea
   backlogs (CONTENT-PLAN, OFFER-REFERENCE, ARTICLE-IDEAS) are flat lists that rot. We need the hierarchy
   so a social campaign maps cleanly to a cluster of landing pages and offers — *not* for SEO siloing.
2. **Distribution instrumentation** — every page is published "to the void." No UTMs, no social pipeline,
   no measurement of which landing page or network/leak converts.

EPCs in the catalog tell us *people are profitably running these offers* — but EPC ≠ volume. We don't
know our volume because **we aren't measuring anything yet.** Fix measurement first, then scale the
channels and leaks that prove out. That is the entire logic of the phase order below.

### Audit snapshot (2026-06-12)
| Layer | Built | Reality check |
|---|---|---|
| Categories | 25 (flat) | No hierarchy. Header groups are hardcoded + reference dead slugs. |
| Problem pages `/best/[slug]` | 22 | Docs wrongly call these `/solve/`. Fix doc references. |
| Articles `/[category]/[slug]` | 96 | Good. Concentrated in health + financial. |
| Calculators / quizzes | 4 | Highest-converting format. Underbuilt. |
| Programmatic `/topic/[slug]` | 1,768 | **Dead weight** (.NET Core, Zuora, Zscaler...). Built for SEO we no longer do → delete. |
| Offers in catalog | 35 of 559 | Big backlog, unsorted. |
| Distribution infra | 0 | All strategy, no executable pipeline. |

---

## The Taxonomy Model (the missing backbone — built in Phase 1)

Every idea, offer, and page slots into a 3-level tree. This is what makes the backlog maintainable.

```
PILLAR  (parent — a money theme, ~8 total)
  └── CLUSTER  (child — a buyer intent, maps 1:1 to CONTENT-PLAN clusters)
        └── PAGE  (siblings — the asset types that serve one cluster)
              ├── Problem page   /best/[slug]      (high-intent FB/Pin landing)
              ├── Calculator     /calculators/...  (highest conversion)
              ├── Articles       /[category]/...    (E-E-A-T + organic + social)
              └── Offer reviews  /reviews/[slug]    (bottom-funnel)
```

### The 8 Pillars (mapped to where real offers + EPC actually exist)

| Pillar | Slug | Child clusters (examples) | Anchor offers / EPC |
|---|---|---|---|
| Health & Body | `health` | glp1-weight-loss, quit-vaping, mens-hormones, womens-hrt, brain-focus, keto | GLP-1 $187–225/lead · Vaping 75% rev · Sermorelin $113 |
| Money & Credit | `money` | bad-credit-loans, credit-monitoring, investing, tax-filing, gold | Bad-credit-CA $1.97 EPC · MooMoo $81/lead |
| Travel | `travel` | flight-booking, flight-compensation, travel-insurance, car-rental | Trip.com 1.47 EPC (CA) · Compensair |
| Home & Lifestyle | `home` | food-subscriptions, mens-style, rural-internet, household | Kahlon $188 · Wildgrain · HomeFi $65 |
| Make Money | `earn` | passive-income-apps, side-hustle, surveys | Nielsen Pulse $3.51 EPC (highest) |
| Safety & Tech | `safety` | vpn-privacy, parental-controls, id-protection | Bark · NordPass · mSpy |
| Legal & Business | `legal` | llc-formation, legal-documents, b2b-tools | LegalNature · Wallester |
| Play | `play` | sweeps-casino, online-casino-ca | TopSweeps 0.56 · LuckyOnes 0.55 |

**Rule:** a cluster only ships when it has ≥1 conversion asset (problem page OR calculator) live.
A pillar page is just a hub linking its clusters. Siblings cross-link to each other (already the pattern in optimizer sessions).

---

# THE 5 PHASES

Each phase has: **Objective · Build (in-repo) · Distribute · Gate to next phase · Kill criteria.**
Phases overlap — Phase 2 (Pinterest) starts its 60–90 day clock *during* Phase 1.

---

## PHASE 1 — Foundation & Instrumentation  *(Weeks 1–2)*
**Without this, nothing downstream is measurable or maintainable. Non-negotiable, do first.**

### Objective
A real taxonomy + the ability to know which landing page and which network earns.

### Build (in-repo)
1. **Add hierarchy to the data model.**
   - Add `pillar` + `clusters` to `categories.ts` (or a new `taxonomy.ts` with PILLAR→CLUSTER→category mapping).
   - Add a `cluster` field to `Problem`, `Offer`, and article frontmatter so every page declares its parent.
   - Generate pillar hub pages `/[pillar]` and cluster hub pages, replacing the hardcoded `catGroups` in `Header.astro`.
2. **UTM + click instrumentation.**
   - Central helper: append `utm_source / utm_medium / utm_campaign` to every internal CTA and every affiliate link.
   - Standardize: `?utm_source=pinterest&utm_medium=pin&utm_campaign=glp1-result-card-1`.
   - Wire Cloudflare Web Analytics (free, privacy-friendly, already on CF) for page-level traffic by referrer/UTM.
   - Keep MaxBounty `sub1` = cluster slug (already done) so MB reports tie revenue to clusters.
3. **Delete the programmatic bloat.** These were pure SEO plays with no purpose under a social-only model.
   - Delete `/topic/` pages whose category has 0 built offers (gaming, education, b2b junk: ~600+ pages).
   - Keep only topics that map to a live cluster, and only as **internal leak surfaces** (places to drop
     outbound links to offers/clusters) — not for ranking. Faster builds, less to maintain.
4. **Maximize outbound link density per page.** Every landing/article/topic page should expose multiple
   offer CTAs + sibling-cluster links (in-content, sticky bar, exit-intent module). This is the on-site
   "leak" layer — squeeze maximum click-out value from every visitor social sends us.
5. **Fix doc drift.** Global replace `/solve/` → `/best/` across reference docs.

### Distribute
Nothing yet. This phase is plumbing.

### Gate to Phase 2
- [ ] Every live page resolves to a pillar + cluster.
- [ ] One test affiliate click shows correct UTM + `sub1` in MB + CF Analytics.
- [ ] Topic page count cut to only cluster-relevant terms.

### Kill criteria
None — this is foundation. The only failure mode is skipping it.

---

## PHASE 2 — Pinterest Evergreen Engine  *(Start Week 1, runs forever)*
**Start the compounding clock immediately — Pinterest has a 60–90 day lag, so day-1 effort pays in Q4.**

### Objective
Build a pin library in 2026 that drives passive, search-intent traffic into 2027. This is the
**compounding asset** and the **BATNA** against Facebook's algorithm risk.

### Build (in-repo)
1. **Conversion landing pages per cluster** — prioritize calculators/quizzes/eligibility checkers
   (highest CTR per SYNDICATION-STRATEGY). Build from CALCULATOR-PLAN: credit-score-cost, vaping-cost,
   menopause-cost, passive-income, GLP-1 (done).
2. **Auto-generate "result card" OG images** per calculator (the #1 pin format) — Astro endpoint or static.

### Distribute
- 11 boards from SYNDICATION-STRATEGY (board title = exact search phrase).
- 5–10 pins/day for first 90 days; 3–5 pin variants per asset (result card, headline stat, checklist, video, idea pin).
- Every pin URL carries a unique UTM. Schedule via Tailwind.
- 80/20: 80% own pins, 20% relevant repins.

### Gate to Phase 3
Phase 3 can start in parallel immediately — no gate. But review at **Day 60**: are outbound clicks rising?

### Kill criteria
- Day 90: Pinterest outbound clicks to verto.fun flat → the *pin formats* are wrong, not the channel.
  Test 3 new visual formats before abandoning. Pinterest rarely fails on strategy, only on consistency.

---

## PHASE 3 — Facebook Distribution  *(Weeks 2–8)*
**Fastest traffic. Group reach (20–40%) >> Page reach (1–6%). Reels are the #1 reach multiplier in 2026.**

### Objective
Immediate clicks from niche-group seeding + Reels, while building **owned FB Groups** as a second
compounding/owned asset.

### Build (in-repo)
- Ensure every cluster has a clean, fast, mobile-first landing page with a single strong CTA (no redirect-only pages).
- Add "link in first comment" friendly OG tags (FB suppresses link posts — the landing must look great when pasted in a comment).

### Distribute
1. **Seed niche groups** (no audience required): 5 groups/cluster, value-first, link in comment.
   Start with the **time-sensitive arbitrage**: Roblox mass-tort checker ($1,125/lead) in parenting groups.
2. **Reels:** screen-record each calculator filling in → result. 1+/week. Captions on. Post to Page + profile.
3. **Launch 2 owned Groups** (GLP-1 Support, Quit Vaping) — long-term owned audience. 3 posts/wk (2 value, 1 link).
4. Rotate the 5 post formats (personal revelation, comment-bait, hidden-truth, tag-a-friend, Reel).

### Gate to Phase 4
- [ ] At least one cluster shows measurable click-through from groups (via UTM).
- [ ] You have ≥10 Reels recorded (this footage feeds Phase 4 directly).

### Kill criteria
- A cluster's group posts get repeatedly removed/banned → switch clusters, don't fight moderators.
- GLP-1 specifically: if FB blanket-bans GLP-1 creatives (real 2026 regulatory risk), pivot that effort to
  vaping / Nielsen / credit, which carry no ad-policy exposure.

---

## PHASE 4 — Short-Form Video Multiplex  *(Weeks 4–12)*
**One vertical video → TikTok + YouTube Shorts + Instagram Reels + FB Reels + Pinterest video pin.**
**5 networks from one shoot. This is the AI-leveraged, one-person-at-team-scale arbitrage.**

### Objective
Maximize reach per unit of effort by repurposing a single asset across every short-form surface.
TikTok + YT Shorts are untapped for Verto and have the loosest discovery algorithms for new accounts.

### Build (in-repo)
- A repeatable "calculator demo" template page optimized to look good on screen-record (big numbers, clean reveal).
- Per-network UTM landing variants so you know which platform converts.

### Distribute
- 1 base video/cluster/week → cut into 5 platform-native versions (CapCut, free).
- **YouTube Shorts:** ride the Shorts discovery feed (algorithmic, not search); hook in first 1s.
- **TikTok:** trend-audio + hook in first 1s; link in bio → hub page of top calculators.
- **Instagram Reels / Threads:** same cut, native captions.
- Bio links and on-screen CTAs all point to verto.fun cluster pages with UTMs. Treat every bio + pinned
  comment + caption as a **leak point** — saturate them.

### Gate to Phase 5
- [ ] Identify the top-performing network by outbound clicks → double down there.

### Kill criteria
- Any single network shows < X clicks after 30 videos → stop posting *there*, keep the others.
  (Per-network kill, not whole-phase kill — the repurposing cost is near-zero.)

---

## PHASE 5 — Traffic-Leak Saturation & Owned Channel  *(Weeks 6+, ongoing)*
**Spray clickable links across every surface that allows them, and capture an owned audience so we're
never at the mercy of one platform. No SEO, no Wikidata, no AI-citation games — just more leak points.**

### Objective
Maximize the number of places a human can encounter a verto.fun link, and convert a slice of that
traffic into an email list (the only channel we fully own = the ultimate BATNA).

### Build (in-repo)
- **Email capture** wired into `Newsletter.astro` (lead magnet: a downloadable checklist/PDF per cluster).
- **Hub / link-in-bio page** on verto.fun itself (own the linktree — don't rent it) listing top calculators
  per cluster, with UTMs per row. One link to drop in every bio.
- **Exit-intent + related-offer modules** on every landing page — leak visitors to a second offer before
  they bounce instead of losing them.

### Distribute — the Traffic Leak Playbook
Every platform that lets you post a URL is a leak. Rotate, stay value-first, avoid spam flags:
- **Forums & communities:** Reddit, Quora, niche FB groups, Discord/Telegram channels, Skool, specialized
  forums (menopause, tressless, keto, RV/rural-internet, passive-income). Answer real questions, drop the link.
- **Web 2.0 / republish:** Medium, Substack notes, Tumblr, Flipboard, LinkedIn posts — repost cluster
  content with the canonical link back to verto.fun.
- **Comment leaks:** YouTube comments on relevant videos, blog comments, FB/IG comments — link in first comment.
- **Profile/bio leaks:** every social bio, pinned post, pinned comment, video caption → the hub page.
- **Cross-leaks:** link your own properties to each other (FB group → Pinterest → YouTube → email → verto).
- Every leak URL carries a unique UTM so you learn which surfaces actually send clicks.

### Gate
Steady-state engine. No gate — runs indefinitely and compounds with list size + leak surface count.

### Kill criteria
- Per-surface, not whole-phase: a leak source gets you shadow-banned or sends < X clicks after a fair
  test → drop that surface, keep the rest. Leaks are cheap; cut the duds fast and reallocate.
- Email is pure compounding/low-cost — never killed.

---

## Sequencing at a Glance

```
Week:        1   2   3   4   5   6   7   8  ...  12+
Phase 1  ████████                                      Foundation (gates everything)
Phase 2  ████████████████████████████████████████████  Pinterest (compounds, start NOW)
Phase 3      ████████████████████████                   Facebook (fast traffic)
Phase 4              ████████████████████████████        Short-form multiplex (5 networks)
Phase 5                      ████████████████████████████ Owned moat + AI citation
```

## The Metrics That Matter (one per phase)
| Phase | The one number | Tool |
|---|---|---|
| 1 | % pages with valid pillar+cluster+UTM | build check |
| 2 | Pinterest monthly outbound clicks | Pinterest Analytics |
| 3 | Click-through to verto.fun from group posts | UTM + CF Analytics |
| 4 | Top network by outbound clicks per video | UTM |
| 5 | Email list size + clicks per leak surface | ESP + UTM |
| ALL | **MaxBounty revenue by `sub1` (cluster)** | MB dashboard |

## Concentration Risks (the BATNA ledger)
- **MaxBounty = single network.** Fallback: catalog is portable; if MB drops an offer, swap the link, keep the page.
  Mid-term: apply to a second network for the top 3 clusters.
- **Facebook = single fast channel.** That is *why* Phases 2/4/5 build Pinterest, YT, leaks, and email in parallel.
- **Each social account can be banned.** Leaks are deliberately spread across many surfaces so no single
  ban dents total traffic. Email is the owned fallback under all of it.

---

## Phase 1 Definition of Done (what unblocks all growth)
1. `taxonomy.ts` (or extended `categories.ts`) with PILLAR → CLUSTER → category/offer/page links.
2. Pillar + cluster hub pages generated; `Header.astro` driven by data, no dead slugs.
3. UTM helper applied to all CTAs + affiliate links; Cloudflare Web Analytics live.
4. `/topic/` junk pages deleted; survivors kept only as internal leak surfaces; max outbound-link density live.
5. Reference docs corrected (`/solve/` → `/best/`) and re-pointed at this phase plan.
```
