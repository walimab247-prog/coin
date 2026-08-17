# DOT Oracle Guide

An educational static website about Polkadot (DOT) and decentralized oracle infrastructure.
Neutral, compliance-focused content — not financial advice.

## Structure

- `/` — Home (hero, ecosystem intro, why oracles matter, use cases, risks, FAQ preview)
- `/how-it-works/` — Oracle networks explained: data feeds, verification, node operators, reliability
- `/use-cases/` — Fact-based oracle use cases with source references
- `/risks/` — Risks & Disclaimer
- `/faq/` — FAQ with accordion and FAQ schema (JSON-LD)
- `/news/` — News & analysis articles with sources, dates, author, and disclaimers
- `/about/` — Editorial mission, transparency statement, contact form
- `/privacy/`, `/terms/`, `/risk-disclosure/` — Legal pages
- `/assets/` — Shared CSS, JS, fonts, and images

## Local preview

Pages use root-absolute asset paths, so serve from the repository root:

```
python3 -m http.server 8080
```

Then open http://localhost:8080/.
