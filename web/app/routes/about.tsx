import type { Route } from "./+types/about";
import { Accent, Container, Eyebrow, PageHero } from "~/components/section";
import { Reveal } from "~/components/motion";
import { ScrollWords } from "~/components/fx";
import { Principles } from "~/components/home/principles";
import { Process } from "~/components/home/process";
import { Stack } from "~/components/home/stack";
import { CtaBand } from "~/components/cta-band";
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
        art="about"
        lines={[
          "An independent studio",
          <>
            for business <Accent>software</Accent>.
          </>,
        ]}
        lead="Nexora turns business ideas into working software: web applications, e-commerce, ERP and admin systems, built carefully and explained clearly."
      />

      <section aria-labelledby="story-title" className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>Why Nexora exists</Eyebrow>
            <h2
              id="story-title"
              className="mt-4 text-4xl leading-[1.05] font-extrabold sm:text-5xl"
            >
              A third option between <Accent>rigid tools</Accent> and big
              agencies
            </h2>
          </Reveal>
          <Reveal className="text-muted space-y-6 text-lg leading-relaxed">
            <p>
              Many small and growing businesses are stuck between two bad
              options: off-the-shelf tools that never quite fit, or expensive
              agencies with layers of people between them and the code.
            </p>
            <p>
              Nexora is deliberately small and independent. You work directly
              with the engineer who designs and builds your software, and every
              project starts from reusable, tested foundations rather than a
              blank page.
            </p>
            <p className="text-text">
              Nexora is new, and says so. Its portfolio is being built in the
              open, starting with the products on the roadmap.
            </p>
          </Reveal>
        </Container>
      </section>

      <section aria-label="Promise" className="stage bg-grain py-24 sm:py-32">
        <Container>
          <ScrollWords
            className="font-display text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.15] font-bold tracking-[-0.02em]"
            text="No invented case studies. No inflated numbers. Just clear scope, honest progress, and software that does what it was built to do."
          />
        </Container>
      </section>

      <Principles art="svc-saas" />
      <Process />
      <Stack />
      <CtaBand />
    </>
  );
}
