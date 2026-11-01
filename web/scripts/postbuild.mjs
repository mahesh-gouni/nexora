// Writes sitemap.xml and robots.txt into the static build.
// Netlify sets URL to the site's primary address during builds.
import { writeFileSync } from "node:fs";

const site = (process.env.URL ?? "http://localhost:5173").replace(/\/$/, "");
const out = new URL("../build/client/", import.meta.url);
const pages = ["/", "/services", "/products", "/about", "/contact", "/privacy"];
const today = new Date().toISOString().slice(0, 10);

const urls = pages
  .map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");

writeFileSync(
  new URL("sitemap.xml", out),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(
  new URL("robots.txt", out),
  `User-agent: *\nAllow: /\nDisallow: /styleguide\n\nSitemap: ${site}/sitemap.xml\n`,
);
console.log(`postbuild: sitemap.xml + robots.txt for ${site}`);
