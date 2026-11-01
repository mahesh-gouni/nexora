import { cn } from "~/lib/cn";

/** Pre-rendered Nexora artwork (see docs/brand/art). Sizes must match public/art files. */
export const artSizes = {
  hero: [1000, 1600, 2400],
  "svc-web": [600, 1000],
  "svc-commerce": [600, 1000],
  "svc-erp": [600, 1000],
  "svc-dashboard": [600, 1000],
  "svc-saas": [600, 1000],
  "svc-automation": [600, 1000],
  about: [1000, 1800],
  stack: [600, 1000],
  cta: [900, 1600],
} as const;

export const artRatio: Record<ArtName, [number, number]> = {
  hero: [2400, 1500],
  "svc-web": [1, 1],
  "svc-commerce": [1, 1],
  "svc-erp": [1, 1],
  "svc-dashboard": [1, 1],
  "svc-saas": [1, 1],
  "svc-automation": [1, 1],
  about: [2400, 1500],
  stack: [1, 1],
  cta: [2000, 1200],
};

export type ArtName = keyof typeof artSizes;

/**
 * Responsive AVIF/WebP artwork. Decorative by default (empty alt);
 * pass `alt` when the image carries meaning.
 */
export function Art({
  name,
  sizes,
  alt = "",
  priority = false,
  className,
}: {
  name: ArtName;
  sizes: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  const widths = artSizes[name];
  const set = (ext: string) =>
    widths.map((w) => `/art/${name}-${w}.${ext} ${w}w`).join(", ");
  const [rw, rh] = artRatio[name];
  const largest = widths[widths.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/art/${name}-${widths[0]}.webp`}
        alt={alt}
        width={largest}
        height={Math.round((largest * rh) / rw)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable={false}
        className={cn("h-auto w-full select-none", className)}
      />
    </picture>
  );
}
