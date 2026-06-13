/**
 * Verto Content Promotion Sheet
 * ─────────────────────────────
 * HOW TO RUN:
 *   1. Go to https://script.google.com → New project
 *   2. Paste this entire file into the editor
 *   3. Click Run → createPromoSheet
 *   4. Approve permissions when prompted
 *   5. Check your Google Drive for "Verto Content Promotion Hub"
 */

const BASE_URL = "https://verto.fun";

// ─── TOP 20 CONTENT PIECES ───────────────────────────────────────────────────
const CONTENT = [
  {
    id: 1,
    title: "Your Savings Account Is Paying You $1.80 a Year. Here's the Fix.",
    url: `${BASE_URL}/financial/high-yield-savings-account-2026`,
    problemUrl: `${BASE_URL}/best/high-yield-savings`,
    category: "Financial",
    offer: "SoFi + Current",
    epc: "$1.30",
    audience: "US/CA adults 25–55 with savings",
    hook: "$1.80 vs $684 per year — same money, same safety",
    board: "Personal Finance Hacks",
    subreddits: ["r/personalfinance", "r/financialindependence", "r/povertyfinance"],
  },
  {
    id: 2,
    title: "You Don't Have Enough Money to Invest. You Don't Know Enough. Both Objections Are Solvable.",
    url: `${BASE_URL}/financial/stash-vs-motley-fool-investing-2026`,
    problemUrl: `${BASE_URL}/best/start-investing`,
    category: "Financial",
    offer: "Stash ($4.70 EPC) + Motley Fool ($2.03 EPC)",
    epc: "$4.70",
    audience: "US adults 22–45 who haven't started investing",
    hook: "Start with $5. Proven stock picks for $8.25/month.",
    board: "Personal Finance Hacks",
    subreddits: ["r/personalfinance", "r/financialindependence", "r/investing"],
  },
  {
    id: 3,
    title: "Term Life Insurance Is Cheaper Than You Think: The Numbers at 30, 35, and 40",
    url: `${BASE_URL}/financial/life-insurance-online-no-exam-2026`,
    problemUrl: `${BASE_URL}/best/life-insurance-online`,
    category: "Financial",
    offer: "Ladder Life ($4.29 EPC)",
    epc: "$4.29",
    audience: "US adults 28–45 with dependents",
    hook: "$15/month for $500K coverage at age 30. No doctor visit.",
    board: "Family Finance & Planning",
    subreddits: ["r/personalfinance", "r/financialindependence", "r/Frugal"],
  },
  {
    id: 4,
    title: "Pine.ca vs the Big Banks: How a $600K Mortgage Costs $18,000 More Than It Has To",
    url: `${BASE_URL}/financial/pine-ca-mortgage-vs-big-banks-2026`,
    problemUrl: `${BASE_URL}/best/mortgage-canada`,
    category: "Financial — Canada",
    offer: "Pine.ca ($2.81 EPC)",
    epc: "$2.81",
    audience: "Canadian homeowners 30–55 renewing or buying",
    hook: "$18,000 gap on a $600K mortgage. The bank rep called it a 'fixed fact of nature.'",
    board: "Smart Money Canada",
    subreddits: ["r/PersonalFinanceCanada", "r/canadahousing", "r/FirstTimeHomeBuyer"],
  },
  {
    id: 5,
    title: "Bad Credit Loans in Canada 2026: What Happens After the Third Bank Rejection",
    url: `${BASE_URL}/financial/bad-credit-loans-canada-2026`,
    problemUrl: `${BASE_URL}/best/bad-credit-loans-canada`,
    category: "Financial — Canada",
    offer: "Credit Resources CA ($1.97 EPC)",
    epc: "$1.97",
    audience: "Canadians 25–50 with sub-650 credit",
    hook: "Three rejections. RBC. TD. Then a credit union. Score: 571.",
    board: "Smart Money Canada",
    subreddits: ["r/PersonalFinanceCanada", "r/povertyfinance", "r/debtfree"],
  },
  {
    id: 6,
    title: "GLP-1 Price Comparison 2026: Every Access Pathway, Actually Priced Out",
    url: `${BASE_URL}/health-wellness/glp1-price-comparison-2026`,
    problemUrl: `${BASE_URL}/best/cant-lose-weight`,
    category: "Health & Wellness",
    offer: "Ivim ($1.88 EPC) + Clinic Secret ($1.50) + RightWell ($1.35)",
    epc: "$1.88",
    audience: "US adults 30–60 interested in GLP-1 weight loss",
    hook: "Brand-name Ozempic: $1,049/month. Compounded semaglutide: $149. Same active ingredient.",
    board: "GLP-1 & Weight Loss",
    subreddits: ["r/Ozempic", "r/WeightLossSupport", "r/loseit", "r/1200isplenty"],
  },
  {
    id: 7,
    title: "Nielsen Pulse App Review 2026: Get Paid $25–$50/Month Just for Installing This App",
    url: `${BASE_URL}/surveys/nielsen-pulse-review-2026`,
    problemUrl: `${BASE_URL}/best/earn-from-phone`,
    category: "Side Income",
    offer: "Nielsen Pulse ($3.51 EPC)",
    epc: "$3.51",
    audience: "US/CA adults 18–65 with smartphones",
    hook: "I make $50/month from an app I never open. No surveys. No ads. Just background data.",
    board: "Side Income & Passive Money",
    subreddits: ["r/beermoney", "r/passive_income", "r/sidehustle", "r/povertyfinance"],
  },
  {
    id: 8,
    title: "Roblox Child Safety Lawsuit 2026: What Parents Need to Know Right Now",
    url: `${BASE_URL}/legal-services/roblox-child-safety-lawsuit-2026`,
    problemUrl: `${BASE_URL}/best/kids-online-safety`,
    category: "Legal / Parenting",
    offer: "Help Injury ($3.51 EPC) + Bark ($1.20 EPC)",
    epc: "$3.51",
    audience: "US parents of children 6–16",
    hook: "500,000+ families have filed or are eligible. Is your child one of them?",
    board: "Kids Online Safety & Parenting",
    subreddits: ["r/Parenting", "r/Parents", "r/Mommit", "r/daddit"],
  },
  {
    id: 9,
    title: "Gas Generators Are the Wrong Answer. Here's What Actually Works During a Power Outage.",
    url: `${BASE_URL}/shopping-ecommerce/home-backup-power-solar-generator-2026`,
    problemUrl: `${BASE_URL}/best/power-backup`,
    category: "Home & Emergency",
    offer: "4Patriots Patriot Power 2500X ($1.69 EPC)",
    epc: "$1.69",
    audience: "US homeowners 35–65 in outage-prone areas",
    hook: "4 days without heat. 2 kids under 7. And a gas generator I couldn't run indoors.",
    board: "Home Emergency Prep",
    subreddits: ["r/preppers", "r/homeimprovement", "r/SHTF", "r/SolarDIY"],
  },
  {
    id: 10,
    title: "How to Get a Concealed Carry Permit in 2026: The Process, the Cost, and the Timeline",
    url: `${BASE_URL}/legal-services/how-to-get-concealed-carry-permit-2026`,
    problemUrl: `${BASE_URL}/best/concealed-carry-permit`,
    category: "Legal / Self-Defense",
    offer: "Country Wide Carry ($1.92 EPC)",
    epc: "$1.92",
    audience: "US adults 25–60 interested in CCW",
    hook: "40+ states. Online classroom. One afternoon. Here's the exact process.",
    board: "Self-Defense & Legal Rights",
    subreddits: ["r/CCW", "r/guns", "r/legaladvice", "r/homedefense"],
  },
  {
    id: 11,
    title: "Your Data Is Already Out There — Here's How to Find Out and What to Do About It",
    url: `${BASE_URL}/antivirus-vpn/identity-theft-protection-2026`,
    problemUrl: `${BASE_URL}/best/identity-protection`,
    category: "Privacy & Security",
    offer: "NordPass ($0.50 EPC) + myLAB Box ($1.20 EPC)",
    epc: "$1.20",
    audience: "US/CA adults 28–60 concerned about privacy",
    hook: "Your name, address, SSN last 4, and purchase history are on 47 data broker sites right now.",
    board: "Online Privacy & Security",
    subreddits: ["r/privacy", "r/cybersecurity", "r/personalfinance", "r/LifeAdvice"],
  },
  {
    id: 12,
    title: "Online Therapy vs. In-Person: The Real Differences, Costs, and When Each Is Better",
    url: `${BASE_URL}/health-wellness/online-therapy-vs-in-person-2026`,
    problemUrl: `${BASE_URL}/best/online-therapy`,
    category: "Health & Wellness",
    offer: "BetterHelp ($1.30 EPC)",
    epc: "$1.30",
    audience: "US/CA adults 22–50 considering therapy",
    hook: "In-person therapy: $175–$300/session with a 3-week wait. BetterHelp: $65–$100/week, start this week.",
    board: "Mental Health & Wellness",
    subreddits: ["r/mentalhealth", "r/therapy", "r/depression", "r/Anxiety"],
  },
  {
    id: 13,
    title: "Tinnitus: Why the Ringing in Your Ears Gets Worse After 50 — and What Actually Helps",
    url: `${BASE_URL}/health-wellness/tinnitus-ringing-ears-causes-treatment-2026`,
    problemUrl: `${BASE_URL}/best/tinnitus-relief`,
    category: "Health & Wellness",
    offer: "ZenCortex ($1.88 EPC) + Cerebrozen ($1.50 EPC)",
    epc: "$1.88",
    audience: "US adults 45–70 with tinnitus",
    hook: "The ringing that started after a concert 20 years ago is now constant. Here's the neuroscience.",
    board: "Health After 50",
    subreddits: ["r/tinnitus", "r/AskDocs", "r/over50", "r/Supplements"],
  },
  {
    id: 14,
    title: "Best Personal Loans of 2026: 3 Lenders That Match You to $100K in Under 2 Minutes",
    url: `${BASE_URL}/financial/best-personal-loans-2026`,
    problemUrl: `${BASE_URL}/best/need-personal-loan`,
    category: "Financial",
    offer: "SuperMoney + AuthorityLoan + MaxCash ($1.80 EPC avg)",
    epc: "$1.80",
    audience: "US adults 25–55 needing $5K–$100K",
    hook: "Soft pull only. See your actual rate in 90 seconds without touching your credit score.",
    board: "Personal Finance Hacks",
    subreddits: ["r/personalfinance", "r/povertyfinance", "r/Frugal"],
  },
  {
    id: 15,
    title: "Passive Income Apps That Actually Pay in 2026 — Ranked by Real Earnings",
    url: `${BASE_URL}/surveys/passive-income-apps-ranked`,
    problemUrl: `${BASE_URL}/best/earn-from-phone`,
    category: "Side Income",
    offer: "Nielsen Pulse ($3.51 EPC) + others",
    epc: "$3.51",
    audience: "US/CA adults 18–55 looking for passive income",
    hook: "I ran 7 passive income apps for 90 days. Here's exactly what each one paid.",
    board: "Side Income & Passive Money",
    subreddits: ["r/beermoney", "r/passive_income", "r/sidehustle"],
  },
  {
    id: 16,
    title: "Why Men Over 35 Feel Tired, Foggy, and Off — And the Prescription Fix Most Doctors Miss",
    url: `${BASE_URL}/best/low-energy-men`,
    problemUrl: `${BASE_URL}/best/low-energy-men`,
    category: "Health & Wellness",
    offer: "HintMeds + Mito-Essense + N0X Peptides ($1.50 EPC avg)",
    epc: "$1.50",
    audience: "US men 35–60",
    hook: "Testosterone checked out fine. But you still feel 60 at 38. Here's what the panel missed.",
    board: "Men's Health After 35",
    subreddits: ["r/Testosterone", "r/AskMen", "r/over30", "r/Supplements"],
  },
  {
    id: 17,
    title: "NordPass vs 1Password vs Your Browser's Built-In Password Saver — The Real Comparison",
    url: `${BASE_URL}/antivirus-vpn/nordpass-review-password-manager`,
    problemUrl: `${BASE_URL}/best/online-privacy`,
    category: "Privacy & Security",
    offer: "NordPass ($0.50 EPC)",
    epc: "$0.50",
    audience: "US/CA adults 25–55",
    hook: "Chrome's 'save password' feature has been breached 3 times in 4 years. Here's what to use instead.",
    board: "Online Privacy & Security",
    subreddits: ["r/privacy", "r/cybersecurity", "r/techsupport"],
  },
  {
    id: 18,
    title: "How Cash Back Credit Cards Actually Work — And Why Most People Leave Money on the Table",
    url: `${BASE_URL}/financial/how-cash-back-credit-cards-work`,
    problemUrl: `${BASE_URL}/best/best-credit-card`,
    category: "Financial",
    offer: "Yendo + credit card offers ($1.20 EPC)",
    epc: "$1.20",
    audience: "US adults 22–50",
    hook: "The average American leaves $487/year in unclaimed cashback. Here's the math.",
    board: "Personal Finance Hacks",
    subreddits: ["r/personalfinance", "r/churning", "r/CreditCards"],
  },
  {
    id: 19,
    title: "TrackFinance CA: How to Find and Remove Credit Report Errors That Are Killing Your Score",
    url: `${BASE_URL}/financial/trackfinance-credit-errors-canada`,
    problemUrl: `${BASE_URL}/best/credit-repair`,
    category: "Financial — Canada",
    offer: "TrackFinance CA ($1.97 EPC)",
    epc: "$1.97",
    audience: "Canadians 25–55 with sub-700 credit",
    hook: "1 in 5 Canadian credit reports contain errors serious enough to affect a loan approval.",
    board: "Smart Money Canada",
    subreddits: ["r/PersonalFinanceCanada", "r/debtfree", "r/FirstTimeHomeBuyer"],
  },
  {
    id: 20,
    title: "Flight Delay Compensation: You're Entitled to Up to $700 Per Passenger — Most People Never Claim It",
    url: `${BASE_URL}/travel/flight-delay-compensation-guide`,
    problemUrl: `${BASE_URL}/best/travel-protection`,
    category: "Travel",
    offer: "Compensair + Faye Travel ($1.40 EPC)",
    epc: "$1.40",
    audience: "US/CA frequent travelers 28–55",
    hook: "Your delayed flight 2 years ago may still be claimable. EU261 gives you up to €600 per seat.",
    board: "Travel Hacks & Deals",
    subreddits: ["r/travel", "r/flying", "r/solotravel", "r/TravelHacks"],
  },
];

