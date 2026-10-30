import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SITE_NAME, SITE_URL } from "@/lib/format";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — fashion, electronics & home`, template: `%s | ${SITE_NAME}` },
  description:
    "A demo online store: product catalogue, cart, and checkout flow, built with Next.js and ready for payment-gateway integration.",
  openGraph: { siteName: SITE_NAME, type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="bg-bg font-sans text-base leading-[1.55] text-ink antialiased">
        <Header />
        <main className="mx-auto max-w-[1280px] px-4 py-6">{children}</main>
        <footer className="border-t border-line py-8 text-center text-sm text-muted">
          Demo store: products, brands, ratings and prices are fictional. Built by Shubham Modh.
        </footer>
      </body>
    </html>
  );
}
