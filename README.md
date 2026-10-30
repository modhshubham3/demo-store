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
- Razorpay **test-mode** payments: `POST /api/orders` re-prices the cart on the server (client sends only
  slug + qty) and creates the order; `POST /api/orders/verify` checks the HMAC-SHA256 signature before
  the cart is cleared. Without keys the API answers 503 and checkout shows an error.
- SEO basics: per-page title/description, canonical URLs, `Product` JSON-LD, `sitemap.xml`, `robots.txt`
  (cart and checkout are disallowed)

## Environment variables (never commit; `.env*` is git-ignored)

```
RAZORPAY_KEY_ID=rzp_test_xxx      # Razorpay dashboard, Test mode
RAZORPAY_KEY_SECRET=xxx
NEXT_PUBLIC_SITE_URL=https://your-domain
```

## What is NOT done yet

- **Orders are not stored.** There is no database: a verified payment is only confirmed on screen. A real
  store needs an order record, a Razorpay webhook (`payment.captured`) and confirmation email.

- **Real images.** `emoji` and `tint` in `src/data/products.ts` stand in for photos.
- **Database / admin.** Products live in a TypeScript file. Move to Postgres or a CMS when the catalogue grows.
- **Set `NEXT_PUBLIC_SITE_URL`** to the real domain on deploy, or the sitemap and canonical URLs point at localhost.