// ─── COPY LIBRARY ────────────────────────────────────────────────────────────

const PINTEREST = [
  // Content ID 1 — High-yield savings
  [1, "Stat Card", "Your bank is paying you $1.80/year on $18,000. A high-yield savings account pays $684. Same money. Same safety. 5 minutes to switch.", "Online savings accounts aren't risky. They're FDIC insured exactly like your current bank — just at 3.80% APY instead of 0.01%. The math is embarrassing. | Read the full breakdown → verto.fun/financial/high-yield-savings-account-2026", "Personal Finance Hacks"],
  [1, "Question Hook", "Why is your savings account earning $1.80 a year?", "Not a typo. $18,000 at the national average savings rate earns $1.80 in 12 months. The same $18,000 in a high-yield account earns $684. Opening one takes 10 minutes. We break down exactly which accounts are worth it — and which ones bury the good rate behind fees. | Full guide: verto.fun/best/high-yield-savings", "Personal Finance Hacks"],
  [1, "Step Checklist", "5 steps to move your savings to a 3.80% APY account", "1. Open SoFi (5 min, no fees, no minimum) ✓\n2. Link your existing bank account ✓\n3. Transfer your savings (settles in 1-2 days) ✓\n4. Earn $684/year instead of $1.80 ✓\n5. Never think about it again ✓\nFull breakdown: verto.fun/financial/high-yield-savings-account-2026", "Personal Finance Hacks"],

  // Content ID 2 — Stash/Motley Fool
  [2, "Stat Card", "You don't need $1,000 to start investing. You need $5.", "Stash lets you buy fractional shares of real stocks and ETFs starting at $5. No watered-down account — you own the actual shares and receive dividends. Plus: $25 in free stock when you sign up. | Stash vs Motley Fool — full comparison: verto.fun/financial/stash-vs-motley-fool-investing-2026", "Personal Finance Hacks"],
  [2, "Question Hook", "What's the difference between someone who started investing at 25 vs 35?", "$113,000 vs $52,000 at retirement — same $100/month contribution, same 7% return. The only variable is when they started. Here's how to start today with $5. | Full breakdown: verto.fun/best/start-investing", "Personal Finance Hacks"],
  [2, "Step Checklist", "How to start investing in 2026 with $5 or $500", "Option A (total beginner): Stash → $5 minimum, auto-invest, Stock-Back debit card earns fractional shares on purchases\nOption B (ready to pick stocks): Motley Fool Stock Advisor → 2 expert picks/month, 668% return since 2002 vs 153% S&P 500\nBoth: verto.fun/financial/stash-vs-motley-fool-investing-2026", "Personal Finance Hacks"],

  // Content ID 3 — Life insurance
  [3, "Stat Card", "$15/month buys $500,000 in life insurance at age 30. No doctor visit. Approved same day.", "Term life is not complicated. You pay a fixed monthly amount. If you die during the term, your family gets the payout. If you don't, the coverage ends. That's it. And online providers like Ladder approve most applicants within hours. | Full cost breakdown by age: verto.fun/financial/life-insurance-online-no-exam-2026", "Family Finance & Planning"],
  [3, "Question Hook", "What does $500,000 in life insurance actually cost per month?", "Age 30: $15–20\nAge 35: $20–25\nAge 40: $30–40\nMost people assume it's hundreds of dollars. It's not. And you don't need a doctor visit anymore — the entire process is online. | Get a quote in 5 minutes: verto.fun/best/life-insurance-online", "Family Finance & Planning"],
  [3, "Step Checklist", "How to get $500K life insurance approved today — no doctor visit", "1. Get an instant quote (no personal info required yet)\n2. Complete the 20-min online questionnaire\n3. Get approved (most applicants: same day)\n4. Pay first month ($15–40 depending on age)\n5. Coverage is active\nLadder lets you adjust coverage as life changes. Guide: verto.fun/financial/life-insurance-online-no-exam-2026", "Family Finance & Planning"],

  // Content ID 4 — Pine.ca mortgage
  [4, "Stat Card", "Canadian big banks charge $18,000 more over 5 years on a $600K mortgage — because of their branch overhead.", "Pine.ca is a federally regulated digital mortgage lender. No branches. No advisor commissions built into your rate. They pass the savings to borrowers — at rates 0.6% lower than what the major banks were posting this month. | Full comparison: verto.fun/financial/pine-ca-mortgage-vs-big-banks-2026", "Smart Money Canada"],
  [4, "Question Hook", "Is your Canadian mortgage rate actually negotiable?", "Yes — more than most people know. The rate your bank offers at renewal isn't fixed. And digital lenders like Pine.ca routinely come in 0.4–0.8% lower than major banks. On a $600K mortgage that's $18,000 over 5 years. | Full breakdown: verto.fun/best/mortgage-canada", "Smart Money Canada"],
  [4, "Step Checklist", "How to renew your Canadian mortgage at a lower rate in 2026", "1. Get a Pine.ca rate quote (20 min, no hard pull)\n2. Receive rate confirmation within 24 hours\n3. Compare to your bank's renewal offer\n4. Choose the lower rate\n5. Save $18,000 over 5 years on a $600K mortgage\nGuide: verto.fun/financial/pine-ca-mortgage-vs-big-banks-2026", "Smart Money Canada"],

  // Content ID 5 — Bad credit loans Canada
  [5, "Stat Card", "Canadian banks reject loan applicants below 650. Alternative lenders start at 560 — with no hard credit pull to check your options.", "After three bank rejections at a 571 credit score, most people give up. But bank cutoffs aren't the only cutoffs. Specialist lenders use income, employment stability, and banking history — not just your score. | Full guide: verto.fun/financial/bad-credit-loans-canada-2026", "Smart Money Canada"],
  [5, "Question Hook", "What happens after your third loan rejection in Canada?", "The banks said no. The credit union said no. Now what? There's a category of lenders that specifically work with Canadians under 650 — using soft pulls that don't affect your score to show you real offers. Here's how it works. | Full breakdown: verto.fun/best/bad-credit-loans-canada", "Smart Money Canada"],
  [5, "Step Checklist", "How to get a personal loan in Canada with bad credit", "1. Submit soft-pull application (no score impact)\n2. Get matched to lenders who work with your score\n3. Review real rate offers (not estimates)\n4. Accept or decline — no obligation\n5. Funds typically within 24–48 hours\nCredit Resources CA guide: verto.fun/financial/bad-credit-loans-canada-2026", "Smart Money Canada"],

  // Content ID 6 — GLP-1 price comparison
  [6, "Stat Card", "Ozempic costs $1,049/month without insurance. Compounded semaglutide: $149. Same active ingredient.", "The price gap between brand-name GLP-1 medications and compounded versions from licensed telehealth providers isn't a loophole — it's how drug pricing works. We priced out 7 providers so you don't have to. | Full comparison: verto.fun/health-wellness/glp1-price-comparison-2026", "GLP-1 & Weight Loss"],
  [6, "Question Hook", "Is $149/month GLP-1 medication actually the same as Ozempic?", "The active ingredient in compounded semaglutide is chemically identical to what's in Wegovy. The difference is manufacturing overhead, brand licensing, and pharmacy markup. Here's how to tell if a compounding pharmacy is operating legally — and which telehealth providers are legit. | Full breakdown: verto.fun/best/cant-lose-weight", "GLP-1 & Weight Loss"],
  [6, "Step Checklist", "How to access GLP-1 weight loss medication for under $200/month", "1. Choose a telehealth provider (see our 7-provider comparison)\n2. Complete online health intake (15–20 min)\n3. Physician reviews and prescribes\n4. Medication shipped to your door\n5. Monthly cost: $99–$249 vs $1,049 brand-name\nFull guide: verto.fun/health-wellness/glp1-price-comparison-2026", "GLP-1 & Weight Loss"],

  // Content ID 7 — Nielsen Pulse
  [7, "Stat Card", "Nielsen pays you $25–$50/month to install an app and forget about it. No surveys. No ads. Just background data.", "Nielsen has been measuring consumer behavior since 1923. Their Pulse app runs silently in the background of your phone and shares anonymous usage data. They pay you for the access. You do nothing after installation. | Full review: verto.fun/surveys/nielsen-pulse-review-2026", "Side Income & Passive Money"],
  [7, "Question Hook", "What if your phone could earn $600/year without you doing anything?", "That's not a hypothetical. Nielsen Pulse pays $25–$50/month per device for anonymous background data. No surveys. No tasks. No ads. The app runs in the background — you earn while you sleep. | Review + signup: verto.fun/best/earn-from-phone", "Side Income & Passive Money"],
  [7, "Step Checklist", "How to earn $600/year passively with Nielsen Pulse", "1. Download Nielsen Pulse (iOS or Android)\n2. Complete 5-min registration\n3. Let it run in the background\n4. Earn $25–$50/month per device\n5. Cash out via PayPal, gift cards, or sweepstakes\nFull review: verto.fun/surveys/nielsen-pulse-review-2026", "Side Income & Passive Money"],

  // Content ID 8 — Roblox lawsuit
  [8, "Stat Card", "Roblox is named in 10,000+ lawsuits from families of children exposed to predators, scams, and inappropriate content. Claims may be worth $10,000–$150,000 per child.", "The lawsuits allege Roblox knew about risks and failed to act. If your child was exposed to predatory content, scams, or inappropriate material on Roblox, your family may have a claim — even without injury. | Full breakdown: verto.fun/legal-services/roblox-child-safety-lawsuit-2026", "Kids Online Safety & Parenting"],
  [8, "Question Hook", "Is your family eligible for the Roblox child safety lawsuit?", "If your child (under 18) used Roblox and experienced predatory contact, scams, sexual content, or gaming addiction, your family may qualify for compensation. The case evaluation is free — no attorney needed upfront. | What to check: verto.fun/legal-services/roblox-child-safety-lawsuit-2026", "Kids Online Safety & Parenting"],
  [8, "Step Checklist", "3 steps to check your Roblox lawsuit eligibility", "1. Confirm your child used Roblox (any time, any age)\n2. Identify if they experienced: predatory contact, scams, inappropriate content, or addiction\n3. Submit a free case evaluation — no attorney fees unless you win\nMost families who qualify don't know they do. | Full guide: verto.fun/best/kids-online-safety", "Kids Online Safety & Parenting"],

  // Content ID 9 — Power backup
  [9, "Stat Card", "Gas generators kill 400 people/year from CO poisoning. A solar generator produces zero emissions, zero noise, and runs everything except your AC.", "The 4Patriots Patriot Power 2500X runs a full-size refrigerator, medical devices, LED lighting, and a portable heater simultaneously. No fuel to store. No exhaust. No 2am noise complaints. | Full review: verto.fun/shopping-ecommerce/home-backup-power-solar-generator-2026", "Home Emergency Prep"],
  [9, "Question Hook", "What could you run during a 4-day power outage with a 2500W solar generator?", "Refrigerator: yes\nCPAP machine: yes\nPhone charging for the whole family: yes\nPortable heater: yes\nCentral AC: no (honest answer)\nHere's the realistic breakdown of what 2500W actually covers — and when a gas generator is still the right answer. | Full guide: verto.fun/best/power-backup", "Home Emergency Prep"],
  [9, "Step Checklist", "Gas generator vs solar generator — what actually matters", "Gas generator:\n✗ CO poisoning risk (400 deaths/year)\n✗ 12–18 gal/day fuel burn\n✗ 65–75 dB noise\n✓ Cheap upfront\n\nSolar generator (2500W):\n✓ Zero emissions — runs indoors\n✓ Silent\n✓ Recharged by sun\n✓ 8–10 year lifespan\n✗ Can't run central AC\nFull comparison: verto.fun/shopping-ecommerce/home-backup-power-solar-generator-2026", "Home Emergency Prep"],

  // Content ID 10 — CCW permit
  [10, "Stat Card", "40+ states accept online CCW training. Most people who qualify have never applied — they just don't know where to start.", "The process is 3 steps: complete a state-approved online course (3–5 hours), submit your application with proof of training, pass a background check. Country Wide Carry's course is recognized in 40+ states. | Full state-by-state guide: verto.fun/legal-services/how-to-get-concealed-carry-permit-2026", "Self-Defense & Legal Rights"],
  [10, "Question Hook", "How long does it actually take to get a CCW permit in your state?", "Fast-issue states: 2–4 weeks\nMost states: 30–90 days\nSome counties: up to 180 days\nThe clock starts when your complete application is submitted. Delay = paying higher rates every year you're older. | State timeline breakdown: verto.fun/legal-services/how-to-get-concealed-carry-permit-2026", "Self-Defense & Legal Rights"],
  [10, "Step Checklist", "How to get a concealed carry permit in 2026 — step by step", "1. Complete online CCW course (3–5 hrs, Country Wide Carry, 40+ states)\n2. Schedule range qualification if your state requires it\n3. Submit application + certificate + ID to county sheriff or state agency\n4. Pass background check\n5. Receive permit (2 weeks – 6 months depending on state)\nFull guide + cost breakdown: verto.fun/best/concealed-carry-permit", "Self-Defense & Legal Rights"],

  // Content ID 11 — Identity protection
  [11, "Stat Card", "Your personal data is on 47+ data broker sites right now. Name, address, phone, employer, relatives — all publicly searchable.", "Data brokers collect and sell personal information legally. Most people don't know they can opt out — or that services like NordPass can monitor when your info appears in breaches. | What to check and remove: verto.fun/antivirus-vpn/identity-theft-protection-2026", "Online Privacy & Security"],
  [11, "Question Hook", "Have you ever Googled your own name? What came up?", "Data brokers like Spokeo, WhitePages, and BeenVerified publish your address, phone, relatives, income estimate, and more — for anyone to see. Opting out of each one manually takes 40+ hours. Here's the faster way. | Full guide: verto.fun/best/identity-protection", "Online Privacy & Security"],
  [11, "Step Checklist", "How to find and remove your personal data from the internet", "1. Google your full name + city — note every site that has your info\n2. Opt out of each data broker individually (40+ hours) OR use a removal service\n3. Set up breach monitoring (NordPass alerts you when your email/password appear in a breach)\n4. Update passwords on any breached accounts\nFull guide: verto.fun/antivirus-vpn/identity-theft-protection-2026", "Online Privacy & Security"],

  // Content ID 12 — Online therapy
  [12, "Stat Card", "In-person therapy costs $175–$300/session with a 3-week average wait. Online therapy starts at $65/week and you can start this week.", "The clinical outcomes between online and in-person therapy are comparable for anxiety, depression, and relationship issues. The difference is cost, access, and scheduling. | Full comparison: verto.fun/health-wellness/online-therapy-vs-in-person-2026", "Mental Health & Wellness"],
  [12, "Question Hook", "Is online therapy actually as effective as seeing someone in person?", "For the most common conditions — anxiety, depression, relationship issues, stress — multiple studies show comparable outcomes. The differences are logistical: cost, access, commute, scheduling. Here's when in-person is still the right call and when it isn't. | Full breakdown: verto.fun/best/online-therapy", "Mental Health & Wellness"],
  [12, "Step Checklist", "How to start online therapy this week — no referral needed", "1. Choose a platform (BetterHelp, Talkspace, etc.)\n2. Complete intake questionnaire (15 min)\n3. Get matched to a therapist within 48 hours\n4. First session within a week\nCost: $65–$100/week vs $175–$300 in-person\nFull comparison: verto.fun/health-wellness/online-therapy-vs-in-person-2026", "Mental Health & Wellness"],

  // Content ID 13 — Tinnitus
  [13, "Stat Card", "50 million Americans have tinnitus. Most doctors offer nothing beyond 'learn to live with it.' Here's what the research actually supports.", "Tinnitus is a neurological symptom, not an ear problem — which is why earplugs and white noise don't fix it. Recent research on auditory pathway support and cochlear inflammation is pointing to more targeted approaches. | Full breakdown: verto.fun/health-wellness/tinnitus-ringing-ears-causes-treatment-2026", "Health After 50"],
  [13, "Question Hook", "If you have tinnitus, has your doctor offered any treatment beyond 'it's permanent, get used to it'?", "Most haven't. Because the conventional answer is that tinnitus is incurable. But the research on neuroinflammation, auditory pathway support, and cochlear blood flow tells a more nuanced story. | What actually helps: verto.fun/best/tinnitus-relief", "Health After 50"],
  [13, "Step Checklist", "What to actually do about tinnitus in 2026", "1. Rule out underlying causes (medication side effects, TMJ, hypertension)\n2. Avoid the triggers that worsen it (caffeine, salt, loud environments)\n3. Consider auditory pathway support supplements (evidence-based options reviewed)\n4. Sound therapy for sleep (not a cure — helps with perception)\nFull guide: verto.fun/health-wellness/tinnitus-ringing-ears-causes-treatment-2026", "Health After 50"],

  // Content ID 14 — Personal loans
  [14, "Stat Card", "A hard credit pull drops your score 5–10 points and stays on your report for 2 years. Most loan matching platforms use soft pulls — no score impact.", "The difference between a soft and hard pull isn't about what lenders see — it's about what shows on your credit report. Soft pulls are invisible to other lenders. Hard pulls aren't. Smart borrowers use soft-pull networks to rate-shop before committing. | Comparison: verto.fun/financial/best-personal-loans-2026", "Personal Finance Hacks"],
  [14, "Question Hook", "Can you see your actual loan rate without a hard credit check?", "Yes — and you should always do this before applying. Loan matching platforms like SuperMoney and AuthorityLoan show you real rates from multiple lenders using a soft pull. You choose which one to apply to. Only then does a hard pull happen. | How it works: verto.fun/best/need-personal-loan", "Personal Finance Hacks"],
  [14, "Step Checklist", "How to compare personal loan rates without hurting your credit", "1. Go to a soft-pull loan matching platform\n2. Enter loan amount, purpose, income (2 min)\n3. See real offers from multiple lenders (not estimates)\n4. Compare APR, term, monthly payment\n5. Apply to your top choice — only then does a hard pull happen\nBest platforms: verto.fun/financial/best-personal-loans-2026", "Personal Finance Hacks"],

  // Content ID 15 — Passive income apps
  [15, "Stat Card", "I ran 7 passive income apps for 90 days. Total earned: $214. One app accounted for $147 of it — and I never opened the app.", "Nielsen Pulse, Rewardia, and 5 others compared by actual earnings, payout speed, and withdrawal minimums. Most 'passive income apps' are neither passive nor meaningful. Two are. | Full 90-day test results: verto.fun/surveys/passive-income-apps-ranked", "Side Income & Passive Money"],
  [15, "Question Hook", "Which passive income apps actually pay — and which ones waste your time?", "After 90 days running 7 apps simultaneously, here's what I found: most pay less than $5/month and require active effort. One pays $25–50/month with zero ongoing work. The research is done — here's the ranking. | Full results: verto.fun/best/earn-from-phone", "Side Income & Passive Money"],
  [15, "Step Checklist", "Best passive income apps in 2026 — ranked by real earnings", "#1 Nielsen Pulse: $25–50/month, zero effort after install\n#2 Rewardia: $8–15/month, occasional surveys\n#3 Swagbucks: $5–10/month, requires active use\n#4–7: Under $3/month\nFull 90-day test results: verto.fun/surveys/passive-income-apps-ranked", "Side Income & Passive Money"],

  // Content ID 16 — Men's energy/hormones
  [16, "Stat Card", "Standard testosterone panels miss growth hormone, NAD+, and inflammatory markers — the real drivers of the energy crash after 35.", "Declining growth hormone after 35 isn't just fatigue. It's muscle loss, cognitive fog, sleep disruption, and metabolism changes. Telehealth providers now offer comprehensive male hormone panels and prescription protocols — without an in-person visit. | What the panel missed: verto.fun/best/low-energy-men", "Men's Health After 35"],
  [16, "Question Hook", "You're 38. Your testosterone came back 'normal.' Why do you still feel exhausted?", "Because testosterone is one of 6 hormonal markers that affect male energy, cognition, and body composition. The standard annual blood panel misses 5 of them. Here's what a full male hormone evaluation actually looks at — and what telehealth providers now test remotely. | Full breakdown: verto.fun/best/low-energy-men", "Men's Health After 35"],
  [16, "Step Checklist", "How to get a complete male hormone panel in 2026 — without leaving home", "1. Order a telehealth male hormone evaluation\n2. At-home bloodwork kit arrives within 3 days\n3. Return kit — results in 5–7 business days\n4. Virtual consultation reviews results\n5. Prescription protocol shipped if needed\nFull guide: verto.fun/best/low-energy-men", "Men's Health After 35"],

  // Content ID 17 — NordPass
  [17, "Stat Card", "Chrome's built-in password saver has appeared in 3 major breach notifications in the last 4 years. A dedicated password manager uses zero-knowledge encryption.", "Zero-knowledge means the password manager company cannot see your passwords — only you can decrypt them. Chrome syncs your passwords to Google's servers, which are a high-value target. The difference in architecture matters. | NordPass vs 1Password vs Chrome: verto.fun/antivirus-vpn/nordpass-review-password-manager", "Online Privacy & Security"],
  [17, "Question Hook", "Is saving passwords in Chrome actually secure?", "The architecture of browser-based password storage is different from a dedicated manager in one critical way: your passwords sync through the company's servers. Chrome's have been involved in breaches 3 times in 4 years. Here's what zero-knowledge encryption means and why it matters. | Full comparison: verto.fun/best/online-privacy", "Online Privacy & Security"],
  [17, "Step Checklist", "Chrome vs NordPass vs 1Password — which is actually secure?", "Chrome: convenient, syncs everywhere, 3 breach incidents in 4 years\n1Password: $2.99/month, excellent UX, zero-knowledge\nNordPass: $1.99/month, zero-knowledge, most affordable\n\nAll three are better than reusing passwords. One is meaningfully more secure. | Full comparison: verto.fun/antivirus-vpn/nordpass-review-password-manager", "Online Privacy & Security"],

  // Content ID 18 — Cash back credit cards
  [18, "Stat Card", "The average American earns $487/year in cashback they never collect — because they're using the wrong card for their spending pattern.", "A card that pays 3% on groceries and 1% on everything else is the wrong choice if you spend more on gas and dining than groceries. The math on optimizing your cashback card for your actual spending is significant. | How to find your best card: verto.fun/financial/how-cash-back-credit-cards-work", "Personal Finance Hacks"],
  [18, "Question Hook", "Is your credit card actually the best one for how you spend money?", "Most people pick a card once and never review it. But a card that's 'fine' for average spending might be costing you $300–$500/year in missed rewards compared to the right card for your specific spending pattern. Here's how to check. | Full breakdown: verto.fun/best/best-credit-card", "Personal Finance Hacks"],
  [18, "Step Checklist", "How to find the best cash back credit card for your spending in 2026", "1. Add up your monthly spend by category (groceries, gas, dining, travel, other)\n2. Multiply each by the highest available rate in that category\n3. Compare totals across 3–4 cards\n4. Factor in annual fee vs rewards earned\n5. Switch — the sign-up bonus alone often covers the first year\nFull guide: verto.fun/financial/how-cash-back-credit-cards-work", "Personal Finance Hacks"],

  // Content ID 19 — TrackFinance CA
  [19, "Stat Card", "1 in 5 Canadian credit reports contain errors serious enough to affect a loan or mortgage approval. Most people never check.", "Credit bureaus in Canada make mistakes: duplicate accounts, incorrect balances, debts that were settled but still show as outstanding. TrackFinance CA monitors your Equifax and TransUnion files and flags issues — before a lender sees them. | How to check: verto.fun/financial/trackfinance-credit-errors-canada", "Smart Money Canada"],
  [19, "Question Hook", "When's the last time you actually read your Canadian credit report?", "Not just the score — the full report. Most Canadians have never done it. And 1 in 5 of those who do find errors: duplicate accounts, wrong balances, old debts that should have been removed. An error that costs 30 points can be the difference between mortgage approval and rejection. | Full guide: verto.fun/best/credit-repair", "Smart Money Canada"],
  [19, "Step Checklist", "How to check and fix your Canadian credit report for free", "1. Request free reports from Equifax Canada and TransUnion Canada (you're entitled to one/year)\n2. Check for: duplicate accounts, incorrect balances, accounts you don't recognize\n3. File a dispute for any error (process takes 30 days)\n4. Monitor with TrackFinance CA for ongoing alerts\nFull guide: verto.fun/financial/trackfinance-credit-errors-canada", "Smart Money Canada"],

  // Content ID 20 — Flight delay compensation
  [20, "Stat Card", "EU law entitles passengers to up to €600 per seat for flights delayed more than 3 hours — including flights to/from Canada and the US that touched EU airspace.", "EC Regulation 261/2004 applies to any flight that departed from an EU airport, regardless of which airline or where you're flying. Claims can be filed up to 6 years back in some jurisdictions. Most passengers never file. | Check your eligibility: verto.fun/travel/flight-delay-compensation-guide", "Travel Hacks & Deals"],
  [20, "Question Hook", "Do you have a flight delay claim you've never filed?", "If any of your flights in the last 6 years were delayed 3+ hours, cancelled, or overbooked — and touched EU airspace — you may be owed €250–€600 per passenger. Claim services work on no-win-no-fee. The only thing you lose by not checking is the money. | Check your claim: verto.fun/best/travel-protection", "Travel Hacks & Deals"],
  [20, "Step Checklist", "How to claim EU flight delay compensation in 2026", "1. Find your delayed/cancelled flight records (booking confirmations, boarding passes)\n2. Check if route qualifies (departed from EU OR EU airline into EU)\n3. Submit claim through Compensair (no-win-no-fee, 25% commission)\n4. Average payout: €350–€600 per passenger\n5. Payout time: 4–12 weeks\nFull guide: verto.fun/travel/flight-delay-compensation-guide", "Travel Hacks & Deals"],
];

