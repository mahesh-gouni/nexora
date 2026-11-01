import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Netlify provides URL (the site's primary address) during builds.
const siteUrl = (process.env.URL ?? "http://localhost:5173").replace(/\/$/, "");

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  define: {
    __SITE_URL__: JSON.stringify(siteUrl),
  },
  resolve: {
    tsconfigPaths: true,
  },
});
