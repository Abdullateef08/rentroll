import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import {
  DEVELOPMENT_ONLY_PAGE_EXTENSIONS,
  pageExtensionsFor,
} from "../config/page-extensions";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const devRouteRoot = path.join(repoRoot, "src", "app", "dev");

async function listFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath)));
    } else {
      files.push(absolutePath);
    }
  }

  return files;
}

describe("development-only routes", () => {
  it("are routable in development", () => {
    const extensions = pageExtensionsFor("development");

    for (const devExtension of DEVELOPMENT_ONLY_PAGE_EXTENSIONS) {
      expect(extensions).toContain(devExtension);
    }
  });

  it("are not routable in a production build", () => {
    const extensions = pageExtensionsFor("production");

    for (const devExtension of DEVELOPMENT_ONLY_PAGE_EXTENSIONS) {
      expect(extensions).not.toContain(devExtension);
    }
  });

  it("every file under src/app/dev uses the development-only suffix", async () => {
    const files = await listFiles(devRouteRoot);

    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const isDevOnly = DEVELOPMENT_ONLY_PAGE_EXTENSIONS.some((extension) =>
        file.endsWith("." + extension),
      );
      expect(isDevOnly, path.relative(repoRoot, file) + " would ship to production").toBe(
        true,
      );
    }
  });
});
