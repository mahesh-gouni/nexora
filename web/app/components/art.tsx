import { useEffect, useRef, useState } from "react";
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
 * pass `alt` when the image carries meaning. With `live` (default), the
 * still is replaced by the animated 3D scene once it is ready and visible.
 */
export function Art({
  name,
  sizes,
  alt = "",
  priority = false,
  live = true,
  className,
}: {
  name: ArtName;
  sizes: string;
  alt?: string;
  priority?: boolean;
  live?: boolean;
  className?: string;
}) {
  const widths = artSizes[name];
  const set = (ext: string) =>
    widths.map((w) => `/art/${name}-${w}.${ext} ${w}w`).join(", ");
  const [rw, rh] = artRatio[name];
  const largest = widths[widths.length - 1];
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ready = useLiveScene(live ? name : null, wrap, canvas);
  return (
    <div
      ref={wrap}
      className={cn("relative", className?.includes("h-full") && "h-full")}
    >
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
          className={cn(
            "h-auto w-full transition-opacity duration-700 select-none",
            ready && "opacity-0",
            className,
          )}
        />
      </picture>
      {live && (
        <canvas
          ref={canvas}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-700",
            ready && "opacity-100",
          )}
        />
      )}
    </div>
  );
}

function canAnimate() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return false;
  const conn = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (conn?.saveData) return false;
  if ((navigator.hardwareConcurrency ?? 4) <= 2) return false;
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return false;
    // Skip software renderers (no GPU): they would make scrolling janky.
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

const idle = (cb: () => void) => {
  const w = window as Window & {
    requestIdleCallback?: Window["requestIdleCallback"];
  };
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1500 });
  else setTimeout(cb, 300);
};

/** Lazily boots the Three.js scene for `name` when the art scrolls near view. */
function useLiveScene(
  name: ArtName | null,
  wrap: React.RefObject<HTMLDivElement | null>,
  canvas: React.RefObject<HTMLCanvasElement | null>,
) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!name || !el || !cv || !canAnimate()) return;
    let live: Awaited<
      ReturnType<typeof import("~/three/live").createLive>
    > | null = null;
    let visible = false;
    let booting = false;
    let disposed = false;

    const sync = () => {
      if (!live) return;
      if (visible && document.visibilityState === "visible") live.start();
      else live.stop();
    };
    const boot = () => {
      if (booting) return;
      booting = true;
      idle(async () => {
        const { createLive } = await import("~/three/live");
        if (disposed) return;
        try {
          live = createLive(cv, name);
        } catch {
          return; // WebGL failed: keep the still image
        }
        setReady(true);
        sync();
      });
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) boot();
        sync();
      },
      { rootMargin: "150px" },
    );
    io.observe(el);
    const ro = new ResizeObserver(() => live?.resize());
    ro.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      live?.dispose();
    };
  }, [name, wrap, canvas]);
  return ready;
}
