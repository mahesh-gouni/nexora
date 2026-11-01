import { Link } from "react-router";
import { Logo } from "~/components/logo";
import { nav, site } from "~/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-border bg-surface-sunken/60 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="text-muted mt-4 text-sm leading-relaxed">
            {site.tagline} An independent software studio building business
            software for clients in India and worldwide.
          </p>
        </div>
        <div>
          <h2 className="text-text text-sm font-semibold">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { to: "/", label: "Home" },
              ...nav,
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted hover:text-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-text text-sm font-semibold">Studio</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/contact" className="text-muted hover:text-text">
                Start a project
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted hover:text-text">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-border border-t">
        <p className="text-muted mx-auto max-w-6xl px-4 py-5 text-xs sm:px-6">
          © {new Date().getFullYear()} Nexora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
