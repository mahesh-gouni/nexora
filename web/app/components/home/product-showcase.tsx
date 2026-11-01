import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow, Accent } from "~/components/section";
import { Reveal, ease } from "~/components/motion";
import { BrowserFrame, mockups } from "~/components/mockups";
import { products } from "~/content/products";
import { cn } from "~/lib/cn";

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const product = products[active];
  const { url, Mock } = mockups[product.id as keyof typeof mockups];

  function onKey(e: React.KeyboardEvent) {
    const delta =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + products.length) % products.length;
    setActive(next);
    document.getElementById(`product-tab-${next}`)?.focus();
  }

  return (
    <section
      aria-labelledby="products-title"
      className="stage bg-grain relative isolate overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift bg-amber/10 absolute top-1/3 left-1/2 -z-10 size-[700px] -translate-x-1/2 rounded-full blur-[140px]"
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow>Products in the making</Eyebrow>
              <h2
                id="products-title"
                className="mt-4 text-4xl leading-[1.05] font-extrabold sm:text-5xl"
              >
                Foundations you can <Accent>build on</Accent>
              </h2>
              <p className="text-muted mt-5 text-lg leading-relaxed">
                Nexora is designing its own business products. Each becomes a
                reusable starting point for client projects. Previews below are
                concepts with sample data.
              </p>
            </Reveal>

            <div
              role="tablist"
              aria-label="Products"
              aria-orientation="vertical"
              onKeyDown={onKey}
              className="mt-10 space-y-2"
            >
              {products.map((p, i) => {
                const selected = i === active;
                return (
                  <button
                    key={p.id}
                    id={`product-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="product-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-colors",
                      selected
                        ? "border-white/15 bg-white/[0.06]"
                        : "border-transparent hover:bg-white/[0.03]",
                    )}
                  >
                    <span
                      className={cn(
                        "bg-brand absolute inset-y-3 left-0 w-[3px] rounded-full transition-opacity",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="text-muted font-mono text-xs">
                      0{i + 1}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block text-lg font-bold transition-colors",
                          selected
                            ? "text-text"
                            : "text-text/60 group-hover:text-text",
                        )}
                      >
                        {p.name}
                      </span>
                      <span className="text-muted block text-sm">
                        {p.category}
                      </span>
                    </span>
                    <span className="text-muted rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase">
                      {p.status}
                    </span>
                  </button>
                );
              })}
            </div>
            <Link
              to="/products"
              viewTransition
              className="group text-brand mt-8 inline-flex items-center gap-2 font-medium"
            >
              See the product roadmap
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <div
            id="product-panel"
            role="tabpanel"
            aria-labelledby={`product-tab-${active}`}
            className="relative lg:pt-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={product.id}
                initial={{
                  opacity: 0,
                  y: 24,
                  scale: 0.97,
                  filter: "blur(6px)",
                }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease }}
              >
                <BrowserFrame url={url}>
                  <Mock />
                </BrowserFrame>
                <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <p className="text-muted leading-relaxed">
                    {product.summary}
                  </p>
                  <p className="text-muted font-mono text-xs sm:text-right">
                    Concept · sample data
                    <br />
                    Not a live product yet
                  </p>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
