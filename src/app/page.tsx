import Link from "next/link";
import Garment from "@/components/Garment";
import ProductGrid from "@/components/ProductGrid";
import ProductRow from "@/components/ProductRow";
import { categories, discountPct, products } from "@/data/products";

const byDiscount = [...products].sort((a, b) => discountPct(b) - discountPct(a));
const byRating = [...products].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

const perks = [
  ["🚚", "Free delivery", "on every order"],
  ["↩️", "7-day returns", "easy, no questions"],
  ["📏", "Size help", "S to XXL, 28 to 36"],
  ["🔒", "Secure payments", "Razorpay test mode"],
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#2a0a1f] via-[#6b1240] to-[#9d174d] text-white">
        <div className="absolute -right-24 -top-24 -z-10 size-[420px] rounded-full bg-[#f9a8d4]/25 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-32 left-1/3 -z-10 size-[360px] rounded-full bg-[#fcd34d]/20 blur-3xl" aria-hidden="true" />
        <div className="grid min-h-[480px] grid-cols-[1.1fr_1fr] items-center gap-6 px-12 py-12 max-[900px]:grid-cols-1 max-[900px]:px-6">
          <div>
            <p className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
              Festive demo collection
            </p>
            <h1 className="font-display mt-5 text-balance text-[clamp(40px,6vw,76px)] font-extrabold leading-[1.02]">
              Dress for the <span className="text-[#fcd34d]">celebration.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg text-white/85">
              Kurtas, sarees, dresses, denim and winter layers. Up to {discountPct(byDiscount[0])}% off, free delivery and
              easy 7-day returns.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/category/women-ethnic"
                className="rounded-full bg-white px-7 py-3.5 font-bold text-ink no-underline transition hover:bg-[#fcd34d]"
              >
                Shop Women →
              </Link>
              <Link
                href="/category/men-casual"
                className="rounded-full border-2 border-white/70 px-7 py-3.5 font-bold text-white no-underline transition hover:bg-white/10"
              >
                Shop Men
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] max-[900px]:hidden" aria-hidden="true">
            <Garment type="saree" color="#fcd34d" className="absolute left-[2%] top-[14%] h-[72%] -rotate-6 drop-shadow-2xl" />
            <Garment type="kurta" color="#f472b6" className="absolute left-[30%] top-[2%] z-10 h-[88%] drop-shadow-2xl" />
            <Garment type="dress" color="#5eead4" className="absolute right-[2%] top-[16%] h-[72%] rotate-6 drop-shadow-2xl" />
            <div className="absolute bottom-2 right-4 z-20 rounded-2xl bg-white px-5 py-3 text-ink shadow-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-muted">Starting at</div>
              <div className="text-2xl font-extrabold">₹399</div>
            </div>
          </div>
        </div>
      </section>

      <ul className="mt-6 grid list-none grid-cols-4 gap-3 rounded-2xl bg-panel p-5 ring-1 ring-line max-[820px]:grid-cols-2">
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

      <section aria-labelledby="cats" className="mt-12">
        <h2 id="cats" className="font-display text-3xl font-extrabold">Shop by category</h2>
        <p className="mt-1 text-muted">Pick a style, filter by size, price and brand.</p>
        <ul className="mt-6 grid list-none grid-cols-5 gap-4 max-[1000px]:grid-cols-3 max-[640px]:grid-cols-2">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl p-4 no-underline ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: `linear-gradient(160deg, #fff8, ${c.tint})`, backgroundColor: c.tint }}
              >
                <Garment
                  type={c.garment}
                  color={c.color}
                  className="absolute inset-x-0 top-4 mx-auto h-[68%] transition duration-500 group-hover:scale-110"
                />
                <span className="relative z-10 rounded-xl bg-white/90 px-3 py-2 text-center text-sm font-bold text-ink backdrop-blur">
                  {c.name} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ProductRow title="Deals of the day" items={byDiscount.slice(0, 10)} />

      <section className="mt-10 grid grid-cols-2 gap-4 max-[760px]:grid-cols-1" aria-label="Offers">
        <Link
          href="/category/winterwear"
          className="flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#312e81] to-[#6d28d9] p-8 text-white no-underline"
        >
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/70">Winter edit</span>
            <span className="font-display mt-1 block text-3xl font-extrabold">Hoodies from ₹999</span>
            <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink">Shop now</span>
          </span>
          <Garment type="hoodie" color="#c4b5fd" className="h-32 w-auto drop-shadow-xl" />
        </Link>
        <Link
          href="/category/men-ethnic"
          className="flex items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#7c2d12] to-[#d97706] p-8 text-white no-underline"
        >
          <span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/70">Festive men</span>
            <span className="font-display mt-1 block text-3xl font-extrabold">Kurta sets from ₹899</span>
            <span className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-bold text-ink">Shop now</span>
          </span>
          <Garment type="kurta" color="#fde68a" className="h-32 w-auto drop-shadow-xl" />
        </Link>
      </section>

      <ProductRow title="Under ₹999" items={products.filter((p) => p.price < 999)} />
      <ProductRow title="Top rated" items={byRating.slice(0, 10)} />

      <section aria-labelledby="all" className="mt-12">
        <h2 id="all" className="font-display mb-5 text-3xl font-extrabold">New arrivals</h2>
        <ProductGrid items={products} />
      </section>
    </>
  );
}
