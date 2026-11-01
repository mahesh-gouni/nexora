import { useRef } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "~/lib/cn";

const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/** Pulls its child gently toward the cursor. Off for touch and reduced motion. */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), {
    stiffness: 220,
    damping: 18,
    mass: 0.4,
  });
  const y = useSpring(useMotionValue(0), {
    stiffness: 220,
    damping: 18,
    mass: 0.4,
  });
  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <m.div
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </m.div>
  );
}

/** 3D tilt toward the pointer, with a soft highlight. */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glare = useTransform(
    [gx, gy] as MotionValue<number>[],
    ([a, b]) =>
      `radial-gradient(500px circle at ${a}% ${b}%, rgb(252 176 51 / 0.10), transparent 45%)`,
  );
  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  }
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <m.div
      onPointerMove={move}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className={cn("relative", className)}
    >
      {children}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: glare }}
      />
    </m.div>
  );
}

/** Moves content along y as it scrolls through the viewport. */
export function Parallax({
  children,
  offset = 60,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [offset, -offset],
  );
  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  );
}

/** Large statement whose words light up as it scrolls into view. */
export function ScrollWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0, 1]);
  // Base word is the readable muted colour; the bright copy fades in on scroll.
  return (
    <span className="text-muted relative mr-[0.25em]">
      {children}
      <m.span
        aria-hidden
        style={{ opacity }}
        className="text-text absolute inset-0"
      >
        {children}
      </m.span>
    </span>
  );
}

/** Headline whose lines rise into place on load (CSS, runs before hydration). */
export function RiseLines({
  lines,
  className,
  delay = 0,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          {i > 0 && " "}
          <span
            className="enter-rise block"
            style={{ "--d": `${delay + i * 0.09}s` } as React.CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/** Infinite horizontal marquee; pauses on hover, static for reduced motion. */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span>{t}</span>
          <span className="text-brand" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
