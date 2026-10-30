"use client";

import { useMemo, useState } from "react";
import { discountPct, type Product } from "@/data/products";
import ProductGrid from "./ProductGrid";

type Sort = "relevance" | "price-asc" | "price-desc" | "rating" | "discount";

const PRICE_BANDS = [
  { id: "u500", label: "Under ₹500", min: 0, max: 499 },
  { id: "500-1000", label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { id: "1000-2000", label: "₹1,000 – ₹2,000", min: 1001, max: 2000 },
  { id: "o2000", label: "Over ₹2,000", min: 2001, max: Infinity },
];

const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  relevance: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  discount: (a, b) => discountPct(b) - discountPct(a),
};

function toggle<T>(set: Set<T>, v: T) {
  const next = new Set(set);
  if (!next.delete(v)) next.add(v);
  return next;
}

export default function Listing({ items }: { items: Product[] }) {
  const [sort, setSort] = useState<Sort>("relevance");
  const [bands, setBands] = useState<Set<string>>(new Set());
  const [brandSel, setBrandSel] = useState<Set<string>>(new Set());
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [open, setOpen] = useState(false);

  const brandList = useMemo(() => [...new Set(items.map((p) => p.brand))].sort(), [items]);

  const shown = useMemo(() => {
    const active = PRICE_BANDS.filter((b) => bands.has(b.id));
    return items
      .filter(
        (p) =>
          (active.length === 0 || active.some((b) => p.price >= b.min && p.price <= b.max)) &&
          (brandSel.size === 0 || brandSel.has(p.brand)) &&
          p.rating >= minRating &&
          discountPct(p) >= minDiscount,
      )
      .sort(sorters[sort]);
  }, [items, bands, brandSel, minRating, minDiscount, sort]);

  const filtersOn = bands.size + brandSel.size + (minRating ? 1 : 0) + (minDiscount ? 1 : 0);
  const reset = () => {
    setBands(new Set());
    setBrandSel(new Set());
    setMinRating(0);
    setMinDiscount(0);
  };

  const group = "border-t border-line pt-4";
  const heading = "mb-2 text-sm font-bold";
  const opt = "flex cursor-pointer items-center gap-2 py-1 text-sm";

  return (
    <div className="grid grid-cols-[250px_1fr] gap-6 max-[820px]:grid-cols-1">
      <aside aria-label="Filters" className="h-fit rounded-xl border border-line bg-panel p-4 md:sticky md:top-28">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex w-full items-center justify-between font-bold md:hidden"
        >
          Filters{filtersOn ? ` (${filtersOn})` : ""} <span>{open ? "−" : "+"}</span>
        </button>
        <div className={`${open ? "block" : "hidden"} md:block max-md:mt-4`}>
          <div className="mb-4 flex items-center justify-between max-md:hidden">
            <h2 className="font-bold">Filters</h2>
            {filtersOn ? (
              <button type="button" onClick={reset} className="text-sm font-semibold text-accent">
                Clear all
              </button>
            ) : null}
          </div>
          <fieldset className={group}>
            <legend className={heading}>Price</legend>
            {PRICE_BANDS.map((b) => (
              <label key={b.id} className={opt}>
                <input type="checkbox" checked={bands.has(b.id)} onChange={() => setBands(toggle(bands, b.id))} />
                {b.label}
              </label>
            ))}
          </fieldset>
          <fieldset className={`${group} mt-4`}>
            <legend className={heading}>Customer rating</legend>
            {[4, 3.5, 3].map((r) => (
              <label key={r} className={opt}>
                <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
                {r}★ &amp; above
              </label>
            ))}
          </fieldset>
          <fieldset className={`${group} mt-4`}>
            <legend className={heading}>Discount</legend>
            {[50, 40, 30].map((d) => (
              <label key={d} className={opt}>
                <input type="radio" name="discount" checked={minDiscount === d} onChange={() => setMinDiscount(d)} />
                {d}% or more
              </label>
            ))}
          </fieldset>
          {brandList.length > 1 ? (
            <fieldset className={`${group} mt-4`}>
              <legend className={heading}>Brand</legend>
              {brandList.map((b) => (
                <label key={b} className={opt}>
                  <input type="checkbox" checked={brandSel.has(b)} onChange={() => setBrandSel(toggle(brandSel, b))} />
                  {b}
                </label>
              ))}
            </fieldset>
          ) : null}
          {filtersOn ? (
            <button type="button" onClick={reset} className="mt-4 text-sm font-semibold text-accent md:hidden">
              Clear all
            </button>
          ) : null}
        </div>
      </aside>

      <section aria-label="Results">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm text-muted">
            Showing <strong className="text-ink">{shown.length}</strong> of {items.length} products
          </p>
          <label className="flex items-center gap-2 text-sm font-medium">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-lg border border-line bg-panel px-3 py-2"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Customer rating</option>
              <option value="discount">Biggest discount</option>
            </select>
          </label>
        </div>
        {shown.length ? (
          <ProductGrid items={shown} />
        ) : (
          <div className="rounded-xl border border-line bg-panel p-10 text-center">
            <p className="font-bold">No products match these filters.</p>
            <button type="button" onClick={reset} className="mt-3 font-semibold text-accent">
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
