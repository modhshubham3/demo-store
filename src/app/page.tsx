import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export default function Home() {
  return (
    <>
      <section className="rounded-3xl bg-ink px-8 py-16 text-bg max-[640px]:px-6">
        <h1 className="max-w-[18ch] text-balance text-[clamp(32px,5vw,54px)] font-extrabold leading-[1.08]">
          Good things for the home you live in.
        </h1>
        <p className="mt-4 max-w-[52ch] text-bg/80">
          Kitchen essentials, decor, and everyday carry — a demo catalogue showing how a fast,
          search-friendly online store is put together.
        </p>
        <Link
          href="/category/kitchen"
          className="mt-8 inline-block rounded-xl bg-accent px-6 py-3 font-bold text-accent-contrast no-underline hover:brightness-110"
        >
          Shop kitchen →
        </Link>
      </section>

      <section className="mt-14" aria-labelledby="cats">
        <h2 id="cats" className="text-2xl font-bold">Shop by category</h2>
        <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="rounded-2xl border border-line bg-panel p-6 no-underline hover:border-accent"
            >
              <div className="font-bold text-ink">{c.name}</div>
              <div className="mt-1 text-sm text-muted">{c.blurb}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="all">
        <h2 id="all" className="text-2xl font-bold">All products</h2>
        <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(240px,100%),1fr))] gap-5">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
