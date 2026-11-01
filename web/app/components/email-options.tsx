import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import {
  draftAsText,
  gmailHref,
  mailtoHref,
  outlookHref,
  type EmailDraft,
} from "~/lib/contact";
import { cn } from "~/lib/cn";

/** Web-mail and copy fallbacks for visitors without a default mail app. */
export function EmailFallbacks({
  draft,
  className,
}: {
  draft: EmailDraft;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(draftAsText(draft));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the visible address is still selectable
    }
  }
  const link =
    "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand-ink";
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <a
        href={gmailHref(draft)}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        Gmail
      </a>
      <a
        href={outlookHref(draft)}
        target="_blank"
        rel="noopener noreferrer"
        className={link}
      >
        Outlook
      </a>
      <button
        type="button"
        onClick={copy}
        className={cn(link, "cursor-pointer")}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden />
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
        {copied ? "Copied" : "Copy details"}
      </button>
    </div>
  );
}

/** A prominent "email Nexora" card with a prefilled enquiry template. */
export function EmailCard({ draft }: { draft: EmailDraft }) {
  return (
    <div className="border-border rounded-2xl border p-5">
      <p className="text-muted text-sm">Prefer email?</p>
      <a
        href={mailtoHref(draft)}
        className="group text-text hover:text-brand-ink mt-1 inline-flex items-center gap-2 text-lg font-semibold break-all"
      >
        <Mail className="text-brand-ink size-5 shrink-0" aria-hidden />
        {draft.to}
      </a>
      <p className="text-muted mt-2 text-sm">
        Opens your email app with an enquiry template. No mail app? Use:
      </p>
      <EmailFallbacks draft={draft} className="mt-3" />
    </div>
  );
}
