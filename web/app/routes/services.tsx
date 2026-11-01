import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import type { Route } from "./+types/services";

import { Container, PageHero, Section } from "~/components/section";
import { Reveal } from "~/components/motion";
import { CtaBand } from "~/components/cta-band";
import { services } from "~/content/services";
import { products } from "~/content/products";
import { pageMeta } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Services",
    description:
      "Custom web applications, e-commerce, ERP, admin dashboards, SaaS development and business automation, built with React and Spring Boot.",
    path: "/services",
  });
}

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Business software, built to work"
        lead="Six ways Nexora can help. Each project starts with your workflow, gets a written estimate, and is delivered in small, tested increments."
      />

      <Section>
        <Container>
          <nav
            aria-label="Services on this page"
            className="mb-12 flex flex-wrap gap-2"
          >
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="border-border bg-surface text-muted hover:border-border-strong hover:text-text rounded-full border px-3.5 py-1.5 text-sm transition-colors"
              >
                {s.title}
              </a>
            ))}
          </nav>

          <div className="divide-border divide-y">
            {services.map((s) => {
              const product = products.find((p) => p.id === s.relatedProduct);
              return (
                <Reveal key={s.id}>
                  <article
                    id={s.id}
                    aria-labelledby={`${s.id}-title`}
                    className="grid scroll-mt-24 gap-8 py-12 first:pt-0 md:grid-cols-[1fr_1.2fr]"
                  >
                    <div>
                      <span className="rounded-control bg-brand-soft text-brand-ink inline-flex size-11 items-center justify-center">
                        <s.icon className="size-5" aria-hidden />
                      </span>
                      <h2
                        id={`${s.id}-title`}
                        className="mt-5 text-2xl font-bold sm:text-3xl"
                      >
                        {s.title}
                      </h2>
                      <p className="text-muted mt-3 text-lg leading-relaxed">
                        {s.summary}
                      </p>
                      <p className="text-text mt-6 text-sm font-semibold">
                        The problem
                      </p>
                      <p className="text-muted mt-1 leading-relaxed">
                        {s.problem}
                      </p>
                    </div>
                    <div className="rounded-panel border-border bg-surface border p-6 sm:p-8">
                      <p className="text-sm font-semibold">What's included</p>
                      <ul className="mt-4 space-y-3">
                        {s.includes.map((item) => (
                          <li key={item} className="flex gap-3 leading-relaxed">
                            <Check
                              className="text-success mt-1 size-4 shrink-0"
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-sm font-semibold">
                        Typical stack
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.stack.map((t) => (
                          <li
                            key={t}
                            className="bg-surface-sunken text-muted rounded-full px-3 py-1 font-mono text-xs"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                      {product && (
                        <Link
                          to="/products"
                          className="text-brand-ink mt-6 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        >
                          Related product: {product.name} (
                          {product.status.toLowerCase()})
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Not sure which service fits?"
        body="Describe the problem in plain words. Nexora will suggest the simplest approach that works, even if that means a smaller project."
      />
    </>
  );
}
