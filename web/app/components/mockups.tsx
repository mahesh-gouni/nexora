import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "~/lib/cn";

/**
 * Concept product interfaces, drawn in HTML at a fixed 960×600 canvas and
 * scaled to fit. They are illustrations of planned products with sample
 * data, not screenshots of working software, and are labelled as such.
 */
const CANVAS_W = 960;
const CANVAS_H = 600;

function Scaled({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setScale(e.contentRect.width / CANVAS_W),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale ?? 1})`,
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[18px] border border-white/10 bg-[#15191c] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="mx-auto rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-white/50">
          {url}
        </span>
        <span className="border-amber/40 bg-amber/10 text-amber rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase">
          Concept preview
        </span>
      </div>
      <div aria-hidden className="paper bg-bg">
        <Scaled>{children}</Scaled>
      </div>
    </figure>
  );
}

/* ---------- shared bits ---------- */
const Pill = ({
  tone,
  children,
}: {
  tone: "ok" | "wait" | "new";
  children: React.ReactNode;
}) => (
  <span
    className={cn(
      "rounded-full px-2 py-0.5 text-[11px] font-medium",
      tone === "ok" && "bg-emerald-100 text-emerald-800",
      tone === "wait" && "bg-amber-100 text-amber-800",
      tone === "new" && "bg-stone-200 text-stone-700",
    )}
  >
    {children}
  </span>
);

const Thumb = ({ hue }: { hue: number }) => (
  <div
    className="relative h-[118px] overflow-hidden rounded-lg"
    style={{
      background: `linear-gradient(140deg, hsl(${hue} 35% 88%), hsl(${hue} 30% 76%))`,
    }}
  >
    <div
      className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-lg"
      style={{
        background: `hsl(${hue} 40% 45%)`,
        transform: "translate(-50%,-50%) rotate(12deg)",
      }}
    />
  </div>
);

function SideNav({ items, active }: { items: string[]; active: number }) {
  return (
    <aside className="border-border bg-surface-sunken flex w-[180px] flex-col gap-1 border-r p-4">
      <div className="font-display mb-4 flex items-center gap-2 text-[15px] font-extrabold">
        <span className="bg-amber size-5 rounded-md" /> Workspace
      </div>
      {items.map((it, i) => (
        <div
          key={it}
          className={cn(
            "rounded-md px-3 py-2 text-[13px]",
            i === active
              ? "bg-surface text-text font-semibold shadow-sm"
              : "text-muted",
          )}
        >
          {it}
        </div>
      ))}
      <div className="border-border-strong text-muted mt-auto rounded-lg border border-dashed p-3 text-[11px]">
        Sample data for illustration
      </div>
    </aside>
  );
}

/* ---------- 1. Storefront ---------- */
export function StorefrontMock() {
  const items = [
    ["Linen tote", "₹1,290", 30],
    ["Ceramic mug", "₹640", 200],
    ["Desk lamp", "₹3,450", 40],
    ["Notebook set", "₹520", 150],
    ["Wool throw", "₹2,780", 15],
    ["Plant pot", "₹890", 110],
  ] as const;
  return (
    <div className="bg-bg text-text flex h-full flex-col">
      <header className="border-border flex items-center gap-6 border-b px-8 py-4">
        <span className="font-display text-[18px] font-extrabold">Store</span>
        <nav className="text-muted flex gap-5 text-[13px]">
          <span className="text-text font-semibold">New</span>
          <span>Home</span>
          <span>Kitchen</span>
          <span>Office</span>
        </nav>
        <div className="border-border bg-surface text-muted ml-auto w-[220px] rounded-full border px-4 py-2 text-[12px]">
          Search products…
        </div>
        <div className="bg-text text-bg rounded-full px-3 py-2 text-[12px] font-semibold">
          Cart · 2
        </div>
      </header>
      <div className="flex flex-1 gap-6 px-8 py-6">
        <aside className="w-[150px] space-y-4 text-[12px]">
          <p className="font-semibold">Filters</p>
          {["Under ₹1,000", "₹1,000 – ₹3,000", "In stock"].map((f, i) => (
            <label key={f} className="text-muted flex items-center gap-2">
              <span
                className={cn(
                  "size-3.5 rounded border",
                  i === 2 ? "border-amber bg-amber" : "border-border-strong",
                )}
              />
              {f}
            </label>
          ))}
        </aside>
        <div className="grid flex-1 grid-cols-3 gap-4">
          {items.map(([name, price, hue], i) => (
            <div
              key={name}
              className="border-border bg-surface rounded-xl border p-3"
            >
              <Thumb hue={hue} />
              <div className="mt-3 flex items-center justify-between text-[13px]">
                <span className="font-medium">{name}</span>
                <span className="font-semibold">{price}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted text-[11px]">
                  {i % 3 === 0 ? "Bestseller" : "Free delivery"}
                </span>
                <span className="bg-amber text-charcoal rounded-md px-2 py-1 text-[11px] font-semibold">
                  Add
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Admin dashboard ---------- */
export function AdminMock() {
  const pts = [38, 52, 44, 61, 58, 73, 66, 84, 78, 92, 88, 104];
  const max = 110;
  const path = pts
    .map(
      (v, i) =>
        `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 460},${150 - (v / max) * 150}`,
    )
    .join(" ");
  return (
    <div className="bg-bg text-text flex h-full">
      <SideNav
        items={[
          "Overview",
          "Orders",
          "Products",
          "Customers",
          "Inventory",
          "Reports",
        ]}
        active={0}
      />
      <main className="flex-1 space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[20px] font-bold">Overview</h3>
          <span className="border-border text-muted rounded-md border px-3 py-1.5 text-[12px]">
            Last 30 days
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            ["Revenue", "₹4.2L", "+12%"],
            ["Orders", "318", "+8%"],
            ["Avg. order", "₹1,320", "+3%"],
            ["Returns", "1.4%", "−0.2%"],
          ].map(([k, v, d]) => (
            <div
              key={k}
              className="border-border bg-surface rounded-xl border p-3"
            >
              <p className="text-muted text-[11px]">{k}</p>
              <p className="font-display mt-1 text-[20px] font-bold">{v}</p>
              <p className="text-[11px] text-emerald-700">{d}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1.6fr_1fr] gap-3">
          <div className="border-border bg-surface rounded-xl border p-4">
            <p className="text-[12px] font-semibold">Sales</p>
            <svg viewBox="0 0 460 160" className="mt-2 h-[150px] w-full">
              <defs>
                <linearGradient id="mk-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#f5a623" stopOpacity=".35" />
                  <stop offset="1" stopColor="#f5a623" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 50, 100, 150].map((y) => (
                <line key={y} x1="0" x2="460" y1={y} y2={y} stroke="#e7e3dc" />
              ))}
              <path d={`${path} L460,160 L0,160 Z`} fill="url(#mk-area)" />
              <path d={path} fill="none" stroke="#e8950f" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="border-border bg-surface rounded-xl border p-4">
            <p className="text-[12px] font-semibold">Recent orders</p>
            <ul className="mt-3 space-y-2.5 text-[12px]">
              {[
                ["#1042", "Paid", "ok"],
                ["#1041", "Packing", "wait"],
                ["#1040", "Paid", "ok"],
                ["#1039", "New", "new"],
                ["#1038", "Paid", "ok"],
              ].map(([id, s, t]) => (
                <li key={id} className="flex items-center justify-between">
                  <span className="text-muted font-mono">{id}</span>
                  <Pill tone={t as "ok"}>{s}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- 3. ERP ---------- */
export function ErpMock() {
  const rows = [
    ["Cotton yarn 40s", "Warehouse A", 820, 1000],
    ["Packaging boxes M", "Warehouse A", 140, 600],
    ["Dye – indigo", "Warehouse B", 96, 120],
    ["Labels (roll)", "Warehouse B", 35, 200],
    ["Shipping tape", "Warehouse A", 410, 500],
  ] as const;
  return (
    <div className="bg-bg text-text flex h-full">
      <SideNav
        items={[
          "Dashboard",
          "Purchasing",
          "Inventory",
          "Sales",
          "Invoices",
          "Approvals",
        ]}
        active={2}
      />
      <main className="flex-1 space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[20px] font-bold">Inventory</h3>
          <div className="flex gap-2 text-[12px]">
            <span className="border-border text-muted rounded-md border px-3 py-1.5">
              Export
            </span>
            <span className="bg-amber text-charcoal rounded-md px-3 py-1.5 font-semibold">
              New purchase order
            </span>
          </div>
        </div>
        <div className="border-border bg-surface overflow-hidden rounded-xl border">
          <div className="border-border bg-surface-sunken text-muted grid grid-cols-[2fr_1.2fr_1.6fr_0.8fr] border-b px-4 py-2 text-[11px] font-semibold uppercase">
            <span>Item</span>
            <span>Location</span>
            <span>Stock level</span>
            <span>Status</span>
          </div>
          {rows.map(([name, loc, qty, cap]) => {
            const pct = Math.round((qty / cap) * 100);
            const low = pct < 30;
            return (
              <div
                key={name}
                className="border-border grid grid-cols-[2fr_1.2fr_1.6fr_0.8fr] items-center border-b px-4 py-3 text-[13px] last:border-0"
              >
                <span className="font-medium">{name}</span>
                <span className="text-muted">{loc}</span>
                <span className="flex items-center gap-2">
                  <span className="bg-surface-sunken h-1.5 w-24 overflow-hidden rounded-full">
                    <span
                      className={cn(
                        "block h-full rounded-full",
                        low ? "bg-red-500" : "bg-amber",
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                  <span className="text-muted font-mono text-[11px]">
                    {qty}
                  </span>
                </span>
                <Pill tone={low ? "wait" : "ok"}>{low ? "Reorder" : "OK"}</Pill>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-3 text-[12px]">
          {[
            ["PO-2207", "Awaiting approval"],
            ["PO-2206", "Received"],
            ["PO-2205", "In transit"],
          ].map(([po, s]) => (
            <div
              key={po}
              className="border-border bg-surface rounded-xl border p-3"
            >
              <p className="text-muted font-mono">{po}</p>
              <p className="mt-1 font-semibold">{s}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ---------- 4. CRM ---------- */
export function CrmMock() {
  const cols: [string, [string, string][]][] = [
    [
      "Lead",
      [
        ["Riverside Cafe", "₹60k"],
        ["Kite Studio", "₹1.2L"],
        ["Oak & Co", "₹45k"],
      ],
    ],
    [
      "Qualified",
      [
        ["Northwind Foods", "₹2.4L"],
        ["Bluebell Clinic", "₹90k"],
      ],
    ],
    [
      "Proposal",
      [
        ["Metro Prints", "₹1.8L"],
        ["Arc Logistics", "₹3.1L"],
      ],
    ],
    ["Won", [["Sunrise Textiles", "₹2.2L"]]],
  ];
  return (
    <div className="bg-bg text-text flex h-full">
      <SideNav
        items={["Pipeline", "Contacts", "Companies", "Tasks", "Reports"]}
        active={0}
      />
      <main className="flex-1 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-[20px] font-bold">Sales pipeline</h3>
          <span className="bg-amber text-charcoal rounded-md px-3 py-1.5 text-[12px] font-semibold">
            Add deal
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {cols.map(([title, deals], ci) => (
            <div key={title} className="bg-surface-sunken rounded-xl p-2.5">
              <p className="mb-2 flex items-center justify-between px-1 text-[12px] font-semibold">
                {title}{" "}
                <span className="text-muted font-mono">{deals.length}</span>
              </p>
              <div className="space-y-2">
                {deals.map(([name, val], i) => (
                  <div
                    key={name}
                    className={cn(
                      "bg-surface rounded-lg border p-3 text-[12px] shadow-sm",
                      ci === 3
                        ? "border-emerald-300"
                        : i === 0 && ci === 2
                          ? "border-amber"
                          : "border-border",
                    )}
                  >
                    <p className="font-semibold">{name}</p>
                    <div className="text-muted mt-2 flex items-center justify-between">
                      <span>{val}</span>
                      <span className="size-5 rounded-full bg-stone-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-border bg-surface text-muted mt-4 rounded-xl border p-3 text-[12px]">
          Follow-up reminder: call Northwind Foods about the proposal tomorrow,
          11:00.
        </div>
      </main>
    </div>
  );
}

export const mockups = {
  "nexora-commerce": { url: "store.example", Mock: StorefrontMock },
  "nexora-admin": { url: "admin.example", Mock: AdminMock },
  "nexora-erp": { url: "erp.example", Mock: ErpMock },
  "nexora-crm": { url: "crm.example", Mock: CrmMock },
} as const;
