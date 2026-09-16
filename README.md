<div align="center">

# Reviews CXO

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

**Reviews CXO** is a Next.js research platform that evaluates enterprise AI sales platforms using the proprietary **ASCS (AI Sales Capability Score)** framework — weighted dimensions, evidence-classified scoring, and analyst-written evaluations.

It is not a review aggregator or vendor marketing site. Content is curated for enterprise buyers who need architecture depth, realistic TCO context, and transparent methodology.

---

## Key Features

- **ASCS rankings and scorecards** — 12-dimension scoring with evidence classification, architecture profiles, pricing context, AI capability assessment, customer sentiment, and cited sources
- **Independent analyst evaluations** — editorial research narratives, not star-rating dumps
- **Enterprise Q&A** — buyer questions answered with ASCS-grounded recommendations
- **Published methodology** — full ASCS framework documentation and trust pages (editorial policy, disclosure, corrections)
- **Platform comparisons** — head-to-head 12-dimension breakdowns and custom two-platform comparisons
- **Benchmarks** — controlled evaluations with published datasets, code, and methodology (CRM-ERP At-Risk Accounts v1 live)
- **Indexes** — Architecture & Security Index, ASCS Scorecard composite rankings
- **CXO Intelligence** — primary research based on interviews and surveys with enterprise leaders
- **User accounts** — signup, login, and session-based authentication
- **Question submission** — registered users can submit enterprise AI questions for analyst research
- **Review submission** — users can submit platform reviews for verification and moderation
- **Newsletter** — subscription and unsubscribe flows with email verification
- **Admin CMS** — token-protected moderation for reviews, questions, companies, and content operations
- **Production polish** — dark/light theme, dynamic sitemap, JSON-LD, RSS, LLM-oriented discovery (`llms.txt`)

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
| Database | Supabase (PostgreSQL) |
| Email | Resend (optional) |
| Auth | Custom session-based (jose JWT + bcryptjs) |
| Fonts | Inter + JetBrains Mono |
| Deploy | Vercel-oriented |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/MunishGuleria/ReviewCXO.git
cd ReviewCXO/reviews-cxo
npm install
```

### Environment

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key |
| `JWT_SECRET` | Yes | Secret key for session tokens |
| `ADMIN_AUTH_TOKEN` | Yes (for admin) | Secure random admin token |
| `NEXT_PUBLIC_SITE_URL` | Yes for email links | Public site URL (local or production) |
| `RESEND_API_KEY` | No | Resend API key; emails are skipped if unset |

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
├── src/
│   ├── app/                # App Router pages and API routes
│   │   ├── rankings/       # ASCS leaderboard
│   │   ├── vendors/        # Platform directory and scorecards
│   │   ├── questions/      # Enterprise Q&A
│   │   ├── about/          # About, methodology, trust pages
│   │   ├── compare/        # Platform comparisons and deep dives
│   │   ├── benchmarks/     # Evaluation protocols
│   │   ├── indexes/        # Research indexes
│   │   ├── cxo-intelligence/ # Primary CXO research
│   │   ├── glossary/       # Enterprise AI terminology
│   │   ├── newsletter/     # Subscription
│   │   ├── login/          # User login
│   │   ├── signup/         # User registration
│   │   ├── submit-question/ # Question submission
│   │   ├── submit-review/  # Review submission
│   │   ├── admin/          # Protected CMS
│   │   └── api/            # Auth, newsletter, reviews, questions, admin
│   ├── components/
│   │   ├── layout/         # Header, footer, navigation
│   │   └── ui/             # Shared UI primitives
│   ├── lib/
│   │   ├── site.ts         # Brand, navigation, ASCS definitions
│   │   ├── vendors.ts      # Vendor data and scoring
│   │   ├── questions.ts    # Q&A content
│   │   ├── reviews.ts      # Review data access
│   │   ├── auth.ts         # Session-based authentication
│   │   ├── db.ts           # Supabase client
│   │   ├── db-queries.ts   # Database query functions
│   │   └── admin-auth.ts   # Admin authentication
│   └── middleware.ts       # Admin + auth route protection
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

Enterprise buyer questions with independent, evidence-based analyst responses. Registered users can submit new questions via `/submit-question`.

### Comparisons — `/compare`

Head-to-head platform comparisons with 12-dimension score breakdowns and custom two-platform selector.

### Benchmarks — `/benchmarks`

Controlled evaluations with published datasets, code, and methodology. CRM-ERP At-Risk Accounts v1 is live.

### Indexes — `/indexes`

Composite scores and rankings: Architecture & Security Index 2026, ASCS Scorecard 2026.

### CXO Intelligence — `/cxo-intelligence`

Original primary research based on interviews and surveys with enterprise leaders.

### Methodology & trust — `/about`

Mission, ASCS methodology, editorial policy, disclosure, and corrections.

### Research & operations

Glossary, newsletter, and a token-protected admin CMS for moderation and content operations.

---

## User Accounts

- **Signup** — `/signup` — register with email and password
- **Login** — `/login` — session-based JWT authentication
- **Submit question** — `/submit-question` — propose enterprise AI questions for analyst research
- **Submit review** — `/submit-review` — submit platform reviews for moderation

---

## Admin

Visit `/admin` with `ADMIN_AUTH_TOKEN` supplied as one of:

1. Cookie: `admin_auth=<token>`
2. Header: `Authorization: Bearer <token>`
3. Header: `X-Admin-Token: <token>`

Middleware protects all `/admin` routes.

### Admin capabilities

- Review moderation (approve / reject)
- Question management (approve / reject / create)
- Company management
- Content operations

---

## API Reference

### Public

#### `POST /api/newsletter`

```json
{ "email": "user@example.com" }
```

#### `POST /api/reviews`

Submit a platform review for verification and moderation.

#### `POST /api/verify-review`

```json
{ "token": "verification-token" }
```

#### `POST /api/unsubscribe`

```json
{ "email": "user@example.com" }
```

#### `POST /api/questions/submit`

Submit a question for analyst research (requires authentication).

### Auth

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Create account |
| `POST` | `/api/auth/login` | Sign in |
| `POST` | `/api/auth/logout` | Sign out |
| `GET` | `/api/auth/me` | Get current user |

### Admin (authentication required)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/admin/reviews` | List pending reviews |
| `POST` | `/api/admin/reviews/:id/approve` | Approve a review |
| `POST` | `/api/admin/reviews/:id/reject` | Reject a review |
| `GET` | `/api/admin/questions` | List questions |
| `POST` | `/api/admin/questions/:id/approve` | Approve a question |
| `POST` | `/api/admin/questions/:id/reject` | Reject a question |

