import { ArrowRight } from "lucide-react";
import { ButtonLink } from "~/components/ui/button";
import { Container } from "~/components/section";
import { Reveal } from "~/components/motion";

export function CtaBand({
  title = "Have a project in mind?",
  body = "Share what you need. You'll get a clear reply on scope, approach and next steps, with no obligation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Container className="pb-16 sm:pb-24">
      <Reveal className="bg-grid rounded-panel bg-charcoal text-paper relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="bg-amber/25 pointer-events-none absolute -top-24 -right-24 size-72 rounded-full blur-3xl"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="text-paper/75 mt-4 text-lg leading-relaxed">{body}</p>
          <ButtonLink to="/contact" size="lg" className="mt-8">
            Start a project <ArrowRight aria-hidden />
          </ButtonLink>
        </div>
      </Reveal>
    </Container>
  );
}
