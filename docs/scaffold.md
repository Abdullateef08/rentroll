# Scaffold

What this repository contains after ticket P0, and the conventions later tickets
must build on top of. Product behaviour is specified in [`spec/`](../spec) — none
of it is implemented yet.

## Stack

| Piece | Choice |
|---|---|
| Framework | Next.js 16, App Router, Turbopack |
| Language | TypeScript, `strict` plus `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS 4, tokens defined in `src/app/globals.css` |
| Data | Supabase (`@supabase/ssr`) |
| Tests | Vitest |

## Layout

```
config/page-extensions.ts     which files Next treats as routes (see below)
docs/                         this file
spec/                         the specification (ticket C1)
src/
  app/
    layout.tsx                root layout, shared by both route groups
    globals.css               design tokens from spec/foundations.md §1
    (landlord)/               landlord surface — signed in, sees everything
    (tenant)/u/[token]/       tenant surface — public link, no sign-in
    dev/                      development-only routes
  lib/                        shared, safe in any environment
  server/                     PRIVATE, server-only landlord code
tests/                        Vitest suites and their fixtures
tools/check-boundaries.mjs    the boundary check
```

### Route groups

`(landlord)` and `(tenant)` are separate route groups sharing only the root
layout. They exist as separate trees because they are separate trust domains,
not because their URLs differ:

- The landlord surface requires a session (spec cross-cutting §5, test 6).
- The tenant surface is reached by an unguessable unit token, with no sign-in
  and no navigation (spec foundations §3), and must never carry rent amounts,
  costs, other units or other tenants (spec cross-cutting §1.2).

Because the tenant surface is the one an attacker can reach without credentials,
its code is prevented from importing landlord internals at all — see below.

## The server-only boundary

`src/server/**` is private landlord implementation. The rule, and the three
layers that enforce it, are documented in
[`src/server/README.md`](../src/server/README.md).

In short:

- **Allowed:** `src/app/(landlord)/**` → `src/server/**`, and `src/server/**` →
  itself.
- **Forbidden, transitively:** `src/app/(tenant)/**`, `src/lib/**` and any
  client component reaching `src/server/**`.

Code that both surfaces need goes in `src/lib/**`, which is held to the tenant
side's rules.

Run it with `npm run boundaries`. It is also a test, so `npm run test` covers it,
and `tests/boundaries.test.ts` additionally checks the check itself against a
deliberately-broken fixture tree — including a violation that only shows up
transitively, through a shared module.

## Development-only routes

A route file named `page.dev.tsx` exists only in development.

`config/page-extensions.ts` lists `dev.ts` and `dev.tsx` in Next's
`pageExtensions` when `NODE_ENV` is not `production`. `next build` sets
`NODE_ENV=production`, so in a production build those extensions are absent,
Next never treats the file as a route, and it is neither compiled nor bundled.

`src/app/dev/components/page.dev.tsx` is the first of these — the place the
phase-1 component library (spec foundations §2.4) will be exercised in
isolation.

`tests/dev-routes.test.ts` guards the convention: every file under
`src/app/dev/` must carry the suffix, and the production extension list must not
contain it.

## Environment

Copy `.env.example` to `.env.local`. Only the Supabase URL and anonymous key are
needed; anything more privileged belongs in `src/server/**` and must not use a
`NEXT_PUBLIC_` name.

`src/lib/env/public.ts` reads these lazily, so a missing value fails at the point
of use with a message that says what to do, rather than breaking the build.

## Scripts

| Script | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test` | Vitest, once |
| `npm run boundaries` | The boundary check on its own |
| `npm run verify` | boundaries → typecheck → lint → test → build |

`npm run verify` is the gate. Run it before opening a pull request.

## Known version constraint

ESLint is pinned to 9.x. `eslint-config-next@16` bundles a version of
`eslint-plugin-react` that uses the ESLint 9 rule context API and crashes under
ESLint 10. Revisit when `eslint-config-next` ships an ESLint 10 compatible
plugin set.
