import type { Config } from "@react-router/dev/config";

// Static site: no server runtime. Every route listed in `prerender`
// is rendered to HTML at build time and served from Netlify's CDN.
export default {
  ssr: false,
  prerender: ["/"],
} satisfies Config;
