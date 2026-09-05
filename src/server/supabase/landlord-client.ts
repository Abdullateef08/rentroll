import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { readPublicEnv } from "@/lib/env/public";

/**
 * Supabase client for landlord server components and route handlers.
 *
 * Private: this module is server-only and lives outside `src/lib` on purpose.
 * Tenant pages must never construct a landlord-scoped client, so they must
 * never be able to reach this file.
 */
export async function createSupabaseLandlordClient() {
  const env = readPublicEnv();
  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
      },
    },
  });
}
