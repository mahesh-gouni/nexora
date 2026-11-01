import { ArrowRight } from "lucide-react";
import type { Route } from "./+types/styleguide";

import { Logo, LogoMark } from "~/components/logo";
import { Container, Eyebrow, PageHero, Section } from "~/components/section";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import {
  FieldError,
  Input,
  Label,
  Select,
  Textarea,
} from "~/components/ui/field";
import { pageMeta } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Styleguide",
    description: "Nexora design tokens and components.",
    path: "/styleguide",
    noindex: true,
  });
}

const colours = [
  { name: "bg", cls: "bg-bg" },
  { name: "surface", cls: "bg-surface" },
  { name: "surface-sunken", cls: "bg-surface-sunken" },
  { name: "text", cls: "bg-text" },
  { name: "muted", cls: "bg-muted" },
  { name: "border", cls: "bg-border" },
  { name: "brand", cls: "bg-brand" },
  { name: "brand-ink", cls: "bg-brand-ink" },
  { name: "brand-soft", cls: "bg-brand-soft" },
  { name: "success", cls: "bg-success" },
  { name: "danger", cls: "bg-danger" },
];

const type = [
  {
    label: "Display 60 / Manrope 800",
    cls: "font-display text-6xl font-extrabold",
  },
  { label: "H1 48 / Manrope 800", cls: "font-display text-5xl font-extrabold" },
  { label: "H2 36 / Manrope 700", cls: "font-display text-4xl font-bold" },
  { label: "H3 24 / Manrope 700", cls: "font-display text-2xl font-bold" },
  { label: "Lead 20 / Inter 400", cls: "text-xl text-muted" },
  { label: "Body 16 / Inter 400", cls: "text-base" },
  { label: "Small 14 / Inter 400", cls: "text-sm text-muted" },
  { label: "Mono 13 / JetBrains Mono", cls: "font-mono text-[13px]" },
];

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border border-t py-12">
      <Eyebrow>{title}</Eyebrow>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default function Styleguide() {
  return (
    <>
      <PageHero
        eyebrow="Internal"
        lines={["Nexora styleguide"]}
        lead="Every token and component used on the site. Toggle the theme to check both modes. This page is not linked from the navigation and is hidden from search engines."
      />
      <Section className="pt-8 sm:pt-8">
        <Container>
          <div className="text-muted flex items-center gap-3 pb-8 text-sm">
            Theme: <ThemeToggle />
          </div>

          <Block title="Logo">
            <div className="flex flex-wrap items-end gap-10">
              <LogoMark animated className="text-text size-28" />
              <LogoMark className="text-text size-16" />
              <LogoMark className="text-text size-8" />
              <Logo />
              <div className="rounded-panel bg-charcoal text-paper p-5">
                <Logo />
              </div>
              <img src="/favicon.svg" alt="Favicon" className="size-12" />
            </div>
          </Block>

          <Block title="Colour tokens">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {colours.map((c) => (
                <div key={c.name}>
                  <div
                    className={`rounded-control border-border h-16 border ${c.cls}`}
                  />
                  <p className="mt-2 font-mono text-xs">{c.name}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Typography">
            <div className="space-y-5">
              {type.map((t) => (
                <div
                  key={t.label}
                  className="grid gap-1 sm:grid-cols-[220px_1fr] sm:items-baseline"
                >
                  <p className="text-muted font-mono text-xs">{t.label}</p>
                  <p className={`truncate ${t.cls}`}>
                    Ideas into working software
                  </p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Buttons">
            <div className="flex flex-wrap items-center gap-3">
              <Button>
                Primary <ArrowRight aria-hidden />
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link button</Button>
              <Button disabled>Disabled</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </Block>

          <Block title="Badges">
            <div className="flex flex-wrap gap-3">
              <Badge>Planned</Badge>
              <Badge tone="brand">Independent software studio</Badge>
              <Badge tone="success">Demo available</Badge>
            </div>
          </Block>

          <Block title="Cards">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <h3 className="text-lg font-bold">Static card</h3>
                <p className="text-muted mt-2">
                  Surface, border, 16 px radius, soft shadow in light mode.
                </p>
              </Card>
              <Card interactive>
                <h3 className="text-lg font-bold">Interactive card</h3>
                <p className="text-muted mt-2">
                  Lifts slightly on hover. Used for links.
                </p>
              </Card>
              <div className="bg-grid-glow rounded-panel border-border border p-6">
                <h3 className="text-lg font-bold">Grid + glow</h3>
                <p className="text-muted mt-2">Decorative hero background.</p>
              </div>
            </div>
          </Block>

          <Block title="Form controls">
            <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="sg-name">Text input</Label>
                <Input id="sg-name" placeholder="Placeholder" />
              </div>
              <div>
                <Label htmlFor="sg-err">Invalid input</Label>
                <Input
                  id="sg-err"
                  aria-invalid
                  defaultValue="not-an-email"
                  aria-describedby="sg-err-msg"
                />
                <FieldError
                  id="sg-err-msg"
                  message="Please enter a valid email address."
                />
              </div>
              <div>
                <Label htmlFor="sg-sel" optional>
                  Select
                </Label>
                <Select id="sg-sel" defaultValue="a">
                  <option value="a">Option A</option>
                  <option value="b">Option B</option>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="sg-ta">Textarea</Label>
                <Textarea id="sg-ta" placeholder="Longer text" />
              </div>
            </div>
          </Block>

          <Block title="Spacing, radius, motion">
            <div className="flex flex-wrap items-end gap-4">
              {[4, 8, 12, 16, 24, 32, 48, 64].map((s) => (
                <div key={s} className="text-center">
                  <div className="bg-brand" style={{ width: s, height: s }} />
                  <p className="text-muted mt-2 font-mono text-xs">{s}</p>
                </div>
              ))}
            </div>
            <div className="text-muted mt-8 flex flex-wrap gap-4 font-mono text-xs">
              <div className="rounded-input border-border-strong border px-4 py-3">
                input 6px
              </div>
              <div className="rounded-control border-border-strong border px-4 py-3">
                control 10px
              </div>
              <div className="rounded-panel border-border-strong border px-4 py-3">
                panel 16px
              </div>
            </div>
            <p className="text-muted mt-6 max-w-2xl text-sm">
              Motion: 150 / 250 / 400 ms with a soft ease-out; scroll reveals
              fade up 16 px; card groups stagger by 70 ms. All movement is
              disabled when the visitor prefers reduced motion.
            </p>
          </Block>
        </Container>
      </Section>
    </>
  );
}