const FACEBOOK = [
  // Content ID 1 — High-yield savings
  [1, "Stat Hook", "Smart Money Canada,Finance Tips & Tricks", "Financial", "The national average savings account pays 0.01% APY.\n\nOn $18,000 in savings, that's $1.80 per year.\n\nA high-yield savings account at 3.80% pays $684 on the same amount.\n\nSame money. Same FDIC insurance. Same access to your cash.\n\nThe only difference is where it sits.\n\nIf you haven't moved your savings yet, this 8-minute article has the exact steps, the math, and the two accounts worth considering:\n\n[link in comments]", "Drop 💰 if you have a high-yield savings account, 😴 if your money is still at a big bank"],
  [1, "Story Hook", "Smart Money Canada,Finance Tips & Tricks", "Financial", "I found out last year that my emergency fund had earned $2.17 in interest over 12 months.\n\nI have $18,000 in there. I thought it was making something.\n\nTurns out my bank was paying me 0.01%. While lending my money out at 7%.\n\nSwitched it to a high-yield account in January. As of today that same $18,000 has earned $342 in interest in 6 months. On track for $684 for the year.\n\nThe move took 10 minutes. I have no idea why I waited.\n\nIf you haven't done this yet — full breakdown of how it works and which accounts are worth it:\n\n[link in comments]", "Have you done this already? When did you make the switch?"],

  // Content ID 2 — Stash/Motley Fool
  [2, "Stat Hook", "Finance Tips & Tricks,Investing for Beginners", "Financial", "Person A starts investing $100/month at age 25.\nPerson B starts at age 35.\nBoth earn 7% annually.\nBoth stop at 65.\n\nPerson A: $113,000\nPerson B: $52,000\n\nSame contribution. Same return rate. $61,000 gap — from one decade.\n\nCompounding doesn't care about your excuses for waiting. It only cares about time.\n\nIf you've been saying you'll 'start soon' — here's the two-option breakdown for exactly where to start, whether you have $5 or $5,000:\n\n[link in comments]", "What stopped you from starting earlier? (be honest — I'll go first in comments)"],
  [2, "Story Hook", "Finance Tips & Tricks,Investing for Beginners", "Financial", "For three years I told myself I'd start investing 'when I had more money.'\n\nI was waiting for a $1,000 minimum that I never seemed to hit between rent and car payments.\n\nThen I found out you could start with $5. Not a watered-down account. Actual fractional shares of real companies, with the same dividends and returns as someone who put in $5,000.\n\nI've been auto-investing $50/month for 14 months now. The account is worth more than I put in. And I don't think about it — it's automatic.\n\nThe full breakdown of how to start (and the expert stock picks service I added later) is here:\n\n[link in comments]", "What's your current situation — not started yet, just started, or been at it a while?"],

  // Content ID 3 — Life insurance
  [3, "Stat Hook", "Family Finance & Planning,Finance Tips & Tricks", "Financial", "Term life insurance at 30: $15–20/month for $500,000 in coverage.\n\nNo doctor visit. Online application. Same-day approval for most people.\n\nThe most common reason people don't have it is they assume it costs hundreds per month.\n\nIt doesn't.\n\nThe other reason is the doctor visit. Which no longer exists for most buyers under 50.\n\nThe actual cost breakdown by age, how the online process works, and which provider has adjustable coverage as your needs change:\n\n[link in comments]", "How much do you think life insurance costs per month? (genuine question — the answer surprises most people)"],
  [3, "Story Hook", "Family Finance & Planning,Finance Tips & Tricks", "Financial", "I always thought life insurance was something you got from an agent who came to your house with a briefcase.\n\nWhen I finally looked into it last year (two kids, new mortgage), I found out:\n• You can apply entirely online\n• No blood draw, no doctor visit\n• Approval in hours, not weeks\n• $500,000 coverage costs less than my gym membership\n\nI was 34. Monthly cost: $22.\n\nIf you have dependents and you've been putting this off the same way I did — here's the full breakdown of how online term life works:\n\n[link in comments]", "Do you have life insurance? If not — what's held you back?"],

  // Content ID 4 — Pine.ca mortgage
  [4, "Stat Hook", "Smart Money Canada,First-Time Home Buyers Canada", "Financial — Canada", "When I renewed my mortgage, the bank offered me 5.49%.\n\nI didn't know that rate was negotiable — or that a different kind of lender existed entirely.\n\nPine.ca came in at 4.89%. On a $600,000 mortgage over 5 years, that 0.6% difference costs $18,000 more with the bank.\n\nPine is federally regulated. FSRA licensed. The difference is they have no branches — no 3,000 locations with staff and commercial leases to pay for. They pass those savings to the borrower.\n\nFull comparison of what major bank rates vs Pine actually look like, and how the 20-minute application works:\n\n[link in comments]", "Who's renewing a mortgage in the next 12 months? Drop 🏡 — sharing this directly to you"],
  [4, "Story Hook", "Smart Money Canada,First-Time Home Buyers Canada", "Financial — Canada", "The bank rep slid a mortgage rate sheet across the table like it was a fixed fact of nature.\n\n5.49%. 5-year fixed. Take it or leave it.\n\nI signed because I didn't know any better.\n\nThis year when I came up for renewal I actually did my research. Found out about digital mortgage lenders — federally regulated, FSRA licensed, no branches, lower overhead.\n\nGot quoted 4.89%. On a $600K mortgage that gap is $18,000 over the term.\n\nIf you're renewing in the next 12 months — or buying — this breakdown of Pine.ca vs the major banks is worth 8 minutes:\n\n[link in comments]", "Are you team 'stay with your bank at renewal' or team 'always shop around'?"],

  // Content ID 5 — Bad credit loans Canada
  [5, "Stat Hook", "Smart Money Canada,Personal Finance Canada", "Financial — Canada", "Canadian major banks cut off loan applicants at a 650 credit score.\n\nThat's not the only cutoff that exists.\n\nAlternative lenders — regulated, not predatory — start at 560, using income and employment stability rather than score alone.\n\nAnd you can see what they'll actually offer you via a soft pull. No hard inquiry. No score impact.\n\nFor anyone who's been rejected and is wondering what the real options are:\n\n[link in comments]", "Has anyone been through this? What was your experience getting a loan with less-than-perfect credit in Canada?"],
  [5, "Story Hook", "Smart Money Canada,Personal Finance Canada", "Financial — Canada", "Three rejections. RBC. TD. Then a credit union I thought would be more flexible.\n\nCredit score: 571. Employment: stable for 3 years. Income: $58,000.\n\nEvery letter said the same thing: 'does not meet minimum credit requirements.'\n\nWhat I found out later is that banks have one cutoff. Alternative lenders have different underwriting criteria. Income matters more. Employment stability matters more. Banking history matters.\n\nI got matched to a lender within 24 hours of submitting a soft-pull application. No score impact to check. Funded in 48 hours.\n\nFor anyone stuck at the same wall — the full breakdown of how alternative lending works in Canada:\n\n[link in comments]", "How many people here have been rejected by a major bank? Let me know in comments — you're not alone in this"],

  // Content ID 6 — GLP-1 price comparison
  [6, "Stat Hook", "GLP-1 Weight Loss Support & Reviews,Women's Weight Loss 40+", "Health & Wellness", "Ozempic (semaglutide): $1,049/month at the pharmacy.\nCompounded semaglutide from a telehealth provider: $149/month.\n\nSame active ingredient. Different manufacturing and distribution model.\n\nThe FDA allows compounding pharmacies to produce semaglutide under specific conditions. Telehealth providers that work with licensed 503B compounding facilities are operating legally.\n\nWe priced out 7 providers — cost, physician oversight model, titration protocol, cancellation terms. Here's the comparison:\n\n[link in comments]", "Has anyone gone the compounded semaglutide route? What's your experience been?"],
  [6, "Story Hook", "GLP-1 Weight Loss Support & Reviews,Women's Weight Loss 40+", "Health & Wellness", "I paid $935 for my first month of Wegovy.\n\nMy insurance covered exactly $0 of it. The prior authorization was denied twice.\n\nA friend mentioned she was on a compounded semaglutide program for $149/month. I didn't believe her. Same active ingredient? Same clinical protocols? Under $200?\n\nI looked into it. It's legitimate — licensed physicians, licensed compounding pharmacies, the same dosing titration. The difference is no brand licensing fees, no patent markup, no pharmacy retail margin.\n\nI switched 4 months ago. Down 19 lbs. Still going.\n\nFor anyone priced out of brand-name GLP-1 — here's the full breakdown of providers, prices, and what to actually check before signing up:\n\n[link in comments]", "Who else has navigated the GLP-1 cost situation? Share your experience 👇"],

  // Content ID 7 — Nielsen Pulse
  [7, "Stat Hook", "Make Money From Home 2026,Side Hustle & Passive Income", "Side Income", "Nielsen — the company that invented TV ratings in 1923 — will pay you $25–50/month to install an app on your phone.\n\nThe app runs in the background. You never open it. You never fill out surveys. You never watch ads.\n\nThey pay for access to anonymous usage data. That's the entire transaction.\n\nIf you have a smartphone, you qualify. Here's how the payout works and how to sign up:\n\n[link in comments]", "Drop 📱 if you've heard of this, 🤷 if this is new to you"],
  [7, "Story Hook", "Make Money From Home 2026,Side Hustle & Passive Income", "Side Income", "I make $612 a year from an app I never open.\n\nI installed Nielsen Pulse 14 months ago after reading about it. Forgot it existed. Got a notification 3 weeks later that my first payment was ready.\n\nSince then: $50.something every month, paid to PayPal. No surveys. No tasks. No watching ads. The app runs in the background collecting anonymous usage data — that's all they want.\n\nI told my sister. She installed it on her phone and her husband's phone. They make $100/month combined for doing nothing.\n\nIf this sounds too good to be true — here's the full review including the fine print and why Nielsen pays for this:\n\n[link in comments]", "Be honest — who's already doing this?"],

  // Content ID 8 — Roblox lawsuit
  [8, "Stat Hook", "Parenting Online Safety 2026,Parents of Teens & Tweens", "Legal / Parenting", "Roblox has been named in 10,000+ lawsuits alleging the platform exposed children to predatory adults, scams, sexual content, and addictive design patterns — and that the company knew.\n\nIf your child (under 18) used Roblox and experienced any of these, your family may be entitled to compensation. Claims may range from $10,000–$150,000 per child.\n\nCase evaluation is free. No attorney needed upfront. If there's no recovery, there's no fee.\n\nHow to check if your family qualifies:\n\n[link in comments]", "How many parents here knew about these lawsuits? Sharing because most families who qualify have no idea"],
  [8, "Story Hook", "Parenting Online Safety 2026,Parents of Teens & Tweens", "Legal / Parenting", "My son was 9 when he started playing Roblox.\n\nBy 11 he'd been contacted by multiple adults asking for his home address and 'private' conversations. One sent explicit content.\n\nI reported it to Roblox. Got an automated response. Nothing changed.\n\nI found out 6 months ago that we may have a legal claim — along with tens of thousands of other families. The lawsuits allege Roblox was aware of these risks and designed the platform in ways that made children more vulnerable.\n\nIf your child experienced anything similar on Roblox — predatory contact, scams, inappropriate content, or obsessive use — here's what you need to know:\n\n[link in comments]", "How many parents have had to deal with something like this on Roblox? You're not alone. Share this if you know someone with kids who plays it."],

  // Content ID 9 — Power backup
  [9, "Stat Hook", "Home Emergency Prep,Prepping & Self-Reliance", "Home & Emergency", "Gas generators kill approximately 400 people per year in the United States from carbon monoxide poisoning.\n\nAlmost every case is someone running a generator in a space that wasn't fully open — a garage with the door cracked, a covered porch, too close to a window.\n\nA solar generator produces zero emissions. Runs indoors. Silent. Recharges from the sun.\n\nAt 2,500W, the Patriot Power 2500X runs a full-size fridge, CPAP machine, portable heater, and all your device charging simultaneously.\n\nHonest breakdown of what it will and won't power — and whether your situation calls for solar or gas:\n\n[link in comments]", "Who here has been through a multi-day power outage? What was your setup?"],
  [9, "Story Hook", "Home Emergency Prep,Prepping & Self-Reliance", "Home & Emergency", "Four days without power. Two kids under 7. An ice storm that knocked out three transmission lines.\n\nI had a gas generator in the garage. I couldn't run it inside. Couldn't store enough fuel. The neighbors could hear it from two blocks away at 2am.\n\nI sold it the following spring.\n\nSwitched to a solar generator — the 4Patriots Patriot Power 2500X. 2,500W. Runs the fridge, the heater, the CPAP, and every phone in the house simultaneously. Silent. No exhaust. Charges from wall OR solar panels.\n\nIf we lose power again, I'm not worried.\n\nFor anyone in a storm-prone area or who's been through what I went through — the honest review of what solar generators can and can't do:\n\n[link in comments]", "Who's already set up for multi-day outages? What's your backup power setup?"],

  // Content ID 10 — CCW permit
  [10, "Stat Hook", "2A & Self Defense Community,CCW & Firearms Training", "Legal / Self-Defense", "In 40+ states, the entire classroom portion of your CCW training is available online.\n\nThe process:\n1. Complete online course (3–5 hours, Country Wide Carry, recognized in 40+ states)\n2. Schedule range qualification if your state requires it\n3. Submit application to county sheriff or state agency\n4. Pass background check\n5. Receive permit\n\nMost eligible people who don't have a permit simply don't know where to start.\n\nFull state-by-state breakdown including timelines, costs, and which states require live fire:\n\n[link in comments]", "Constitutional carry or shall-issue permit — which camp are you in? And do you have your permit?"],
  [10, "Story Hook", "2A & Self Defense Community,CCW & Firearms Training", "Legal / Self-Defense", "I kept saying I'd get my CCW permit 'eventually.'\n\nEventually became 4 years of putting it off because I assumed it meant scheduling a full in-person class, taking a day off work, and dealing with a lot of bureaucracy.\n\nThen I actually looked into it.\n\nThe classroom portion is online. 3.5 hours. I did it on a Sunday. Submitted my application the following week. Had my permit 6 weeks later.\n\nThe total cost was $185: $95 for the online course, $90 for my state's application fee.\n\nIf you've been meaning to do this — here's the exact process, broken down by state:\n\n[link in comments]", "How long did your CCW process take? For those who haven't started — what's holding you back?"],

  // Content ID 11 — Identity protection
  [11, "Stat Hook", "Digital Privacy & Security,Smart Consumers 2026", "Privacy & Security", "Right now, your name, home address, phone number, employer, relatives, and approximate income are publicly listed on 47+ data broker websites.\n\nAnyone can look you up. Anyone can buy a detailed report.\n\nData brokers collect this legally. You can opt out — manually, from each site individually (40+ hours) — or use a service that does it automatically.\n\nHow to find what's out there on you and what to do about it:\n\n[link in comments]", "Google your own name + city. What comes up? Drop a comment — curious how many people have never actually checked"],
  [11, "Story Hook", "Digital Privacy & Security,Smart Consumers 2026", "Privacy & Security", "I googled myself two years ago out of curiosity.\n\nThird result: a page on Spokeo with my full name, home address, phone number, my husband's name, and a list of relatives going back two generations.\n\nAnyone could find it. Anyone had been able to find it for years.\n\nI spent the next three weekends opting out of every data broker I could find. I got through 31 of them before I gave up. Monitoring services have confirmed there are still 16+ sites with partial info.\n\nIf this is news to you — here's what to check first and how to start removing it:\n\n[link in comments]", "Who's already done this? Share what you found when you searched yourself 👇"],

  // Content ID 12 — Online therapy
  [12, "Stat Hook", "Mental Health Support Community,Anxiety & Depression Support", "Health & Wellness", "Average wait time to see a therapist in the US: 3–6 weeks.\nAverage cost of in-person therapy: $175–$300/session.\nAverage cost of BetterHelp: $65–$100/week.\nTime to first session: under a week.\n\nFor anxiety, depression, relationship issues, and stress, multiple peer-reviewed studies show comparable clinical outcomes between online and in-person therapy.\n\nWhen in-person is still the right call — and when it isn't:\n\n[link in comments]", "Has anyone here tried online therapy? Honest experiences welcome 👇"],
  [12, "Story Hook", "Mental Health Support Community,Anxiety & Depression Support", "Health & Wellness", "I waited 7 weeks to see a therapist in person.\n\nPaid $190 for the first session. Then scheduled weekly sessions at that rate — which lasted exactly 2 months before I quietly stopped going because the math wasn't working.\n\nA friend mentioned she was doing online therapy for $70/week and had started the same week she signed up.\n\nI was skeptical. I'd tried to Google whether it was 'as good' and gotten conflicting answers.\n\nHere's what I actually found when I dug into the research — when online and in-person produce comparable outcomes, and when they don't:\n\n[link in comments]", "What's your experience been — online therapy, in-person, or still trying to access either?"],

  // Content ID 13 — Tinnitus
  [13, "Stat Hook", "Tinnitus Support & Relief,Health After 50", "Health & Wellness", "50 million Americans have tinnitus.\n\nMost of them were told by their doctor: 'There's nothing we can do. Learn to live with it.'\n\nThat's not because doctors are dismissive. It's because the standard of care for tinnitus in conventional medicine is limited to sound therapy and CBT — both of which manage perception, not the underlying cause.\n\nThe research on auditory pathway support, neuroinflammation, and cochlear blood flow tells a more actionable story.\n\nFull breakdown of what the research actually supports:\n\n[link in comments]", "How long have you been dealing with tinnitus? And what have you tried?"],
  [13, "Story Hook", "Tinnitus Support & Relief,Health After 50", "Health & Wellness", "The ringing started after a concert in 2003.\n\nI'm 49 now. It never went away.\n\nFor the first 10 years I just lived with it. Saw two audiologists. Both told me 'there's no treatment, learn to habituate.'\n\nLast year I started actually reading the research instead of relying on the standard medical answer. The neuroscience around auditory pathway inflammation and cochlear blood flow is more advanced than what most ENTs are talking about.\n\nI'm not claiming a cure. But my experience with targeted supplementation has been meaningfully different from 20 years of habituation training.\n\nFor anyone who's been told to just live with it — here's what the research says:\n\n[link in comments]", "How many years have you been dealing with tinnitus? Drop the number below — I want to understand how long people are carrying this"],

  // Content ID 14 — Personal loans
  [14, "Stat Hook", "Finance Tips & Tricks,Smart Consumers 2026", "Financial", "A hard credit inquiry drops your score 5–10 points and stays on your report for 2 years.\n\nEvery time you apply to a lender directly, that's a hard pull.\n\nSmart borrowers use soft-pull loan matching platforms first — see real rates from multiple lenders, with zero score impact — and only trigger a hard pull when they're ready to accept an offer.\n\nHow the soft-pull process works and which platforms are worth using:\n\n[link in comments]", "Has anyone done the loan matching platform route? How did the rates compare to what your bank offered?"],
  [14, "Story Hook", "Finance Tips & Tricks,Smart Consumers 2026", "Financial", "I applied to my bank first. They ran a hard credit check. Offered me 18.9%.\n\nI said no thanks and applied to two other lenders. Both ran hard checks. One offered 16%. One declined.\n\nSo I'd burned 3 hard inquiries (15 points off my score) and still hadn't found a good rate.\n\nLater I found out there are loan platforms that let you see real rates from multiple lenders simultaneously — using a soft pull. No score impact. All the info upfront.\n\nWould have been the obvious starting point if I'd known:\n\n[link in comments]", "Who else learned this the hard way? Or are you already doing the soft-pull route?"],

  // Content ID 15 — Passive income apps
  [15, "Stat Hook", "Make Money From Home 2026,Side Hustle & Passive Income", "Side Income", "I tested 7 passive income apps for 90 days.\n\nTotal earned: $214.\n\nBreakdown:\n• Nielsen Pulse: $147\n• App #2: $28\n• Apps #3–7: $39 combined\n\nOne app accounted for 69% of my earnings. And it required zero ongoing effort after installation.\n\nFull 90-day results with each app's payout rate, withdrawal minimums, and whether the effort is worth it:\n\n[link in comments]", "Which passive income apps have you actually used? What's your real experience been?"],
  [15, "Story Hook", "Make Money From Home 2026,Side Hustle & Passive Income", "Side Income", "I spent three months testing every passive income app I could find.\n\nMost were a waste of time. The surveys take 20 minutes for $0.40. The cashback apps require you to change where you shop. The 'passive' ones require constant check-ins.\n\nTwo were different. One required 5 minutes to install and has paid me $50/month since. I haven't touched it.\n\nFor anyone who's downloaded a bunch of these apps and been disappointed — here's what I actually found after 90 days:\n\n[link in comments]", "Which of these apps have you tried? What was your experience — worth it or waste of time?"],

  // Content ID 16 — Men's energy/hormones
  [16, "Stat Hook", "Men's Health & Optimization,Men Over 35", "Health & Wellness", "After 35, men experience average annual declines in:\n• Growth hormone: 14% per decade\n• NAD+: ~1% per year\n• Testosterone: 1–2% per year\n\nStandard annual blood work checks testosterone. It often misses the rest.\n\nWhich is why 'your testosterone is normal' is compatible with feeling exhausted, foggy, and physically different than you did at 30.\n\nWhat a comprehensive male hormone panel actually checks — and how telehealth now delivers it:\n\n[link in comments]", "Who had their testosterone checked and came back 'normal' — but still felt off? Drop 🙋 in comments"],
  [16, "Story Hook", "Men's Health & Optimization,Men Over 35", "Health & Wellness", "I had my testosterone checked at 38. Came back 'normal.'\n\nDoctor said everything looked fine. Told me to get more sleep and exercise more.\n\nI was already doing both. Still felt like I was running at 60% of what I used to.\n\nLooked into it myself. Found out that testosterone is one of 6 hormonal markers that affect male energy and cognition after 35. The other 5 weren't on my panel.\n\nOrdered a comprehensive evaluation through a telehealth provider. Found specific deficiencies that a standard panel misses. Started a protocol.\n\nFor anyone who's been told 'your levels are fine' but doesn't feel fine:\n\n[link in comments]", "Men over 35 — what's your honest experience with energy levels and whether doctors took it seriously?"],

  // Content ID 17 — NordPass
  [17, "Stat Hook", "Digital Privacy & Security,Tech Tips & Tricks", "Privacy & Security", "Chrome's built-in password saver works by syncing your passwords to Google's servers.\n\nGoogle's systems have been targeted in 3 major credential breach disclosures in the last 4 years.\n\nA dedicated password manager using zero-knowledge encryption means the company literally cannot see your passwords. Only you can decrypt them. If they're breached, your passwords are useless to attackers.\n\nChrome vs 1Password vs NordPass — architecture, security track record, and cost:\n\n[link in comments]", "Show of hands — who's still using the browser's built-in password saver?"],
  [17, "Story Hook", "Digital Privacy & Security,Tech Tips & Tricks", "Privacy & Security", "I used Chrome to save my passwords for 6 years.\n\nConvenient. Synced everywhere. Never had to think about it.\n\nThen I got a Google security alert telling me 14 of my saved passwords had appeared in data breaches. I needed to change them.\n\nI changed them. Back into Chrome. And then thought: if breached passwords keep ending up in Chrome, maybe Chrome isn't the answer.\n\nSwitched to NordPass. $2/month. Zero-knowledge encryption means even NordPass can't see my passwords. \n\nFull comparison of what actually separates these tools:\n\n[link in comments]", "Who's made the switch away from browser-saved passwords? What did you move to?"],

  // Content ID 18 — Cash back credit cards
  [18, "Stat Hook", "Finance Tips & Tricks,Smart Consumers 2026", "Financial", "The average American earns $487/year in cashback they never collect — because they're using the wrong card for their spending.\n\nA card that pays 3% on groceries is the wrong card if you spend $400/month on groceries and $600 on dining.\n\nA card optimized for your actual spending pattern can mean $200–$500 more per year. Sign-up bonuses alone are often $200–$750.\n\nHow to find your optimal card in 10 minutes:\n\n[link in comments]", "What cashback rate are you getting on your highest-spend category? Drop the number 👇"],
  [18, "Story Hook", "Finance Tips & Tricks,Smart Consumers 2026", "Financial", "I had the same credit card for 8 years.\n\nIt paid 1.5% on everything. I thought that was fine.\n\nLast year I actually ran the numbers on my spending. I spend $500/month on groceries and $400 on dining out. My card paid the same rate on both as it did on gas, Amazon, everything else.\n\nSwitched to a card with 3% on groceries and 3% on dining. The difference in my annual cashback statement: $432.\n\nFor the 8 years before that: approximately $3,400 in uncollected cashback.\n\nHow to find your optimal card based on your actual spending pattern:\n\n[link in comments]", "Have you ever actually run the numbers on your credit card rewards vs what you could be earning?"],

  // Content ID 19 — TrackFinance CA
  [19, "Stat Hook", "Smart Money Canada,First-Time Home Buyers Canada", "Financial — Canada", "1 in 5 Canadian credit reports contain errors serious enough to affect a mortgage or loan approval.\n\nCommon errors: duplicate accounts, balances showing higher than they are, debts that were settled but still listed as outstanding.\n\nYou're entitled to one free credit report per year from both Equifax Canada and TransUnion Canada.\n\nMost Canadians have never actually read theirs.\n\nHow to check and what to look for:\n\n[link in comments]", "Have you ever pulled your full Canadian credit report? Not just the score — the actual report?"],
  [19, "Story Hook", "Smart Money Canada,First-Time Home Buyers Canada", "Financial — Canada", "My mortgage application was flagged for a debt that had been paid off in 2019.\n\nThe settlement was recorded by the original creditor. But the credit bureau still showed it as outstanding. Four years later.\n\nA 30-minute dispute process removed it. My score went up 41 points. Mortgage was approved.\n\nIf I hadn't pulled my full credit report — not the score, the actual line-by-line report — I would have never caught it.\n\n1 in 5 Canadian credit reports have errors like this. For anyone buying, refinancing, or applying for anything in the next 12 months:\n\n[link in comments]", "Has anyone else caught an error on their Canadian credit report? Share what you found 👇"],

  // Content ID 20 — Flight delay
  [20, "Stat Hook", "Travel Hacks & Deals,Frequent Flyers Canada & US", "Travel", "EU261/2004 entitles you to €250–€600 per passenger for flights delayed 3+ hours, cancelled, or overbooked — if the flight departed from an EU airport, regardless of airline.\n\nClaims can be filed up to 6 years back in some jurisdictions.\n\nClaim services work on no-win-no-fee (typically 25% commission). If you don't win, you pay nothing.\n\nHow to check if any of your past flights qualify:\n\n[link in comments]", "Who has a flight delay claim they never filed? Drop the year it happened 👇 — you might still be eligible"],
  [20, "Story Hook", "Travel Hacks & Deals,Frequent Flyers Canada & US", "Travel", "My flight from London was delayed 5 hours in 2022.\n\nI missed a connection. Spent 9 hours in Heathrow. The airline gave me a £10 food voucher.\n\nI filed a claim last year on a whim.\n\nReceived €600 per passenger — €1,200 total for me and my partner.\n\nI didn't know EC Regulation 261/2004 existed. I didn't know claims could be filed years later. I didn't know no-win-no-fee claim services handled all of it.\n\nFor anyone who's had a flight delay in the last 6 years — here's how to check:\n\n[link in comments]", "Who else had no idea you could file flight delay claims years later? Share this with anyone who travels ✈️"],

  // Content ID 11-20 remaining abbreviated for space...
  // (already handled above in the full 40-row array)
];

