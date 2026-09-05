/**
 * Tenant route group.
 *
 * Structurally separate from `(landlord)`: no sign-in, no navigation
 * (spec foundations §3), and no access to private landlord implementation.
 * Nothing under this group may import from `src/server/**` — enforced by
 * `npm run boundaries` and by the ESLint rule for this path.
 */
export default function TenantLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-route-group="tenant" className="min-h-dvh">
      {children}
    </div>
  );
}
