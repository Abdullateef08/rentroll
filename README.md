# RentRoll

A web app that keeps a small rental business in one place. The landlord signs
in and sees everything; the tenant opens one link and never signs in.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Supabase values
npm run dev
```

The application runs at http://localhost:3000.

| Route | Surface |
|---|---|
| `/` | Landlord workspace |
| `/u/:unitToken` | Tenant page |
| `/dev/components` | Development only — not present in a production build |

## Before you open a pull request

```bash
npm run verify
```

That runs the boundary check, TypeScript, ESLint, the tests and a production
build, in that order.

## Where things are written down

- [`spec/`](spec) — the specification. `spec/index.md` first; it explains the
  ID scheme, the screen map and the build order.
- [`docs/scaffold.md`](docs/scaffold.md) — the repository layout, the scripts,
  and the conventions this scaffold establishes.
- [`src/server/README.md`](src/server/README.md) — the server-only boundary
  between landlord and tenant code, and how it is enforced.

Contradictions in the source documents are catalogued with stable IDs in
[`spec/open-questions.md`](spec/open-questions.md). Do not resolve one silently
— reference its `OPEN-nn` id instead.
