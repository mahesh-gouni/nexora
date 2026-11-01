import type { Route } from "./+types/contact";
import { Accent, Container, PageHero } from "~/components/section";
import { ContactForm } from "~/components/contact-form";
import { Reveal, RevealGroup, RevealItem } from "~/components/motion";
import { pageMeta } from "~/lib/site";
import { EmailCard } from "~/components/email-options";
import { templateDraft } from "~/lib/contact";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Contact",
    description:
      "Tell Nexora about your project: web application, e-commerce, ERP, dashboard or automation. You'll get a clear reply on scope and next steps.",
    path: "/contact",
  });
}

const nextSteps = [
  ["Reply", "A personal reply by email, usually within two business days."],
  [
    "Conversation",
    "A short call or email exchange about your goals and constraints.",
  ],
  [
    "Proposal",
    "Written scope, milestones and an estimate. No work starts before you agree.",
  ],
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
        art="svc-web"
        lines={[
          "Tell Nexora about",
          <>
            your <Accent>project</Accent>.
          </>,
        ]}
        lead="A few sentences is enough to start. Describe what you need and you'll get a clear, honest reply."
      />
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="border-border bg-surface shadow-raised rounded-[28px] border p-6 sm:p-10">
            <h2 className="text-2xl font-bold">Project details</h2>
            <p className="text-muted mt-1 mb-8">
              Fields marked optional can be skipped.
            </p>
            <ContactForm />
          </Reveal>

          <div className="space-y-12">
            <EmailCard draft={templateDraft} />
            <div>
              <h2 className="text-2xl font-bold">What happens next</h2>
              <RevealGroup className="mt-6 space-y-3">
                {nextSteps.map(([t, d], i) => (
                  <RevealItem
                    key={t}
                    className="border-border flex gap-4 rounded-2xl border p-4"
                  >
                    <span className="bg-brand text-on-brand flex size-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{t}</span>
                      <span className="text-muted">{d}</span>
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Common questions</h2>
              <div className="divide-border border-border mt-4 divide-y border-y">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group py-4 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                      {f.q}
                      <span
                        aria-hidden
                        className="border-border text-muted group-open:border-brand group-open:bg-brand group-open:text-on-brand flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-muted mt-3 pr-10 leading-relaxed">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
