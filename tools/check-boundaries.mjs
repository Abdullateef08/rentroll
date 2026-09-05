#!/usr/bin/env node
/**
 * Module boundary check.
 *
 * The tenant surface is public and unauthenticated, and the landlord surface is
 * not. This script proves - transitively, across the whole import graph - that
 * the two have not been wired together by accident.
 *
 * Rules enforced:
 *
 *   1. Nothing under `src/app/(tenant)/**` may reach `src/server/**`.
 *   2. No client component (the "use client" directive) may reach
 *      `src/server/**`.
 *   3. Nothing under `src/lib/**` may reach `src/server/**`, because both route
 *      groups import from there.
 *   4. Every module under `src/server/**` declares the server-only import.
 *
 * Run directly (`npm run boundaries`) or import `checkBoundaries()` from a test.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const RESOLVABLE_EXTENSIONS = [".ts", ".tsx", ".mts", ".js", ".jsx", ".mjs"];

const PRIVATE_SERVER_PREFIX = "src/server/";
const SERVER_ONLY_PACKAGE = "server-only";

/** Paths whose transitive imports must never reach private server code. */
const RESTRICTED_ROOTS = [
  {
    describe: "the tenant route group",
    matches: (id) => id.startsWith("src/app/(tenant)/"),
  },
  {
    describe: "shared library code",
    matches: (id) => id.startsWith("src/lib/"),
  },
];

function makeToPosix(repoRoot) {
  return (absolutePath) =>
    path.relative(repoRoot, absolutePath).split(path.sep).join("/");
}

/**
 * Remove comments so an import written inside a comment is not mistaken for a
 * real one. String contents are kept, because that is where specifiers live.
 */
function stripComments(source) {
  let out = "";
  let index = 0;
  let state = "code";
  let quote = "";

  while (index < source.length) {
    const char = source[index];
    const next = source[index + 1];

    if (state === "code") {
      if (char === "/" && next === "/") {
        state = "line-comment";
        index += 2;
        continue;
      }
      if (char === "/" && next === "*") {
        state = "block-comment";
        index += 2;
        continue;
      }
      if (char === '"' || char === "'" || char === "`") {
        state = "string";
        quote = char;
        out += char;
        index += 1;
        continue;
      }
      out += char;
      index += 1;
      continue;
    }

    if (state === "line-comment") {
      if (char === "\n") {
        state = "code";
        out += char;
      }
      index += 1;
      continue;
    }

    if (state === "block-comment") {
      if (char === "*" && next === "/") {
        state = "code";
        index += 2;
        continue;
      }
      if (char === "\n") out += char;
      index += 1;
      continue;
    }

    if (char === "\\") {
      out += source.slice(index, index + 2);
      index += 2;
      continue;
    }
    out += char;
    if (char === quote) state = "code";
    index += 1;
  }

  return out;
}

// The clause bodies exclude quotes and semicolons so a pattern can never run
// past the end of one statement and capture the next statement's specifier.
const IMPORT_PATTERNS = [
  /\bimport\s*["']([^"']+)["']/g, // side-effect import
  /\bimport\b[^"';]*?\bfrom\s*["']([^"']+)["']/g, // named, default, namespace
  /\bexport\b[^"';]*?\bfrom\s*["']([^"']+)["']/g, // re-export
  /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g, // dynamic import
  /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
];

const CLIENT_DIRECTIVE = /^\s*(?:"use client"|'use client')\s*;?/;

function readModule(absolutePath) {
  const raw = readFileSync(absolutePath, "utf8").replace(/^﻿/, "");
  const code = stripComments(raw);
  const specifiers = new Set();

  for (const pattern of IMPORT_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(code)) !== null) specifiers.add(match[1]);
  }

  return {
    specifiers: [...specifiers],
    isClientComponent: CLIENT_DIRECTIVE.test(code),
  };
}