const REDDIT = [
  [1, "r/personalfinance", "How much interest is your savings account actually earning?", "Not the posted rate — the actual dollar amount per year.\n\nI calculated mine last month. $18,000 sitting at a national bank, 0.01% APY = $1.80 for the year.\n\nMoved it to a high-yield account at 3.80%. Same FDIC insurance. Same access. Earned $684 in the following 12 months.\n\nI wrote a full breakdown of how it works and which accounts are worth it if useful: [link]\n\nCurious what everyone else's situation is — have most people here already made this switch?"],
  [2, "r/personalfinance", "Started investing at 35 instead of 25 — here's the real math on what that cost me", "I kept telling myself I'd start 'when I had more money.' Finally started at 35.\n\nRan the compound interest comparison last week. Same $100/month, same 7% return, to 65:\n- Start at 25: ~$113,000\n- Start at 35: ~$52,000\n\nThe 10-year delay cost $61,000 on a $100/month contribution. Not timing the market wrong. Just starting later.\n\nFor anyone in the same boat, I compared Stash (fractional shares, $5 minimum) vs Motley Fool Stock Advisor (research + stock picks, $99/year) since those were the two I looked at most seriously: [link]\n\nWhat did people here wish they'd known earlier?"],
  [3, "r/personalfinance", "Why do so many people not have life insurance? Genuine question — the numbers surprised me", "I thought it was expensive. I thought it required a doctor visit.\n\nFound out last year:\n- Age 30, healthy non-smoker: $15–20/month for $500K\n- Age 35: $20–25/month\n- Age 40: $30–40/month\n- No doctor visit for most buyers under 55 (accelerated underwriting replaced it)\n- Online approval, same day in most cases\n\nI'm not selling anything — genuinely trying to understand why more people with dependents don't have it when the numbers are this accessible. I wrote a breakdown of how the online process works: [link]\n\nAnyone have a reason I'm not accounting for?"],
  [4, "r/PersonalFinanceCanada", "Has anyone compared Pine.ca to their major bank renewal rate?", "Coming up for renewal in September. TD offered me 5.49% on my 5-year fixed.\n\nDid some research and Pine.ca came up as a federally regulated digital lender. Got a quote at 4.89%.\n\nOn $600K that gap is $18,000 over the term. Seems significant. But I don't know anyone who's actually used them.\n\nAnyone here done this comparison? What was your experience with a digital lender vs your existing bank?\n\nI wrote up the full comparison of how Pine works if helpful: [link]"],
  [5, "r/PersonalFinanceCanada", "Getting a loan in Canada with a 571 credit score — what actually exists?", "Three bank rejections in the last 3 months. RBC, TD, and a credit union.\n\nAll cite 'does not meet minimum credit requirements.' No further detail.\n\nI have stable employment (3 years same employer), $58K income, no missed rent payments in 4 years. Just carrying a high balance from a medical emergency that tanked my score.\n\nIs there anything legitimate available for people in this range in Canada? Not payday loans.\n\nAfter a lot of research I found Credit Resources CA — matches you with alternative lenders using a soft pull. Got funded at 28.9% which isn't great but was workable. Wrote up how it works: [link]\n\nOpen to other options if anyone has better suggestions."],
  [6, "r/Ozempic", "Priced out of Wegovy — what are people doing?", "Insurance denied my prior auth twice. Cash price at my pharmacy: $935 for 4 weeks.\n\nI've seen compounded semaglutide mentioned in this community but I have questions about the legitimacy — are these FDA-regulated? What's the difference between 503A and 503B compounding pharmacies? Are the clinical protocols the same?\n\nDid a lot of research on this. The short answer is: telehealth providers using 503B compounding facilities are operating within FDA guidelines, with licensed physicians prescribing. The price difference ($149–$249/month vs $935+) comes from no brand licensing fees, not from different ingredients.\n\nI compared 7 providers on price, physician oversight, and cancellation terms: [link]\n\nHappy to answer questions — went through this whole decision recently."],
  [7, "r/beermoney", "Nielsen Pulse — anyone else doing this? My 90-day update", "$147 over 90 days from Nielsen Pulse alone. Did nothing after installing.\n\nFor context: I also ran Swagbucks ($22), InboxDollars ($11), and a few others. Total across all apps: $214 for the quarter.\n\nNielsen was 69% of earnings for 0% of ongoing effort. The others required surveys, shopping through portals, and active engagement.\n\nFull breakdown of each app's real payout vs time required, if useful: [link]\n\nWhat's everyone else's experience been?"],
  [8, "r/Parenting", "Roblox lawsuit update — more families are qualifying than most know", "Saw a few threads about Roblox here but wanted to share an update on where the litigation stands.\n\nThe lawsuits allege Roblox knowingly failed to protect minors from predatory contact, sexual content, scams, and addictive design patterns. There are now 10,000+ filed claims.\n\nEligibility is broader than most think — your child doesn't need to have been injured. Exposure to predatory contact, receiving inappropriate content, or experiencing scam-based item theft may qualify.\n\nCase evaluations are free. No attorney fees unless there's a recovery.\n\nFull breakdown of what the cases allege, who qualifies, and how to check: [link]\n\nSharing because most parents I've talked to who qualify have no idea they do."],
  [9, "r/preppers", "Honest review: solar generator vs gas generator after a 4-day outage", "Went through a 4-day outage in February after an ice storm. Had a gas generator.\n\nProblems: couldn't run it inside (CO risk), burned 14 gallons/day, neighbors could hear it at 2am, gas stations were closed for 2 of the 4 days.\n\nSwitched to a 4Patriots Patriot Power 2500X solar generator afterward. Ran it for our first planned power test last month — 3 days, ran fridge, CPAP, space heater, and all charging.\n\nHonest limitation: can't run central AC. Wouldn't attempt electric range. For whole-house loads you still need gas.\n\nFull breakdown of what 2500W actually powers and what it doesn't — plus the CO poisoning stats that made me stop using gas indoors: [link]\n\nHappy to answer questions if anyone's in the research phase."],
  [10, "r/CCW", "Finally got my permit — here's what the process actually looked like", "Kept putting it off because I assumed it was complicated. Here's what it actually was:\n\nState: [redacted for privacy]\nRequired: online course + live fire qualification\nCourse: Country Wide Carry online — 3.5 hours, completed on a Sunday\nRange qualification: scheduled at local range for $65, took 2 hours\nApplication: submitted to county sheriff with certificate + ID\nTimeline: application to permit in 6 weeks\nTotal cost: $185\n\nThe live fire component is where people get tripped up — you can't skip it in states that require it, and online courses are clear about this upfront.\n\nFull state-by-state breakdown including which states require range qualification and which don't: [link]\n\nFor anyone who's been putting it off — it really isn't complicated."],
  [11, "r/privacy", "Checked how many data broker sites have my info — the number is disturbing", "Started with a Google search of my own name + city.\n\nFound my home address, phone number, employer, estimated income, relatives, and previous addresses on:\n- Spokeo\n- WhitePages\n- BeenVerified\n- Intelius\n- PeopleFinder\n- 42 others (I counted)\n\nWent through the manual opt-out process for 2 weekends. Got through ~28 sites before running out of time. Sites sometimes re-add you after a few months.\n\nThe faster approach is a removal service that handles the opt-outs ongoing. Full breakdown of the manual vs service-based approach: [link]\n\nAnyone here done this? Worth knowing what's out there."],
  [12, "r/mentalhealth", "Online vs in-person therapy — my honest comparison after trying both", "Started with in-person 18 months ago. $190/session. 3-week wait for first appointment.\n\nSwitched to BetterHelp 10 months ago. $75/week. Started same week I signed up.\n\nOutcome comparison (just my experience): the quality of the therapeutic relationship is comparable. The convenience difference is significant — no commute, flexible scheduling, asynchronous messaging between sessions.\n\nWhen I'd go back to in-person: if I needed a diagnosis, medication evaluation, or trauma processing with somatic components. The research supports in-person for more complex presentations.\n\nFull breakdown of when each is the better fit, and what the peer-reviewed outcomes data actually says: [link]\n\nCurious what others' experiences have been."],
  [13, "r/tinnitus", "What's actually helped anyone here — real answers only", "5 years with tinnitus. 2 audiologists. Both said 'habituate.'\n\nI've tried: white noise, sound masking, CBT approach, reducing caffeine, reducing salt. Volume is unchanged.\n\nStarted reading the actual research on auditory pathway neuroinflammation and cochlear blood flow because I couldn't get answers elsewhere. More actionable than what I'd heard from doctors.\n\nWrote up what I found — not claiming a cure, but there are targeted approaches the research supports that aren't white noise machines: [link]\n\nGenuinely curious what's moved the needle for anyone here."],
  [14, "r/personalfinance", "Don't apply for loans directly — use a soft-pull aggregator first", "Made this mistake. Applied to my bank first. Hard pull. 18.9% offer.\n\nApplied to 2 others. Hard pull each time. 3 hard inquiries = ~15 points off my score.\n\nFound out afterward that soft-pull loan matching platforms exist. You enter your info once, get real rate offers from multiple lenders simultaneously, with zero credit score impact. Only when you choose to proceed with a specific lender does a hard pull happen.\n\nShould have been my starting point. Breakdown of how these platforms work and which ones are worth using: [link]\n\nHope this saves someone else the same discovery process."],
  [15, "r/passive_income", "90-day test of 7 passive income apps — actual results", "Not estimates. Not projections. What I actually got paid:\n\nNielsen Pulse: $147 (0 minutes of active effort)\nApp B: $28 (low effort)\nApp C: $19 (moderate effort)\nApps D–G: $20 combined (variable effort)\n\nTotal: $214/quarter or roughly $70/month across all apps.\n\nNielsen was the only truly passive one. The others all required some recurring action.\n\nFull 90-day breakdown with withdrawal minimums and honest assessment of whether the time investment is worth it: [link]\n\nHappy to answer questions about any specific app."],
  [16, "r/Testosterone", "Testosterone came back normal — still felt terrible at 38. What the full workup found", "Annual physical. Testosterone panel. 'Levels are fine, everything looks good.'\n\nStill: low energy, brain fog, slower recovery, body composition changes. 2 years of this.\n\nOrdered a comprehensive male hormone evaluation through telehealth. Found:\n- Growth hormone significantly below range for age\n- NAD+ deficiency (not on standard panels)\n- Cortisol pattern that explained the fatigue timing\n\nNone of this was on my standard annual bloodwork.\n\nFull breakdown of what a comprehensive male hormone panel includes vs what standard panels actually check: [link]\n\nFor anyone who's been told their levels are 'normal' but doesn't feel normal — this might be worth reading."],
  [17, "r/privacy", "Stop using your browser to save passwords — the architecture is different from what you probably think", "Chrome saves your passwords by syncing them to Google's servers. Not just locally on your device.\n\nGoogle's systems are a major breach target. They've appeared in 3 credential breach disclosures in 4 years.\n\nA dedicated password manager using zero-knowledge encryption means the company cannot access your passwords. The encryption/decryption happens locally. If their servers are breached, attackers get encrypted data that's useless without your master password.\n\nChrome vs NordPass vs 1Password — architecture comparison and actual security track record: [link]\n\nNot saying you need to switch immediately — just that the security model is meaningfully different."],
  [18, "r/personalfinance", "Running the numbers on my wrong credit card — the math was embarrassing", "Had the same 1.5% flat cashback card for 8 years.\n\nLast year actually calculated my spending by category:\n- Groceries: $500/month\n- Dining: $400/month\n- Gas: $200/month\n- Other: $300/month\n\n1.5% on all of it: ~$270/year in cashback\n\nSwitched to a card with 3% groceries, 3% dining, 2% gas: ~$510/year.\n\n$240/year difference from picking the right card. Plus $250 sign-up bonus first year.\n\nFor 8 years I was leaving approximately $240/year on the table. $1,920 in uncollected rewards.\n\nHow to run this calculation for your own spending: [link]"],
  [19, "r/PersonalFinanceCanada", "Found an error on my credit report that was blocking my mortgage — here's how to check yours", "My mortgage application was flagged for a debt that had been settled in 2019.\n\nThe creditor recorded it. But TransUnion still showed it as outstanding 4 years later.\n\n30-minute dispute. Error removed. Score up 41 points. Application approved.\n\nStats: 1 in 5 Canadian credit reports contain errors significant enough to affect credit decisions. Most people have never pulled their full report — just the score.\n\nHow to pull your free Equifax and TransUnion reports and what to actually check: [link]\n\nAnyone else caught something like this?"],
  [20, "r/travel", "Filed a flight delay claim 2 years after the flight — received €1,200. Here's how", "Delayed 5 hours from London in 2022. Airline gave me a £10 food voucher.\n\nFiled a claim through Compensair last year on a whim. Received €600 per passenger (my partner and I) = €1,200 total.\n\nEC Regulation 261/2004 applies to flights departing EU airports, regardless of airline or destination. Claims can be filed up to 6 years back in some jurisdictions.\n\nNo-win-no-fee: Compensair takes 25% commission. They handle all communication with the airline. I uploaded my boarding pass and that was the last thing I did for 6 weeks.\n\nHow to check if any of your past flights qualify: [link]"],
];

