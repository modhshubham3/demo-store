"use client";

import Link from "next/link";
import { useCart } from "@/components/useCart";
import { cartStore } from "@/lib/cart";
import { formatINR } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <h1 className="text-4xl font-extrabold">Your cart</h1>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link href="/" className="mt-6 inline-block font-bold text-accent">
          Continue shopping →
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-extrabold">Your cart</h1>
      <ul className="mt-8 grid list-none gap-3">
        {items.map(({ product: p, qty }) => (
          <li
            key={p.slug}
            className="flex items-center gap-4 rounded-2xl border border-line bg-panel p-4"
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl"
              style={{ backgroundColor: p.tint }}
              aria-hidden="true"
            >
              {p.emoji}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/products/${p.slug}`} className="font-semibold text-ink no-underline hover:text-accent">
                {p.name}
              </Link>
              <div className="text-sm text-muted">{formatINR(p.price)} each</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Decrease quantity of ${p.name}`}
                onClick={() => cartStore.setQty(p.slug, qty - 1)}
                className="h-8 w-8 rounded-lg border border-line font-bold hover:border-accent"
              >
                −
              </button>
              <span className="w-6 text-center tabular-nums" aria-live="polite">{qty}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${p.name}`}
                onClick={() => cartStore.setQty(p.slug, qty + 1)}
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
          className="rounded-xl bg-accent px-6 py-3 font-bold text-accent-contrast no-underline hover:brightness-110"
        >
          Checkout →
        </Link>
      </div>
    </>
  );
}
