# Nexora

Nexora is an independent, one-person software studio ("Ideas into Working Software").
This repo holds the Nexora website. Products (e-commerce, admin, ERP, CRM) get their own repos later.

## Stack
- `web/`: React 19 + TypeScript (strict) + React Router 8 framework mode (`ssr: false`, prerendered) + Vite + Tailwind CSS v4. Hosted on Netlify (free plan); `netlify.toml` at repo root.
- Planned additions (add only when a page needs them): shadcn/ui primitives, Motion, React Hook Form + Zod, TanStack Query + Axios.
- No backend for the website. Contact form = Netlify Forms. Spring Boot arrives with the first product.

## Commands (run inside `web/`)
- `npm run dev`: local dev server
- `npm run check`: typecheck + lint + format check + tests + build. Must pass before every commit.
- `npm run format`: Prettier

## Rules
- Honesty: never write invented clients, testimonials, metrics, team members, years in business or "available" products. Nexora speaks as "an independent studio", never "our team". No founder name or photo on the site.
- Zero budget: free tiers only. Never add a paid service, paid component or new hosted dependency without asking.
- Every new route must be added to `prerender` in `web/react-router.config.ts`.
- Brand: charcoal `#171A1C`, paper `#FBF9F7`, amber `#F5A623` (fills), `#B45309` (amber text on light). Fonts: Manrope (display), Inter (body), JetBrains Mono (code), self-hosted via Fontsource. Never load fonts or scripts from third-party CDNs.
- Design: use the `ui-ux-pro-max` skill to review layout, accessibility and consistency, but keep Nexora's brand colours and fonts over its generic suggestions.
- Accessibility: WCAG 2.2 AA, visible focus, `prefers-reduced-motion` respected by every animation.
- Borrowed UI components (21st.dev, Uilora): restyle to our tokens and record source + licence in `docs/third-party.md`.
- Present a plan before any change touching more than ~5 files. Record decisions in `docs/decisions.md`.

## Docs
- `docs/decisions.md`: confirmed decisions (source of truth)
- `docs/third-party.md`: external code and licences
- Full discovery plan: the "Nexora — Discovery & Website Plan" Claude doc
