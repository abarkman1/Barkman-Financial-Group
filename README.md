# Barkman Financial Group — Website

Premium multi-page insurance website. Deploy to GitHub + Vercel.

## Pages
- `index.html` — Home (full hero, stats, coverage tabs, features, pricing, process, testimonials, CTA)
- `about.html` — About Us (story, values, carriers)
- `coverage.html` — Coverage Options (Medicare, Life, Final Expense, Supplemental)
- `why-coverage.html` — Why Coverage Matters (real scenarios, urgency)
- `faq.html` — FAQ (categorized accordion)
- `contact.html` — Contact / Quote Form
- `privacy.html` — Privacy Policy
- `terms.html` — Terms of Service

## Deploying to Vercel via GitHub

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your GitHub repo
4. Framework: **Other** (static HTML)
5. No build command needed
6. Deploy ✓

## Customizing
- Phone: Search `605-722-0000` and replace throughout
- Email: Search `info@barkmanfinancial.com` and replace
- Address: Search `1234 Oak Lane` and replace
- All text is editable — content is clearly written in plain HTML

## Structure
```
/
├── index.html
├── about.html
├── coverage.html
├── why-coverage.html
├── faq.html
├── contact.html
├── privacy.html
├── terms.html
├── vercel.json
├── css/
│   ├── shared.css    ← design system, nav, footer
│   └── home.css      ← home page specific styles
└── js/
    ├── layout.js     ← nav + footer HTML injection
    └── shared.js     ← cursor, scroll reveal, counters, tabs
```
