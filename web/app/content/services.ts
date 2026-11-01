import {
  Code,
  LayoutDashboard,
  Layers,
  ShoppingCart,
  Boxes,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { ArtName } from "~/components/art";

export type Service = {
  id: string;
  art: ArtName;
  icon: LucideIcon;
  title: string;
  summary: string;
  problem: string;
  includes: string[];
  stack: string[];
  relatedProduct?: string;
};

export const services: Service[] = [
  {
    id: "web-applications",
    art: "svc-web",
    icon: Code,
    title: "Custom web applications",
    summary:
      "Web software shaped around how your business works, not the other way round.",
    problem:
      "Spreadsheets, email threads and off-the-shelf tools stop fitting once a business grows its own way of working.",
    includes: [
      "Requirements and workflow mapping before any code",
      "Responsive React front end and a Spring Boot API",
      "Role-based access, audit trails and secure authentication",
      "Automated tests, documentation and a deployment pipeline",
    ],
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
  },
  {
    id: "e-commerce",
    art: "svc-commerce",
    icon: ShoppingCart,
    title: "E-commerce solutions",
    summary:
      "Online stores with catalogues, carts, payments and order handling you control.",
    problem:
      "Hosted store builders get expensive and rigid when you need custom pricing, workflows or integrations.",
    includes: [
      "Product catalogue, search and filters",
      "Cart, checkout and payment-gateway integration",
      "Order, inventory and customer management",
      "Fast, search-friendly storefront pages",
    ],
    stack: ["React", "Spring Boot", "PostgreSQL", "Payment gateways"],
    relatedProduct: "nexora-commerce",
  },
  {
    id: "erp",
    art: "svc-erp",
    icon: Boxes,
    title: "ERP and business management",
    summary:
      "One system for inventory, purchasing, sales, billing and reporting.",
    problem:
      "Data spread across separate tools means double entry, mistakes and no clear view of the business.",
    includes: [
      "Modules chosen for your operations, added in stages",
      "Inventory, purchase, sales and invoicing workflows",
      "Reports and exports your accountant can use",
      "Users, roles and approval flows",
    ],
    stack: ["Spring Boot", "PostgreSQL", "React", "Docker"],
    relatedProduct: "nexora-erp",
  },
  {
    id: "admin-dashboards",
    art: "svc-dashboard",
    icon: LayoutDashboard,
    title: "Admin dashboards",
    summary:
      "Clear back-office screens to manage data, users and daily operations.",
    problem:
      "Teams lose time when the only way to change data is a developer or a raw database tool.",
    includes: [
      "Tables with search, filters, sorting and bulk actions",
      "Forms with validation and safe editing",
      "Charts and KPIs for the numbers that matter",
      "Permissions so each person sees what they need",
    ],
    stack: ["React", "TanStack Query", "Spring Boot"],
    relatedProduct: "nexora-admin",
  },
  {
    id: "saas",
    art: "svc-saas",
    icon: Layers,
    title: "SaaS product development",
    summary:
      "From first version to a subscription product other businesses can sign up for.",
    problem:
      "A good product idea needs a solid technical base: accounts, billing, multi-tenancy and reliable releases.",
    includes: [
      "Scoping a focused first version",
      "Accounts, organisations and role management",
      "Subscription-ready architecture",
      "Monitoring, backups and release process",
    ],
    stack: ["React", "Spring Boot", "PostgreSQL", "GitHub Actions"],
  },
  {
    id: "automation",
    art: "svc-automation",
    icon: Workflow,
    title: "Business process automation",
    summary:
      "Replace repetitive manual steps with dependable, logged automation.",
    problem:
      "Copying data between systems, sending routine emails and building the same report every week eats hours.",
    includes: [
      "Mapping the process and where time is lost",
      "Integrations between your existing tools via APIs",
      "Scheduled jobs, notifications and generated documents",
      "Logs and alerts so you know it ran",
    ],
    stack: ["Spring Boot", "REST APIs", "Scheduled jobs"],
  },
];
