import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Art } from "~/components/art";
import { Container, SectionHeading, Accent } from "~/components/section";
import { RevealGroup, RevealItem } from "~/components/motion";
import { Tilt } from "~/components/fx";
import { services } from "~/content/services";
import { cn } from "~/lib/cn";

// Asymmetric 12-column layout: one tall feature, then varied widths.
const layout = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export function ServicesBento() {
  return (
    <section aria-labelledby="services-title" className="pb-24 sm:pb-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="services-title"
            eyebrow="Capabilities"
            title={
              <>
                Six ways to <Accent>build</Accent> with Nexora
              </>
            }
          />
          <p className="text-muted max-w-xs">
            From a first web app to a full ERP, every project starts from the
            same tested foundation.
          </p>
        </div>

        <RevealGroup className="mt-14 grid auto-rows-[minmax(260px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-12">
          {services.map((s, i) => {
            const feature = i === 0;
            return (
              <RevealItem
                key={s.id}
                className={cn(layout[i], i === 0 && "md:col-span-2")}
              >
                <Tilt max={feature ? 4 : 6} className="h-full rounded-[28px]">
                  <Link
                    to={`/services#${s.id}`}
                    viewTransition
                    className="stage group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 p-7 transition-colors hover:border-white/25 sm:p-8"
                  >
                    <div
                      aria-hidden
                      className={cn(
                        "ease-out-soft pointer-events-none absolute transition-transform duration-700 group-hover:scale-[1.06] group-hover:-rotate-2",
                        feature
                          ? "top-[-2%] right-[-8%] w-[82%] md:w-[52%] lg:top-auto lg:right-[-6%] lg:bottom-[-8%] lg:w-[86%]"
                          : "top-[-10%] right-[-12%] w-[62%]",
                      )}
                    >
                      <Art
                        name={s.art}
                        sizes={
                          feature ? "(min-width:1024px) 560px, 80vw" : "300px"
                        }
                      />
                    </div>
                    <span className="text-muted font-mono text-xs">
                      0{i + 1}
                    </span>
                    <span className="group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand absolute top-6 right-6 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                    <div
                      className={cn(
                        "relative mt-auto",
                        feature
                          ? "max-w-sm pt-56 sm:pt-72"
                          : "max-w-[16rem] pt-28",
                      )}
                    >
                      <h3
                        className={cn(
                          "font-bold",
                          feature
                            ? "text-3xl sm:text-4xl"
                            : "text-xl sm:text-2xl",
                        )}
                      >
                        {s.title}
                      </h3>
                      <p className="text-muted mt-2 leading-relaxed">
                        {s.summary}
                      </p>
                    </div>
                  </Link>
                </Tilt>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
