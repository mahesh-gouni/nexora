import { Container, Eyebrow } from "~/components/section";
import { ScrollWords } from "~/components/fx";

export function Statement() {
  return (
    <section aria-label="About Nexora" className="py-24 sm:py-36">
      <Container>
        <Eyebrow>The studio</Eyebrow>
        <ScrollWords
          className="font-display mt-8 text-[clamp(1.9rem,4.4vw,3.9rem)] leading-[1.12] font-bold tracking-[-0.025em]"
          text="Nexora is an independent studio that turns business ideas into dependable web software. Engineered with Java and React, delivered in small tested steps, and explained in plain language."
        />
      </Container>
    </section>
  );
}
