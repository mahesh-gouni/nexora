import { cn } from "~/lib/cn";

export function Card({
  className,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-panel border-border bg-surface shadow-card border p-6",
        interactive &&
          "ease-out-soft hover:border-border-strong hover:shadow-raised transition-[transform,border-color,box-shadow] duration-250 hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}