// ─── MAIN FUNCTION ───────────────────────────────────────────────────────────

function createPromoSheet() {
  const ss = SpreadsheetApp.create("Verto Content Promotion Hub");
  const id = ss.getId();

  buildContentHub(ss);
  buildPinterest(ss);
  buildFacebook(ss);
  buildReddit(ss);
  buildTracker(ss);

  // Remove default blank Sheet1
  const blank = ss.getSheetByName("Sheet1");
  if (blank) ss.deleteSheet(blank);

  // Log the URL
  Logger.log("✅ Sheet created: https://docs.google.com/spreadsheets/d/" + id);
  Browser.msgBox("✅ Done! Open your Google Drive to find 'Verto Content Promotion Hub'\n\nhttps://docs.google.com/spreadsheets/d/" + id);
}

// ─── TAB 1: CONTENT HUB ──────────────────────────────────────────────────────

function buildContentHub(ss) {
  const sh = ss.insertSheet("📋 Content Hub");

  // Header
  const headers = ["#", "Title", "Category", "Offer / EPC", "Audience", "Hook (1 line)", "Article URL", "Problem Page URL", "Pinterest Board", "Top Subreddits", "Status"];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);

  const headerRange = sh.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#1a1a2e").setFontColor("#ffffff").setFontWeight("bold").setFontSize(11);

  // Data rows
  const rows = CONTENT.map(c => [
    c.id,
    c.title,
    c.category,
    c.offer + "\nEPC: " + c.epc,
    c.audience,
    c.hook,
    c.url,
    c.problemUrl,
    c.board,
    c.subreddits.join(", "),
    "🔴 Not Started"
  ]);

  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);

  // Alternating row colors
  for (let i = 0; i < rows.length; i++) {
    sh.getRange(i + 2, 1, 1, headers.length).setBackground(i % 2 === 0 ? "#f8f9fa" : "#ffffff");
  }

  // Status validation
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["🔴 Not Started", "🟡 In Progress", "🟢 Published", "⏸ Paused"], true)
    .build();
  sh.getRange(2, 11, rows.length, 1).setDataValidation(statusRule);

  // Column widths
  sh.setColumnWidth(1, 40);
  sh.setColumnWidth(2, 340);
  sh.setColumnWidth(3, 130);
  sh.setColumnWidth(4, 160);
  sh.setColumnWidth(5, 200);
  sh.setColumnWidth(6, 280);
  sh.setColumnWidth(7, 340);
  sh.setColumnWidth(8, 280);
  sh.setColumnWidth(9, 170);
  sh.setColumnWidth(10, 200);
  sh.setColumnWidth(11, 130);

  sh.setRowHeights(2, rows.length, 60);
  sh.setFrozenRows(1);
  sh.setFrozenColumns(2);
  sh.getRange(2, 2, rows.length, 1).setFontWeight("bold");
  sh.getRange("A1:K1").setHorizontalAlignment("center");
}

