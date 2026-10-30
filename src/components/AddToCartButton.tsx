"use client";

import { useState } from "react";
import { cartStore } from "@/lib/cart";

export default function AddToCartButton({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        cartStore.add(slug);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
      className="rounded-xl bg-accent px-6 py-3 font-bold text-accent-contrast transition hover:brightness-110"
    >
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
