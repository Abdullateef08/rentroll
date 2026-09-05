/**
 * Development-only route: `/dev/components`.
 *
 * The `.dev.tsx` suffix is the convention. `next.config.ts` only lists
 * `dev.tsx` in `pageExtensions` outside a production build, so this file is
 * simply not a route when the application is built for production — it is not
 * compiled, not bundled and not reachable.
 *
 * This page is where the phase-1 component library (spec foundations §2.4) will
 * be exercised in isolation. It ships nothing to users.
 */
export default function DevComponentsPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-ink text-xl font-semibold">Component gallery</h1>
      <p className="text-muted mt-2 text-sm">
        Development only. This route does not exist in a production build.
      </p>
    </main>
  );
}