function resolveSpecifier(specifier, fromAbsolutePath, sourceRoot) {
  let candidate;

  if (specifier.startsWith("@/")) {
    candidate = path.join(sourceRoot, specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    candidate = path.resolve(path.dirname(fromAbsolutePath), specifier);
  } else {
    return null; // A package, or a Next built-in. Not ours to police.
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;

  for (const extension of RESOLVABLE_EXTENSIONS) {
    const withExtension = candidate + extension;
    if (existsSync(withExtension)) return withExtension;
  }
  for (const extension of RESOLVABLE_EXTENSIONS) {
    const asIndex = path.join(candidate, "index" + extension);
    if (existsSync(asIndex)) return asIndex;
  }

  return null;
}

async function collectSourceFiles(directory) {
  const found = [];
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectSourceFiles(absolutePath)));
      continue;
    }
    if (RESOLVABLE_EXTENSIONS.includes(path.extname(entry.name))) {
      found.push(absolutePath);
    }
  }

  return found;
}

function findPathToPrivateCode(startAbsolutePath, modules, context) {
  const seen = new Set([startAbsolutePath]);
  const queue = [[startAbsolutePath]];

  while (queue.length > 0) {
    const chain = queue.shift();
    const current = chain[chain.length - 1];
    const moduleInfo = modules.get(current);
    if (!moduleInfo) continue;

    for (const specifier of moduleInfo.specifiers) {
      const resolved = resolveSpecifier(specifier, current, context.sourceRoot);
      if (!resolved || seen.has(resolved)) continue;
      seen.add(resolved);

      const nextChain = [...chain, resolved];
      if (context.toPosix(resolved).startsWith(PRIVATE_SERVER_PREFIX)) {
        return nextChain;
      }
      queue.push(nextChain);
    }
  }

  return null;
}

/**
 * @param {{ repoRoot?: string }} [options] - defaults to this repository; a
 *   different root is used by the test that proves the check actually bites.
 * @returns {Promise<{ violations: string[], checkedFiles: number }>}
 */
export async function checkBoundaries(options = {}) {
  const repoRoot = options.repoRoot ?? DEFAULT_REPO_ROOT;
  const sourceRoot = path.join(repoRoot, "src");
  const toPosix = makeToPosix(repoRoot);
  const context = { sourceRoot, toPosix };

  const files = await collectSourceFiles(sourceRoot);
  const modules = new Map();

  for (const absolutePath of files) {
    modules.set(absolutePath, readModule(absolutePath));
  }

  const violations = [];

  // Rule 4 - private modules announce themselves to the bundler.
  for (const [absolutePath, moduleInfo] of modules) {
    const id = toPosix(absolutePath);
    if (!id.startsWith(PRIVATE_SERVER_PREFIX)) continue;
    if (!moduleInfo.specifiers.includes(SERVER_ONLY_PACKAGE)) {
      violations.push(
        id + " is private server code but does not import " + SERVER_ONLY_PACKAGE + ".",
      );
    }
  }

  // Rules 1-3 - no restricted entry point may reach private server code.
  const roots = [];
  for (const [absolutePath, moduleInfo] of modules) {
    const id = toPosix(absolutePath);
    if (id.startsWith(PRIVATE_SERVER_PREFIX)) continue;

    const matched = RESTRICTED_ROOTS.find((root) => root.matches(id));
    if (matched) {
      roots.push({ absolutePath, reason: matched.describe });
    } else if (moduleInfo.isClientComponent) {
      roots.push({ absolutePath, reason: "a client component" });
    }
  }

  for (const root of roots) {
    const chain = findPathToPrivateCode(root.absolutePath, modules, context);
    if (chain) {
      violations.push(
        toPosix(root.absolutePath) +
          " is " +
          root.reason +
          " and must not reach private server code.\n    import chain: " +
          chain.map(toPosix).join("\n               -> "),
      );
    }
  }

  return { violations, checkedFiles: modules.size };
}

async function main() {
  const { violations, checkedFiles } = await checkBoundaries();

  if (violations.length > 0) {
    console.error("Boundary check failed - " + violations.length + " violation(s):\n");
    for (const violation of violations) console.error("  - " + violation + "\n");
    console.error("See src/server/README.md for the rule and how to fix it.");
    process.exitCode = 1;
    return;
  }

  console.log("Boundary check passed - " + checkedFiles + " module(s) inspected.");
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) await main();
