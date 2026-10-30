import Link from "next/link";
import { discountPct, type Product } from "@/data/products";
import { formatINR } from "@/lib/format";
import Rating from "./Rating";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel no-underline transition-shadow hover:shadow-lg"
    >
      <div
        className="relative flex aspect-[4/5] items-center justify-center text-6xl"
        style={{ backgroundColor: p.tint }}
        aria-hidden="true"
      >
        {p.emoji}
        <span className="absolute left-2 top-2 rounded bg-cta px-1.5 py-0.5 text-xs font-bold text-white">
          {discountPct(p)}% OFF
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">{p.brand}</div>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-ink group-hover:text-accent">
          {p.name}
        </h3>
        <Rating value={p.rating} count={p.reviews} />
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-2">
          <span className="font-bold text-ink">{formatINR(p.price)}</span>
          <s className="text-xs text-muted">{formatINR(p.mrp)}</s>
        </div>
        <div className="text-xs font-semibold text-good">Free delivery</div>
      </div>
    </Link>
  );
}
