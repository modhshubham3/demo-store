import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import PincodeCheck from "@/components/PincodeCheck";
import ProductRow from "@/components/ProductRow";
import Rating from "@/components/Rating";
import { discountPct, getCategory, getProduct, productsIn, products } from "@/data/products";
import { formatINR, SITE_URL } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.short,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.name, description: product.short, type: "website" },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const category = getCategory(p.category);

  // schema.org Product markup: what lets Google show price/availability in results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: category?.name,
    brand: { "@type": "Brand", name: p.brand },
    // No aggregateRating on purpose: the ratings in this demo are fictional, and
    // fake review markup can get a site a Google manual action.
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${p.slug}`,
      priceCurrency: "INR",
      price: p.price,
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...(category
        ? [{ "@type": "ListItem", position: 2, name: category.name, item: `${SITE_URL}/category/${category.slug}` }]
        : []),
      { "@type": "ListItem", position: category ? 3 : 2, name: p.name },
    ],
  };
  const similar = productsIn(p.category).filter((x) => x.slug !== p.slug);

  return (
    <article>
      {[jsonLd, breadcrumbLd].map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
        />
      ))}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <Link href="/" className="text-muted hover:text-accent">Home</Link> /{" "}
        {category ? (
          <>
            <Link href={`/category/${category.slug}`} className="text-muted hover:text-accent">
              {category.name}
            </Link>{" "}
            /{" "}
          </>
        ) : null}
        {p.name}
      </nav>
      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-8 rounded-xl bg-panel p-6 max-[860px]:grid-cols-1">
        <div
          className="flex aspect-square items-center justify-center rounded-xl text-[140px]"
          style={{ backgroundColor: p.tint }}
          aria-hidden="true"
        >
          {p.emoji}
        </div>
        <div>
          <div className="text-sm font-bold uppercase tracking-wide text-accent">{p.brand}</div>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">{p.name}</h1>
          <div className="mt-2"><Rating value={p.rating} count={p.reviews} /></div>

          <div className="mt-4 flex flex-wrap items-baseline gap-3 border-t border-line pt-4">
            <span className="text-3xl font-extrabold">{formatINR(p.price)}</span>
            <s className="text-muted">{formatINR(p.mrp)}</s>
            <span className="font-bold text-good">{discountPct(p)}% off</span>
          </div>
          <p className="text-xs text-muted">Inclusive of all taxes (demo prices)</p>

          <div className="mt-5 rounded-lg border border-dashed border-good/50 bg-good/5 p-4">
            <h2 className="text-sm font-bold">Available offers</h2>
            <ul className="mt-2 grid list-none gap-1 text-sm text-muted">
              <li>🚚 Free delivery on every order</li>
              <li>💰 You save {formatINR(p.mrp - p.price)} on the MRP</li>
            </ul>
          </div>

          <div className="mt-5"><PincodeCheck /></div>

          <div className="mt-6"><AddToCartButton slug={p.slug} /></div>

          <ul className="mt-6 grid list-none grid-cols-3 gap-2 border-t border-line pt-4 text-center text-xs text-muted">
            <li>↩️<br />7-day returns</li>
            <li>🔒<br />Secure payment</li>
            <li>✅<br />Quality checked</li>
          </ul>
        </div>
      </div>

      <section className="mt-6 rounded-xl bg-panel p-6" aria-labelledby="about">
        <h2 id="about" className="text-xl font-extrabold">About this item</h2>
        <p className="mt-3 max-w-[70ch] text-muted">{p.description}</p>
        <ul className="mt-4 grid list-none gap-1.5">
          {p.details.map((d) => (
            <li key={d} className="text-[15px] text-muted">
              <span className="mr-2 text-good">✓</span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      {similar.length ? <ProductRow title="Similar products" items={similar} href={`/category/${p.category}`} /> : null}
    </article>
  );
}
