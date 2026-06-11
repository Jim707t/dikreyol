import { createClient } from "@supabase/supabase-js";

// Server-side client (no session persistence) for server components,
// sitemap generation and metadata.
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  { auth: { persistSession: false, autoRefreshToken: false } }
);
