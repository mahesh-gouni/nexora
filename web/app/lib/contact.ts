import { site } from "~/lib/site";
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

/* ---------- Email hand-off (works without Netlify) ---------- */

// Some mail clients (notably on Windows) truncate long mailto URLs.
const MAX_MAILTO_BODY = 1600;

export type EmailDraft = { to: string; subject: string; body: string };

/** Builds a prefilled email from the contact form values. */
export function draftFromValues(values: ContactValues): EmailDraft {
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.company ? `Company: ${values.company}` : null,
    `Project type: ${values.projectType}`,
    values.timeline ? `Timeline: ${values.timeline}` : null,
    "",
    "About the project:",
    values.message,
  ].filter((l): l is string => l !== null);
  return {
    to: site.email,
    subject: `Project enquiry: ${values.projectType}${values.company ? ` (${values.company})` : ""}`,
    body: lines.join("\n"),
  };
}

/** A blank enquiry template for plain "email us" links. */
export const templateDraft: EmailDraft = {
  to: site.email,
  subject: "Project enquiry",
  body: [
    "Hi Nexora,",
    "",
    "Name:",
    "Company (optional):",
    "Project type:",
    "Timeline:",
    "",
    "About the project:",
    "",
  ].join("\n"),
};

function clip(body: string, max: number) {
  return body.length > max
    ? `${body.slice(0, max)}\n\n[message shortened]`
    : body;
}

// RFC 6068: encode with %20 (not +) and CRLF line breaks for best client support.
const enc = (s: string) => encodeURIComponent(s.replace(/\r?\n/g, "\r\n"));

export function mailtoHref(d: EmailDraft) {
  return `mailto:${d.to}?subject=${enc(d.subject)}&body=${enc(clip(d.body, MAX_MAILTO_BODY))}`;
}

export function gmailHref(d: EmailDraft) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(d.to)}&su=${enc(d.subject)}&body=${enc(d.body)}`;
}

export function outlookHref(d: EmailDraft) {
  return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(d.to)}&subject=${enc(d.subject)}&body=${enc(d.body)}`;
}

export function draftAsText(d: EmailDraft) {
  return `To: ${d.to}\nSubject: ${d.subject}\n\n${d.body}`;
}
