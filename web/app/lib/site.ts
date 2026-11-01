// Netlify sets URL at build time; locally it falls back to the dev server.
export const SITE_URL: string = __SITE_URL__;

export const site = {
  name: "Nexora",
  email: "nexorafinity@gmail.com",
  tagline: "Ideas into Working Software.",
  description:
    "Nexora is an independent software studio that designs and builds web applications, e-commerce, ERP and admin systems for businesses in India and worldwide.",
};

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
] as const;

/** Builds the meta tags every page needs, with consistent title format. */
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title?: string;
  description: string;
  path: string;
  noindex?: boolean;
}) {
  const fullTitle = title ? `${title} · Nexora` : `Nexora · ${site.tagline}`;
  const url = new URL(path, SITE_URL).toString();
  const image = new URL("/og.png", SITE_URL).toString();
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
  ];
}
