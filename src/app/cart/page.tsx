"use client";

import Link from "next/link";
import { useCart } from "@/components/useCart";
import ProductImage from "@/components/ProductImage";
import { cartStore } from "@/lib/cart";
import { formatINR } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <h1 className="font-display text-4xl font-extrabold">Your bag</h1>
        <p className="mt-4 text-muted">Your bag is empty.</p>
        <Link href="/" className="mt-6 inline-block font-bold text-accent">
          Continue shopping →
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="font-display text-4xl font-extrabold">Your bag</h1>
      <ul className="mt-8 grid list-none gap-3">
        {items.map(({ key, product: p, size, qty }) => (
          <li
            key={key}
            className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-4"
          >
            <ProductImage item={p} className="h-20 w-16 shrink-0 rounded-xl" sizes="64px" />
            <div className="min-w-0 flex-1">
              <Link href={`/products/${p.slug}`} className="font-semibold text-ink no-underline hover:text-accent">
                {p.name}
              </Link>
              <div className="text-sm text-muted">Size {size} · {p.colorName} · {formatINR(p.price)} each</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Decrease quantity of ${p.name} size ${size}`}
                onClick={() => cartStore.setQty(key, qty - 1)}
                className="h-8 w-8 rounded-lg border border-line font-bold hover:border-accent"
              >
                −
              </button>
              <span className="w-6 text-center tabular-nums" aria-live="polite">{qty}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${p.name} size ${size}`}
                onClick={() => cartStore.setQty(key, qty + 1)}
                className="h-8 w-8 rounded-lg border border-line font-bold hover:border-accent"
              >
                +
              </button>
            </div>
            <div className="w-24 text-right font-bold tabular-nums">{formatINR(p.price * qty)}</div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-between rounded-2xl border border-line bg-panel p-6">
        <div>
          <div className="text-sm text-muted">Subtotal</div>
          <div className="text-2xl font-extrabold tabular-nums">{formatINR(subtotal)}</div>
        </div>
        <Link
          href="/checkout"
          className="rounded-full bg-accent px-7 py-3 font-bold text-accent-contrast no-underline hover:brightness-110"
        >
          Checkout →
        </Link>
      </div>
    </>
  );
}
