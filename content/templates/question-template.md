# Question Template
#
# INSTRUCTIONS FOR AGENTS:
# 1. Copy this file to content/questions/q{NUMBER}.md
# 2. Replace all {{PLACEHOLDER}} values with real data
# 3. Delete this instruction block
# 4. Set status: published when ready to go live
# 5. Restart dev server: npm run dev
# 6. Verify at /questions (listing) and /questions/{slug} (detail)
#
# FILE NAMING: q{NUMBER}.md where NUMBER is next sequential ID
# EXAMPLE: content/questions/q13.md

---
id: {{Q-NUMBER}}
slug: {{QUESTION-SLUG}}
title: "{{QUESTION-TITLE}}"
question: "{{FULL-QUESTION-TEXT}}"
author: "Reviews CXO Research"
source: "Reviews CXO"
sourceUrl: "/about/methodology"
publishedAt: "{{YYYY-MM-DD}}"
excerpt: "{{1-2-SENTENCE-SUMMARY-FOR-CARDS}}"
category: "{{CATEGORY}}"
tags:
  - "{{TAG-1}}"
  - "{{TAG-2}}"
status: draft
findings:
  - "{{FINDING-1}}"
  - "{{FINDING-2}}"
relatedVendors:
  - "{{vendor-slug-1}}"
  - "{{vendor-slug-2}}"
relatedArticles:
  - "/benchmarks/{{benchmark-slug}}"
---

## Executive Summary

{{1-paragraph executive summary of the answer}}

## Key Findings

### {{FINDING-TITLE-1}}

{{Details with evidence and data}}

### {{FINDING-TITLE-2}}

{{Details with evidence and data}}

## Recommendations

**Recommendation 1:**
{{Action and rationale}}

**Recommendation 2:**
{{Action and rationale}}

## Evidence

{{ASCS scores and framework references}}

<!--SOURCES
[{"title":"{{SOURCE-TITLE}}","url":"{{URL}}"}]
-->
