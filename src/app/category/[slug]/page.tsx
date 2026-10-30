import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Garment from "@/components/Garment";
import Listing from "@/components/Listing";
import { categories, getCategory, productsIn } from "@/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.blurb,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <div
        className="relative mb-8 flex min-h-[170px] items-center overflow-hidden rounded-3xl px-8 py-6"
        style={{ background: `linear-gradient(120deg, #fff9, ${category.tint})`, backgroundColor: category.tint }}
      >
        <div className="relative z-10">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">{category.name}</h1>
          <p className="mt-2 max-w-[44ch] text-muted">{category.blurb}</p>
        </div>
        <Garment
          type={category.garment}
          color={category.color}
          className="absolute right-10 top-3 h-[88%] w-auto drop-shadow-xl max-sm:opacity-30"
        />
      </div>
      <Listing items={productsIn(category.slug)} />
    </>
  );
}
