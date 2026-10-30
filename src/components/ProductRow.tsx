import Link from "next/link";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductRow({
  title,
  items,
  href,
}: {
  title: string;
  items: Product[];
  href?: string;
}) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <section aria-labelledby={id} className="mt-8 rounded-xl bg-panel p-4">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 id={id} className="text-xl font-extrabold">{title}</h2>
        {href ? (
          <Link href={href} className="text-sm font-semibold text-accent no-underline">
            View all →
          </Link>
        ) : null}
      </div>
      <ul className="-mx-1 flex list-none snap-x gap-3 overflow-x-auto px-1 pb-2">
        {items.map((p) => (
          <li key={p.slug} className="flex w-[190px] shrink-0 snap-start flex-col [&>a]:flex-1">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}
