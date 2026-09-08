<div align="center">

# Reviews_CXO

### AI Enterprise Sales Research Platform

Benchmarks, architecture analysis, and CXO insights on AI sales platforms.
Independent, evidence-based research for enterprise buyers.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-red)](#license)

[Rankings](#rankings) | [Platforms](#platforms) | [Comparisons](#comparisons) | [Benchmarks](#benchmarks) | [Submit Review](#submit-a-review) | [API](#api-reference)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [ASCS Framework](#ascs-framework)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Development](#development)
  - [Production](#production)
- [Project Structure](#project-structure)
- [Rankings](#rankings)
- [Platforms](#platforms)
- [Comparisons](#comparisons)
- [Benchmarks](#benchmarks)
- [Submit a Review](#submit-a-review)
- [Case Studies](#case-studies)
- [Community Q&A](#community-qa)
- [API Reference](#api-reference)
  - [Public Endpoints](#public-endpoints)
  - [Admin Endpoints](#admin-endpoints)
- [Database Schema](#database-schema)
- [Security](#security)
- [SEO & Discoverability](#seo--discoverability)
- [QA Testing](#qa-testing)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Reviews_CXO** is a Next.js application that provides independent, evidence-based benchmarks and reviews of AI-powered enterprise sales platforms. It evaluates **30+ platforms** across **12 weighted dimensions** using the proprietary **ASCS (Architecture, Security, Connectivity, and Scalability)** framework.

The platform is designed for enterprise CXOs, IT leaders, and sales operations teams who need objective, data-driven insights when selecting AI sales tools.

### Why This Exists

Enterprise AI sales platforms make bold claims. Reviews_CXO cuts through the marketing with:

- **Standardized evaluation** across 12 architecture and security dimensions
- **Evidence-classified scoring** (observed, documented, simulated, inferred)
- **CXO-level project reviews** with verified submission and moderation workflow
- **Head-to-head comparisons** with detailed score breakdowns
- **Published benchmarks** with reproducible test protocols

---

## Key Features

| Feature | Description |
|---|---|
| **ASCS Rankings** | 30+ platforms ranked by composite score across 12 dimensions |
| **Vendor Scorecards** | Detailed profiles with architecture analysis, pros/cons, pricing |
| **Head-to-Head Comparisons** | 12 pre-built pairs + custom comparison tool |
| **CXO Review System** | Multi-step submission with email verification and admin moderation |
| **Case Studies** | Published enterprise AI project reviews with metrics |
| **Community Q&A** | 12 expert-answered questions with vendor recommendations |
| **Benchmarks** | Reproducible evaluation protocols with published results |
| **Admin Dashboard** | Protected moderation panel for review approval |
| **Dark/Light Theme** | Full theme support with system preference detection |
| **SEO Optimized** | Dynamic sitemap, JSON-LD, RSS feed, AI crawler support |

---

## ASCS Framework

The **Architecture, Security, Connectivity, and Scalability** framework evaluates platforms across 12 weighted dimensions:

| # | Dimension | Weight | Description |
|---|---|---|---|
| 1 | ERP Connectivity | 10% | Native ERP integration depth (SAP, Oracle, NetSuite) |
| 2 | CRM Data Grounding | 8% | CRM data ingestion, normalization, and reasoning |
| 3 | Cross-System Reasoning | 12% | Combined CRM + ERP + external source reasoning |
| 4 | AI Reasoning Quality | 12% | Accuracy, hallucination rate, chain-of-thought quality |
| 5 | Workflow Automation | 10% | End-to-end task completion (not just recommendations) |
| 6 | Agentic Capability | 10% | Multi-step planning, tool selection, sub-agent coordination |
| 7 | Data Accessibility & Openness | 8% | API-first architecture, data export, open standards |
| 8 | Security & Governance | 10% | Encryption, SSO/SAML, SOC 2, ISO, audit trails |
| 9 | Explainability & Transparency | 5% | Recommendation explainability and source attribution |
| 10 | Deployment Flexibility | 5% | Cloud, on-prem, hybrid, VPC options |
| 11 | Integrations Ecosystem | 5% | Third-party integrations breadth and depth |
| 12 | Market Adoption & Ecosystem | 5% | Customer base, community, analyst coverage |

**Scoring Rubric:**

| Score | Meaning |
|---|---|
| 0 | Not available / no evidence |
| 1-2 | Minimal / experimental / pre-release |
| 3-4 | Basic capability / limited documentation |
| 5-6 | Functional / documented / meets baseline enterprise requirements |
| 7-8 | Strong / well-documented / differentiated capability |
| 9-10 | Industry-leading / extensive evidence / best-in-class |

Full methodology: [About / Methodology](/about/methodology)

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) |
| **Language** | [TypeScript 5](https://typescriptlang.org) (strict mode) |
| **UI** | [React 19](https://react.dev) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) + custom design system |
| **Database** | [SQLite](https://www.sqlite.org) via [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (WAL mode) |
| **Email** | [Resend](https://resend.com) (optional) |
| **Fonts** | Inter (sans-serif) + JetBrains Mono (monospace) |
| **Deployment** | [Vercel](https://vercel.com) (recommended) |

---

## Getting Started

### Prerequisites

- **Node.js 18+**
- **npm** (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/MPK15KPK/Reviews_CXO.git
cd Reviews_CXO/reviews-cxo

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `ADMIN_AUTH_TOKEN` | Yes | Secure random token for admin authentication |
| `RESEND_API_KEY` | No | Resend API key for verification emails. Format: `re_xxxxx`. If unset, emails are skipped. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL (e.g., `http://localhost:3000` or `https://reviews-cxo.com`) |

**Example `.env.local`:**

```env
ADMIN_AUTH_TOKEN=cxo_admin_secure_token_2026
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

### Database Setup

```bash
# Initialize the SQLite database
npm run db:init

# Or reset and reinitialize
npm run db:reset
```

The database is created at `data/reviews-cxo.db` with WAL journal mode enabled.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
reviews-cxo/
├── public/                    # Static assets (favicon, OG image, llms.txt)
├── data/                      # SQLite database files
├── scripts/                   # QA audit script
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About pages (methodology, editorial, disclosure)
│   │   ├── vendors/           # Vendor directory and scorecards
│   │   ├── rankings/          # ASCS rankings
│   │   ├── compare/           # Head-to-head comparisons
│   │   ├── benchmarks/        # Published benchmarks
│   │   ├── case-studies/      # Enterprise case studies
│   │   ├── questions/         # Community Q&A
│   │   ├── indexes/           # Scorecards and indices
│   │   ├── cxo-intelligence/  # Research articles
│   │   ├── glossary/          # Technical glossary
│   │   ├── submit-review/     # Review submission form
│   │   ├── verify-review/     # Email verification
│   │   ├── newsletter/        # Newsletter subscription
│   │   ├── unsubscribe/       # Unsubscribe page
│   │   ├── admin/             # Admin dashboard (protected)
│   │   └── rss.xml/           # RSS feed endpoint
│   ├── api/                   # API routes
│   │   ├── newsletter/        # POST /api/newsletter
│   │   ├── reviews/           # POST /api/reviews
│   │   ├── verify-review/     # POST /api/verify-review
│   │   ├── unsubscribe/       # POST /api/unsubscribe
│   │   └── admin/             # Admin API (auth required)
│   ├── components/            # React components
│   │   ├── layout/            # Header, Footer, Navigation
│   │   └── ui/                # Reusable UI components
│   ├── lib/                   # Core business logic
│   │   ├── db.ts              # SQLite connection
│   │   ├── schema.ts          # Database schema and migrations
│   │   ├── db-queries.ts      # Database query functions
│   │   ├── vendors.ts         # 30 vendor definitions with ASCS scores
│   │   ├── reviews.ts         # Reviews, CXO profiles, case studies
│   │   ├── questions.ts       # Community Q&A data
│   │   ├── site.ts            # Site config, navigation, ASCS dimensions
│   │   └── admin-auth.ts      # Admin authentication
│   └── middleware.ts          # Admin route protection
├── .env.example               # Environment variable template
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

---

## Rankings

View all 30+ platforms ranked by their ASCS composite score.

**Page:** [/rankings](/rankings)

Each ranking entry includes:
- ASCS composite score
- Individual dimension breakdown
- ERP connectivity level
- Agentic tier classification
- Satisfaction rating
- Ideal deployment recommendation

---

## Platforms

Browse all evaluated platforms with detailed scorecards.

**Page:** [/vendors](/vendors)

Each vendor profile includes:
- ASCS 12-dimension scores with evidence classification
- Architecture profile (ERP coupling, reasoning engine, agentic tier)
- Pros, cons, and best-for use cases
- Features, integrations, and certifications
- Pricing and deployment options

**30 platforms evaluated**, including:
Salesforce, Microsoft Dynamics 365, HubSpot, Zoho CRM, Gong, Outreach, Salesloft, Clari, ZoomInfo, 6sense, Demandbase, Seismic, Highspot, Freshsales, Apollo.io, Pipedrive, Creatio, Intercom, Drift, Showpad, Terminus, Copper CRM, and more.

---

## Comparisons

Head-to-head platform comparisons with 12-dimension score breakdowns.

**Page:** [/compare](/compare)

### Pre-built Comparisons

- Salesforce vs Microsoft Dynamics 365
- Gong vs Clari — Revenue Intelligence
- HubSpot vs Salesforce — SMB vs Enterprise
- 6sense vs Demandbase — ABM Platforms
- Outreach vs Salesloft — Sales Engagement
- Seismic vs Highspot — Sales Content
- And 6 more...

### Custom Comparison

Build your own comparison at [/compare/custom](/compare/custom).

### Deep Dive Articles

- [Salesforce vs Microsoft: ERP Scenarios](/compare/salezx-vs-salesforce-erp-scenarios)
- [Microsoft Data Grounding Analysis](/compare/salezx-vs-microsoft-data-grounding)
- [ERP AI vs CRM Copilots](/compare/erp-ai-vs-crm-copilots)
- [Enterprise AI Architecture Patterns](/compare/enterprise-ai-architecture-patterns)
- [On-Prem vs Cloud vs Hybrid](/compare/ai-sales-on-prem-vs-cloud-vs-hybrid)

---

## Benchmarks

Published evaluation protocols with reproducible test results.

**Page:** [/benchmarks](/benchmarks)

### Published

- **CRM-ERP At-Risk Accounts v1** — Evaluates cross-system reasoning across 400 accounts in 3 environments

### Planned

- Sales Forecasting with ERP Data
- Agentic Task Completion

---

## Submit a Review

Share your enterprise AI platform experience. Reviews go through a verification and moderation process.

**Page:** [/submit-review](/submit-review)

### Submission Flow

1. **Vendor & Category** — Select platform and project type
2. **Project Details** — Problem statement, tech stack, team size, timeline
3. **Outcomes & Metrics** — ROI, efficiency gains, adoption rate
4. **Ratings** — 5-star ratings across delivery quality, AI effectiveness, communication, value
5. **Your Information** — CXO details (anonymous option available)

### Verification Process

1. Submit review → status: `pending`
2. Email verification sent via Resend (if configured)
3. Verify email → status: `pending_verification`
4. Admin review and approval → status: `approved`
5. Review appears on vendor scorecard

**Rate Limited:** 5 submissions per IP per minute.

---

## Case Studies

Published enterprise AI project reviews with detailed metrics and CXO attribution.

**Page:** [/case-studies](/case-studies)

Each case study includes:
- Vendor and project category
- Problem statement and solution description
- Tech stack, team size, timeline, and budget
- Quantified outcomes (ROI, efficiency gains, adoption rate)
- CXO attribution (name, title, company)

---

## Community Q&A

Expert-answered questions sourced from Reddit, LinkedIn, and Twitter.

**Page:** [/questions](/questions)

**Categories:**
- ERP Integration
- Revenue Intelligence
- Startup Sales
- Architecture Patterns
- AI Platforms
- CRM Selection
- And more...

Each answer includes:
- Detailed analysis with evidence citations
- Platform recommendations with ASCS scores
- Source attribution

---

## API Reference

### Public Endpoints

#### `POST /api/newsletter`

Subscribe to the newsletter.

**Request:**
```json
{ "email": "user@example.com" }
```

**Responses:**
| Status | Description |
|---|---|
| `200` | Successfully subscribed |
| `400` | Invalid email format |
| `409` | Email already subscribed |
| `500` | Server error |

---

#### `POST /api/reviews`

Submit a project review.

**Request:**
```json
{
  "cxoFullName": "Jane Doe",
  "cxoTitle": "VP of Sales",
  "cxoCompanyName": "Acme Corp",
  "cxoEmail": "jane@acme.com",
  "itCompanyName": "Salesforce",
  "projectTitle": "Enterprise CRM Migration",
  "projectCategory": "CRM Implementation",
  "problemStatement": "...",
  "aiSolutionDescription": "...",
  "techStack": ["Salesforce", "MuleSoft"],
  "teamSize": 12,
  "timelineMonths": 6,
  "outcomesDescription": "...",
  "roiPercentage": 340,
  "deliveryQualityRating": 5,
  "aiEffectivenessRating": 4,
  "communicationRating": 5,
  "valueForMoneyRating": 4,
  "wouldRecommend": true,
  "overallRating": 5
}
```

**Responses:**
| Status | Description |
|---|---|
| `200` | Review submitted successfully |
| `400` | Validation error |
| `413` | Payload too large (max 100KB) |
| `429` | Rate limit exceeded (5/min/IP) |
| `500` | Server error |

---

#### `POST /api/verify-review`

Verify a review email via token.

**Request:**
```json
{ "token": "verification-token-here" }
```

**Responses:**
| Status | Description |
|---|---|
| `200` | Email verified |
| `400` | Invalid token |
| `404` | Token not found |
| `500` | Server error |

---

#### `POST /api/unsubscribe`

Unsubscribe from the newsletter.

**Request:**
```json
{ "email": "user@example.com" }
```

**Responses:**
| Status | Description |
|---|---|
| `200` | Successfully unsubscribed |
| `400` | Invalid email |
| `500` | Server error |

---

### Admin Endpoints

All admin endpoints require authentication via one of:

1. **Cookie:** `admin_auth=<ADMIN_AUTH_TOKEN>`
2. **Authorization Header:** `Authorization: Bearer <ADMIN_AUTH_TOKEN>`
3. **Custom Header:** `X-Admin-Token: <ADMIN_AUTH_TOKEN>`

#### `GET /api/admin/reviews`

List all pending reviews.

**Response:** Array of review objects with full details.

---

#### `POST /api/admin/reviews/:id/approve`

Approve a review by ID.

**Response:**
```json
{ "success": true, "review": { "id": "...", "status": "approved" } }
```

---

#### `POST /api/admin/reviews/:id/reject`

Reject a review by ID.

**Request:**
```json
{ "reason": "Insufficient evidence provided" }
```

**Response:**
```json
{ "success": true, "review": { "id": "...", "status": "rejected" } }
```

---

## Database Schema

SQLite database at `data/reviews-cxo.db` with WAL journal mode.

### Tables

#### `newsletter_subscribers`

| Column | Type | Description |
|---|---|---|
| `id` | TEXT (PK) | Unique identifier |
| `email` | TEXT (UNIQUE) | Subscriber email |
| `subscribed_at` | DATETIME | Subscription timestamp |
| `unsubscribed_at` | DATETIME | Unsubscription timestamp |
| `is_active` | BOOLEAN | Active status |

#### `submitted_reviews`

| Column | Type | Description |
|---|---|---|
| `id` | TEXT (PK) | Unique identifier |
| `cxo_full_name` | TEXT | Reviewer name |
| `cxo_title` | TEXT | Reviewer title |
| `cxo_company_name` | TEXT | Reviewer company |
| `cxo_email` | TEXT | Reviewer email |
| `it_company_name` | TEXT | Platform reviewed |
| `project_title` | TEXT | Project name |
| `project_category` | TEXT | Project type |
| `status` | TEXT | pending / pending_verification / approved / rejected |
| `overall_rating` | INTEGER | 1-5 rating |
| ... | ... | See [schema.ts](src/lib/schema.ts) for full schema |

#### `evidence_records`

| Column | Type | Description |
|---|---|---|
| `id` | TEXT (PK) | Unique identifier |
| `entity_type` | TEXT | it_company / vendor / review |
| `entity_id` | TEXT | Related entity |
| `claim` | TEXT | Evidence claim |
| `source_url` | TEXT | Source URL |
| `verification_status` | TEXT | verified / unverified / disputed |

Full schema: [src/lib/schema.ts](src/lib/schema.ts)

---

## Security

| Feature | Implementation |
|---|---|
| **Admin Auth** | Cookie + header token verification via middleware |
| **Rate Limiting** | 5 requests per IP per minute (in-memory) |
| **Input Sanitization** | Length limits, regex validation, email validation |
| **SQL Injection** | Parameterized queries throughout |
| **Payload Limits** | 100KB max request size |
| **Security Headers** | X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy |
| **HTTPS** | Redirect configured in production |

Full security headers: [next.config.ts](next.config.ts)

---

## SEO & Discoverability

| Feature | Details |
|---|---|
| **Dynamic Sitemap** | Auto-generated for all pages, vendors, questions, case studies |
| **Robots.txt** | Allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended |
| **JSON-LD** | Organization and WebSite structured data |
| **OpenGraph** | Dynamic OG images for all pages |
| **RSS Feed** | Available at [/rss.xml](/rss.xml) |
| **llms.txt** | LLM-readable site description at [/llms.txt](/llms.txt) |
| **Canonical URLs** | Set on all pages |

---

## QA Testing

Run the comprehensive QA audit script:

```bash
# Start the dev server first
npm run dev

# In another terminal
node scripts/qa_audit.js
```

**Tests include:**
- Input validation and XSS defense
- SQL injection defense
- Rate limiting verification
- Admin authentication flow
- Full review lifecycle (submit -> verify -> approve -> display)
- Newsletter subscription flow
- Route status for all 20+ pages

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (Prettier: 2-space, trailing commas, 100 width)
- Run `npm run lint` before committing
- Add JSDoc comments to new functions
- Update documentation for API changes

---

## License

This is proprietary software. All rights reserved.

For licensing inquiries, contact: [research@reviews-cxo.com](mailto:research@reviews-cxo.com)

---

<div align="center">

**[Reviews_CXO](https://reviews-cxo.com)** — Independent AI Enterprise Sales Research

[Rankings](/rankings) | [Platforms](/vendors) | [Comparisons](/compare) | [Benchmarks](/benchmarks) | [Submit Review](/submit-review) | [About](/about)

</div>
