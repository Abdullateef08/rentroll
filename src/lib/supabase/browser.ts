import { createBrowserClient } from "@supabase/ssr";

import { readPublicEnv } from "@/lib/env/public";

/**
 * Supabase client for the browser. Uses the anonymous key only, so every query
 * it makes is subject to row-level security.
 *
 * Shared: both route groups may use this. Anything that needs more privilege
 * than the anonymous key belongs in `src/server/**` instead.
 */
export function createSupabaseBrowserClient() {
  const env = readPublicEnv();
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}
