import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "~/components/logo";
import { nav, site } from "~/lib/site";
import { mailtoHref, templateDraft } from "~/lib/contact";

export function SiteFooter() {
  const links = [
    { to: "/", label: "Home" },
    ...nav,
    { to: "/contact", label: "Contact" },
  ];
  return (
    <footer className="stage bg-grain relative overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-tight font-bold sm:text-4xl">
              Let&apos;s build something
              <br />
              that{" "}
              <span className="text-brand font-serif font-normal italic">
                works
              </span>
              .
            </p>
            <Link
              to="/contact"
              viewTransition
              className="group border-brand mt-8 inline-flex items-center gap-2 border-b pb-1 text-lg font-medium"
            >
              Start a project
              <ArrowUpRight
                className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              />
            </Link>
          </div>
          <div>
            <h2 className="text-muted font-mono text-xs tracking-widest uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    viewTransition
                    className="text-text/80 hover:text-brand transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-muted font-mono text-xs tracking-widest uppercase">
              Studio
            </h2>
            <p className="text-text/80 mt-4 leading-relaxed">{site.tagline}</p>
            <p className="text-muted mt-2 leading-relaxed">
              Independent software studio. Working with businesses in India and
              worldwide.
            </p>
            <a
              href={mailtoHref(templateDraft)}
              className="text-text hover:text-brand mt-4 block font-medium break-all"
            >
              {site.email}
            </a>
            <Link
              to="/privacy"
              viewTransition
              className="text-text/80 hover:text-brand mt-4 inline-block"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none mt-16 select-none">
        <p className="text-outline font-display text-center text-[22vw] leading-[0.8] font-extrabold tracking-tighter">
          Nexora
        </p>
      </div>

      <div className="relative border-t border-white/5">
        <div className="text-muted mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6">
          <Logo />
          <p>© {new Date().getFullYear()} Nexora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
