import { m } from "motion/react";
import { cn } from "~/lib/cn";

/**
 * The Nexora mark: a folded-ribbon "N" with three dots.
 * Charcoal parts use currentColor so the mark adapts to light/dark;
 * the amber stem and dots are fixed brand colour.
 */
export function LogoMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const t = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <m.path
        d="M36 22a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6z"
        fill="#F5A623"
        initial={animated ? { scaleY: 0, opacity: 0 } : false}
        animate={{ scaleY: 1, opacity: 1 }}
        style={{ originY: 1 }}
        transition={{ ...t, delay: 0.25 }}
      />
      <m.path
        d="M6 22a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6z"
        fill="currentColor"
        fillOpacity={0.72}
        initial={animated ? { scaleY: 0, opacity: 0 } : false}
        animate={{ scaleY: 1, opacity: 1 }}
        style={{ originY: 0 }}
        transition={t}
      />
      <m.path
        d="M12 22 42 52"
        stroke="currentColor"
        strokeWidth={12}
        strokeLinecap="round"
        fill="none"
        initial={animated ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ ...t, delay: 0.12 }}
      />
      {[
        { cx: 53, cy: 9, r: 4.6, d: 0.5 },
        { cx: 60.2, cy: 4.4, r: 2.4, d: 0.6 },
        { cx: 60.6, cy: 14.2, r: 2.4, d: 0.7 },
      ].map((c) => (
        <m.circle
          key={c.d}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill="#F5A623"
          initial={animated ? { scale: 0 } : false}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 18,
            delay: c.d,
          }}
        />
      ))}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-8" />
      <span className="font-display text-xl font-extrabold tracking-tight">
        Nexora
      </span>
    </span>
  );
}
