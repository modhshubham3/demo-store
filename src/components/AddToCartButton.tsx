"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cartStore } from "@/lib/cart";

export default function AddToCartButton({ slug, sizes }: { slug: string; sizes: string[] }) {
  const [size, setSize] = useState<string | null>(sizes.length === 1 ? sizes[0] : null);
  const [added, setAdded] = useState(false);
  const [needSize, setNeedSize] = useState(false);
  const router = useRouter();

  function pick(action: "add" | "buy") {
    if (!size) {
      setNeedSize(true);
      return;
    }
    cartStore.add(slug, size);
    if (action === "buy") {
      router.push("/checkout");
      return;
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span id="size-label" className="text-sm font-bold">Select size</span>
        {needSize && !size ? (
          <span role="alert" className="text-sm font-semibold text-red-700">Please select a size</span>
        ) : null}
      </div>
      <div role="radiogroup" aria-labelledby="size-label" className="mt-2 flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={size === s}
            onClick={() => {
              setSize(s);
              setNeedSize(false);
            }}
            className={`min-w-[52px] rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
              size === s ? "border-ink bg-ink text-white" : "border-line bg-panel text-ink hover:border-ink"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => pick("add")}
          className="min-w-[180px] flex-1 rounded-full border-2 border-ink bg-panel px-6 py-3.5 font-bold text-ink transition hover:bg-bg"
        >
          {added ? "Added ✓" : "Add to bag"}
        </button>
        <button
          type="button"
          onClick={() => pick("buy")}
          className="min-w-[180px] flex-1 rounded-full bg-accent px-6 py-3.5 font-bold text-white transition hover:brightness-110"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