// ─── TAB 2: PINTEREST ────────────────────────────────────────────────────────

function buildPinterest(ss) {
  const sh = ss.insertSheet("📌 Pinterest");

  const headers = ["Content #", "Pin Format", "Pin Title (100 chars max)", "Pin Description (500 chars max)", "Board", "Image Note", "Scheduled Date", "Status"];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  sh.getRange(1, 1, 1, headers.length).setBackground("#e60023").setFontColor("#ffffff").setFontWeight("bold").setFontSize(11);

  const rows = PINTEREST.map(p => [
    "#" + p[0],
    p[1],
    p[2],
    p[3],
    p[4],
    p[1] === "Stat Card" ? "Dark bg, large white number, stat in center" :
    p[1] === "Question Hook" ? "Bold question top, answer teased, green CTA arrow" :
    "Numbered list format, clean sans-serif, light background",
    "",
    "🔴 Not Made"
  ]);

  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);

  // Alternating colors + row height
  for (let i = 0; i < rows.length; i++) {
    const rowBg = i % 6 < 3 ? (i % 2 === 0 ? "#fff5f5" : "#ffffff") : (i % 2 === 0 ? "#f5f5f5" : "#ffffff");
    sh.getRange(i + 2, 1, 1, headers.length).setBackground(rowBg);
  }

  sh.setColumnWidth(1, 80);
  sh.setColumnWidth(2, 120);
  sh.setColumnWidth(3, 280);
  sh.setColumnWidth(4, 420);
  sh.setColumnWidth(5, 180);
  sh.setColumnWidth(6, 230);
  sh.setColumnWidth(7, 130);
  sh.setColumnWidth(8, 130);

  // Status validation
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["🔴 Not Made", "🟡 In Design", "🟠 Ready to Post", "🟢 Posted"], true)
    .build();
  sh.getRange(2, 8, rows.length, 1).setDataValidation(statusRule);

  sh.setRowHeights(2, rows.length, 90);
  sh.setFrozenRows(1);
  sh.getRange(2, 4, rows.length, 1).setWrap(true);
  sh.getRange(2, 3, rows.length, 1).setWrap(true);
}

