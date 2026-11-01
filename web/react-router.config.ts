import type { Config } from "@react-router/dev/config";

// Static site: no server runtime. Every route listed here is rendered to
// HTML at build time and served from Netlify's CDN.
export const pages = [
  "/",
  "/services",
  "/products",
  "/about",
  "/contact",
  "/privacy",
  "/styleguide",
];

export default {
  ssr: false,
  prerender: pages,
} satisfies Config;
