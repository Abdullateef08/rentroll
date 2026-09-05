import type { NextConfig } from "next";

import { pageExtensions } from "./config/page-extensions";

const nextConfig: NextConfig = {
  /**
   * Development-only routes.
   *
   * A route file named `page.dev.tsx` is only a route when the build is a
   * development build. In a production build `dev.tsx` is absent from
   * `pageExtensions`, so Next never compiles the file and the route does not
   * exist in the deployed application. See `docs/scaffold.md`.
   */
  pageExtensions,

  typedRoutes: true,
};

export default nextConfig;
