import { useRef } from "react";
import { Link } from "react-router";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Art } from "~/components/art";
import { Container, Accent } from "~/components/section";
import { Magnetic, Marquee, RiseLines } from "~/components/fx";
import { ease } from "~/components/motion";

const capabilities = [
  "Custom web applications",
  "E-commerce",
  "ERP systems",
  "Admin dashboards",
  "SaaS products",
  "Business automation",
  "Java + Spring Boot",
  "React + TypeScript",
];

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Pointer depth: art and cards drift in opposite directions.
  const px = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const py = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const artX = useTransform(px, (v) => v * -14);
  const artY = useTransform(py, (v) => v * -10);
  const cardX = useTransform(px, (v) => v * 22);
  const cardY = useTransform(py, (v) => v * 16);

  // Scroll: the visual sinks and fades as the hero leaves.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sinkY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, 160],
  );
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, reduce ? 1 : 0.2]);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      aria-labelledby="hero-title"
      className="stage bg-grain relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="animate-drift bg-amber/20 absolute top-[-15%] right-[-10%] -z-10 size-[min(820px,90vw)] rounded-full blur-[140px]"
      />
      <div
        aria-hidden
        className="animate-drift absolute bottom-[-30%] left-[-15%] -z-10 size-[560px] rounded-full bg-[#3b4247]/40 blur-[120px] [animation-delay:-9s]"
      />

      <Container className="grid flex-1 items-center gap-6 pt-32 pb-10 lg:grid-cols-[0.92fr_1.2fr] lg:pt-28">
        <div className="relative z-10">
          <p className="enter-fade text-muted inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[13px] backdrop-blur">
            <span className="relative flex size-2">
              <span className="bg-brand absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" />
              <span className="bg-brand relative inline-flex size-2 rounded-full" />
            </span>
            Independent software studio · India &amp; worldwide
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[clamp(3rem,5.4vw,5.1rem)] leading-[0.98] font-extrabold tracking-[-0.035em] lg:[&_.block]:whitespace-nowrap"
          >
            <RiseLines
              delay={0.15}
              lines={[
                "Ideas into",
                <>
                  <Accent>working</Accent> software.
                </>,
              ]}
            />
          </h1>

          <p
            style={{ "--d": "0.45s" } as React.CSSProperties}
            className="enter-fade text-muted mt-7 max-w-[34rem] text-lg leading-relaxed sm:text-xl"
          >
            Nexora designs and engineers web applications, e-commerce, ERP and
            admin systems, built on a Java and React foundation and delivered in
            small, tested steps.
          </p>

          <div
            style={{ "--d": "0.6s" } as React.CSSProperties}
            className="enter-fade mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                to="/contact"
                viewTransition
                className="group bg-brand text-on-brand hover:bg-brand-hover inline-flex h-14 items-center gap-2 rounded-full px-7 text-base font-semibold shadow-[0_10px_40px_-10px_rgb(252_176_51/0.6)] transition-colors"
              >
                Start a project
                <ArrowUpRight
                  className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </Magnetic>
            <Link
              to="/services"
              viewTransition
              className="text-text inline-flex h-14 items-center rounded-full border border-white/15 px-7 text-base font-medium transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Explore services
            </Link>
          </div>
        </div>

        <m.div
          style={{ y: sinkY, opacity: fade }}
          className="relative -mx-4 sm:mx-0 lg:-mr-10 lg:-ml-6 xl:-mr-32 xl:-ml-10"
        >
          <div
            className="enter-art"
            style={{ "--d": "0.2s" } as React.CSSProperties}
          >
            <m.div style={{ x: artX, y: artY }} className="xl:scale-[1.12]">
              <Art
                name="hero"
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                alt="A three-dimensional Nexora N in graphite and amber, surrounded by floating glass interface panels"
              />
            </m.div>

            {/* Floating HTML cards (real text, not baked into the image) */}
            <m.div
              style={{ x: cardX, y: cardY }}
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden xl:block"
            >
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.9 }}
                className="animate-float absolute top-[8%] left-[2%] w-56 rounded-2xl border border-white/10 bg-[#11161a]/80 p-4 shadow-2xl backdrop-blur-md"
              >
                <p className="text-muted font-mono text-[10px] tracking-widest uppercase">
                  Every release
                </p>
                <ul className="mt-3 space-y-2 text-[13px]">
                  {[
                    "Lint & type-check",
                    "Automated tests",
                    "Build",
                    "Deploy",
                  ].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="bg-success/20 text-success flex size-4 items-center justify-center rounded-full">
                        <Check className="size-3" />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </m.div>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 1.05 }}
                className="animate-float absolute right-[6%] bottom-[10%] w-60 rounded-2xl border border-white/10 bg-[#11161a]/80 p-4 shadow-2xl backdrop-blur-md [animation-delay:-3s]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold">Orders</p>
                  <span className="bg-amber/15 text-amber rounded-full px-2 py-0.5 font-mono text-[9px] tracking-wider uppercase">
                    Concept
                  </span>
                </div>
                <svg viewBox="0 0 200 60" className="mt-3 h-14 w-full">
                  <defs>
                    <linearGradient id="hero-spark" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#fcb033" stopOpacity=".4" />
                      <stop offset="1" stopColor="#fcb033" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 48 L25 42 L50 44 L75 30 L100 34 L125 22 L150 26 L175 12 L200 8 L200 60 L0 60Z"
                    fill="url(#hero-spark)"
                  />
                  <path
                    d="M0 48 L25 42 L50 44 L75 30 L100 34 L125 22 L150 26 L175 12 L200 8"
                    fill="none"
                    stroke="#fcb033"
                    strokeWidth="2"
                  />
                </svg>
                <p className="text-muted mt-1 text-[11px]">
                  Sample data · illustrative
                </p>
              </m.div>
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 1.2 }}
                className="animate-float text-text/80 absolute top-[14%] right-[4%] rounded-full border border-white/10 bg-[#11161a]/80 px-3.5 py-2 font-mono text-[11px] shadow-xl backdrop-blur-md [animation-delay:-5s]"
              >
                spring-boot · react · postgres
              </m.div>
            </m.div>
          </div>
        </m.div>
      </Container>

      <div className="font-display text-text/70 relative border-t border-white/10 py-5 text-lg font-semibold sm:text-xl">
        <Marquee items={capabilities} />
      </div>
    </section>
  );
}
