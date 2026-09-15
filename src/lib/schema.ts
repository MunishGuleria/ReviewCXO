import db from './db'

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at DATETIME,
    is_active BOOLEAN DEFAULT TRUE
  );

  CREATE TABLE IF NOT EXISTS submitted_reviews (
    id TEXT PRIMARY KEY,
    cxo_full_name TEXT NOT NULL,
    cxo_title TEXT NOT NULL,
    cxo_company_name TEXT NOT NULL,
    cxo_email TEXT NOT NULL,
    cxo_linkedin_url TEXT,
    it_company_id TEXT,
    it_company_name TEXT NOT NULL,
    project_title TEXT NOT NULL,
    project_category TEXT NOT NULL,
    problem_statement TEXT,
    ai_solution_description TEXT,
    tech_stack TEXT,
    team_size INTEGER,
    timeline_months INTEGER,
    budget_range TEXT,
    outcomes_description TEXT,
    roi_percentage INTEGER,
    efficiency_gain_percentage INTEGER,
    adoption_rate TEXT,
    challenges_faced TEXT,
    delivery_quality_rating INTEGER CHECK (delivery_quality_rating BETWEEN 1 AND 5),
    ai_effectiveness_rating INTEGER CHECK (ai_effectiveness_rating BETWEEN 1 AND 5),
    communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
    value_for_money_rating INTEGER CHECK (value_for_money_rating BETWEEN 1 AND 5),
    would_recommend BOOLEAN,
    overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
    is_anonymous BOOLEAN DEFAULT FALSE,
    review_type TEXT DEFAULT 'community' CHECK (review_type IN ('case_study', 'community', 'research')),
    source_url TEXT,
    source_type TEXT CHECK (source_type IN ('verified', 'public-research', 'self-reported')),
    last_verified DATETIME,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'pending_verification', 'approved', 'rejected')),
    admin_notes TEXT,
    verification_token TEXT,
    verified_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS evidence_records (
    id TEXT PRIMARY KEY,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('it_company', 'vendor', 'review')),
    entity_id TEXT NOT NULL,
    claim TEXT NOT NULL,
    source_url TEXT,
    source_name TEXT,
    source_type TEXT CHECK (source_type IN ('verified', 'public-research', 'self-reported')),
    retrieved_date DATETIME,
    verification_status TEXT DEFAULT 'unverified' CHECK (verification_status IN ('verified', 'unverified', 'disputed')),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_status ON submitted_reviews(status);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_company ON submitted_reviews(it_company_id);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_verification ON submitted_reviews(verification_token);
  CREATE INDEX IF NOT EXISTS idx_evidence_entity ON evidence_records(entity_type, entity_id);
  CREATE INDEX IF NOT EXISTS idx_evidence_status ON evidence_records(verification_status);

  CREATE TABLE IF NOT EXISTS submitted_questions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'General',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_submitted_questions_status ON submitted_questions(status);
`);

// Migration safeguard: Ensure all required columns exist in submitted_reviews
try {
  const existingCols = (db.pragma("table_info(submitted_reviews)") as Array<{ name: string }>).map((c) => c.name);
  const requiredCols = [
    { name: "review_type", type: "TEXT DEFAULT 'community'" },
    { name: "source_url", type: "TEXT" },
    { name: "source_type", type: "TEXT" },
    { name: "last_verified", type: "DATETIME" },
    { name: "verification_token", type: "TEXT" },
    { name: "verified_at", type: "DATETIME" },
  ];
  for (const col of requiredCols) {
    if (!existingCols.includes(col.name)) {
      try {
        db.exec(`ALTER TABLE submitted_reviews ADD COLUMN ${col.name} ${col.type}`);
      } catch {
        // column already exists or locked
      }
    }
  }
} catch (e) {
  console.warn("Could not check schema migrations:", e);
}

