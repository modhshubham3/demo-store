"use client";

import Link from "next/link";
import { categories } from "@/data/products";
import { SITE_NAME } from "@/lib/format";
import { useCart } from "./useCart";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-ink px-4 py-1.5 text-center text-xs font-medium tracking-wide text-white">
        Free delivery on every order · 7-day easy returns · Demo store
      </div>
      <div className="border-b border-line bg-panel/95 backdrop-blur">
        <nav aria-label="Primary" className="mx-auto max-w-[1280px] px-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
            <Link href="/" className="font-display text-[26px] font-extrabold tracking-tight text-ink no-underline">
              {SITE_NAME}
            </Link>
            <ul className="hidden list-none gap-1 text-sm font-semibold lg:flex">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="block rounded-full px-3 py-2 text-ink no-underline transition hover:bg-bg hover:text-accent"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <form role="search" action="/search" className="order-last flex basis-full lg:order-none lg:ml-auto lg:w-[320px] lg:basis-auto">
              <input
                type="search"
                name="q"
                required
                aria-label="Search clothing"
                placeholder="Search kurta, jeans, hoodie…"
                className="w-full rounded-l-full border border-line bg-bg px-5 py-2.5 text-[15px] outline-none focus:border-accent"
              />
              <button
                type="submit"
                aria-label="Search"
                className="rounded-r-full bg-ink px-5 text-sm font-bold text-white hover:bg-accent"
              >
                Search
              </button>
            </form>
            <Link
              href="/cart"
              className="ml-auto rounded-full border border-line px-4 py-2 text-sm font-bold text-ink no-underline hover:border-accent lg:ml-0"
            >
              🛍️ Bag ({count})
            </Link>
          </div>
          <ul className="-mx-4 flex list-none gap-1 overflow-x-auto px-4 pb-2 text-sm font-semibold [scrollbar-width:none] lg:hidden">
            {categories.map((c) => (
              <li key={c.slug} className="shrink-0">
                <Link href={`/category/${c.slug}`} className="block rounded-full bg-bg px-3 py-1.5 text-ink no-underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
