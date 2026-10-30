import type { Metadata } from "next";
import { Figtree, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";
import { categories } from "@/data/products";
import { SITE_NAME, SITE_URL } from "@/lib/format";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — clothing for women & men`, template: `%s | ${SITE_NAME}` },
  description:
    "A demo online clothing store: catalogue, size selection, cart and checkout flow, built with Next.js and ready for payment-gateway integration.",
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${playfair.variable}`}>
      <body className="bg-bg font-sans text-base leading-[1.55] text-ink antialiased">
        <Header />
        <main className="mx-auto max-w-[1280px] px-4 py-6">{children}</main>
        <footer className="mt-12 bg-ink text-white/80">
          <div className="mx-auto grid max-w-[1280px] grid-cols-[1.5fr_1fr_1fr] gap-8 px-4 py-12 max-[760px]:grid-cols-1">
            <div>
              <div className="font-display text-2xl font-extrabold text-white">{SITE_NAME}</div>
              <p className="mt-3 max-w-[40ch] text-sm">
                A demo clothing store. Products, brands, ratings and prices are fictional. Built by Shubham Modh.
              </p>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-white">Shop</div>
              <ul className="mt-3 grid list-none gap-1.5 text-sm">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/category/${c.slug}`} className="text-white/80 no-underline hover:text-white">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-white">Our promise (demo)</div>
              <ul className="mt-3 grid list-none gap-1.5 text-sm">
                <li>Free delivery on every order</li>
                <li>7-day easy returns</li>
                <li>Secure payments via Razorpay (test mode)</li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
