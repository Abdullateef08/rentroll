/**
 * Which file extensions Next treats as routable files.
 *
 * Shared by `next.config.ts` and the test that guards the development-only
 * route convention, so the two can never drift apart.
 */
export const PRODUCTION_PAGE_EXTENSIONS = ["ts", "tsx"] as const;

export const DEVELOPMENT_ONLY_PAGE_EXTENSIONS = ["dev.ts", "dev.tsx"] as const;

export function pageExtensionsFor(nodeEnv: string | undefined): string[] {
  return nodeEnv === "production"
    ? [...PRODUCTION_PAGE_EXTENSIONS]
    : [...DEVELOPMENT_ONLY_PAGE_EXTENSIONS, ...PRODUCTION_PAGE_EXTENSIONS];
}

export const pageExtensions = pageExtensionsFor(process.env.NODE_ENV);
