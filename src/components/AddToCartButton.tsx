"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cartStore } from "@/lib/cart";

export default function AddToCartButton({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => {
          cartStore.add(slug);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1500);
        }}
        className="min-w-[170px] rounded-lg border-2 border-accent bg-panel px-6 py-3 font-bold text-accent transition hover:bg-bg"
      >
        {added ? "Added ✓" : "Add to cart"}
      </button>
      <button
        type="button"
        onClick={() => {
          cartStore.add(slug);
          router.push("/checkout");
        }}
        className="min-w-[170px] rounded-lg bg-cta px-6 py-3 font-bold text-white transition hover:brightness-110"
      >
        Buy now
      </button>
    </div>
  );
}
