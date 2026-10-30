import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import ProductRow from "@/components/ProductRow";
import { categories, discountPct, products } from "@/data/products";

const byDiscount = [...products].sort((a, b) => discountPct(b) - discountPct(a));
const byRating = [...products].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

const perks = [
  ["🚚", "Free delivery", "on all demo orders"],
  ["↩️", "7-day returns", "easy, no questions"],
  ["💵", "Cash on delivery", "available"],
  ["🔒", "Secure payments", "Razorpay test mode"],
];

export default function Home() {
  return (
    <>
      <section className="grid grid-cols-[2fr_1fr] gap-4 max-[820px]:grid-cols-1">
        <div className="flex min-h-[260px] flex-col justify-center rounded-2xl bg-gradient-to-br from-accent to-[#7c3aed] p-8 text-white">
          <p className="text-sm font-bold uppercase tracking-widest text-white/80">Festive demo sale</p>
          <h1 className="mt-2 max-w-[16ch] text-balance text-[clamp(30px,4.5vw,52px)] font-extrabold leading-[1.05]">
            Up to {discountPct(byDiscount[0])}% off on fashion &amp; gadgets
          </h1>
          <Link
            href="/category/women"
            className="mt-6 w-fit rounded-lg bg-white px-6 py-3 font-bold text-accent no-underline hover:bg-white/90"
          >
            Shop now →
          </Link>
        </div>
        <div className="grid gap-4">
          <Link
            href="/category/electronics"
            className="flex flex-col justify-center rounded-2xl bg-[#0f172a] p-6 text-white no-underline"
          >
            <span className="text-3xl" aria-hidden="true">🎧</span>
            <span className="mt-1 text-lg font-extrabold">Audio from ₹349</span>
            <span className="text-sm text-white/70">Earbuds, speakers &amp; chargers</span>
          </Link>
          <Link
            href="/category/footwear"
            className="flex flex-col justify-center rounded-2xl bg-[#fde68a] p-6 text-ink no-underline"
          >
            <span className="text-3xl" aria-hidden="true">👟</span>
            <span className="mt-1 text-lg font-extrabold">Footwear under ₹999</span>
            <span className="text-sm text-ink/70">Sneakers, sandals &amp; sliders</span>
          </Link>
        </div>
      </section>

      <ul className="mt-6 grid list-none grid-cols-4 gap-3 rounded-xl bg-panel p-4 max-[820px]:grid-cols-2">
        {perks.map(([icon, title, sub]) => (
          <li key={title} className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">{icon}</span>
            <span className="text-sm leading-tight">
              <strong className="block">{title}</strong>
              <span className="text-muted">{sub}</span>
            </span>
          </li>
        ))}
      </ul>

      <section aria-labelledby="cats" className="mt-8 rounded-xl bg-panel p-4">
        <h2 id="cats" className="mb-4 text-xl font-extrabold">Shop by category</h2>
        <ul className="flex list-none gap-5 overflow-x-auto pb-2">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link href={`/category/${c.slug}`} className="flex w-[92px] flex-col items-center gap-2 no-underline">
                <span
                  className="flex size-[76px] items-center justify-center rounded-full bg-bg text-4xl"
                  aria-hidden="true"
                >
                  {c.emoji}
                </span>
                <span className="text-center text-sm font-semibold text-ink">{c.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ProductRow title="Deals of the day" items={byDiscount.slice(0, 10)} />
      <ProductRow title="Under ₹500" items={products.filter((p) => p.price < 500)} />
      <ProductRow title="Top rated" items={byRating.slice(0, 10)} />

      <section aria-labelledby="all" className="mt-8">
        <h2 id="all" className="mb-4 text-xl font-extrabold">All products</h2>
        <ProductGrid items={products} />
      </section>
    </>
  );
}
