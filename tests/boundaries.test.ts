import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { checkBoundaries } from "../tools/check-boundaries.mjs";

const testsDirectory = path.dirname(fileURLToPath(import.meta.url));

describe("module boundaries", () => {
  it("holds across the application source tree", async () => {
    const { violations, checkedFiles } = await checkBoundaries();

    expect(violations).toEqual([]);
    expect(checkedFiles).toBeGreaterThan(0);
  });

  it("catches a tenant route that reaches private server code through a shared module", async () => {
    const { violations } = await checkBoundaries({
      repoRoot: path.join(testsDirectory, "fixtures", "violating-app"),
    });

    expect(violations).toHaveLength(2);

    const tenantViolation = violations.find((violation) =>
      violation.startsWith("src/app/(tenant)/"),
    );
    expect(tenantViolation).toBeDefined();
    expect(tenantViolation).toContain("the tenant route group");
    // The tenant page never names @/server itself; the chain runs through
    // src/lib. A check that only looked at direct imports would miss this.
    expect(tenantViolation).toContain("src/lib/reporting.ts");
    expect(tenantViolation).toContain("src/server/landlord-secrets.ts");

    const sharedViolation = violations.find((violation) =>
      violation.startsWith("src/lib/"),
    );
    expect(sharedViolation).toContain("shared library code");
  });
});
