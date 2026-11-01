import type { Route } from "./+types/contact";
import { Container, PageHero, Section } from "~/components/section";
import { ContactForm } from "~/components/contact-form";
import { Card } from "~/components/ui/card";
import { pageMeta } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Contact",
    description:
      "Tell Nexora about your project: web application, e-commerce, ERP, dashboard or automation. You'll get a clear reply on scope and next steps.",
    path: "/contact",
  });
}

const nextSteps = [
  "You'll get a personal reply by email, usually within two business days.",
  "A short call or email exchange to understand your goals and constraints.",
  "A written proposal with scope, milestones and an estimate. No work starts before you agree.",
];

const faqs = [
  {
    q: "How much does a project cost?",
    a: "Every project is scoped individually. You'll receive a written estimate, broken into milestones, before any work begins.",
  },
  {
    q: "How long does it take?",
    a: "A focused first version usually takes weeks, not months. The proposal includes a realistic timeline for your scope.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. Nexora works with businesses in India and worldwide, communicating in English over email and video calls.",
  },
  {
    q: "What happens after launch?",
    a: "You get documentation and the source code. Ongoing maintenance and improvements can be arranged if you need them.",
  },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell Nexora about your project"
        lead="A few sentences is enough to start. Describe what you need and you'll get a clear, honest reply."
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Card className="p-6 sm:p-8">
            <ContactForm />
          </Card>

          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {nextSteps.map((s, i) => (
                  <li key={s} className="flex gap-4">
                    <span className="bg-brand-soft text-brand-ink flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium">
                      {i + 1}
                    </span>
                    <span className="text-muted leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-bold">Common questions</h2>
              <div className="divide-border border-border mt-4 divide-y border-y">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                      {f.q}
                      <span
                        className="text-muted text-xl transition-transform group-open:rotate-45"
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-muted mt-3 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
