/**
 * Unit tokens are long and random; a unit number is never used in the URL
 * (spec cross-cutting §5). This is a shape check only — it says nothing about
 * whether a token exists or is still valid, which is a database question and
 * therefore out of scope for the scaffold.
 */
const UNIT_TOKEN_PATTERN = /^[A-Za-z0-9_-]{22,64}$/;

export function isWellFormedUnitToken(token: string): boolean {
  return UNIT_TOKEN_PATTERN.test(token);
}
