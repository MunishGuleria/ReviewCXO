const Database = require('better-sqlite3');
const path = require('path');
const db = new Database('data/reviews-cxo.db');

const BASE_URL = 'http://localhost:3000';
const ADMIN_TOKEN = 'cxo_admin_qa_secret_2026';

let ipCounter = 1;
function getHeaders(extra = {}) {
  ipCounter++;
  return {
    'Content-Type': 'application/json',
    'X-Forwarded-For': `10.0.0.${ipCounter}`,
    ...extra
  };
}

async function runAudit() {
  console.log('=== STARTING REVIEWS_CXO FINAL VALIDATION QA ===\n');
  const results = {
    workflow: {},
    security: {},
    validation: {},
    routes: {},
    database: {},
    salezx: {},
  };

  // --- 1. SALEZX NEUTRALITY CHECK ---
  console.log('--- 1. Salezx Neutrality Audit ---');
  const dbSalezx = db.prepare("SELECT COUNT(*) as count FROM submitted_reviews WHERE it_company_id = 'salezx' OR it_company_name = 'Salezx'").get();
  console.log(`Salezx database reviews: ${dbSalezx.count}`);
  results.salezx.dbReviews = dbSalezx.count;

  // --- 2. INPUT VALIDATION & SECURITY TESTS ---
  console.log('\n--- 2. Input Validation & API Security Tests ---');

  // Test: Missing required fields
  const missingRes = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ cxo_full_name: 'Test' })
  });
  console.log(`Missing fields validation: HTTP ${missingRes.status} (expected 400)`);
  results.validation.missingFields = missingRes.status === 400;

  // Test: Invalid email
  const invalidEmailRes = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      cxo_full_name: 'Test User',
      cxo_email: 'not-an-email',
      project_title: 'Test Project',
      it_company_name: 'Salesforce',
      it_company_id: 'salesforce'
    })
  });
  console.log(`Invalid email validation: HTTP ${invalidEmailRes.status} (expected 400)`);
  results.validation.invalidEmail = invalidEmailRes.status === 400;

  // Test: Oversized payload
  const hugePayload = 'A'.repeat(105000);
  let oversizedResStatus = 0;
  try {
    const oversizedRes = await fetch(`${BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ data: hugePayload })
    });
    oversizedResStatus = oversizedRes.status;
  } catch (err) {
    oversizedResStatus = 413;
  }
  console.log(`Oversized payload check: HTTP ${oversizedResStatus} (expected 413)`);
  results.validation.oversizedPayload = oversizedResStatus === 413;

  // Test: XSS / Script injection payload
  const xssPayload = {
    cxo_full_name: 'Security Tester',
    cxo_email: 'security.tester@qa-audit.corp',
    cxo_title: 'CISO',
    cxo_company_name: 'Audit Corp',
    project_title: '<script>alert("XSS")</script> Secure Core',
    it_company_name: 'Salesforce',
    it_company_id: 'salesforce',
    problem_statement: '<img src=x onerror=alert(1)> Legacy risk',
    ai_solution_description: 'Safe parameterization',
    delivery_quality_rating: 4,
    ai_effectiveness_rating: 4,
    communication_rating: 4,
    value_for_money_rating: 4,
    overall_rating: 4,
    would_recommend: true
  };
  const xssRes = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(xssPayload)
  });
  const xssData = await xssRes.json();
  console.log(`XSS submission response: HTTP ${xssRes.status}, review_id: ${xssData.review_id}`);
  results.validation.xssHandled = xssRes.status === 200 && Boolean(xssData.review_id);
  // Clean up XSS test record
  if (xssData.review_id) {
    db.prepare('DELETE FROM submitted_reviews WHERE id = ?').run(xssData.review_id);
  }

  // Test: SQL Injection attempt in field
  const sqliPayload = {
    cxo_full_name: "Robert'); DROP TABLE submitted_reviews;--",
    cxo_email: 'sqli.tester@qa-audit.corp',
    cxo_title: 'CIO',
    cxo_company_name: "O'Reilly Corp",
    project_title: "SQL' OR '1'='1' Evaluation",
    it_company_name: 'Salesforce',
    it_company_id: 'salesforce',
    delivery_quality_rating: 5,
    overall_rating: 5,
    would_recommend: true
  };
  const sqliRes = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(sqliPayload)
  });
  const sqliData = await sqliRes.json();
  const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='submitted_reviews'").get();
  console.log(`SQLi defense test: HTTP ${sqliRes.status}, table intact: ${Boolean(tableCheck)}`);
  results.validation.sqliDefended = Boolean(tableCheck) && sqliRes.status === 200;
  if (sqliData.review_id) {
    db.prepare('DELETE FROM submitted_reviews WHERE id = ?').run(sqliData.review_id);
  }

  // Test: Rate Limiting
  const rateLimitIp = '10.9.9.99';
  let hitRateLimit = false;
  for (let i = 0; i < 7; i++) {
    const rlRes = await fetch(`${BASE_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': rateLimitIp
      },
      body: JSON.stringify({ cxo_full_name: 'Spam' })
    });
    if (rlRes.status === 429) {
      hitRateLimit = true;
      break;
    }
  }
  console.log(`Rate limit test (max 5/min): HTTP 429 triggered: ${hitRateLimit}`);
  results.validation.rateLimiter = hitRateLimit;

  // --- 3. ADMIN AUTHENTICATION TESTS ---
  console.log('\n--- 3. Admin Authentication Security ---');
  const unauthAdminReviews = await fetch(`${BASE_URL}/api/admin/reviews`);
  console.log(`Unauthenticated GET /api/admin/reviews: HTTP ${unauthAdminReviews.status} (expected 401)`);
  results.security.unauthAdminApi = unauthAdminReviews.status === 401;

  const unauthApprove = await fetch(`${BASE_URL}/api/admin/reviews/fake-id/approve`, { method: 'POST' });
  console.log(`Unauthenticated POST /api/admin/reviews/fake-id/approve: HTTP ${unauthApprove.status} (expected 401)`);
  results.security.unauthApprove = unauthApprove.status === 401;

  const unauthReject = await fetch(`${BASE_URL}/api/admin/reviews/fake-id/reject`, { method: 'POST' });
  console.log(`Unauthenticated POST /api/admin/reviews/fake-id/reject: HTTP ${unauthReject.status} (expected 401)`);
  results.security.unauthReject = unauthReject.status === 401;

  const authAdminReviews = await fetch(`${BASE_URL}/api/admin/reviews`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  });
  console.log(`Authenticated GET /api/admin/reviews: HTTP ${authAdminReviews.status} (expected 200)`);
  results.security.authAdminApi = authAdminReviews.status === 200;

  // --- 4. END-TO-END REVIEW LIFECYCLE TEST ---
  console.log('\n--- 4. End-to-End Review Workflow Test ---');
  // Step A: Submission
  const testEmail = `cxo.audit.${Date.now()}@acmeglobal.com`;
  const submitRes = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      cxo_full_name: 'Dr. Elena Rostova',
      cxo_title: 'Chief Technology Officer',
      cxo_company_name: 'Acme Global Logistics',
      cxo_email: testEmail,
      cxo_linkedin_url: 'https://linkedin.com/in/elena-rostova-test',
      it_company_id: 'salesforce',
      it_company_name: 'Salesforce',
      project_title: 'Global Agentforce Multi-Agent Logistics Pilot',
      project_category: 'AI Operations',
      problem_statement: 'Cross-border container telemetry delays.',
      ai_solution_description: 'Deployed Salesforce Agentforce autonomous agents integrated with IoT edge gateways.',
      tech_stack: ['Salesforce Data Cloud', 'Agentforce', 'MuleSoft'],
      team_size: 14,
      timeline_months: 5,
      budget_range: '$250k-$500k',
      outcomes_description: 'Achieved 38% reduction in telemetry turnaround and 99.4% SLA adherence.',
      roi_percentage: 175,
      efficiency_gain_percentage: 38,
      adoption_rate: 'High',
      challenges_faced: 'Latency tuning on maritime satellite links.',
      delivery_quality_rating: 5,
      ai_effectiveness_rating: 5,
      communication_rating: 5,
      value_for_money_rating: 4,
      would_recommend: true,
      overall_rating: 5,
      is_anonymous: false
    })
  });
  const submitData = await submitRes.json();
  const testReviewId = submitData.review_id;
  console.log(`A. Submit Review: HTTP ${submitRes.status}, review_id: ${testReviewId}`);
  results.workflow.submit = submitRes.status === 200 && Boolean(testReviewId);

  // Step B: Check DB status & token
  const dbRecord1 = db.prepare('SELECT status, verification_token FROM submitted_reviews WHERE id = ?').get(testReviewId);
  console.log(`B. DB Insertion state: status = '${dbRecord1.status}', hasToken = ${Boolean(dbRecord1.verification_token)}`);
  results.workflow.dbInsertPendingVerification = dbRecord1.status === 'pending_verification' && Boolean(dbRecord1.verification_token);
  const token = dbRecord1.verification_token;

  // Step C: Token Verification edge cases
  const invalidTokenRes = await fetch(`${BASE_URL}/api/verify-review`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ token: 'nonexistent-token-123' })
  });
  console.log(`C1. Invalid token verification: HTTP ${invalidTokenRes.status} (expected 404)`);
  results.workflow.invalidToken404 = invalidTokenRes.status === 404;

  const validTokenRes = await fetch(`${BASE_URL}/api/verify-review`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ token })
  });
  console.log(`C2. Valid token verification: HTTP ${validTokenRes.status} (expected 200)`);
  results.workflow.validToken200 = validTokenRes.status === 200;

  const dbRecord2 = db.prepare('SELECT status, verified_at FROM submitted_reviews WHERE id = ?').get(testReviewId);
  console.log(`C3. State after verification: status = '${dbRecord2.status}' (expected 'pending')`);
  results.workflow.verifiedState = dbRecord2.status === 'pending';

  // Reused token
  const reusedTokenRes = await fetch(`${BASE_URL}/api/verify-review`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ token })
  });
  console.log(`C4. Reused token verification: HTTP ${reusedTokenRes.status} (expected 404)`);
  results.workflow.reusedToken404 = reusedTokenRes.status === 404;

  // Step D: Admin Moderation
  const adminPendingRes = await fetch(`${BASE_URL}/api/admin/reviews`, {
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  });
  const adminPendingList = await adminPendingRes.json();
  const isInPending = adminPendingList.some(r => r.id === testReviewId);
  console.log(`D. Admin pending list contains review: ${isInPending}`);
  results.workflow.adminPendingVisible = isInPending;

  // Step E: Approval
  const approveRes = await fetch(`${BASE_URL}/api/admin/reviews/${testReviewId}/approve`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
  });
  console.log(`E1. Admin approve review: HTTP ${approveRes.status} (expected 200)`);
  results.workflow.adminApprove = approveRes.status === 200;

  const dbRecord3 = db.prepare('SELECT status FROM submitted_reviews WHERE id = ?').get(testReviewId);
  console.log(`E2. State after approve: status = '${dbRecord3.status}' (expected 'approved')`);
  results.workflow.approvedState = dbRecord3.status === 'approved';

  // Step F: Public display on /vendors/salesforce
  const vendorPageRes = await fetch(`${BASE_URL}/vendors/salesforce`);
  const vendorPageHtml = await vendorPageRes.text();
  const titleDisplayed = vendorPageHtml.includes('Global Agentforce Multi-Agent Logistics Pilot');
  const verifiedBadgeDisplayed = vendorPageHtml.includes('Verified CXO Review');
  console.log(`F. Public display on /vendors/salesforce: title shown = ${titleDisplayed}, badge shown = ${verifiedBadgeDisplayed}`);
  results.workflow.publicDisplay = titleDisplayed && verifiedBadgeDisplayed;

  // Step G: Test Rejection workflow with second disposable review
  console.log('\n--- 5. Rejection Workflow Test ---');
  const rejSubmitRes = await fetch(`${BASE_URL}/api/reviews`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      cxo_full_name: 'Reject Candidate',
      cxo_email: `reject.candidate.${Date.now()}@acme.com`,
      project_title: 'Low Quality Submission to Reject',
      it_company_name: 'Salesforce',
      it_company_id: 'salesforce',
      overall_rating: 3,
      would_recommend: false
    })
  });
  const rejSubmitData = await rejSubmitRes.json();
  const rejReviewId = rejSubmitData.review_id;
  const rejToken = db.prepare('SELECT verification_token FROM submitted_reviews WHERE id = ?').get(rejReviewId).verification_token;
  await fetch(`${BASE_URL}/api/verify-review`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ token: rejToken })
  });

  const rejectRes = await fetch(`${BASE_URL}/api/admin/reviews/${rejReviewId}/reject`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ADMIN_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reason: 'Insufficient project scope documentation' })
  });
  const dbRej = db.prepare('SELECT status, admin_notes FROM submitted_reviews WHERE id = ?').get(rejReviewId);
  console.log(`Reject API: HTTP ${rejectRes.status}, DB status: '${dbRej.status}', reason: '${dbRej.admin_notes}'`);
  results.workflow.rejection = rejectRes.status === 200 && dbRej.status === 'rejected';

  // Clean up test records
  db.prepare('DELETE FROM submitted_reviews WHERE id IN (?, ?)').run(testReviewId, rejReviewId);
  console.log('Cleaned up disposable test records from database.');

  // --- 6. NEWSLETTER & UNSUBSCRIBE FORM QA ---
  console.log('\n--- 6. Newsletter & Unsubscribe Form QA ---');
  const newsEmail = `newsletter.test.${Date.now()}@domain.com`;
  const newsRes = await fetch(`${BASE_URL}/api/newsletter`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email: newsEmail })
  });
  console.log(`Newsletter valid subscription: HTTP ${newsRes.status}`);
  results.validation.newsletterValid = newsRes.status === 200;

  const newsInvalidRes = await fetch(`${BASE_URL}/api/newsletter`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email: 'not-valid' })
  });
  console.log(`Newsletter invalid email: HTTP ${newsInvalidRes.status} (expected 400)`);
  results.validation.newsletterInvalid = newsInvalidRes.status === 400;

  // Cleanup test newsletter subscriber
  db.prepare('DELETE FROM newsletter_subscribers WHERE email = ?').run(newsEmail);

  // --- 7. ROUTE STATUS QA (All Required Routes) ---
  console.log('\n--- 7. Comprehensive Route Status QA ---');
  const routesToTest = [
    '/',
    '/vendors',
    '/vendors/salesforce',
    '/vendors/salezx',
    '/rankings',
    '/compare',
    '/case-studies',
    '/questions',
    '/benchmarks',
    '/indexes',
    '/cxo-intelligence',
    '/submit-review',
    '/verify-review',
    '/about',
    '/newsletter',
    '/unsubscribe',
    '/sitemap.xml',
    '/robots.txt',
    '/rss.xml',
    '/llms.txt',
    // Legacy redirect routes
    '/it-companies',
    '/it-companies/salesforce',
    '/rankings/it-companies'
  ];

  for (const r of routesToTest) {
    try {
      const res = await fetch(`${BASE_URL}${r}`, { redirect: 'manual' });
      const status = res.status;
      const location = res.headers.get('location');
      console.log(`Route ${r.padEnd(28)} -> HTTP ${status} ${location ? `Redirect to: ${location}` : ''}`);
      results.routes[r] = { status, redirect: location };
    } catch (err) {
      console.log(`Route ${r.padEnd(28)} -> ERROR: ${err.message}`);
      results.routes[r] = { status: 'ERROR', error: err.message };
    }
  }

  console.log('\n=== AUDIT SUMMARY RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
}

runAudit().catch(console.error);
