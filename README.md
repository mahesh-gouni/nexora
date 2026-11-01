# Nexora

Website for **Nexora**, an independent software studio: *Ideas into Working Software.*

## Develop

Requires Node.js 22+.

```bash
cd web
npm install
npm run dev      # http://localhost:5173
npm run check    # typecheck, lint, format, tests, build
```

## Deploy

Netlify builds from `netlify.toml` (base `web/`, output `web/build/client`) on every push to `main`.

## Project docs

- [`CLAUDE.md`](CLAUDE.md): instructions for Claude Code
- [`docs/decisions.md`](docs/decisions.md): decision log
- [`docs/third-party.md`](docs/third-party.md): third-party code and licences
