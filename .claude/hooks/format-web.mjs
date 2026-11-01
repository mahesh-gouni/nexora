// PostToolUse hook: run Prettier on a file Claude just edited inside web/.
// Never blocks the session: any failure exits 0 quietly.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

let raw = "";
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  try {
    const input = JSON.parse(raw);
    const file = input?.tool_input?.file_path;
    if (!file) return;
    const root = input.cwd || process.cwd();
    const webDir = path.join(root, "web");
    const rel = path.relative(webDir, path.resolve(root, file));
    if (rel.startsWith("..") || path.isAbsolute(rel)) return;
    if (!/\.(tsx?|jsx?|css|json|md)$/.test(rel)) return;
    const prettier = path.join(webDir, "node_modules", "prettier", "bin", "prettier.cjs");
    if (!existsSync(prettier)) return;
    execFileSync(process.execPath, [prettier, "--write", rel], { cwd: webDir, stdio: "ignore" });
  } catch {
    // formatting is best-effort
  }
});
