import { forwardRef } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "~/lib/cn";

const control =
  "w-full rounded-input border border-border-strong bg-surface px-3 text-[15px] text-text placeholder:text-muted/70 transition-colors duration-150 focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 aria-invalid:border-danger";

export function Label({
  className,
  optional,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { optional?: boolean }) {
  return (
    <label
      className={cn("text-text mb-1.5 block text-sm font-medium", className)}
      {...props}
    >
      {children}
      {optional && (
        <span className="text-muted ml-1 font-normal">(optional)</span>
      )}
    </label>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input ref={ref} className={cn(control, "h-11", className)} {...props} />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(control, "min-h-36 py-2.5 leading-relaxed", className)}
      {...props}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          control,
          "h-11 cursor-pointer appearance-none pr-10",
          className,
        )}
        {...props}
      />
      <ChevronDown
        className="text-muted pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
        aria-hidden
      />
    </div>
  );
});

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-danger mt-1.5 flex items-center gap-1.5 text-sm">
      <CircleAlert className="size-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}
