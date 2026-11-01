import { Link } from "react-router";
import { ArrowUpRight, Check } from "lucide-react";
import type { Route } from "./+types/services";

import { Accent, Container, PageHero } from "~/components/section";
import { Reveal } from "~/components/motion";
import { Parallax, Tilt } from "~/components/fx";
import { Art } from "~/components/art";
import { CtaBand } from "~/components/cta-band";
import { services, type Service } from "~/content/services";
import { products } from "~/content/products";
import { pageMeta } from "~/lib/site";
import { cn } from "~/lib/cn";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Services",
    description:
      "Custom web applications, e-commerce, ERP, admin dashboards, SaaS development and business automation, built with React and Spring Boot.",
    path: "/services",
  });
}

function Includes({ s, columns = 1 }: { s: Service; columns?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2")}>
      {s.includes.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span className="bg-brand-soft text-brand-ink mt-1 flex size-5 shrink-0 items-center justify-center rounded-full">
            <Check className="size-3" aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Meta({ s }: { s: Service }) {
  const product = products.find((p) => p.id === s.relatedProduct);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {s.stack.map((t) => (
        <span
          key={t}
          className="border-border text-muted rounded-full border px-3 py-1 font-mono text-xs"
        >
          {t}
        </span>
      ))}
      {product && (
        <Link
          to="/products"
          viewTransition
          className="text-brand-ink ml-1 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Related: {product.name} ({product.status.toLowerCase()})
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}

/** Variant A: full-width dark stage, art left. */
function StageBlock({ s, i }: { s: Service; i: number }) {
  return (
    <Reveal className="stage bg-grain relative grid items-center gap-8 overflow-hidden rounded-[32px] border border-white/10 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
      <Parallax offset={30}>
        <Art name={s.art} sizes="(min-width: 1024px) 520px, 90vw" />
      </Parallax>
      <div>
        <p className="text-muted font-mono text-xs">0{i + 1} / 06</p>
        <h2
          id={`${s.id}-title`}
          className="mt-3 text-4xl font-extrabold sm:text-5xl"
        >
          {s.title}
        </h2>
        <p className="text-muted mt-4 text-lg leading-relaxed">{s.summary}</p>
        <p className="border-brand text-text/80 mt-6 border-l-2 pl-4 leading-relaxed">
          {s.problem}
        </p>
        <div className="mt-8">
          <Includes s={s} />
        </div>
        <div className="mt-8">
          <Meta s={s} />
        </div>
      </div>
    </Reveal>
  );
}

/** Variant B: editorial text left, tilted art card right. */
function EditorialBlock({ s, i }: { s: Service; i: number }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
      <Reveal>
        <p className="text-muted font-mono text-xs">0{i + 1} / 06</p>
        <h2
          id={`${s.id}-title`}
          className="mt-3 text-4xl font-extrabold sm:text-5xl"
        >
          {s.title}
        </h2>
        <p className="text-muted mt-4 max-w-xl text-lg leading-relaxed">
          {s.summary}
        </p>
        <p className="mt-6 text-sm font-semibold tracking-wide uppercase">
          The problem
        </p>
        <p className="text-muted mt-2 max-w-xl leading-relaxed">{s.problem}</p>
        <div className="mt-8">
          <Includes s={s} columns={2} />
        </div>
        <div className="mt-8">
          <Meta s={s} />
        </div>
      </Reveal>
      <Reveal>
        <Tilt className="rounded-[32px]">
          <div className="stage bg-grain overflow-hidden rounded-[32px] border border-white/10 p-6">
            <Art name={s.art} sizes="(min-width: 1024px) 460px, 90vw" />
          </div>
        </Tilt>
      </Reveal>
    </div>
  );
}

/** Variant C: wide banner art on top, two-column details below. */
function BannerBlock({ s, i }: { s: Service; i: number }) {
  return (
    <div>
      <Reveal className="stage bg-grain relative h-64 overflow-hidden rounded-[32px] border border-white/10 sm:h-80">
        <div className="absolute top-1/2 left-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 sm:w-[640px]">
          <Parallax offset={50}>
            <Art name={s.art} sizes="640px" />
          </Parallax>
        </div>
      </Reveal>
      <Reveal className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-muted font-mono text-xs">0{i + 1} / 06</p>
          <h2
            id={`${s.id}-title`}
            className="mt-3 text-4xl font-extrabold sm:text-5xl"
          >
            {s.title}
          </h2>
          <p className="text-muted mt-4 text-lg leading-relaxed">{s.summary}</p>
          <p className="text-text/80 mt-6 leading-relaxed">{s.problem}</p>
        </div>
        <div className="space-y-8 lg:pt-10">
          <Includes s={s} />
          <Meta s={s} />
        </div>
      </Reveal>
    </div>
  );
}

const variants = [StageBlock, EditorialBlock, BannerBlock];

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        art="svc-erp"
        lines={[
          "Business software,",
          <>
            built to <Accent>work</Accent>.
          </>,
        ]}
        lead="Six ways Nexora can help. Every project starts with your workflow, gets a written estimate, and ships in small, tested increments."
      />

      <div className="sticky top-[76px] z-30 mt-6 sm:top-[84px]">
        <Container>
          <nav
            aria-label="Services on this page"
            className="no-scrollbar border-border bg-bg/85 flex gap-1 overflow-x-auto rounded-full border p-1.5 backdrop-blur-xl"
          >
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-muted hover:bg-surface-sunken hover:text-text shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition-colors"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      <Container className="space-y-28 py-20 sm:space-y-36 sm:py-28">
        {services.map((s, i) => {
          const Block = variants[i % variants.length];
          return (
            <article
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="scroll-mt-40"
            >
              <Block s={s} i={i} />
            </article>
          );
        })}
      </Container>

      <CtaBand
        title={
          <>
            Not sure which <Accent>fits?</Accent>
          </>
        }
        body="Describe the problem in plain words. Nexora will suggest the simplest approach that works, even if that means a smaller project."
      />
    </>
  );
}