// ─── TAB 3: FACEBOOK ─────────────────────────────────────────────────────────

function buildFacebook(ss) {
  const sh = ss.insertSheet("📘 Facebook");

  const headers = ["Content #", "Angle", "Target Groups", "Category", "Post Copy", "Engagement Hook (comment)", "Link in Comment?", "Scheduled Date", "Status"];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  sh.getRange(1, 1, 1, headers.length).setBackground("#1877f2").setFontColor("#ffffff").setFontWeight("bold").setFontSize(11);

  const rows = FACEBOOK.map(f => [
    "#" + f[0],
    f[1],
    f[2],
    f[3],
    f[4],
    f[5],
    "YES — drop link in first comment, not in post body",
    "",
    "🔴 Not Drafted"
  ]);

  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);

  for (let i = 0; i < rows.length; i++) {
    sh.getRange(i + 2, 1, 1, headers.length).setBackground(i % 4 < 2 ? (i % 2 === 0 ? "#f0f4ff" : "#ffffff") : (i % 2 === 0 ? "#f5f5f5" : "#ffffff"));
  }

  sh.setColumnWidth(1, 80);
  sh.setColumnWidth(2, 110);
  sh.setColumnWidth(3, 220);
  sh.setColumnWidth(4, 130);
  sh.setColumnWidth(5, 480);
  sh.setColumnWidth(6, 260);
  sh.setColumnWidth(7, 200);
  sh.setColumnWidth(8, 130);
  sh.setColumnWidth(9, 130);

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["🔴 Not Drafted", "🟡 Ready to Post", "🟢 Posted", "📊 Tracking"], true)
    .build();
  sh.getRange(2, 9, rows.length, 1).setDataValidation(statusRule);

  sh.setRowHeights(2, rows.length, 160);
  sh.setFrozenRows(1);
  sh.getRange(2, 5, rows.length, 1).setWrap(true);
  sh.getRange(2, 6, rows.length, 1).setWrap(true);
}

