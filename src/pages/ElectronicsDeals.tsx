import React, { useMemo, useState } from "react";

const DEFAULT_DEALS = [
  {
    id: 1,
    title: "آيفون 17 برو",
    description: "خصم خاص من المتاجر الرسمية",
    store: "متجر رسمي",
    verified: true,
    url: "#",
  },
  {
    id: 2,
    title: "ماك بوك إير",
    description: "عرض محدود على الفئة الأساسية",
    store: "متجر رسمي",
    verified: true,
    url: "#",
  },
  {
    id: 3,
    title: "سماعات لاسلكية",
    description: "تخفيضات على الموديلات المختارة",
    store: "متجر معتمد",
    verified: false,
    url: "#",
  },
];

function DealCard({ deal }) {
  return (
    <li className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900">{deal.title}</h3>
          {deal.verified && (
            <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              عرض موثق
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600">{deal.description}</p>
        <p className="mt-1 text-xs text-slate-400">{deal.store}</p>
      </div>

      <a
        href={deal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
      >
        عرض التفاصيل
      </a>
    </li>
  );
}

export default function ElectronicsDeals({ deals = DEFAULT_DEALS }) {
  const [query, setQuery] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return deals.filter(
      (d) =>
        (!onlyVerified || d.verified) &&
        (!q || `${d.title} ${d.description}`.toLowerCase().includes(q))
    );
  }, [deals, query, onlyVerified]);

  return (
    <section dir="rtl" className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold text-emerald-600">
        عروض الأجهزة والإلكترونيات 📱💻
      </h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن جهاز أو عرض..."
          aria-label="بحث في العروض"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
        />
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={onlyVerified}
            onChange={(e) => setOnlyVerified(e.target.checked)}
            className="h-4 w-4 accent-emerald-600"
          />
          العروض الموثقة فقط
        </label>
      </div>

      {filtered.length ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          لا توجد عروض مطابقة. جرّب كلمة بحث أخرى.
        </p>
      )}
    </section>
  );
}
