import { Link } from "react-router";
import { m } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import type { Route } from "./+types/home";

import { LogoMark } from "~/components/logo";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "~/components/section";
import { Reveal, RevealGroup, RevealItem, ease } from "~/components/motion";
import { CtaBand } from "~/components/cta-band";
import { ButtonLink } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { services } from "~/content/services";
import { products } from "~/content/products";
import { principles, process, stack } from "~/content/about";
import { pageMeta, site } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return pageMeta({ description: site.description, path: "/" });
}

export default function Home() {
  return (
    <>
      <Hero />

      <Section aria-labelledby="services-title">
        <Container>
          <SectionHeading
            id="services-title"
            eyebrow="What Nexora builds"
            title="Software for how your business actually runs"
            lead="From a first web application to a full ERP, every project is built on the same tested Java and React foundation."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.id}>
                <Link
                  to={`/services#${s.id}`}
                  className="group rounded-panel block h-full focus-visible:outline-offset-4"
                >
                  <Card interactive className="flex h-full flex-col">
                    <span className="rounded-control bg-brand-soft text-brand-ink inline-flex size-10 items-center justify-center">
                      <s.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                    <p className="text-muted mt-2 leading-relaxed">
                      {s.summary}
                    </p>
                    <span className="text-brand-ink mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium">
                      Learn more
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section
        className="border-border bg-surface-sunken/50 border-y"
        aria-labelledby="why-title"
      >
        <Container>
          <SectionHeading
            id="why-title"
            eyebrow="Why Nexora"
            title="A small studio, by design"
            lead="Nexora is an independent studio. That means direct access to the engineer, reusable foundations, and no inflated promises."
          />
          <RevealGroup className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {principles.map((p) => (
              <RevealItem key={p.title} className="flex gap-4">
                <span className="rounded-control border-border bg-surface text-brand-ink inline-flex size-10 shrink-0 items-center justify-center border">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-muted mt-1.5 leading-relaxed">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section aria-labelledby="products-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="products-title"
              eyebrow="Products"
              title="Products on the roadmap"
              lead="Nexora is building its own business products to reuse across client projects. Here is the honest status of each."
            />
            <ButtonLink to="/products" variant="secondary">
              All products <ArrowRight aria-hidden />
            </ButtonLink>
          </div>
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <RevealItem key={p.id}>
                <Card className="flex h-full flex-col">
                  <Badge className="self-start">{p.status}</Badge>
                  <h3 className="mt-4 text-lg font-bold">{p.name}</h3>
                  <p className="text-brand-ink text-sm">{p.category}</p>
                  <p className="text-muted mt-3 text-[15px] leading-relaxed">
                    {p.summary}
                  </p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0" aria-labelledby="process-title">
        <Container>
          <SectionHeading
            id="process-title"
            eyebrow="How it works"
            title="Four steps, no surprises"
          />
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-4">
            {process.map((step) => (
              <RevealItem
                key={step.step}
                className="rounded-panel border-border relative border p-6"
              >
                <span className="text-brand-ink font-mono text-sm font-medium">
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="text-muted mt-2 leading-relaxed">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0" aria-labelledby="stack-title">
        <Container>
          <Reveal className="rounded-panel border-border bg-surface flex flex-col gap-6 border p-6 sm:p-8 md:flex-row md:items-center">
            <div className="md:w-64 md:shrink-0">
              <Eyebrow>Technology</Eyebrow>
              <h2 id="stack-title" className="mt-2 text-xl font-bold">
                A proven, mainstream stack
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {stack.map((t) => (
                <li
                  key={t}
                  className="border-border bg-surface-sunken text-text rounded-full border px-3 py-1.5 font-mono text-[13px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <div className="bg-grid-glow border-border relative overflow-hidden border-b">
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:py-28">
        <div>
          <Badge tone="brand">Independent software studio</Badge>
          <h1 className="mt-6 text-5xl leading-[1.05] font-extrabold sm:text-6xl">
            Ideas into <span className="text-brand-ink">working</span> software.
          </h1>
          <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">
            Nexora designs and builds web applications, e-commerce, ERP and
            admin systems for businesses in India and worldwide, with a Java and
            React foundation built to last.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to="/contact" size="lg">
              Start a project <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink to="/services" size="lg" variant="secondary">
              Explore services
            </ButtonLink>
          </div>
          <ul className="text-muted mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {[
              "Direct contact with the engineer",
              "Written estimate first",
              "Tested, documented code",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="text-success size-4" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="relative"
          aria-hidden
        >
          <div className="bg-amber/10 absolute -inset-6 rounded-[28px] blur-2xl" />
          <div className="rounded-panel border-border bg-surface shadow-raised relative overflow-hidden border">
            <div className="border-border flex items-center gap-2 border-b px-4 py-3">
              <span className="bg-border-strong size-3 rounded-full" />
              <span className="bg-border-strong size-3 rounded-full" />
              <span className="bg-border-strong size-3 rounded-full" />
              <span className="text-muted ml-3 font-mono text-xs">
                your-project.ts
              </span>
            </div>
            <div className="flex items-start gap-6 p-6">
              <pre className="text-muted min-w-0 flex-1 overflow-hidden font-mono text-[13px] leading-7 sm:text-sm">
                <code>
                  <span className="text-brand-ink">const</span> project = {"{"}
                  {"\n"} goal:{" "}
                  <span className="text-text">"your workflow"</span>,{"\n"}{" "}
                  frontend: <span className="text-text">"React + TS"</span>,
                  {"\n"} backend:{" "}
                  <span className="text-text">"Spring Boot"</span>,{"\n"}{" "}
                  database: <span className="text-text">"PostgreSQL"</span>,
                  {"\n"} delivery:{" "}
                  <span className="text-text">"small, tested steps"</span>,
                  {"\n"}
                  {"}"};
                </code>
              </pre>
              <LogoMark
                animated
                className="text-text hidden size-20 sm:block"
              />
            </div>
            <div className="border-border bg-surface-sunken/60 flex items-center justify-between border-t px-6 py-3 font-mono text-xs">
              <span className="text-muted">npm run check</span>
              <span className="text-success flex items-center gap-1.5">
                <Check className="size-3.5" /> all checks passed
              </span>
            </div>
          </div>
        </m.div>
      </Container>
    </div>
  );
}
