import { describe, expect, it } from "vitest";
import { contactSchema, encodeSubmission } from "~/lib/contact";

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
