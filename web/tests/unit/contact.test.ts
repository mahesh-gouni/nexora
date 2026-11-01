import { describe, expect, it } from "vitest";
import {
  contactSchema,
  draftFromValues,
  encodeSubmission,
  gmailHref,
  mailtoHref,
  outlookHref,
} from "~/lib/contact";

const valid = {
  name: "Asha Rao",
  email: "asha@example.com",
  company: "",
  projectType: "E-commerce" as const,
  timeline: "" as const,
  message: "We need an online store for our handmade products.",
};

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("trims whitespace", () => {
    const r = contactSchema.parse({ ...valid, name: "  Asha Rao  " });
    expect(r.name).toBe("Asha Rao");
  });

  it.each([
    ["name too short", { name: "A" }, "name"],
    ["invalid email", { email: "not-an-email" }, "email"],
    ["missing project type", { projectType: "" }, "projectType"],
    ["message too short", { message: "Hi" }, "message"],
  ])("rejects %s", (_label, patch, field) => {
    const r = contactSchema.safeParse({ ...valid, ...patch });
    expect(r.success).toBe(false);
    expect(r.error?.issues.map((i) => i.path[0])).toContain(field);
  });

  it("rejects messages with more than three links", () => {
    const message =
      "See https://a.io https://b.io https://c.io https://d.io please";
    expect(contactSchema.safeParse({ ...valid, message }).success).toBe(false);
  });
});

describe("encodeSubmission", () => {
  it("encodes fields the way Netlify Forms expects", () => {
    const body = new URLSearchParams(
      encodeSubmission(contactSchema.parse(valid)),
    );
    expect(body.get("form-name")).toBe("contact");
    expect(body.get("bot-field")).toBe("");
    expect(body.get("email")).toBe("asha@example.com");
    expect(body.get("projectType")).toBe("E-commerce");
  });

  it("passes the honeypot value through", () => {
    const body = new URLSearchParams(
      encodeSubmission(contactSchema.parse(valid), "spam"),
    );
    expect(body.get("bot-field")).toBe("spam");
  });
});

describe("email hand-off", () => {
  const values = contactSchema.parse({
    ...valid,
    company: "Rao Crafts",
    timeline: "Within 1–3 months",
    message: "We need an online store & a stock dashboard.\nThanks!",
  });

  it("drafts a prefilled email to the studio address", () => {
    const d = draftFromValues(values);
    expect(d.to).toBe("nexorafinity@gmail.com");
    expect(d.subject).toBe("Project enquiry: E-commerce (Rao Crafts)");
    expect(d.body).toContain("Name: Asha Rao");
    expect(d.body).toContain("Timeline: Within 1–3 months");
    expect(d.body).toContain("online store & a stock dashboard.");
  });

  it("builds an RFC 6068 mailto link with CRLF line breaks", () => {
    const href = mailtoHref(draftFromValues(values));
    expect(href.startsWith("mailto:nexorafinity@gmail.com?subject=")).toBe(
      true,
    );
    expect(href).toContain("%0D%0A");
    expect(href).not.toContain("+");
    expect(href).toContain("%26"); // "&" in the message is encoded
    const body = decodeURIComponent(href.split("&body=")[1]);
    expect(body).toContain("We need an online store & a stock dashboard.");
  });

  it("shortens very long bodies for mail clients with URL limits", () => {
    const long = draftFromValues({ ...values, message: "x".repeat(4000) });
    expect(decodeURIComponent(mailtoHref(long)).length).toBeLessThan(2000);
    expect(decodeURIComponent(mailtoHref(long))).toContain(
      "[message shortened]",
    );
  });

  it("offers Gmail and Outlook web compose links with the full draft", () => {
    const d = draftFromValues(values);
    const g = new URL(gmailHref(d));
    expect(g.hostname).toBe("mail.google.com");
    expect(g.searchParams.get("to")).toBe("nexorafinity@gmail.com");
    expect(g.searchParams.get("su")).toBe(d.subject);
    const o = new URL(outlookHref(d));
    expect(o.hostname).toBe("outlook.live.com");
    expect(o.searchParams.get("subject")).toBe(d.subject);
  });
});
