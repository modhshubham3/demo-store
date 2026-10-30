import { getProduct } from "@/data/products";

export type CartLine = { slug: string; size: string; qty: number };

export const lineKey = (l: { slug: string; size: string }) => `${l.slug}|${l.size}`;

const KEY = "demo-store-cart";
const EMPTY: CartLine[] = [];

let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      lines = parsed.filter(
        (l): l is CartLine =>
          typeof l?.slug === "string" &&
          typeof l?.size === "string" &&
          Number.isInteger(l?.qty) &&
          l.qty > 0 &&
          !!getProduct(l.slug)?.sizes.includes(l.size),
      );
    }
  } catch {
    lines = EMPTY;
  }
}

function commit(next: CartLine[]) {
  lines = next.length ? next : EMPTY;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Private mode / storage full: the cart still works for this page view.
  }
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): CartLine[] {
    load();
    return lines;
  },
  getServerSnapshot(): CartLine[] {
    return EMPTY;
  },
  add(slug: string, size: string) {
    load();
    const key = lineKey({ slug, size });
    const existing = lines.find((l) => lineKey(l) === key);
    commit(
      existing
        ? lines.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(l.qty + 1, 10) } : l))
        : [...lines, { slug, size, qty: 1 }],
    );
  },
  setQty(key: string, qty: number) {
    load();
    commit(
      qty <= 0
        ? lines.filter((l) => lineKey(l) !== key)
        : lines.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(qty, 10) } : l)),
    );
  },
  clear() {
    load();
    commit([]);
  },
};
