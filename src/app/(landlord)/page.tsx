import { describeLandlordDataAccess } from "@/server/landlord-context";

/**
 * L-03 portfolio dashboard route (`/`). Placeholder only — the dashboard is
 * built in phase 6.
 *
 * This is a server component inside the landlord route group, so it is allowed
 * to reach into `src/server/**`.
 */
export default async function LandlordHomePage() {
  const access = await describeLandlordDataAccess();

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-ink text-xl font-semibold">RentRoll</h1>
      <p className="mt-3 text-sm">Landlord workspace scaffold.</p>
      <p className="text-muted mt-1 text-sm">{access}</p>
    </main>
  );
}
