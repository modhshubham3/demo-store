import { getProduct } from "@/data/products";

const MAX_LINES = 20;
const MAX_QTY = 10;

export type PricedLine = { slug: string; name: string; qty: number; unitPrice: number };

/**
 * Re-prices a cart from the server-side catalogue. The client only supplies
 * slug + qty; any price it sends is ignored. Returns null for malformed input.
 */
export function priceCart(input: unknown): { lines: PricedLine[]; total: number } | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_LINES) return null;
  const seen = new Set<string>();
  const lines: PricedLine[] = [];
  for (const raw of input) {
    const slug = (raw as { slug?: unknown })?.slug;
    const qty = (raw as { qty?: unknown })?.qty;
    if (typeof slug !== "string" || seen.has(slug)) return null;
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return null;
    const product = getProduct(slug);
    if (!product) return null;
    seen.add(slug);
    lines.push({ slug, name: product.name, qty, unitPrice: product.price });
  }
  const total = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0);
  return { lines, total };
}
