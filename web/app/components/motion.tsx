import { m, type HTMLMotionProps } from "motion/react";

/**
 * Shared motion presets. Every animation on the site goes through these,
 * and MotionConfig (reducedMotion="user") in root.tsx disables movement for
 * visitors who prefer reduced motion.
 */
export const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, ease, delay }}
      {...props}
    />
  );
}

/** Staggers its direct <RevealItem> children as the group scrolls into view. */
export function RevealGroup(props: HTMLMotionProps<"div">) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      {...props}
    />
  );
}

export function RevealItem(props: HTMLMotionProps<"div">) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      }}
      {...props}
    />
  );
}
