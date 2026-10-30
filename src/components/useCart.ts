"use client";

import { useSyncExternalStore } from "react";
import { cartStore, lineKey } from "@/lib/cart";
import { getProduct } from "@/data/products";

export function useCart() {
  const lines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const items = lines.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ key: lineKey(l), product, size: l.size, qty: l.qty }] : [];
  });
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  return { items, count, subtotal };
}
