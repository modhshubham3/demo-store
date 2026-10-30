import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getCategory, getProduct, products } from "@/data/products";
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
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${p.slug}`,
      priceCurrency: "INR",
      price: p.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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
      <div className="grid grid-cols-2 gap-10 max-[760px]:grid-cols-1">
        <div
          className="flex aspect-square items-center justify-center rounded-3xl text-[120px]"
          style={{ backgroundColor: p.tint }}
          aria-hidden="true"
        >
          {p.emoji}
        </div>
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">{p.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatINR(p.price)}</span>
            {p.mrp ? <s className="text-muted">{formatINR(p.mrp)}</s> : null}
          </div>
          <p className="mt-5 text-muted">{p.description}</p>
          <ul className="mt-5 grid list-none gap-1.5">
            {p.details.map((d) => (
              <li key={d} className="text-[15px] text-muted">
                <span className="mr-2 text-accent">✓</span>
                {d}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <AddToCartButton slug={p.slug} />
          </div>
        </div>
      </div>
    </article>
  );
}
