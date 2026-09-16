import supabase from './db'

export async function subscribeToNewsletter(email: string): Promise<boolean> {
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ id: `sub-${Date.now()}`, email });
  return !error;
}

export async function isEmailSubscribed(email: string): Promise<boolean> {
  const { data } = await supabase
    .from("newsletter_subscribers")
    .select("id")
    .eq("email", email)
    .eq("is_active", true)
    .single();
  return !!data;
}

export async function getSubscriberCount(): Promise<number> {
  const { count } = await supabase
    .from("newsletter_subscribers")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true);
  return count || 0;
}

export async function submitProjectReview(data: {
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
  review_type?: 'case_study' | 'community' | 'research'
  source_url?: string
  source_type?: 'verified' | 'public-research' | 'self-reported'
}): Promise<string> {
  const id = `review-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  await supabase.from("submitted_reviews").insert({
    id,
    cxo_full_name: data.cxo_full_name,
    cxo_title: data.cxo_title,
    cxo_company_name: data.cxo_company_name,
    cxo_email: data.cxo_email,
    cxo_linkedin_url: data.cxo_linkedin_url || null,
    it_company_id: data.it_company_id || null,
    it_company_name: data.it_company_name,
    project_title: data.project_title,
    project_category: data.project_category,
    problem_statement: data.problem_statement || null,
    ai_solution_description: data.ai_solution_description || null,
    tech_stack: JSON.stringify(data.tech_stack || []),
    team_size: data.team_size || null,
    timeline_months: data.timeline_months || null,
    budget_range: data.budget_range || null,
    outcomes_description: data.outcomes_description || null,
    roi_percentage: data.roi_percentage || null,
    efficiency_gain_percentage: data.efficiency_gain_percentage || null,
    adoption_rate: data.adoption_rate || null,
    challenges_faced: data.challenges_faced || null,
    delivery_quality_rating: data.delivery_quality_rating || null,
    ai_effectiveness_rating: data.ai_effectiveness_rating || null,
    communication_rating: data.communication_rating || null,
    value_for_money_rating: data.value_for_money_rating || null,
    would_recommend: data.would_recommend || false,
    overall_rating: data.overall_rating || null,
    is_anonymous: data.is_anonymous || false,
    review_type: data.review_type || "community",
    source_url: data.source_url || null,
    source_type: data.source_type || null,
  });
  return id;
}

export async function getPendingSubmittedReviews() {
  const { data } = await supabase
    .from("submitted_reviews")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getApprovedSubmittedReviews() {
  const { data } = await supabase
    .from("submitted_reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getApprovedSubmittedReviewsForVendor(vendorSlugOrId: string) {
  const { data } = await supabase
    .from("submitted_reviews")
    .select("*")
    .eq("status", "approved")
    .or(`it_company_id.eq.${vendorSlugOrId},it_company_name.eq.${vendorSlugOrId}`)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function approveSubmittedReview(id: string) {
  await supabase
    .from("submitted_reviews")
    .update({ status: "approved", updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function rejectSubmittedReview(id: string, adminNotes: string) {
  await supabase
    .from("submitted_reviews")
    .update({ status: "rejected", admin_notes: adminNotes, updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function addEvidenceRecord(data: {
  entity_type: 'it_company' | 'vendor' | 'review'
  entity_id: string
  claim: string
  source_url?: string
  source_name?: string
  source_type?: 'verified' | 'public-research' | 'self-reported'
  retrieved_date?: string
  verification_status?: 'verified' | 'unverified' | 'disputed'
  notes?: string
}): Promise<string> {
  const id = `evidence-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  await supabase.from("evidence_records").insert({
    id,
    entity_type: data.entity_type,
    entity_id: data.entity_id,
    claim: data.claim,
    source_url: data.source_url || null,
    source_name: data.source_name || null,
    source_type: data.source_type || null,
    retrieved_date: data.retrieved_date || null,
    verification_status: data.verification_status || "unverified",
    notes: data.notes || null,
  });
  return id;
}

export async function getEvidenceRecords(entityType: string, entityId: string) {
  const { data } = await supabase
    .from("evidence_records")
    .select("*")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function updateEvidenceVerification(id: string, status: 'verified' | 'unverified' | 'disputed', notes?: string) {
  await supabase
    .from("evidence_records")
    .update({ verification_status: status, notes: notes || null, updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function getAllEvidenceRecords() {
  const { data } = await supabase
    .from("evidence_records")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}
