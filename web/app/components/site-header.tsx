import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "~/components/logo";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button, ButtonLink } from "~/components/ui/button";
import { nav } from "~/lib/site";
import { cn } from "~/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-border/70 bg-bg/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <a
        href="#main"
        className="focus:rounded-control focus:bg-surface sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          aria-label="Nexora home"
          className="rounded-control"
          onClick={close}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-control px-3 py-2 text-[15px] font-medium transition-colors",
                  isActive ? "text-text" : "text-muted hover:text-text",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <ButtonLink
            to="/contact"
            size="sm"
            className="ml-2 hidden md:inline-flex"
          >
            Start a project
          </ButtonLink>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-border overflow-hidden border-t md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={close}
                  className={({ isActive }) =>
                    cn(
                      "rounded-control px-3 py-3 text-base font-medium",
                      isActive ? "bg-surface-sunken text-text" : "text-muted",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <ButtonLink to="/contact" className="mt-2" onClick={close}>
                Start a project
              </ButtonLink>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
