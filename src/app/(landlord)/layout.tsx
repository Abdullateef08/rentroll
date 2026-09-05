/**
 * Landlord route group.
 *
 * Every route below this layout requires a signed-in landlord (spec
 * cross-cutting §5, test 6). Authentication itself is not part of this
 * scaffold — this layout exists so the boundary has a place to live.
 */
export default function LandlordLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div data-route-group="landlord">{children}</div>;
}
