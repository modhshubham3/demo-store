import Link from "next/link";
import type { Product } from "@/data/products";
import { formatINR } from "@/lib/format";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel no-underline transition-shadow hover:shadow-md"
    >
      <div
        className="flex aspect-[4/3] items-center justify-center text-6xl"
        style={{ backgroundColor: p.tint }}
        aria-hidden="true"
      >
        {p.emoji}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-ink group-hover:text-accent">{p.name}</h3>
        <p className="mt-1 text-sm text-muted">{p.short}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-4">
          <span className="font-bold text-ink">{formatINR(p.price)}</span>
          {p.mrp ? <s className="text-sm text-muted">{formatINR(p.mrp)}</s> : null}
        </div>
      </div>
    </Link>
  );
}
