# Nexora

Nexora is an independent, one-person software studio ("Ideas into Working Software").
This repo holds the Nexora website. Products (e-commerce, admin, ERP, CRM) get their own repos later.

## Stack
- `web/`: React 19 + TypeScript (strict) + React Router 8 framework mode (`ssr: false`, every page prerendered) + Vite + Tailwind CSS v4. Hosted on Netlify (free plan); `netlify.toml` at repo root.
- UI: own components in `app/components/ui` (shadcn-style, built with cva + tailwind-merge), Lucide icons, Motion via `LazyMotion` (always use `m.*`, never `motion.*`), React Hook Form + `zod/mini`.
- Content lives in `app/content/*.ts`; site constants and `pageMeta()` in `app/lib/site.ts`.
- No backend for the website. Contact form = Netlify Forms (`app/components/contact-form.tsx`). TanStack Query/Axios and Spring Boot arrive with the first product.

## Commands (run inside `web/`)
- `npm run dev`: local dev server
- `npm run check`: typecheck + lint + format check + unit tests + build. Must pass before every commit.
- `npm run test:e2e`: Playwright tests against the built site (run `npm run build` first). Set `PW_CHROMIUM_PATH` to reuse an installed Chromium.
- `npm run format`: Prettier

## Rules
- Honesty: never write invented clients, testimonials, metrics, team members, years in business or "available" products. Nexora speaks as "an independent studio", never "our team". No founder name or photo on the site.
- Zero budget: free tiers only. Never add a paid service, paid component or new hosted dependency without asking.
- Every new route must be added to `pages` in `web/react-router.config.ts` (prerender) and, if public, to `scripts/postbuild.mjs` (sitemap) and `tests/e2e/site.spec.ts`.
- Product statuses in `app/content/products.ts` must stay truthful.
- Brand: charcoal `#171A1C`, paper `#FBF9F7`, amber `#F5A623` (fills), `#A34A07` (amber text on light). Use semantic token classes (`bg-surface`, `text-muted`, `text-brand-ink`…) from `app/app.css`, never raw hex in components. Fonts: Manrope (display), Inter (body), JetBrains Mono (code), self-hosted via Fontsource. Never load fonts or scripts from third-party CDNs.
- Design: use the `ui-ux-pro-max` skill to review layout, accessibility and consistency, but keep Nexora's brand colours and fonts over its generic suggestions.
- Accessibility: WCAG 2.2 AA, visible focus, `prefers-reduced-motion` respected by every animation.
- Borrowed UI components (21st.dev, Uilora): restyle to our tokens and record source + licence in `docs/third-party.md`.
- Present a plan before any change touching more than ~5 files. Record decisions in `docs/decisions.md`.

## Docs
- `docs/decisions.md`: confirmed decisions (source of truth)
- `docs/third-party.md`: external code and licences
- Full discovery plan: the "Nexora — Discovery & Website Plan" Claude doc
