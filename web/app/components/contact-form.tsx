import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "motion/react";
import { CircleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  FieldError,
  Input,
  Label,
  Select,
  Textarea,
} from "~/components/ui/field";
import {
  FORM_NAME,
  contactSchema,
  encodeSubmission,
  projectTypes,
  timelines,
  type ContactInput,
  type ContactValues,
} from "~/lib/contact";

type Status = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: undefined, timeline: "" },
    mode: "onTouched",
  });

  async function onSubmit(
    values: ContactValues,
    event?: React.BaseSyntheticEvent,
  ) {
    setStatus("idle");
    const form = event?.target as HTMLFormElement | undefined;
    const botField =
      (form?.elements.namedItem("bot-field") as HTMLInputElement | null)
        ?.value ?? "";
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeSubmission(values, botField),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const describedBy = (field: keyof ContactInput) =>
    errors[field] ? `${field}-error` : undefined;

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      aria-describedby="form-status"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden" aria-hidden>
        <label>
          Leave this field empty:{" "}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="company" optional>
          Company
        </Label>
        <Input
          id="company"
          autoComplete="organization"
          aria-invalid={!!errors.company}
          aria-describedby={describedBy("company")}
          {...register("company")}
        />
        <FieldError id="company-error" message={errors.company?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="projectType">Project type</Label>
          <Select
            id="projectType"
            defaultValue=""
            aria-invalid={!!errors.projectType}
            aria-describedby={describedBy("projectType")}
            {...register("projectType")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <FieldError
            id="projectType-error"
            message={errors.projectType?.message}
          />
        </div>
        <div>
          <Label htmlFor="timeline" optional>
            Timeline
          </Label>
          <Select id="timeline" {...register("timeline")}>
            <option value="">Not sure yet</option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">About your project</Label>
        <Textarea
          id="message"
          placeholder="What do you need, who will use it, and what happens today without it?"
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted text-sm">
          Your details are used only to reply. See the{" "}
          <a href="/privacy" className="text-brand-ink underline">
            privacy policy
          </a>
          .
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="shrink-0"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              Send message <Send aria-hidden />
            </>
          )}
        </Button>
      </div>

      <div id="form-status" role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          {status === "success" && (
            <m.p
              key="ok"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-control border-success/30 bg-success/10 text-success flex items-start gap-3 border p-4"
            >
              <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
              <span>
                <strong className="font-semibold">
                  Thank you, your message was sent.
                </strong>{" "}
                You'll get a reply by email, usually within two business days.
              </span>
            </m.p>
          )}
          {status === "error" && (
            <m.p
              key="err"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-control border-danger/30 bg-danger/10 text-danger flex items-start gap-3 border p-4"
            >
              <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
              <span>
                <strong className="font-semibold">
                  The message could not be sent.
                </strong>{" "}
                Please check your connection and try again in a moment.
              </span>
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
