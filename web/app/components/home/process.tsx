import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container, Eyebrow, Accent } from "~/components/section";
import { RevealGroup, RevealItem } from "~/components/motion";
import { process } from "~/content/about";

function Step({
  step,
  index,
}: {
  step: (typeof process)[number];
  index: number;
}) {
  return (
    <article className="border-border bg-surface relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border p-8 sm:p-10">
      <span
        aria-hidden
        className="text-outline font-display text-[7rem] leading-none font-extrabold sm:text-[9rem]"
      >
        {step.step}
      </span>
      <div>
        <p className="text-brand-ink font-mono text-xs tracking-widest uppercase">
          Step {index + 1} of 4
        </p>
        <h3 className="mt-3 text-3xl font-bold sm:text-4xl">{step.title}</h3>
        <p className="text-muted mt-3 max-w-sm text-lg leading-relaxed">
          {step.body}
        </p>
      </div>
    </article>
  );
}

const Intro = () => (
  <div className="max-w-md">
    <Eyebrow>How it works</Eyebrow>
    <h2
      id="process-title"
      className="mt-4 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl"
    >
      Four steps, <Accent>no surprises</Accent>
    </h2>
    <p className="text-muted mt-5 text-lg leading-relaxed">
      A written estimate before any work, and something you can try at every
      milestone.
    </p>
  </div>
);

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-58%"]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <>
      {/* Desktop: pinned horizontal scroll */}
      <section
        ref={ref}
        aria-labelledby="process-title"
        className={reduce ? "hidden" : "relative hidden h-[280vh] lg:block"}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <m.div
            style={{ x }}
            className="flex items-stretch gap-6 pr-[10vw] pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
          >
            <div className="flex w-[420px] shrink-0 items-center">
              <Intro />
            </div>
            {process.map((s, i) => (
              <div key={s.step} className="h-[440px] w-[460px] shrink-0">
                <Step step={s} index={i} />
              </div>
            ))}
          </m.div>
          <div className="bg-border absolute inset-x-0 bottom-12 mx-auto h-px max-w-6xl">
            <m.div
              style={{ scaleX: bar }}
              className="bg-brand h-full origin-left"
            />
          </div>
        </div>
      </section>

      {/* Mobile / tablet / reduced motion: stacked */}
      <section
        aria-labelledby="process-title"
        className={reduce ? "py-24" : "py-24 lg:hidden"}
      >
        <Container>
          <Intro />
          <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2">
            {process.map((s, i) => (
              <RevealItem key={s.step} className="min-h-[320px]">
                <Step step={s} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
