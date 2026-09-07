import db from './db'

db.exec(`
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
    review_type TEXT DEFAULT 'cxo_review' CHECK (review_type IN ('cxo_review', 'public_research', 'third_party_citation')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'pending_verification', 'approved', 'rejected')),
    admin_notes TEXT,
    verification_token TEXT,
    verified_at DATETIME,
    source_url TEXT,
    source_name TEXT,
    source_type TEXT,
    source_published_date TEXT,
    discovered_date TEXT,
    attribution TEXT,
    verification_status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS evidence_records (
    id TEXT PRIMARY KEY,
    it_company_id TEXT NOT NULL,
    it_company_name TEXT NOT NULL,
    project_title TEXT,
    customer_name TEXT,
    industry TEXT,
    year INTEGER,
    ai_category TEXT,
    solution_description TEXT,
    technologies TEXT,
    outcomes TEXT,
    evidence_type TEXT NOT NULL,
    source_name TEXT NOT NULL,
    source_url TEXT,
    source_published_date TEXT,
    discovered_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    attribution TEXT,
    verification_status TEXT DEFAULT 'unverified',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_status ON submitted_reviews(status);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_company ON submitted_reviews(it_company_id);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_verification ON submitted_reviews(verification_token);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_type ON submitted_reviews(review_type);
  CREATE INDEX IF NOT EXISTS idx_evidence_records_company ON evidence_records(it_company_id);
  CREATE INDEX IF NOT EXISTS idx_evidence_records_status ON evidence_records(status);
`)
