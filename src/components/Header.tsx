"use client";

import Link from "next/link";
import { categories } from "@/data/products";
import { SITE_NAME } from "@/lib/format";
import { useCart } from "./useCart";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-panel shadow-sm">
      <nav aria-label="Primary" className="mx-auto max-w-[1280px] px-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
          <Link href="/" className="text-2xl font-extrabold text-accent no-underline">
            {SITE_NAME}
          </Link>
          <form
            role="search"
            action="/search"
            className="order-last flex min-w-[240px] flex-1 basis-full md:order-none md:basis-0"
          >
            <input
              type="search"
              name="q"
              required
              aria-label="Search products"
              placeholder="Search for kurta, earbuds, tawa, brands…"
              className="w-full rounded-l-lg border border-line bg-bg px-4 py-2.5 text-[15px]"
            />
            <button
              type="submit"
              className="rounded-r-lg bg-accent px-5 text-sm font-bold text-accent-contrast hover:brightness-110"
            >
              Search
            </button>
          </form>
          <Link
            href="/cart"
            className="ml-auto rounded-lg border border-line px-4 py-2 text-sm font-bold text-ink no-underline hover:border-accent md:ml-0"
          >
            🛒 Cart ({count})
          </Link>
        </div>
        <ul className="-mx-4 flex list-none gap-1 overflow-x-auto px-4 pb-2 text-sm font-medium [scrollbar-width:none]">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/category/${c.slug}`}
                className="block rounded-full px-3 py-1.5 text-ink no-underline hover:bg-bg hover:text-accent"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
