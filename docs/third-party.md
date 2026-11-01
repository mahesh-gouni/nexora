# Third-party code

| Name | Where | Source | Licence | Notes |
| --- | --- | --- | --- | --- |
| UI UX Pro Max | `.claude/skills/ui-ux-pro-max/` | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (via `npx ui-ux-pro-max-cli init --ai claude`, v2.15.0) | MIT | Claude Code design skill. Local Python scripts, no network calls (checked 2026-11-01). |
| Inter, Manrope, JetBrains Mono | `web/` via Fontsource | https://fontsource.org | SIL OFL 1.1 | Self-hosted. |
| React Router template | `web/app/root.tsx` (adapted) | https://github.com/remix-run/react-router-templates | MIT | `default` template. |
| Motion | `web/` dependency | https://motion.dev | MIT | Animations via LazyMotion. |
| Lucide | `web/` dependency | https://lucide.dev | ISC | Icons. |
| React Hook Form, Zod | `web/` dependencies | https://react-hook-form.com, https://zod.dev | MIT | Contact form. |
| clsx, tailwind-merge, class-variance-authority | `web/` dependencies | npm | MIT | Component class utilities. |
| Instrument Serif | `web/` via Fontsource | https://fontsource.org | SIL OFL 1.1 | Accent typeface. |
| Three.js | `art/` (build-time only, not shipped) | https://threejs.org | MIT | Renders the 3D artwork. |
| sharp | `art/` (build-time only) | https://sharp.pixelplumbing.com | Apache-2.0 | AVIF/WebP export. |
| UI UX Pro Max companion skills | `.claude/skills/{banner-design,brand,design,design-system,slides,ui-styling}` | installed with ui-ux-pro-max-cli | MIT | Claude Code skills; not used by the website. |
