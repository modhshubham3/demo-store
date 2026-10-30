import { getProduct } from "@/data/products";

const MAX_LINES = 20;
const MAX_QTY = 10;

export type PricedLine = { slug: string; size: string; name: string; qty: number; unitPrice: number };

/**
 * Re-prices a cart from the server-side catalogue. The client only supplies
 * slug, size + qty; any price it sends is ignored. Returns null for malformed input.
 */
export function priceCart(input: unknown): { lines: PricedLine[]; total: number } | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_LINES) return null;
  const seen = new Set<string>();
  const lines: PricedLine[] = [];
  for (const raw of input) {
    const slug = (raw as { slug?: unknown })?.slug;
    const size = (raw as { size?: unknown })?.size;
    const qty = (raw as { qty?: unknown })?.qty;
    if (typeof slug !== "string" || typeof size !== "string" || seen.has(`${slug}|${size}`)) return null;
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return null;
    const product = getProduct(slug);
    if (!product || !product.sizes.includes(size)) return null;
    seen.add(`${slug}|${size}`);
    lines.push({ slug, size, name: product.name, qty, unitPrice: product.price });
  }
  const total = lines.reduce((n, l) => n + l.qty * l.unitPrice, 0);
  return { lines, total };
}
