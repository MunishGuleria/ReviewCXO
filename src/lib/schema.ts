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
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'pending_verification', 'approved', 'rejected')),
    admin_notes TEXT,
    verification_token TEXT,
    verified_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_status ON submitted_reviews(status);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_company ON submitted_reviews(it_company_id);
  CREATE INDEX IF NOT EXISTS idx_submitted_reviews_verification ON submitted_reviews(verification_token);
`)
