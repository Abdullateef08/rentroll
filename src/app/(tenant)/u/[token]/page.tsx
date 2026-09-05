import { isWellFormedUnitToken } from "@/lib/tenant-token";

/**
 * T-01 report a problem (`/u/:unitToken`). Placeholder only — the form is built
 * in phase 3.
 *
 * Token resolution is deliberately not implemented here: there is no schema
 * yet. What the scaffold fixes is the shape of the route and the fact that this
 * subtree cannot reach landlord internals.
 */
export default async function TenantUnitPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <main className="mx-auto max-w-md p-4">
      <h1 className="text-ink text-xl font-semibold">RentRoll</h1>
      <p className="mt-3 text-sm">Tenant page scaffold.</p>
      <p className="text-muted mt-1 text-sm">
        {isWellFormedUnitToken(token)
          ? "Unit link received."
          : "This link is not valid. Please ask your landlord for your unit link."}
      </p>
    </main>
  );
}
