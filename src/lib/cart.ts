import { getProduct } from "@/data/products";

export type CartLine = { slug: string; qty: number };

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
          typeof l?.slug === "string" && Number.isInteger(l?.qty) && l.qty > 0 && !!getProduct(l.slug),
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
  add(slug: string) {
    load();
    const existing = lines.find((l) => l.slug === slug);
    commit(
      existing
        ? lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(l.qty + 1, 10) } : l))
        : [...lines, { slug, qty: 1 }],
    );
  },
  setQty(slug: string, qty: number) {
    load();
    commit(qty <= 0 ? lines.filter((l) => l.slug !== slug) : lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(qty, 10) } : l)));
  },
  clear() {
    load();
    commit([]);
  },
};
