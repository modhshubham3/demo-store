import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(190px,46%),1fr))] gap-4">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
