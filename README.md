<div align="center">

# Reviews_CXO

### AI Enterprise Sales Research Platform

Independent, evidence-based research on enterprise AI sales platforms for CTOs, CIOs, and procurement teams evaluating AI that connects CRM and ERP into real workflows.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#license)

[Live site](https://reviews-cxo.com) · [Rankings](https://reviews-cxo.com/rankings) · [Methodology](https://reviews-cxo.com/about/methodology)

</div>

---

## Overview

**Reviews_CXO** is a Next.js research platform that evaluates enterprise AI sales platforms using the proprietary **ASCS (AI Sales Capability Score)** framework — weighted dimensions, evidence-classified scoring, and analyst-written evaluations.

It is not a review aggregator or vendor marketing site. Content is curated for enterprise buyers who need architecture depth, realistic TCO context, and transparent methodology.

---

## Key Features

- **ASCS rankings and scorecards** — dimensional scoring with evidence classification, architecture profiles, pricing context, AI capability assessment, customer sentiment, and cited sources
- **Independent analyst evaluations** — editorial research narratives, not star-rating dumps
- **Enterprise Q&A** — buyer questions answered with ASCS-grounded recommendations
- **Published methodology** — full ASCS framework documentation and trust pages (editorial policy, disclosure, corrections)
- **Newsletter** — subscription and unsubscribe flows
- **Admin CMS** — token-protected moderation for research operations
- **Production polish** — dark/light theme, dynamic sitemap, JSON-LD, RSS, and LLM-oriented discovery

---

## ASCS Framework

**ASCS = AI Sales Capability Score**

Published platforms are scored on a **0–10** scale across weighted evaluation dimensions. Evidence is classified by tier so confidence is explicit, not implied.

| Dimension | Weight | Focus |
|---|---|---|
| ERP Connectivity | 10% | Native ERP integration depth |
| CRM Data Grounding | 8% | CRM ingestion, normalization, and reasoning |
| Cross-System Reasoning | 12% | Combined CRM + ERP + external source reasoning |
| AI Reasoning Quality | 12% | Accuracy, faithfulness, hallucination rate |
| Workflow Automation | 10% | End-to-end task completion |
| Agentic Capability | 10% | Multi-step planning, tool use, coordination |
| Data Accessibility & Openness | 8% | APIs, export, programmatic access |
| Security & Governance | 10% | Encryption, SSO/SAML, certifications, audit |
| Explainability & Transparency | 5% | Recommendation explainability and attribution |
| Deployment Flexibility | 5% | Cloud, on-prem, hybrid, VPC options |
| Integrations Ecosystem | 5% | Connectors and marketplace maturity |
| Market Adoption & Ecosystem | 5% | Customer base, community, analyst coverage |

**Scoring rubric**

| Score | Meaning |
|---|---|
| 0 | Not available / no evidence |
| 1–2 | Minimal / experimental / pre-release |
| 3–4 | Basic capability / limited documentation |
| 5–6 | Functional / documented / baseline enterprise fit |
| 7–8 | Strong / well-documented / differentiated |
| 9–10 | Industry-leading / best-in-class evidence |

Full methodology: [reviews-cxo.com/about/methodology](https://reviews-cxo.com/about/methodology) · source of truth in code: [`src/lib/site.ts`](src/lib/site.ts)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Database | SQLite via better-sqlite3 |
| Email | Resend (optional) |
| Auth | Custom admin token |
| Fonts | Inter + JetBrains Mono |
| Deploy | Vercel-oriented |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/MPK15KPK/Reviews_CXO.git
cd Reviews_CXO/reviews-cxo
npm install
```

### Environment

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `ADMIN_AUTH_TOKEN` | Yes (for admin) | Secure random admin token |
| `NEXT_PUBLIC_SITE_URL` | Yes for email links | Public site URL (local or production) |
| `RESEND_API_KEY` | No | Resend API key; emails are skipped if unset |

### Database

```bash
npm run db:init
```

Database file: `data/reviews-cxo.db` (WAL mode).

```bash
npm run db:reset
```

> On Windows PowerShell, delete `data/reviews-cxo.db` manually if `db:reset` fails, then run `npm run db:init`.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm run start
npm run lint
```

---

## Project Structure

```
reviews-cxo/
├── public/                 # Static assets, favicon, llms.txt
├── data/                   # SQLite database
├── scripts/                # QA audit utilities
├── src/
│   ├── app/                # App Router pages and API routes
│   │   ├── rankings/       # ASCS leaderboard
│   │   ├── vendors/        # Platform directory and scorecards
│   │   ├── questions/      # Enterprise Q&A
│   │   ├── about/          # About, methodology, trust pages
│   │   ├── compare/        # Platform comparisons and deep dives
│   │   ├── benchmarks/     # Evaluation protocols
│   │   ├── indexes/        # Research indexes
│   │   ├── newsletter/     # Subscription
│   │   ├── admin/          # Protected CMS
│   │   └── api/            # Newsletter, reviews, verification, admin
│   ├── components/
│   │   ├── layout/         # Header, footer, navigation
│   │   └── ui/             # Shared UI primitives
│   ├── lib/
│   │   ├── site.ts         # Brand, navigation, ASCS definitions
│   │   ├── vendors.ts      # Vendor data and scoring
│   │   ├── questions.ts    # Q&A content
│   │   ├── db.ts           # SQLite connection
│   │   ├── schema.ts       # Schema and migrations
│   │   └── admin-auth.ts   # Admin authentication
│   └── middleware.ts       # Admin route protection
├── .env.example
├── next.config.ts
└── package.json
```

---

## Product Surfaces

### Rankings — `/rankings`

ASCS leaderboard with composite scores and links into full platform scorecards.

### Platforms — `/vendors`

Platform directory and detailed scorecards covering analyst evaluation, ASCS breakdown, architecture profile, pricing context, AI capabilities, customer sentiment, and evidence sources.

### Questions — `/questions`

Enterprise buyer questions with independent, evidence-based analyst responses.

### Methodology & trust — `/about`

Mission, ASCS methodology, editorial policy, disclosure, and corrections.

### Research & operations

Comparisons, benchmarks, indexes, glossary, newsletter, and a token-protected admin CMS for moderation and content operations.

---

## Admin

Visit `/admin` with `ADMIN_AUTH_TOKEN` supplied as one of:

1. Cookie: `admin_auth=<token>`
2. Header: `Authorization: Bearer <token>`
3. Header: `X-Admin-Token: <token>`

Middleware protects all `/admin` routes.

---

## API Reference

### Public

#### `POST /api/newsletter`

```json
{ "email": "user@example.com" }
```

#### `POST /api/reviews`

Submit a project review for verification and moderation.

#### `POST /api/verify-review`

```json
{ "token": "verification-token" }
```

#### `POST /api/unsubscribe`

```json
{ "email": "user@example.com" }
```

### Admin (authentication required)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/admin/reviews` | List pending reviews |
| `POST` | `/api/admin/reviews/:id/approve` | Approve a review |
| `POST` | `/api/admin/reviews/:id/reject` | Reject a review |

---

## Database

SQLite at `data/reviews-cxo.db`.

| Table | Purpose |
|---|---|
| `newsletter_subscribers` | Newsletter subscribe / unsubscribe |
| `submitted_reviews` | Project reviews, verification, and moderation |
| `evidence_records` | Claim and source evidence |

Full schema: [`src/lib/schema.ts`](src/lib/schema.ts)

---

## Security

| Control | Implementation |
|---|---|
| Admin auth | Middleware with cookie / Bearer / custom header token |
| Rate limiting | Per-IP limits on sensitive routes |
| Input validation | Length limits, email checks, sanitization |
| SQL safety | Parameterized queries |
| Payload limits | Request size caps on review submission |
| HTTP headers | Configured in `next.config.ts` |

---

## SEO & Discoverability

- Dynamic sitemap and robots configuration
- JSON-LD structured data on key pages
- Open Graph metadata
- RSS feed at `/rss.xml`
- LLM-oriented site map at `/llms.txt`
- Canonical URLs on public pages

---

## QA Testing

With the development server running:

```bash
npm run dev
# separate terminal
node scripts/qa_audit.js
```

Covers validation defenses, rate limits, admin auth, newsletter flow, review lifecycle, and route health checks.

---

## Contributing

1. Branch from `main`
2. Match existing Prettier and ESLint conventions
3. Run `npm run lint` before opening a pull request
4. Keep product documentation aligned with `src/lib/site.ts` and the methodology page

---

## License

Proprietary. All rights reserved.

Licensing inquiries: [research@reviews-cxo.com](mailto:research@reviews-cxo.com)

---

<div align="center">

**[Reviews_CXO](https://reviews-cxo.com)** — Independent AI Enterprise Sales Research

[Rankings](https://reviews-cxo.com/rankings) · [Platforms](https://reviews-cxo.com/vendors) · [Questions](https://reviews-cxo.com/questions) · [Methodology](https://reviews-cxo.com/about/methodology) · [About](https://reviews-cxo.com/about)

</div>
