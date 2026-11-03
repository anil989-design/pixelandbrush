-- =============================================================================
-- Pixel & Brush — Supabase PostgreSQL Performance Indexes
-- Run in Supabase Dashboard → SQL Editor
-- =============================================================================

-- 1. Website Contact Inquiries (`messages`)
-- Optimizes paginated admin queries ordered by `created_at DESC`
CREATE INDEX IF NOT EXISTS idx_messages_created_at_desc
  ON public.messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_messages_sender_email
  ON public.messages (sender_email);

-- 2. Client Portal Chat (`client_messages`)
-- Optimizes bounded chat history queries and unread admin reply counts
CREATE INDEX IF NOT EXISTS idx_client_messages_created_at_desc
  ON public.client_messages (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_client_messages_admin_created_at
  ON public.client_messages (is_admin, created_at DESC)
  WHERE is_admin = true;

-- 3. Project Deliverables (`project_files`)
-- Optimizes file list sorting in the Client Dashboard
CREATE INDEX IF NOT EXISTS idx_project_files_created_at_desc
  ON public.project_files (created_at DESC);

-- 4. Milestone Approvals (`approvals`)
-- Optimizes approval list sorting and status filtering
CREATE INDEX IF NOT EXISTS idx_approvals_created_at_desc
  ON public.approvals (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_approvals_status
  ON public.approvals (status);

-- 5. Client Invoices (`invoices`)
-- Optimizes invoice sorting in the Client Dashboard
CREATE INDEX IF NOT EXISTS idx_invoices_created_at_desc
  ON public.invoices (created_at DESC);

-- 6. Active Client Projects (`projects`)
-- Optimizes primary project lookup and update by title
CREATE INDEX IF NOT EXISTS idx_projects_title
  ON public.projects (title);
