export type ProductStatus = "Planned" | "In development" | "Demo available";

export type Product = {
  id: string;
  name: string;
  category: string;
  status: ProductStatus;
  summary: string;
  plannedFeatures: string[];
};

/**
 * Honest status only. Update a product's status when it genuinely changes;
 * never mark something "Demo available" without a working demo link.
 */
export const products: Product[] = [
  {
    id: "nexora-commerce",
    name: "Nexora Commerce",
    category: "E-commerce platform",
    status: "Planned",
    summary:
      "A configurable online store foundation: catalogue, cart, checkout and orders, ready to brand for each business.",
    plannedFeatures: [
      "Catalogue with variants, search and filters",
      "Cart, checkout and payment-gateway integration",
      "Customer accounts and order history",
      "Configurable branding per store",
    ],
  },
  {
    id: "nexora-admin",
    name: "Nexora Admin",
    category: "E-commerce admin dashboard",
    status: "Planned",
    summary:
      "The back office for Nexora Commerce: manage products, orders, customers and stock in one place.",
    plannedFeatures: [
      "Product, order and customer management",
      "Inventory tracking and low-stock alerts",
      "Sales reports and exports",
      "Staff roles and permissions",
    ],
  },
  {
    id: "nexora-erp",
    name: "Nexora ERP",
    category: "Business management",
    status: "Planned",
    summary:
      "Modular ERP for small and growing businesses: purchasing, inventory, sales, invoicing and reporting.",
    plannedFeatures: [
      "Purchase and sales workflows",
      "Multi-location inventory",
      "Invoicing and basic accounting exports",
      "Approval flows and audit log",
    ],
  },
  {
    id: "nexora-crm",
    name: "Nexora CRM",
    category: "Customer relationships",
    status: "Planned",
    summary:
      "A focused CRM to track leads, customers, follow-ups and deals without enterprise complexity.",
    plannedFeatures: [
      "Leads, contacts and companies",
      "Pipeline with stages and follow-up reminders",
      "Activity history per customer",
      "Simple sales reporting",
    ],
  },
];
