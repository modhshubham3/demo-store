import type { Metadata } from "next";
import Link from "next/link";
import Listing from "@/components/Listing";
import { searchProducts } from "@/data/products";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? q[0] : q)?.trim().slice(0, 80) ?? "";
  const results = searchProducts(query);

  return (
    <>
      <h1 className="text-3xl font-extrabold">
        {query ? <>Results for “{query}”</> : "Search"}
      </h1>
      {results.length ? (
        <div className="mt-6">
          <Listing items={results} />
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-line bg-panel p-10 text-center">
          <p className="font-bold">
            {query ? `Nothing found for “${query}”.` : "Type something in the search bar."}
          </p>
          <p className="mt-2 text-sm text-muted">Try a brand (Stridex), a product (earbuds) or a category (kitchen).</p>
          <Link href="/" className="mt-4 inline-block font-semibold text-accent">
            Back to home →
          </Link>
        </div>
      )}
    </>
  );
}
