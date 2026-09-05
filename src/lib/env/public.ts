/**
 * Public environment. Safe to read from anywhere, including client components
 * and the tenant route group. Only `NEXT_PUBLIC_*` values belong here.
 *
 * Values are read lazily so that a missing variable fails where it is used,
 * with a useful message, rather than at import time during a build.
 */
export type PublicEnv = {
  readonly supabaseUrl: string;
  readonly supabaseAnonKey: string;
};

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

export function readPublicEnv(): PublicEnv {
  return {
    supabaseUrl: required(
      "NEXT_PUBLIC_SUPABASE_URL",
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ),
    supabaseAnonKey: required(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
  };
}