---

## Database

Supabase (PostgreSQL) hosted at `wewrijwmeqdzrshdrkyo.supabase.co`.

| Table | Purpose |
|---|---|
| `users` | User accounts (email, password hash, role) |
| `newsletter_subscribers` | Newsletter subscribe / unsubscribe |
| `submitted_reviews` | Platform reviews, verification, and moderation |
| `submitted_questions` | User-submitted questions for analyst research |
| `evidence_records` | Claim and source evidence |

RLS enabled on all tables. Schema managed in Supabase SQL Editor.

---

## Security

| Control | Implementation |
|---|---|
| User auth | Session-based JWT with httpOnly cookies |
| Admin auth | Middleware with cookie / Bearer / custom header token |
| Rate limiting | Per-IP limits on sensitive routes |
| Input validation | Length limits, email checks, sanitization |
| SQL safety | Parameterized queries |
| Payload limits | Request size caps on submissions |
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
```

Test all flows manually: signup, login, submit question, submit review, admin moderation, newsletter subscription.

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

**[Reviews CXO](https://reviews-cxo.com)** — Independent AI Enterprise Sales Research

[Rankings](https://reviews-cxo.com/rankings) · [Platforms](https://reviews-cxo.com/vendors) · [Questions](https://reviews-cxo.com/questions) · [Methodology](https://reviews-cxo.com/about/methodology) · [About](https://reviews-cxo.com/about)

</div>
