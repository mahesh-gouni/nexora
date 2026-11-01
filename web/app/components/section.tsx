import { cn } from "~/lib/cn";
import { Reveal } from "~/components/motion";
import { RiseLines, Parallax } from "~/components/fx";
import { Art, type ArtName } from "~/components/art";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto max-w-6xl px-4 sm:px-6", className)}
      {...props}
    />
  );
}

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-20 sm:py-28", className)} {...props} />;
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-brand-ink flex items-center gap-2 font-mono text-xs font-medium tracking-[0.18em] uppercase",
        className,
      )}
    >
      <span className="h-px w-6 bg-current" aria-hidden />
      {children}
    </p>
  );
}

/** Serif italic accent word used inside display headings. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-brand-ink font-serif font-normal tracking-normal italic">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  id,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Eyebrow className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        id={id}
        className="mt-4 text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {lead && (
        <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/** Dark, art-led intro for inner pages. */
export function PageHero({
  eyebrow,
  lines,
  lead,
  art,
}: {
  eyebrow: string;
  lines: React.ReactNode[];
  lead: string;
  art?: ArtName;
}) {
  return (
    <div className="stage bg-grain relative isolate overflow-hidden">
      <div
        aria-hidden
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="animate-drift bg-amber/15 absolute -top-40 right-[-10%] -z-10 size-[620px] rounded-full blur-[120px]"
      />
      <Container className="grid items-center gap-10 pt-36 pb-20 sm:pt-40 sm:pb-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="enter-fade">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-6 text-5xl leading-[1.02] font-extrabold sm:text-6xl lg:text-7xl">
            <RiseLines lines={lines} delay={0.1} />
          </h1>
          <p
            style={{ "--d": "0.35s" } as React.CSSProperties}
            className="enter-fade text-muted mt-7 max-w-xl text-lg leading-relaxed sm:text-xl"
          >
            {lead}
          </p>
        </div>
        {art && (
          <div
            className="enter-art relative -mr-8 hidden lg:block"
            style={{ "--d": "0.15s" } as React.CSSProperties}
          >
            <Parallax offset={30}>
              <Art name={art} sizes="(min-width: 1024px) 560px, 0px" priority />
            </Parallax>
          </div>
        )}
      </Container>
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </div>
  );
}
