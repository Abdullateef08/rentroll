import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Import paths that only server-side landlord code may reach.
 * `tools/check-boundaries.mjs` enforces the same rule transitively; this config
 * is the fast, in-editor first line of defence.
 */
const PRIVATE_SERVER_PATTERNS = [
  {
    group: ["@/server", "@/server/*", "@/server/**", "**/src/server/*"],
    message:
      "src/server/** is private, server-only landlord code. It may not be imported from tenant routes or from client components. See src/server/README.md.",
  },
];

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "node_modules/**",
      "coverage/**",
      // Deliberately-broken source used by tests/boundaries.test.ts.
      "tests/fixtures/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // The tenant route group is public, token-addressed and untrusted. Nothing
    // in it may reach private landlord implementation.
    files: ["src/app/(tenant)/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: PRIVATE_SERVER_PATTERNS }],
    },
  },
  {
    // Shared library code is imported by both route groups, so it inherits the
    // stricter of the two rules.
    files: ["src/lib/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: PRIVATE_SERVER_PATTERNS }],
    },
  },
];

export default eslintConfig;
