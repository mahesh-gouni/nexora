import { Check } from "lucide-react";
import type { Route } from "./+types/products";

import { Accent, Container, PageHero } from "~/components/section";
import { Reveal } from "~/components/motion";
import { Parallax } from "~/components/fx";
import { CtaBand } from "~/components/cta-band";
import { BrowserFrame, mockups } from "~/components/mockups";
import { products } from "~/content/products";
import { pageMeta } from "~/lib/site";
import { cn } from "~/lib/cn";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Products",
    description:
      "Nexora's product roadmap: an e-commerce platform, admin dashboard, ERP and CRM for small and growing businesses. Concept previews with sample data.",
    path: "/products",
  });
}

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        art="svc-dashboard"
        lines={[
          "Reusable products,",
          <>
            built in the <Accent>open</Accent>.
          </>,
        ]}
        lead="Nexora is designing its own business software. Each product becomes a foundation that client projects can be customised from, instead of starting from scratch."
      />

      <Container className="pt-16">
        <Reveal className="border-border-strong flex flex-col gap-3 rounded-2xl border border-dashed p-5 sm:flex-row sm:items-center">
          <span className="bg-brand-soft text-brand-ink w-fit rounded-full px-3 py-1 font-mono text-xs tracking-wider uppercase">
            Honest status
          </span>
          <p className="text-muted">
            All four products are <strong className="text-text">planned</strong>
            . The interfaces below are concept previews with sample data, not
            screenshots of working software. Statuses here change only when the
            work really moves.
          </p>
        </Reveal>
      </Container>

      <Container className="space-y-28 py-20 sm:space-y-36 sm:py-28">
        {products.map((p, i) => {
          const { url, Mock } = mockups[p.id as keyof typeof mockups];
          const flip = i % 2 === 1;
          return (
            <article
              key={p.id}
              aria-labelledby={`${p.id}-title`}
              className="grid items-center gap-10 lg:grid-cols-12"
            >
              <Reveal className={cn("lg:col-span-7", flip && "lg:order-last")}>
                <Parallax offset={24}>
                  <BrowserFrame url={url}>
                    <Mock />
                  </BrowserFrame>
                </Parallax>
              </Reveal>
              <Reveal className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="text-muted font-mono text-sm">0{i + 1}</span>
                  <span className="border-border text-muted rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wider uppercase">
                    {p.status}
                  </span>
                </div>
                <h2
                  id={`${p.id}-title`}
                  className="mt-4 text-4xl font-extrabold sm:text-5xl"
                >
                  {p.name}
                </h2>
                <p className="text-brand-ink mt-2 font-serif text-2xl italic">
                  {p.category}
                </p>
                <p className="text-muted mt-5 text-lg leading-relaxed">
                  {p.summary}
                </p>
                <ul className="mt-7 space-y-3">
                  {p.plannedFeatures.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check
                        className="text-brand-ink mt-1 size-4 shrink-0"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-muted mt-6 font-mono text-xs">
                  Planned features · concept preview
                </p>
              </Reveal>
            </article>
          );
        })}
      </Container>

      <CtaBand
        title={
          <>
            Need one of these <Accent>sooner?</Accent>
          </>
        }
        body="If your business needs something close to one of these products, a custom version can be built for you now, and the shared foundation keeps it maintainable."
      />
    </>
  );
}
