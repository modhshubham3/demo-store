"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/useCart";
import { formatINR } from "@/lib/format";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [notice, setNotice] = useState("");

  if (items.length === 0) {
    return (
      <>
        <h1 className="text-4xl font-extrabold">Checkout</h1>
        <p className="mt-4 text-muted">Nothing to check out yet.</p>
        <Link href="/" className="mt-6 inline-block font-bold text-accent">
          Back to shop →
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-4xl font-extrabold">Checkout</h1>
      <div className="mt-8 grid grid-cols-[1.2fr_0.8fr] gap-8 max-[760px]:grid-cols-1">
        <form
          className="grid gap-4 rounded-2xl border border-line bg-panel p-6"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: POST the cart to /api/orders, create a Razorpay/Stripe order
            // server-side (price recomputed on the server from src/data/products.ts,
            // never trusted from the browser), then open the gateway's checkout.
            setNotice(
              "Payment gateway is not connected yet — this is the scaffold. Orders are not placed.",
            );
          }}
        >
          <h2 className="text-xl font-bold">Delivery details</h2>
          {[
            ["name", "Full name", "text", "name"],
            ["email", "Email", "email", "email"],
            ["phone", "Phone", "tel", "tel"],
            ["address", "Address", "text", "street-address"],
          ].map(([id, label, type, auto]) => (
            <label key={id} className="grid gap-1 text-sm font-medium">
              {label}
              <input
                required
                id={id}
                name={id}
                type={type}
                autoComplete={auto}
                className="rounded-lg border border-line bg-bg px-3 py-2 text-base"
              />
            </label>
          ))}
          <button
            type="submit"
            className="mt-2 rounded-xl bg-accent px-6 py-3 font-bold text-accent-contrast hover:brightness-110"
          >
            Pay {formatINR(subtotal)}
          </button>
          {notice ? (
            <p role="status" className="rounded-lg bg-bg p-3 text-sm text-muted">
              {notice}
            </p>
          ) : null}
        </form>

        <aside className="h-fit rounded-2xl border border-line bg-panel p-6">
          <h2 className="text-xl font-bold">Order summary</h2>
          <ul className="mt-4 grid list-none gap-2 text-sm">
            {items.map(({ product: p, qty }) => (
              <li key={p.slug} className="flex justify-between gap-4">
                <span>{p.name} × {qty}</span>
                <span className="tabular-nums">{formatINR(p.price * qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-line pt-4 font-bold">
            <span>Total</span>
            <span className="tabular-nums">{formatINR(subtotal)}</span>
          </div>
        </aside>
      </div>
    </>
  );
}
