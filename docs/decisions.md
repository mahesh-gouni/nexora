# Decision log

Confirmed by the founder unless marked "delegated" (decided by Claude on the founder's instruction).

| Date | Decision |
| --- | --- |
| 2026-11-01 | Brand name is **Nexora** (not "Nexora Web"). |
| 2026-11-01 | Name conflict (delegated): keep Nexora. nexora.com is a technology distributor; "Nexora Labs" is used by a blockchain project, so the fallback is "Nexora Studio". Do a free IP India trademark search (classes 9, 42) before any paid brand work. |
| 2026-11-01 | Tagline (delegated): "Ideas into Working Software." Revisit "Intelligent" when real AI features ship. |
| 2026-11-01 | Hosting: Netlify free plan. Vercel Hobby forbids commercial use. |
| 2026-11-01 | No backend for the website; contact form via Netlify Forms. Spring Boot starts with the first product, on an always-on server. |
| 2026-11-01 | Budget: zero. Free tiers only; no domain yet (free *.netlify.app subdomain; nexora.netlify.app is taken). |
| 2026-11-01 | No founder name or photo on the site; speak as "Nexora, an independent studio". |
| 2026-11-01 | Target customers: Indian and international businesses. English only; no prices shown. |
| 2026-11-01 | No existing portfolio: Work page hidden at launch. |
| 2026-11-01 | Stack: React Router 8 framework mode, prerendered (`ssr: false`), Vite, Tailwind v4, self-hosted fonts. |
| 2026-11-01 | UI UX Pro Max installed as a project skill (MIT); used for review, not to override brand colours. |
| 2026-11-01 | Website v1 built: Home, Services, Products, About, Contact, Privacy, hidden /styleguide, 404. Work page omitted until real case studies exist. |
| 2026-11-01 | Logo redrawn as SVG (`docs/brand/nexora-mark*.svg`, `web/public/favicon.svg`); social image `web/public/og.png`. |
| 2026-11-01 | Amber text colour darkened to `#A34A07` for contrast (5.6:1 on paper). All token pairs pass WCAG AA in both themes. |
| 2026-11-01 | Components hand-built in shadcn style instead of pulling 21st.dev/Uilora pieces: one coherent system, no third-party licences to track. |
| 2026-11-01 | No analytics at launch (zero budget, no cookie banner). Contact reply promise: "usually within two business days". |
| 2026-11-01 | Performance: Motion loaded via LazyMotion, forms validated with `zod/mini`, above-the-fold fonts preloaded. |
| 2026-11-01 | Visual redesign: premium dark "stage" art direction, editorial typography (Manrope + Instrument Serif italic accents), asymmetric bento, pinned horizontal process scroll, scroll-lit statement, magnetic CTAs, View Transitions between routes. |
| 2026-11-01 | Imagery: no AI image service is available and the budget is zero, so artwork is original Three.js 3D renders (graphite, amber, smoked glass) exported as AVIF/WebP; sources in `/art`. |
| 2026-11-01 | Product visuals are live HTML concept mockups with sample data, always labelled "Concept preview", never presented as working products. |
| 2026-11-01 | Lighthouse (local): desktop 98 / 100 / 100 / 100; simulated slow-4G mobile 78–85 performance, 100 accessibility/SEO/best practices. Re-measure on Netlify. |
