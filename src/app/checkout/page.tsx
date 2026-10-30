"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/useCart";
import { cartStore } from "@/lib/cart";
import { formatINR } from "@/lib/format";

type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
type RazorpayCtor = new (opts: Record<string, unknown>) => { open(): void };

function loadRazorpay(): Promise<RazorpayCtor> {
  const w = window as unknown as { Razorpay?: RazorpayCtor };
  if (w.Razorpay) return Promise.resolve(w.Razorpay);
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = "https://checkout.razorpay.com/v1/checkout.js";
    el.onload = () => (w.Razorpay ? resolve(w.Razorpay) : reject(new Error("Razorpay missing")));
    el.onerror = () => reject(new Error("Could not load Razorpay"));
    document.body.appendChild(el);
  });
}

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState("");

  async function pay(form: HTMLFormElement) {
    const data = new FormData(form);
    setBusy(true);
    setNotice("");
    try {
      // Only slug + qty go to the server; it recomputes every price itself.
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ slug: i.product.slug, qty: i.qty })) }),
      });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error ?? "Could not start payment.");

      const Razorpay = await loadRazorpay();
      new Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        name: "Demo Store",
        description: "Test-mode payment. No real money moves.",
        prefill: { name: data.get("name"), email: data.get("email"), contact: data.get("phone") },
        handler: async (r: RazorpayResponse) => {
          const v = await fetch("/api/orders/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          });
          if (v.ok) {
            cartStore.clear();
            setPaid(r.razorpay_payment_id);
          } else {
            setNotice("Payment could not be verified. You have not been charged by us; contact support.");
          }
          setBusy(false);
        },
        modal: { ondismiss: () => setBusy(false) },
      }).open();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  if (paid) {
    return (
      <>
        <h1 className="text-4xl font-extrabold">Payment received</h1>
        <p role="status" className="mt-4 text-muted">
          Thank you! Test payment {paid} verified. This is a demo store, nothing will ship.
        </p>
        <Link href="/" className="mt-6 inline-block font-bold text-accent">
          Back to shop →
        </Link>
      </>
    );
  }

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
            void pay(e.currentTarget);
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
            disabled={busy}
            className="mt-2 rounded-xl bg-accent px-6 py-3 font-bold text-accent-contrast hover:brightness-110 disabled:opacity-60"
          >
            {busy ? "Processing…" : `Pay ${formatINR(subtotal)}`}
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
