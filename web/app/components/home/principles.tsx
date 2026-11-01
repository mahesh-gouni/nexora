import { Art, type ArtName } from "~/components/art";
import { Container, Eyebrow, Accent } from "~/components/section";
import { Parallax } from "~/components/fx";
import { Reveal, RevealGroup, RevealItem } from "~/components/motion";
import { principles } from "~/content/about";

export function Principles({ art = "about" }: { art?: ArtName }) {
  return (
    <section aria-labelledby="principles-title" className="py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="stage bg-grain relative order-last overflow-hidden rounded-[32px] border border-white/10 lg:order-first">
          <div
            aria-hidden
            className="bg-amber/15 absolute -top-20 -left-20 size-80 rounded-full blur-3xl"
          />
          <Parallax offset={40} className="relative px-2 pt-10">
            <Art name={art} sizes="(min-width: 1024px) 600px, 100vw" />
          </Parallax>
          <p className="text-muted relative px-8 pb-8 font-mono text-xs tracking-widest uppercase">
            Built on foundations, step by step
          </p>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Why Nexora</Eyebrow>
            <h2
              id="principles-title"
              className="mt-4 text-4xl leading-[1.05] font-extrabold sm:text-5xl"
            >
              A small studio, <Accent>by design</Accent>
            </h2>
          </Reveal>
          <RevealGroup className="divide-border border-border mt-10 divide-y border-y">
            {principles.map((p, i) => (
              <RevealItem
                key={p.title}
                className="group grid grid-cols-[3rem_1fr] gap-4 py-6"
              >
                <span className="text-brand-ink font-mono text-sm">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="flex items-center gap-3 text-xl font-bold">
                    {p.title}
                    <span
                      aria-hidden
                      className="bg-brand h-px w-0 transition-all duration-500 group-hover:w-12"
                    />
                  </h3>
                  <p className="text-muted mt-2 leading-relaxed">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
