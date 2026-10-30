import Link from "next/link";
import { discountPct, type Product } from "@/data/products";
import { formatINR } from "@/lib/format";
import ProductImage from "./ProductImage";
import Rating from "./Rating";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-panel no-underline ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-transparent"
    >
      <div className="relative">
        <ProductImage item={p} className="aspect-[4/5] transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
          {discountPct(p)}% OFF
        </span>
        <span className="absolute inset-x-3 bottom-3 translate-y-2 rounded-full bg-white/95 py-1.5 text-center text-xs font-bold text-ink opacity-0 shadow transition group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden">
          Sizes {p.sizes[0]} – {p.sizes[p.sizes.length - 1]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{p.brand}</div>
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-ink group-hover:text-accent">
          {p.name}
        </h3>
        <Rating value={p.rating} count={p.reviews} />
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-2">
          <span className="text-lg font-extrabold text-ink">{formatINR(p.price)}</span>
          <s className="text-xs text-muted">{formatINR(p.mrp)}</s>
        </div>
      </div>
    </Link>
  );
}
