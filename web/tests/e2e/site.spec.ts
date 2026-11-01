import { expect, test, type Page } from "@playwright/test";

const pages = [
  { path: "/", h1: /Ideas into working software/i },
  { path: "/services", h1: /Business software, built to work/i },
  { path: "/products", h1: /Reusable products/i },
  { path: "/about", h1: /independent studio/i },
  { path: "/contact", h1: /Tell Nexora about your project/i },
  { path: "/privacy", h1: /Privacy policy/i },
];

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
}

for (const { path, h1 } of pages) {
  test(`${path} renders with one h1, a title and no errors`, async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(h1);
    await expect(page).toHaveTitle(/Nexora/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.{50,}/,
    );
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
}

test("unknown pages show a friendly 404", async ({ page }) => {
  const res = await page.goto("/does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});

test("theme toggle switches and persists", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).not.toHaveClass(/dark/);
  await page.getByTestId("theme-toggle").first().click();
  await expect(html).toHaveClass(/dark/);
  await page.reload();
  await expect(html).toHaveClass(/dark/);
});

test("navigation reaches every main page", async ({ page, isMobile }) => {
  await page.goto("/");
  for (const name of ["Services", "Products", "About"]) {
    if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
    const scope = page.getByRole("navigation", {
      name: isMobile ? "Mobile" : "Main",
    });
    await scope.getByRole("link", { name }).click();
    await expect(page).toHaveURL(new RegExp(`/${name.toLowerCase()}$`));
    await expect(page.locator("h1")).toBeVisible();
  }
});

test.describe("contact form", () => {
  test("shows validation errors for empty fields", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(
      page.getByText("Please enter a valid email address."),
    ).toBeVisible();
    await expect(page.getByText("Please choose a project type.")).toBeVisible();
    await expect(page.getByLabel("Name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("submits to Netlify Forms and confirms", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    const posted = page.waitForRequest((r) => r.method() === "POST");
    await page.getByLabel("Name").fill("Asha Rao");
    await page.getByLabel("Email").fill("asha@example.com");
    await page.getByLabel("Project type").selectOption("E-commerce");
    await page
      .getByLabel("About your project")
      .fill("We need an online store for our handmade products.");
    await page.getByRole("button", { name: "Send message" }).click();
    const body = new URLSearchParams((await posted).postData() ?? "");
    expect(body.get("form-name")).toBe("contact");
    expect(body.get("email")).toBe("asha@example.com");
    await expect(
      page.getByText("Thank you, your message was sent."),
    ).toBeVisible();
  });

  test("shows an error when sending fails", async ({ page }) => {
    await page.route("**/", (route) =>
      route.request().method() === "POST"
        ? route.fulfill({ status: 500 })
        : route.continue(),
    );
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    await page.getByLabel("Name").fill("Asha Rao");
    await page.getByLabel("Email").fill("asha@example.com");
    await page.getByLabel("Project type").selectOption("E-commerce");
    await page
      .getByLabel("About your project")
      .fill("We need an online store for our handmade products.");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.getByText("The message could not be sent."),
    ).toBeVisible();
  });

  test("the static HTML carries the Netlify form attributes", async ({
    request,
  }) => {
    const html = await (await request.get("/contact")).text();
    expect(html).toContain('data-netlify="true"');
    expect(html).toContain('name="form-name" value="contact"');
    expect(html).toContain('netlify-honeypot="bot-field"');
  });
});
