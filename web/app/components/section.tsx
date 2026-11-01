import { cn } from "~/lib/cn";
import { Reveal } from "~/components/motion";

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
  return <section className={cn("py-16 sm:py-24", className)} {...props} />;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-brand-ink font-mono text-xs font-medium tracking-wider uppercase">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <Reveal
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className="mt-3 text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      {lead && (
        <p className="text-muted mt-4 text-lg leading-relaxed">{lead}</p>
      )}
    </Reveal>
  );
}

/** Top-of-page intro for inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="bg-grid-glow border-border relative border-b">
      <Container className="py-16 sm:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold sm:text-5xl">
          {title}
        </h1>
        <p className="text-muted mt-5 max-w-2xl text-lg leading-relaxed">
          {lead}
        </p>
      </Container>
    </div>
  );
}
