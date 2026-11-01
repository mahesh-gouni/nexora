import * as z from "zod/mini";

export const FORM_NAME = "contact";

export const projectTypes = [
  "Custom web application",
  "E-commerce",
  "ERP / business management",
  "Admin dashboard",
  "SaaS product",
  "Automation / integration",
  "Something else",
] as const;

export const timelines = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Just exploring",
] as const;

const LINK_PATTERN = /https?:\/\//gi;

export const contactSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Please enter your name."),
      z.maxLength(100, "That name is too long."),
    ),
  email: z
    .string()
    .check(
      z.trim(),
      z.email("Please enter a valid email address."),
      z.maxLength(200, "That email address is too long."),
    ),
  company: z.optional(
    z
      .string()
      .check(z.trim(), z.maxLength(120, "Please shorten the company name.")),
  ),
  projectType: z.enum(projectTypes, { error: "Please choose a project type." }),
  timeline: z.optional(z.union([z.enum(timelines), z.literal("")])),
  message: z.string().check(
    z.trim(),
    z.minLength(20, "Please describe your project in at least 20 characters."),
    z.maxLength(5000, "Please keep the message under 5,000 characters."),
    z.refine((m) => (m.match(LINK_PATTERN) ?? []).length <= 3, {
      error: "Please include no more than three links.",
    }),
  ),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;

/** URL-encodes a submission the way Netlify Forms expects. */
export function encodeSubmission(values: ContactValues, botField = ""): string {
  const data: Record<string, string> = {
    "form-name": FORM_NAME,
    "bot-field": botField,
    name: values.name,
    email: values.email,
    company: values.company ?? "",
    projectType: values.projectType,
    timeline: values.timeline ?? "",
    message: values.message,
  };
  return new URLSearchParams(data).toString();
}
