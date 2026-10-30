"use client";

import Link from "next/link";
import { categories } from "@/data/products";
import { SITE_NAME } from "@/lib/format";
import { useCart } from "./useCart";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1080px] items-center gap-6 px-6">
        <Link href="/" className="text-xl font-extrabold text-ink no-underline">
          {SITE_NAME}
        </Link>
        <div className="ml-4 flex gap-5 max-[640px]:hidden">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="text-sm font-medium text-ink no-underline hover:text-accent"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <Link
          href="/cart"
          className="ml-auto rounded-xl border border-line bg-panel px-4 py-2 text-sm font-bold text-ink no-underline hover:border-accent"
        >
          Cart ({count})
        </Link>
      </nav>
    </header>
  );
}