// ─── TAB 4: REDDIT ───────────────────────────────────────────────────────────

function buildReddit(ss) {
  const sh = ss.insertSheet("🤖 Reddit");

  const headers = ["Content #", "Subreddit", "Post Title", "Full Comment / Post Body", "Post Type", "Best Time to Post", "Upvotes", "Clicks (est)", "Status"];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  sh.getRange(1, 1, 1, headers.length).setBackground("#ff4500").setFontColor("#ffffff").setFontWeight("bold").setFontSize(11);

  const rows = REDDIT.map(r => [
    "#" + r[0],
    r[1],
    r[2],
    r[3],
    "Comment on existing thread OR new post (check subreddit rules first)",
    "Tue–Thu, 9–11am EST or 7–9pm EST",
    "",
    "",
    "🔴 Not Posted"
  ]);

  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);

  for (let i = 0; i < rows.length; i++) {
    sh.getRange(i + 2, 1, 1, headers.length).setBackground(i % 2 === 0 ? "#fff8f5" : "#ffffff");
  }

  sh.setColumnWidth(1, 80);
  sh.setColumnWidth(2, 200);
  sh.setColumnWidth(3, 340);
  sh.setColumnWidth(4, 520);
  sh.setColumnWidth(5, 200);
  sh.setColumnWidth(6, 180);
  sh.setColumnWidth(7, 90);
  sh.setColumnWidth(8, 90);
  sh.setColumnWidth(9, 130);

  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["🔴 Not Posted", "🟡 Drafted", "🟢 Posted", "📊 Monitoring", "❌ Removed"], true)
    .build();
  sh.getRange(2, 9, rows.length, 1).setDataValidation(statusRule);

  sh.setRowHeights(2, rows.length, 180);
  sh.setFrozenRows(1);
  sh.getRange(2, 4, rows.length, 1).setWrap(true);
  sh.getRange(2, 3, rows.length, 1).setWrap(true);
}

// ─── TAB 5: STATUS TRACKER ───────────────────────────────────────────────────

function buildTracker(ss) {
  const sh = ss.insertSheet("📊 Tracker");

  // Title row
  sh.getRange(1, 1, 1, 9).merge();
  sh.getRange(1, 1).setValue("VERTO CONTENT PROMOTION TRACKER — TOP 20 PIECES").setFontWeight("bold").setFontSize(14).setBackground("#1a1a2e").setFontColor("#ffffff").setHorizontalAlignment("center");

  // Headers
  const headers = ["#", "Content Title", "EPC", "Pinterest\n(3 pins)", "Facebook\n(2 posts)", "Reddit\n(1 post)", "Live URL", "Sessions\n(GA4)", "Revenue\n($)"];
  sh.getRange(2, 1, 1, headers.length).setValues([headers]);
  sh.getRange(2, 1, 1, headers.length).setBackground("#2d2d44").setFontColor("#ffffff").setFontWeight("bold").setFontSize(10).setHorizontalAlignment("center").setWrap(true);

  const rows = CONTENT.map(c => [
    c.id,
    c.title,
    c.epc,
    "⬜⬜⬜",
    "⬜⬜",
    "⬜",
    c.url,
    "",
    ""
  ]);

  sh.getRange(3, 1, rows.length, headers.length).setValues(rows);

  for (let i = 0; i < rows.length; i++) {
    sh.getRange(i + 3, 1, 1, headers.length).setBackground(i % 2 === 0 ? "#f8f9fa" : "#ffffff");
  }

  // Column widths
  sh.setColumnWidth(1, 40);
  sh.setColumnWidth(2, 360);
  sh.setColumnWidth(3, 70);
  sh.setColumnWidth(4, 90);
  sh.setColumnWidth(5, 90);
  sh.setColumnWidth(6, 80);
  sh.setColumnWidth(7, 340);
  sh.setColumnWidth(8, 90);
  sh.setColumnWidth(9, 90);

  sh.setRowHeight(1, 40);
  sh.setRowHeight(2, 50);
  sh.setRowHeights(3, rows.length, 45);
  sh.setFrozenRows(2);
  sh.setFrozenColumns(2);

  // Bold EPC column
  sh.getRange(3, 3, rows.length, 1).setHorizontalAlignment("center").setFontWeight("bold");
  sh.getRange(3, 4, rows.length, 3).setHorizontalAlignment("center").setFontSize(14);

  // Notes row
  const noteRow = rows.length + 4;
  sh.getRange(noteRow, 1, 1, 9).merge();
  sh.getRange(noteRow, 1).setValue(
    "HOW TO USE THIS TRACKER:\n" +
    "• Pinterest: update ⬜⬜⬜ → ✅⬜⬜ → ✅✅⬜ → ✅✅✅ as pins are created and posted\n" +
    "• Facebook: update ⬜⬜ → ✅⬜ → ✅✅ as posts go live\n" +
    "• Reddit: update ⬜ → ✅ when posted\n" +
    "• Update Sessions and Revenue columns weekly from GA4\n" +
    "• GA4 approval triggers: 100 sessions for digestive-health ($4.28 EPC), 500 sessions for most pages"
  ).setBackground("#fffde7").setFontSize(10).setWrap(true);
  sh.setRowHeight(noteRow, 120);
}
