# Vendor Review Template
# 
# INSTRUCTIONS FOR AGENTS:
# 1. Copy this file to content/vendors/{vendor-slug}.md
# 2. Replace all {{PLACEHOLDER}} values with real data
# 3. Delete this instruction block
# 4. Set published: true when ready to go live
# 5. Restart dev server: npm run dev
# 6. Verify at /vendors (listing) and /vendors/{slug} (detail)
#
# FILE NAMING: lowercase, hyphens only, match the slug field
# EXAMPLE: content/vendors/acme-crm.md

---
slug: {{VENDOR-SLUG}}
name: {{VENDOR-NAME}}
tagline: "{{ONE-LINE-DESCRIPTION}}"
category: "{{CATEGORY}}"
founded: {{YEAR}}
hq: "{{CITY, COUNTRY}}"
website: "{{https://vendor.com}}"
rating: {{RATING-1-TO-5}}
reviewCount: {{TOTAL-REVIEWS}}
pricing: "{{PRICING-SUMMARY}}"
freeTrial: {{true|false}}
bestFor:
  - "{{USE-CASE-1}}"
  - "{{USE-CASE-2}}"
pros:
  - "{{PRO-1-WITH-EVIDENCE}}"
  - "{{PRO-2-WITH-EVIDENCE}}"
cons:
  - "{{CON-1-WITH-EVIDENCE}}"
  - "{{CON-2-WITH-EVIDENCE}}"
features:
  - "{{FEATURE-1}}"
  - "{{FEATURE-2}}"
integrations:
  - "{{INTEGRATION-1}}"
  - "{{INTEGRATION-2}}"
certifications:
  - "{{CERT-1}}"
  - "{{CERT-2}}"
deployment:
  - "{{Cloud (SaaS)|On-Premise|Hybrid}}"
published: false
---

<!--ASCSCORES
{"1":{{SCORE}},"2":{{SCORE}},"3":{{SCORE}},"4":{{SCORE}},"5":{{SCORE}},"6":{{SCORE}},"7":{{SCORE}},"8":{{SCORE}},"9":{{SCORE}},"10":{{SCORE}},"11":{{SCORE}},"12":{{SCORE}}}
-->

<!--ASCSEVIDENCE
{"1":"{{EVIDENCE-TYPE}}","2":"{{EVIDENCE-TYPE}}","3":"{{EVIDENCE-TYPE}}","4":"{{EVIDENCE-TYPE}}","5":"{{EVIDENCE-TYPE}}","6":"{{EVIDENCE-TYPE}}","7":"{{EVIDENCE-TYPE}}","8":"{{EVIDENCE-TYPE}}","9":"{{EVIDENCE-TYPE}}","10":"{{EVIDENCE-TYPE}}","11":"{{EVIDENCE-TYPE}}","12":"{{EVIDENCE-TYPE}}"}
-->

<!--ASCSCOMPOSITE
{{WEIGHTED-AVERAGE}}
-->

<!--ARCHITECTURE
{"erpCoupling":"{{ERP-COUPLING}}","reasoningEngine":"{{REASONING-ENGINE}}","agenticTier":"{{AGENTIC-TIER}}"}
-->

<!--WORKLOADFIT
{"idealDeployment":"{{DESCRIPTION-OF-IDEAL-USE}}","keyTradeOff":"{{MAIN-COMPROMISE}}"}
-->

<!--ANALYST
{"editorialNarrative":"{{2-3-PARAGRAPH-ANALYSIS}}","idealEnterpriseWorkloads":["{{WORKLOAD-1}}","{{WORKLOAD-2}}"],"knownLimitations":["{{LIMITATION-1}}","{{LIMITATION-2}}"],"coreStrengths":["{{STRENGTH-1}}","{{STRENGTH-2}}"]}
-->

<!--SENTIMENT
{"aggregateRatings":[{"platform":"G2","rating":"{{RATING}}","reviewCount":"{{COUNT}}"}],"positiveThemes":["{{THEME-1}}","{{THEME-2}}"],"negativeThemes":["{{THEME-1}}","{{THEME-2}}"],"contradictions":"{{CONTRADICTION-SUMMARY}}"}
-->

<!--PRICINGDETAILS
{"model":"{{PRICING-MODEL}}","breakdown":[{"component":"{{TIER-1}}","price":"{{PRICE}}"}],"tcoConsiderations":["{{TCO-FACTOR-1}}"],"uncertainty":"{{PRICING-UNCERTAINTY}}"}
-->

<!--EVIDENCESOURCES
[{"title":"{{SOURCE-TITLE}}","type":"{{Official|Independent|Analyst|Community}}","description":"{{DESCRIPTION}}","url":"{{URL}}","date":"{{DATE}}"}]
-->
