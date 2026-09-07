import db from './db'

export function subscribeToNewsletter(email: string): boolean {
  try {
    db.prepare("INSERT INTO newsletter_subscribers (id, email) VALUES (?, ?)").run(`sub-${Date.now()}`, email)
    return true
  } catch {
    return false
  }
}

export function isEmailSubscribed(email: string): boolean {
  const row = db.prepare("SELECT id FROM newsletter_subscribers WHERE email = ? AND is_active = 1").get(email) as { id: string } | undefined
  return !!row
}

export function getSubscriberCount(): number {
  const row = db.prepare("SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = 1").get() as { count: number }
  return row.count
}

export function submitProjectReview(data: {
  cxo_full_name: string
  cxo_title: string
  cxo_company_name: string
  cxo_email: string
  cxo_linkedin_url?: string
  it_company_id?: string
  it_company_name: string
  project_title: string
  project_category: string
  problem_statement?: string
  ai_solution_description?: string
  tech_stack?: string[]
  team_size?: number
  timeline_months?: number
  budget_range?: string
  outcomes_description?: string
  roi_percentage?: number
  efficiency_gain_percentage?: number
  adoption_rate?: string
  challenges_faced?: string
  delivery_quality_rating?: number
  ai_effectiveness_rating?: number
  communication_rating?: number
  value_for_money_rating?: number
  would_recommend?: boolean
  overall_rating?: number
  is_anonymous?: boolean
}): string {
  const id = `review-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  db.prepare(`
    INSERT INTO submitted_reviews (
      id, cxo_full_name, cxo_title, cxo_company_name, cxo_email, cxo_linkedin_url,
      it_company_id, it_company_name, project_title, project_category,
      problem_statement, ai_solution_description, tech_stack,
      team_size, timeline_months, budget_range, outcomes_description,
      roi_percentage, efficiency_gain_percentage, adoption_rate, challenges_faced,
      delivery_quality_rating, ai_effectiveness_rating, communication_rating,
      value_for_money_rating, would_recommend, overall_rating, is_anonymous
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id, data.cxo_full_name, data.cxo_title, data.cxo_company_name, data.cxo_email,
    data.cxo_linkedin_url || null, data.it_company_id || null, data.it_company_name,
    data.project_title, data.project_category, data.problem_statement || null,
    data.ai_solution_description || null, JSON.stringify(data.tech_stack || []),
    data.team_size || null, data.timeline_months || null, data.budget_range || null,
    data.outcomes_description || null, data.roi_percentage || null,
    data.efficiency_gain_percentage || null, data.adoption_rate || null,
    data.challenges_faced || null, data.delivery_quality_rating || null,
    data.ai_effectiveness_rating || null, data.communication_rating || null,
    data.value_for_money_rating || null, data.would_recommend ? 1 : 0,
    data.overall_rating || null, data.is_anonymous ? 1 : 0
  )
  return id
}

export function getPendingSubmittedReviews() {
  return db.prepare("SELECT * FROM submitted_reviews WHERE status = 'pending' ORDER BY created_at DESC").all()
}

export function getApprovedSubmittedReviews() {
  return db.prepare("SELECT * FROM submitted_reviews WHERE status = 'approved' ORDER BY created_at DESC").all()
}

export function approveSubmittedReview(id: string) {
  db.prepare("UPDATE submitted_reviews SET status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(id)
}

export function rejectSubmittedReview(id: string, adminNotes: string) {
  db.prepare("UPDATE submitted_reviews SET status = 'rejected', admin_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(adminNotes, id)
}
