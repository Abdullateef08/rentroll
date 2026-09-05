# `src/server` — private, server-only

Everything in this directory is landlord-side implementation. It may read
privileged environment variables, hold service credentials and issue queries
that assume a signed-in landlord.

## The rule

`src/server/**` may be imported by:

- server components and route handlers under `src/app/(landlord)/**`
- other modules inside `src/server/**`

It may **not** be imported by:

- anything under `src/app/(tenant)/**`
- any client component (a file with the `"use client"` directive), or anything
  such a file imports
- anything under `src/lib/**`, which both route groups share

The rule is transitive: an import chain that ends here is a violation even when
no single file names `@/server` directly.

## How it is enforced

| Layer | What it catches | When |
|---|---|---|
| `import "server-only"` | A client bundle pulling in this code | `npm run build` |
| ESLint `no-restricted-imports` | A direct import from a tenant or shared file | `npm run lint`, and in the editor |
| `tools/check-boundaries.mjs` | Transitive chains the two above cannot see | `npm run boundaries`, `npm run test` |

If tenant code needs something from here, the answer is to move the safe part
into `src/lib/**`, not to relax the boundary. The tenant surface is public and
unauthenticated, and money must stay private (spec cross-cutting §1.2).
