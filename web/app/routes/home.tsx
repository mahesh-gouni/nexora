import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nexora — Ideas into Working Software" },
    {
      name: "description",
      content:
        "Nexora is an independent studio building web applications, e-commerce, ERP and business software.",
    },
  ];
}

// Placeholder until the Home page is built in Weeks 3–4.
export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">
        Nexora
      </h1>
      <p className="text-lg opacity-80">Ideas into Working Software.</p>
      <p className="text-brand-ink dark:text-brand text-sm">
        Website in progress.
      </p>
    </main>
  );
}
