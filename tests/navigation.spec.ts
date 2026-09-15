import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Navigation Links", () => {
  test("home page loads and has correct links", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator("h1")).toBeVisible();

    // Check hero buttons
    const rankingsBtn = page.locator('a[href="/rankings"]').first();
    await expect(rankingsBtn).toBeVisible();
  });

  test("desktop nav - Rankings is a direct link", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL);

    const rankingsLink = page.locator('nav a[href="/rankings"]');
    await expect(rankingsLink).toBeVisible();
    await rankingsLink.click();
    await expect(page).toHaveURL(/\/rankings/);
  });

  test("desktop nav - Explore dropdown works", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL);

    // Click Explore dropdown
    const exploreBtn = page.locator("button").filter({ hasText: "Explore" });
    await exploreBtn.hover();
    await page.waitForTimeout(200);

    // Check Platforms link appears
    const platformsLink = page.locator('a[href="/vendors"]').first();
    await expect(platformsLink).toBeVisible();
  });

  test("desktop nav - Community dropdown works", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL);

    // Click Community dropdown
    const communityBtn = page.locator("button").filter({ hasText: "Community" });
    await communityBtn.hover();
    await page.waitForTimeout(200);

    // Check Questions link appears
    const questionsLink = page.locator('a[href="/questions"]').first();
    await expect(questionsLink).toBeVisible();
  });

  test("Compare is hidden from navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL);

    // Compare should not be visible in nav
    const compareLink = page.locator('nav a[href="/compare"]');
    await expect(compareLink).toHaveCount(0);
  });

  test("Benchmarks is hidden from navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL);

    // Benchmarks should not be visible in nav
    const benchmarksLink = page.locator('nav a[href="/benchmarks"]');
    await expect(benchmarksLink).toHaveCount(0);
  });
});

test.describe("Page Navigation", () => {
  test("navigate to Rankings page", async ({ page }) => {
    await page.goto(`${BASE_URL}/rankings`);
    await expect(page).toHaveTitle(/Rankings/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("navigate to Platforms page", async ({ page }) => {
    await page.goto(`${BASE_URL}/vendors`);
    await expect(page).toHaveTitle(/Platforms/);
    await expect(page.locator("h1")).toContainText("Enterprise AI Platform");
  });

  test("navigate to Questions page", async ({ page }) => {
    await page.goto(`${BASE_URL}/questions`);
    await expect(page).toHaveTitle(/Questions/);
    await expect(page.locator("h1")).toContainText("Enterprise AI Questions");
  });

  test("navigate to Methodology page", async ({ page }) => {
    await page.goto(`${BASE_URL}/about/methodology`);
    await expect(page).toHaveTitle(/Methodology/);
    await expect(page.locator("h1")).toContainText("Evaluate");
  });

  test("navigate to About page", async ({ page }) => {
    await page.goto(`${BASE_URL}/about`);
    await expect(page).toHaveTitle(/About/);
  });
});

test.describe("Question Detail Pages", () => {
  test("question detail page loads correctly", async ({ page }) => {
    await page.goto(`${BASE_URL}/questions/salesforce-agentforce-roi-worth-enterprise-investment`);
    
    // Check page loads
    await expect(page.locator("h1")).toBeVisible();
    
    // Check Analysis section exists
    const analysisSection = page.locator("text=Reviews CXO Analysis");
    await expect(analysisSection).toBeVisible();
  });

  test("question detail has Key Findings section", async ({ page }) => {
    await page.goto(`${BASE_URL}/questions/salesforce-agentforce-roi-worth-enterprise-investment`);
    
    // Check Key Findings exists - use heading selector
    const findingsSection = page.getByRole("heading", { name: "Key Findings" });
    await expect(findingsSection).toBeVisible();
  });

  test("question detail has Related Platforms section", async ({ page }) => {
    await page.goto(`${BASE_URL}/questions/salesforce-agentforce-roi-worth-enterprise-investment`);
    
    const relatedSection = page.locator("text=Related Platforms");
    await expect(relatedSection).toBeVisible();
  });

  test("question detail - no Related Research section", async ({ page }) => {
    await page.goto(`${BASE_URL}/questions/salesforce-agentforce-roi-worth-enterprise-investment`);
    
    // Related Research should not exist
    const relatedResearch = page.locator("text=Related Research");
    await expect(relatedResearch).toHaveCount(0);
  });
});

test.describe("Vendor Pages", () => {
  test("vendor page loads with ASCS score", async ({ page }) => {
    await page.goto(`${BASE_URL}/vendors/salesforce`);
    
    await expect(page.locator("h1")).toContainText("Salesforce");
    
    // Check ASCS score is visible
    const score = page.locator("text=/\\d+\\.\\d+/").first();
    await expect(score).toBeVisible();
  });

  test("vendor page has back link to Platforms", async ({ page }) => {
    await page.goto(`${BASE_URL}/vendors/salesforce`);
    
    // Look for any link that goes back to vendors
    const backLink = page.locator('a[href="/vendors"]').first();
    await expect(backLink).toBeAttached();
  });
});

test.describe("Footer Links", () => {
  test("footer does not contain Compare link", async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    // Compare should not be in footer
    const footerCompare = page.locator('footer a[href="/compare"]');
    await expect(footerCompare).toHaveCount(0);
  });

  test("footer does not contain Benchmarks link", async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    // Benchmarks should not be in footer
    const footerBenchmarks = page.locator('footer a[href="/benchmarks"]');
    await expect(footerBenchmarks).toHaveCount(0);
  });

  test("footer contains Questions link", async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    const footerQuestions = page.locator('footer a[href="/questions"]');
    await expect(footerQuestions).toBeVisible();
  });
});

test.describe("Mobile Navigation", () => {
  test("mobile menu opens and shows Rankings", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Click hamburger menu
    const menuBtn = page.locator('button[aria-label="Toggle menu"]');
    await menuBtn.click();
    await page.waitForTimeout(500);
    
    // Check Rankings is visible inside the mobile drawer
    const rankingsLink = page.locator('.fixed nav a[href="/rankings"].block');
    await expect(rankingsLink).toBeVisible();
  });

  test("mobile menu - Compare is hidden", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Click hamburger menu
    const menuBtn = page.locator('button[aria-label="Toggle menu"]');
    await menuBtn.click();
    await page.waitForTimeout(500);
    
    // Compare should not be visible
    const compareLink = page.locator('a[href="/compare"]');
    await expect(compareLink).toHaveCount(0);
  });

  test("mobile menu - Benchmarks is hidden", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    
    // Click hamburger menu
    const menuBtn = page.locator('button[aria-label="Toggle menu"]');
    await menuBtn.click();
    await page.waitForTimeout(500);
    
    // Benchmarks should not be visible
    const benchmarksLink = page.locator('a[href="/benchmarks"]');
    await expect(benchmarksLink).toHaveCount(0);
  });
});
