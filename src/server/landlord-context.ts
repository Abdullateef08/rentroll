import "server-only";

/**
 * Placeholder for the landlord request context that later tickets will build
 * (which landlord, which property, what they may see).
 *
 * It exists now so the scaffold has a real private module for the boundary
 * checks to bite on, and so landlord pages import from `@/server` from the
 * first commit rather than being retrofitted later.
 */
export async function describeLandlordDataAccess(): Promise<string> {
  return "Server-only landlord context. No data source is wired up yet.";
}
