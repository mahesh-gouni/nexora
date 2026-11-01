import {
  MessagesSquare,
  ShieldCheck,
  Boxes,
  Gauge,
  type LucideIcon,
} from "lucide-react";

export type Principle = { icon: LucideIcon; title: string; body: string };

export const principles: Principle[] = [
  {
    icon: Boxes,
    title: "Products first",
    body: "Nexora builds its own working products and reuses those foundations, so client projects start from proven code instead of a blank page.",
  },
  {
    icon: MessagesSquare,
    title: "Engineer-direct",
    body: "You speak directly with the engineer who designs and writes your software. No account managers, no hand-offs.",
  },
  {
    icon: ShieldCheck,
    title: "Built to last",
    body: "Typed code, automated tests, clear documentation and a repeatable deployment pipeline on every project.",
  },
  {
    icon: Gauge,
    title: "Transparent",
    body: "Clear scope, a written estimate before work starts, and honest progress updates. No inflated claims.",
  },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    body: "Understand your business, users and the workflow the software must support.",
  },
  {
    step: "02",
    title: "Plan",
    body: "Agree scope, architecture and a written estimate, broken into small milestones.",
  },
  {
    step: "03",
    title: "Build",
    body: "Deliver in increments you can try early, with tests and reviews at every step.",
  },
  {
    step: "04",
    title: "Launch and support",
    body: "Deploy, hand over documentation, and stay available for fixes and improvements.",
  },
];

export const stack = [
  "Java",
  "Spring Boot",
  "Spring Security",
  "PostgreSQL",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Docker",
  "GitHub Actions",
];

export const layers = [
  {
    id: "interface",
    name: "Interface",
    body: "Fast, accessible screens your customers and staff actually enjoy using.",
    tools: ["React", "TypeScript", "Tailwind CSS", "Motion"],
  },
  {
    id: "services",
    name: "Services",
    body: "Secure APIs and business logic that keep your rules in one reliable place.",
    tools: ["Java", "Spring Boot", "Spring Security", "REST APIs"],
  },
  {
    id: "data",
    name: "Data and delivery",
    body: "Consistent data, automated tests and repeatable deployments.",
    tools: ["PostgreSQL", "Docker", "GitHub Actions"],
  },
] as const;
