import { Metadata } from "next";
import { ResearchLayout } from "@/components/layout/ResearchLayout";
import { getAllQuestions } from "@/lib/questions";
import { getPendingReviews, getApprovedReviews } from "@/lib/reviews";
import { getVisibleVendors } from "@/lib/vendors";
import db from "@/lib/db";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard — Reviews CXO",
  description: "Secure administration and content management workspace.",
};

export default function AdminPage() {
  const questions = getAllQuestions();
  const publishedCount = questions.filter((q) => q.status === "published").length;
  const draftCount = questions.filter((q) => q.status === "draft").length;
  const pendingReviews = getPendingReviews();
  const approvedReviews = getApprovedReviews();
  const pendingQuestions = db.prepare("SELECT COUNT(*) as cnt FROM submitted_questions WHERE status = 'pending'").get() as { cnt: number };
  const vendors = getVisibleVendors();

  const totalPending = pendingReviews.length + pendingQuestions.cnt;

  return (
    <ResearchLayout
      badge="Admin Workspace"
      title="Content Management"
      description="Internal dashboard for managing Reviews CXO platform content, submissions, and datasets."
      backHref="/"
      backLabel="Return Home"
    >
      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface/50 border border-border/50 rounded-2xl p-5 flex flex-col justify-center items-start">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Total Vendors</span>
          <span className="text-2xl sm:text-3xl font-black text-foreground">{vendors.length}</span>
        </div>
        <div className="bg-surface/50 border border-border/50 rounded-2xl p-5 flex flex-col justify-center items-start">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Published Q&A</span>
          <span className="text-2xl sm:text-3xl font-black text-foreground">{publishedCount}</span>
        </div>
        <div className="bg-surface/50 border border-border/50 rounded-2xl p-5 flex flex-col justify-center items-start">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Total Reviews</span>
          <span className="text-2xl sm:text-3xl font-black text-foreground">{approvedReviews.length}</span>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex flex-col justify-center items-start relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity hidden sm:block">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary mb-1">Action Required</span>
          <span className="text-2xl sm:text-3xl font-black text-primary">{totalPending}</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Management Modules */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Core Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Reviews Module */}
            <Link href="/admin/reviews" className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/50 hover:shadow-md transition-all flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">Project Reviews</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">Manage incoming CXO reviews, approve valid submissions, and moderate feedback.</p>
              
              <div className="flex gap-4 items-center bg-background/50 p-3 rounded-lg border border-border/50">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-yellow-500 leading-none">{pendingReviews.length}</span>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground mt-1 tracking-wider">Pending</span>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-green-500 leading-none">{approvedReviews.length}</span>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground mt-1 tracking-wider">Approved</span>
                </div>
              </div>
            </Link>

            {/* Questions Module */}
            <Link href="/admin/questions" className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/50 hover:shadow-md transition-all flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50 group-hover:bg-purple-500 transition-colors"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </div>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">CXO Questions</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">Review submitted executive queries, draft analytical responses, and publish insights.</p>
              
              <div className="flex gap-4 items-center bg-background/50 p-3 rounded-lg border border-border/50">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-yellow-500 leading-none">{pendingQuestions.cnt}</span>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground mt-1 tracking-wider">Pending</span>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-foreground leading-none">{publishedCount}</span>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground mt-1 tracking-wider">Published</span>
                </div>
              </div>
            </Link>

            {/* Vendors Module */}
            <Link href="/admin/companies" className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/50 hover:shadow-md transition-all flex flex-col h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500/50 group-hover:bg-orange-500 transition-colors"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                </div>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">Platform Directory</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">Manage the vendor database, update ASCS scores, and modify platform parameters.</p>
              
              <div className="flex gap-4 items-center bg-background/50 p-3 rounded-lg border border-border/50">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-foreground leading-none">{vendors.length}</span>
                  <span className="text-[10px] font-bold uppercase text-muted-foreground mt-1 tracking-wider">Active Platforms</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-surface border border-border rounded-2xl p-6">
             <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
               Quick Actions
             </h2>
             <div className="space-y-3">
               <Link href="/admin/questions/new" className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background/50 hover:bg-surface-alt transition-colors group">
                 <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Draft New Research Question</span>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary transition-colors"><line x1="5" y1="12" x2="19" y2="12"></line><line x1="12" y1="5" x2="12" y2="19"></line></svg>
               </Link>
               <button disabled className="w-full flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background/50 opacity-60 cursor-not-allowed">
                 <span className="text-sm font-medium text-muted-foreground">Add New Vendor (Coming Soon)</span>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
               </button>
             </div>
          </div>
          
          <div className="bg-surface border border-border rounded-2xl p-6">
             <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
               System Status
             </h2>
             <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Database Connection</span>
                  </div>
                  <span className="text-xs font-mono bg-green-500/10 text-green-500 px-2 py-0.5 rounded">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">API Endpoints</span>
                  </div>
                  <span className="text-xs font-mono bg-green-500/10 text-green-500 px-2 py-0.5 rounded">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Verification Engine</span>
                  </div>
                  <span className="text-xs font-mono bg-green-500/10 text-green-500 px-2 py-0.5 rounded">Operational</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </ResearchLayout>
  );
}
