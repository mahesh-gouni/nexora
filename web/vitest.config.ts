import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  define: { __SITE_URL__: JSON.stringify("http://localhost:5173") },
  test: { include: ["tests/unit/**/*.test.ts"], environment: "node" },
});
