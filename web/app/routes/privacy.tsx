import type { Route } from "./+types/privacy";
import { Link } from "react-router";
import { Container, PageHero } from "~/components/section";
import { pageMeta } from "~/lib/site";

export function meta({}: Route.MetaArgs) {
  return pageMeta({
    title: "Privacy",
    description:
      "How Nexora handles the information you share through this website.",
    path: "/privacy",
  });
}

const updated = "1 November 2026";

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy"
        lead={`Short and plain: what this website collects, why, and what you can ask for. Last updated ${updated}.`}
      />
      <Container className="[&_p]:text-muted [&_ul]:text-muted max-w-3xl py-16 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
        <h2>What is collected</h2>
        <p>
          Only what you choose to send through the{" "}
          <Link to="/contact" className="text-brand-ink underline">
            contact form
          </Link>
          :
        </p>
        <ul>
          <li>your name and email address;</li>
          <li>optionally, your company name, project type and timeline;</li>
          <li>the message you write.</li>
        </ul>
        <p>
          This website does not use analytics, advertising trackers or tracking
          cookies. Your light/dark theme choice is stored only in your own
          browser.
        </p>

        <h2>Why it is collected</h2>
        <p>
          Solely to reply to your enquiry and, if you decide to work together,
          to discuss your project. It is never sold, rented or used for
          marketing lists.
        </p>

        <h2>Where it is stored</h2>
        <p>
          The website is hosted on Netlify, and contact form submissions are
          processed and stored by Netlify Forms. Submissions are kept only as
          long as needed to handle your enquiry.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask for a copy of the information you sent, ask for it to be
          corrected, or ask for it to be deleted. Send the request through the
          contact form and it will be handled promptly. This policy is intended
          to follow India's Digital Personal Data Protection Act, 2023.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the date at the top of this page will be
          updated.
        </p>
      </Container>
    </>
  );
}
