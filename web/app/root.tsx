import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import type { Route } from "./+types/root";
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./app.css";
import manropeLatin from "@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url";
import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";

import { SiteHeader } from "~/components/site-header";
import { SiteFooter } from "~/components/site-footer";
import { themeScript } from "~/components/theme-toggle";
import { ButtonLink } from "~/components/ui/button";
import { SITE_URL, site } from "~/lib/site";

const orgJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: SITE_URL,
  logo: new URL("/favicon.svg", SITE_URL).toString(),
  description: site.description,
  slogan: site.tagline,
});

// Without JavaScript, scroll-reveal content would stay invisible: show it.
// The theme script adds the "js" class, so this rule only applies when JS is off.
const noJsCss = `html:not(.js) [style*="opacity:0"],html:not(.js) [style*="opacity: 0"]{opacity:1!important;transform:none!important}`;

// Preload the two fonts used above the fold so headings render sooner.
export const links: Route.LinksFunction = () =>
  [manropeLatin, interLatin].map((href) => ({
    rel: "preload",
    href,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous" as const,
  }));

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0b0e10" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <style dangerouslySetInnerHTML={{ __html: noJsCss }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: orgJsonLd }}
        />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <div className="flex min-h-dvh flex-col">
              <SiteHeader />
              <main id="main" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </MotionConfig>
        </LazyMotion>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const title = notFound ? "Page not found" : "Something went wrong";
  const details = notFound
    ? "The page you are looking for does not exist or has moved."
    : "An unexpected error occurred. Please try again.";
  const stack =
    import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-4 pt-40 pb-24 sm:px-6">
      <title>{`${title} · Nexora`}</title>
      <meta name="robots" content="noindex" />
      <p className="text-brand-ink font-mono text-sm">
        {notFound ? "404" : "Error"}
      </p>
      <h1 className="mt-3 text-4xl font-extrabold">{title}</h1>
      <p className="text-muted mt-4 text-lg">{details}</p>
      <ButtonLink to="/" className="mt-8">
        Back to home
      </ButtonLink>
      {stack && (
        <pre className="rounded-panel bg-surface-sunken mt-8 w-full overflow-x-auto p-4 text-xs">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
