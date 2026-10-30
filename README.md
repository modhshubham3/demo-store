# Demo Store

Scaffold of a small online store: catalogue, category pages, product pages, cart, and a checkout form.
Built with **Next.js 16** (App Router) and **Tailwind CSS 4**. Products and prices are fictional.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## What works now

- Home, 3 category pages, 8 product pages — all prerendered (`generateStaticParams`)
- Cart (add, change quantity, remove) saved in `localStorage`
- SEO basics: per-page title/description, canonical URLs, `Product` JSON-LD, `sitemap.xml`, `robots.txt`
  (cart and checkout are disallowed)

## What is NOT done yet

- **Payments.** The checkout form is a stub (`src/app/checkout/page.tsx`, see the TODO). Next step: an
  `/api/orders` route that recomputes the total on the server from `src/data/products.ts` and creates a
  Razorpay (test mode) or Stripe order. That is why `output: "export"` is not set.
- **Real images.** `emoji` and `tint` in `src/data/products.ts` stand in for photos.
- **Database / admin.** Products live in a TypeScript file. Move to Postgres or a CMS when the catalogue grows.
- **Set `NEXT_PUBLIC_SITE_URL`** to the real domain on deploy, or the sitemap and canonical URLs point at localhost.
