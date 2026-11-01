import type { Route } from "./+types/about";

import {
  Container,
  PageHero,
  Section,
  SectionHeading,
} from "~/components/section";
import { Reveal, RevealGroup, RevealItem } from "~/components/motion";
import { CtaBand } from "~/components/cta-band";
import { principles, process, stack } from "~/content/about";
import { pageMeta } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "About",
    description:
      "Nexora is an independent software studio building business software with Java, Spring Boot, React and PostgreSQL.",
    path: "/about",
  });
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="An independent studio for business software"
        lead="Nexora turns business ideas into working software: web applications, e-commerce, ERP and admin systems, built carefully and explained clearly."
      />

      <Section>
        <Container className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="text-3xl font-bold">Why Nexora exists</h2>
          </Reveal>
          <Reveal className="text-muted space-y-5 text-lg leading-relaxed">
            <p>
              Many small and growing businesses are stuck between two bad
              options: rigid off-the-shelf tools, or expensive agencies with
              layers of people between them and the code.
            </p>
            <p>
              Nexora is a third option. It is a deliberately small, independent
              studio. You work directly with the engineer who designs and builds
              your software, and every project is built on reusable, tested
              foundations rather than written from scratch.
            </p>
            <p>
              Nexora is new, and says so. Its portfolio is being built in the
              open: the first products are listed on the Products page with
              their real status.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-border bg-surface-sunken/50 border-y">
        <Container>
          <SectionHeading eyebrow="Principles" title="How Nexora works" />
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

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Engagement"
            title="What working together looks like"
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {process.map((step) => (
              <li
                key={step.step}
                className="rounded-panel border-border border p-6"
              >
                <span className="text-brand-ink font-mono text-sm font-medium">
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="text-muted mt-2 leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-panel border-border bg-surface mt-16 border p-6 sm:p-8">
            <h2 className="text-xl font-bold">Technology</h2>
            <p className="text-muted mt-2 max-w-2xl">
              Mainstream, well-supported tools, chosen so your software stays
              easy to maintain and to hand over.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {stack.map((t) => (
                <li
                  key={t}
                  className="border-border bg-surface-sunken rounded-full border px-3 py-1.5 font-mono text-[13px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
