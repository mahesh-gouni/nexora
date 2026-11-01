import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "~/components/logo";
import { ThemeToggle } from "~/components/theme-toggle";
import { Magnetic } from "~/components/fx";
import { ease } from "~/components/motion";
import { nav } from "~/lib/site";
import { cn } from "~/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="stage fixed inset-x-0 top-0 z-50 bg-transparent! px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main"
        className="focus:bg-brand focus:text-on-brand sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <m.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border px-3 pl-5 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open
            ? "border-white/10 bg-[#0b0e10]/80 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          to="/"
          viewTransition
          aria-label="Nexora home"
          className="rounded-full"
          onClick={close}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center md:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              viewTransition
              className={({ isActive }) =>
                cn(
                  "group relative px-4 py-2 text-[15px] font-medium transition-colors",
                  isActive ? "text-text" : "text-muted hover:text-text",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={cn(
                      "bg-brand absolute inset-x-4 -bottom-0.5 h-px origin-left transition-transform duration-300",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Magnetic className="ml-1 hidden md:inline-block">
            <Link
              to="/contact"
              viewTransition
              className="group bg-brand text-on-brand hover:bg-brand-hover inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors"
            >
              Start a project
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </Magnetic>
          <button
            type="button"
            className="text-text inline-flex size-10 items-center justify-center rounded-full hover:bg-white/10 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </m.div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 28px)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 28px)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0 round 28px)" }}
            transition={{ duration: 0.45, ease }}
            className="bg-grain mx-auto mt-2 max-w-6xl rounded-[28px] border border-white/10 bg-[#0b0e10]/95 p-6 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1">
              {[...nav, { to: "/contact", label: "Contact" }].map((item, i) => (
                <m.li
                  key={item.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease }}
                >
                  <NavLink
                    to={item.to}
                    viewTransition
                    onClick={close}
                    className={({ isActive }) =>
                      cn(
                        "font-display flex items-center justify-between border-b border-white/10 py-4 text-3xl font-bold",
                        isActive ? "text-brand" : "text-text",
                      )
                    }
                  >
                    {item.label}
                    <ArrowUpRight className="text-muted size-6" aria-hidden />
                  </NavLink>
                </m.li>
              ))}
            </ul>
            <Link
              to="/contact"
              viewTransition
              onClick={close}
              className="bg-brand text-on-brand mt-6 flex h-12 items-center justify-center rounded-full font-semibold"
            >
              Start a project
            </Link>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
