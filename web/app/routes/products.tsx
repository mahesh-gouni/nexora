import { Check } from "lucide-react";
import type { Route } from "./+types/products";

import { Container, PageHero, Section } from "~/components/section";
import { RevealGroup, RevealItem } from "~/components/motion";
import { CtaBand } from "~/components/cta-band";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { products } from "~/content/products";
import { pageMeta } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Products",
    description:
      "Nexora's product roadmap: an e-commerce platform, admin dashboard, ERP and CRM for small and growing businesses.",
    path: "/products",
  });
}

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Reusable products, built in the open"
        lead="Nexora is building its own business software. Each product becomes a foundation that client projects can be customised from, instead of starting from scratch."
      />

      <Section>
        <Container>
          <div className="rounded-panel border-border bg-surface-sunken/60 text-muted mb-10 flex flex-wrap items-center gap-3 border p-4 text-sm">
            <Badge>Planned</Badge>
            <span>
              All four products are planned and none has a public demo yet.
              Statuses here are kept honest and updated as each one moves into
              development.
            </span>
          </div>

          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {products.map((p, i) => (
              <RevealItem key={p.id}>
                <Card className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <Badge>{p.status}</Badge>
                    <span className="text-muted font-mono text-xs">
                      Build order #{i + 1}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold">{p.name}</h2>
                  <p className="text-brand-ink text-sm font-medium">
                    {p.category}
                  </p>
                  <p className="text-muted mt-4 leading-relaxed">{p.summary}</p>
                  <p className="mt-6 text-sm font-semibold">Planned features</p>
                  <ul className="mt-3 space-y-2.5">
                    {p.plannedFeatures.map((f) => (
                      <li
                        key={f}
                        className="flex gap-3 text-[15px] leading-relaxed"
                      >
                        <Check
                          className="text-muted mt-1 size-4 shrink-0"
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        title="Need one of these sooner?"
        body="If your business needs something close to one of these products, a custom version can be built for you now, and the shared foundation keeps it maintainable."
      />
    </>
  );
}
