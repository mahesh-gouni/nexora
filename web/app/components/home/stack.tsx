import { useState } from "react";
import { m } from "motion/react";
import { Art } from "~/components/art";
import { Container, Eyebrow, Accent } from "~/components/section";
import { Reveal } from "~/components/motion";
import { layers } from "~/content/about";
import { cn } from "~/lib/cn";

// Vertical position (%) of each slab in the stack render, for the hotspots.
const hotspot = { interface: "24%", services: "45%", data: "66%" } as const;

export function Stack() {
  const [active, setActive] =
    useState<(typeof layers)[number]["id"]>("interface");
  return (
    <section
      aria-labelledby="stack-title"
      className="border-border border-t py-24 sm:py-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <Eyebrow>Technology</Eyebrow>
            <h2
              id="stack-title"
              className="mt-4 text-4xl leading-[1.05] font-extrabold sm:text-5xl"
            >
              A proven stack, <Accent>layer by layer</Accent>
            </h2>
            <p className="text-muted mt-5 max-w-lg text-lg leading-relaxed">
              Mainstream, well-supported tools, so your software stays easy to
              maintain and to hand over.
            </p>
          </Reveal>
          <ul className="mt-10 space-y-3">
            {layers.map((l) => {
              const on = l.id === active;
              return (
                <li key={l.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(l.id)}
                    onFocus={() => setActive(l.id)}
                    onClick={() => setActive(l.id)}
                    aria-pressed={on}
                    className={cn(
                      "w-full rounded-2xl border p-5 text-left transition-all duration-300",
                      on
                        ? "border-brand/50 bg-brand-soft"
                        : "border-border hover:border-border-strong",
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-lg font-bold">{l.name}</span>
                      <span
                        className={cn(
                          "size-2.5 rounded-full transition-colors",
                          on ? "bg-brand" : "bg-border-strong",
                        )}
                      />
                    </span>
                    <span className="text-muted mt-1 block">{l.body}</span>
                    <span className="mt-3 flex flex-wrap gap-1.5">
                      {l.tools.map((t) => (
                        <span
                          key={t}
                          className="border-border bg-surface rounded-full border px-2.5 py-0.5 font-mono text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal className="stage bg-grain relative overflow-hidden rounded-[32px] border border-white/10 p-6">
          <Art
            name="stack"
            sizes="(min-width: 1024px) 520px, 90vw"
            alt="Three floating layers: a glass interface layer, a graphite services layer and an amber data layer"
          />
          {layers.map((l) => (
            <m.span
              key={l.id}
              aria-hidden
              animate={{
                opacity: l.id === active ? 1 : 0.35,
                x: l.id === active ? 0 : 8,
              }}
              transition={{ duration: 0.3 }}
              className="text-text absolute right-6 flex items-center gap-2 font-mono text-xs"
              style={{ top: hotspot[l.id] }}
            >
              <span className="bg-brand h-px w-10" />
              {l.name}
            </m.span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
