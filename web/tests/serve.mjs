// Minimal static server for e2e tests that mimics Netlify:
// /path -> /path/index.html, unknown paths -> __spa-fallback.html with 404,
// POST / -> 200 (Netlify Forms would accept it).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const root = new URL("../build/client/", import.meta.url).pathname;
const port = Number(process.env.PORT ?? 4174);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

async function resolveFile(pathname) {
  const safe = normalize(decodeURIComponent(pathname)).replace(
    /^(\.\.[/\\])+/,
    "",
  );
  for (const candidate of [safe, join(safe, "index.html")]) {
    const file = join(root, candidate);
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {
      // try next candidate
    }
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  if (req.method === "POST") {
    res.writeHead(200).end("ok");
    return;
  }
  const file = await resolveFile(pathname);
  const target = file ?? join(root, "__spa-fallback.html");
  const type = types[extname(target)] ?? "application/octet-stream";
  let body = await readFile(target);
  const headers = { "Content-Type": type };
  if (pathname.startsWith("/assets/")) {
    headers["Cache-Control"] = "public, max-age=31536000, immutable";
  }
  // Compress text like Netlify's CDN does.
  if (
    /text|javascript|xml|svg/.test(type) &&
    /gzip/.test(req.headers["accept-encoding"] ?? "")
  ) {
    body = gzipSync(body);
    headers["Content-Encoding"] = "gzip";
  }
  res.writeHead(file ? 200 : 404, headers);
  res.end(body);
}).listen(port, () => console.log(`serving ${root} on :${port}`));
