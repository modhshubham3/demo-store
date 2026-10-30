# Demo Store — handoff for a new Claude session

Read this file first in the new session. The code is already in the repo (`main`); section 4 documents
what the scaffold contains.

## 1. Why this exists

Shubham Modh (freelance .NET / full-stack dev, Ahmedabad) has a lead who wants a **shopping website,
digital marketing, and SEO**. His freelance portfolio had no e-commerce proof, so this demo store is
the proof: a link he can send the lead. Social media and ads will be handled by a friend/partner team;
Shubham covers the build and **technical SEO**.

Positioning rules (keep honest): call it a **demo**, not a finished store. Do not promise search
rankings or guaranteed results. Products and prices are fictional.

## 2. User preferences (apply in the new session)

- Reply in **Hinglish**. Be a brutally honest advisor: lead with the hard truth, tag claims
  [Certain] / [Likely] / [Guessing].
- Explain the "why", check in with "Does this make sense so far?", end with "Has this issue been resolved?".
- **Work directly on the `main` branch** in all his projects unless he asks for a new branch.
  Because pushes to `main` auto-deploy on Vercel, run lint and build before every push.
- Confirm before outward-facing actions (new repos, deploys, posting).

## 3. Status when this session ended

| Item | State |
|---|---|
| Scaffold (catalogue, categories, product pages, cart, checkout stub, SEO basics) | Built, `npm run lint` clean, `npm run build` passes |
| Smoke test | `/`, `/category/*`, `/products/*`, `/cart`, `/checkout`, `/sitemap.xml`, `/robots.txt` return 200; unknown slug returns 404; Product JSON-LD present |
| Cart click-through in a real browser | **Not tested** |
| GitHub repo | Private repo `modhshubham3/demo-store`: scaffold, this file and README are pushed to `main` (the code is already in your checkout, no rebuild needed) |
| Deploy | Not deployed |
| Payments | **Not implemented** (checkout is a stub) |
| Real images | None (emoji + colour tint placeholders) |

## 4. What the scaffold contains

**Stack:** Next.js `16.3.2`, React `19.2.8`, Tailwind CSS 4 (`@tailwindcss/postcss`), TypeScript 5,
ESLint 9 with `eslint-config-next@16.3.2`. App Router, `src/` folder, `@/*` alias to `./src/*`.
Fonts: `Figtree` via `next/font/google`. Scripts: dev, build, start, lint.

> **Read `node_modules/next/dist/docs/` before writing code.** This Next.js version has breaking
> changes. Confirmed ones: route `params` is a **Promise** (`await props.params`), and the global
> helpers `PageProps<'/route'>` and `LayoutProps<'/'>` type pages and layouts.
> Do **not** set `output: "export"`: the payment step needs a server route.

**Theme (globals.css, `@theme inline`):** bg `#faf7f2`, panel `#ffffff`, ink `#1c1917`,
muted `#57534e`, line `#e7e0d5`, accent `#b4532a`, accent-contrast `#ffffff`.

**Data model (`src/data/products.ts`):**
`Category { slug, name, blurb }`, `Product { slug, name, category, price (INR whole rupees), mrp?, emoji, tint, short, description, details[] }`.
Helpers: `getProduct`, `getCategory`, `productsIn`. Catalogue: 3 categories (kitchen, home-decor,
accessories) and 8 fictional products (cast-iron tawa 1499, stoneware mug set 999, bamboo chopping
board 649, matte ceramic vase 1199, woven wall basket 799, soy candle trio 1099, insulated steel
bottle 899, canvas tote 549).

**Files:**
- `src/lib/format.ts` — `formatINR` (en-IN, INR, 0 decimals), `SITE_URL` from `NEXT_PUBLIC_SITE_URL`
  (default `http://localhost:3000`), `SITE_NAME = "Demo Store"`.
- `src/lib/cart.ts` — module-level cart store for `useSyncExternalStore`: `subscribe`, `getSnapshot`
  (lazy-loads and validates `localStorage["demo-store-cart"]`, returns a **cached** array),
  `getServerSnapshot` (constant empty array), `add`, `setQty` (max 10, removes at 0), `clear`.
- `src/components/useCart.ts` — client hook returning `{ items:[{product, qty}], count, subtotal }`.
- `Header.tsx` (client; sticky nav, category links, `Cart (n)`), `ProductCard.tsx`,
  `AddToCartButton.tsx` ("Added ✓" for 1.5 s).
- `src/app/layout.tsx` — `metadataBase`, title template `%s | Demo Store`, header, footer.
- `src/app/page.tsx` — hero, category tiles, all products grid.
- `src/app/category/[slug]/page.tsx` and `src/app/products/[slug]/page.tsx` — `generateStaticParams`,
  `generateMetadata` (title, description, canonical), `notFound()` for bad slugs. The product page adds
  breadcrumbs and **schema.org `Product` JSON-LD** (`<` escaped as `<`).
- `src/app/cart/page.tsx` — client; qty +/- buttons with aria-labels, line totals, subtotal, checkout link.
- `src/app/checkout/page.tsx` — client; delivery form (name, email, phone, address) and order summary.
  Submit only shows "Payment gateway is not connected yet". Contains the TODO for the order API.
- `src/app/sitemap.ts` (home, categories, products), `robots.ts` (disallow `/cart`, `/checkout`),
  `not-found.tsx`.

## 5. Next steps (in this order)

1. Run `npm install`, then `npm run lint && npm run build` to confirm the checkout is healthy.
2. Test the cart in a real browser (Playwright/Chromium is pre-installed): add, change quantity,
   refresh persistence, empty state.
3. **Payments:** add `src/app/api/orders/route.ts`. Recompute the total on the server from
   `src/data/products.ts` (never trust prices from the browser), create a **Razorpay test-mode** order,
   open Razorpay Checkout on the client, verify the payment signature on the server. Keys go in
   environment variables, never in the repo.
4. Replace emoji placeholders with real product images (`next/image`, proper `alt`, sized to avoid
   layout shift).
5. Deploy to Vercel (ask the user first); set `NEXT_PUBLIC_SITE_URL` to the real URL; run Lighthouse
   and record the scores — these are the SEO proof for the lead.
6. SEO extras: per-category copy, `BreadcrumbList` JSON-LD, Open Graph images, Search Console setup.

## 6. Gotchas learned

- `pkill -f <pattern>` can kill your own shell if the pattern appears in the command line. Kill by
  PID instead.
- The user's freelance portfolio is a separate repo (`modhshubham3/freelance-portfolio`, deployed on
  Vercel, live at `shubham-builds-eight.vercel.app`). Once the demo store has a URL, add it to that
  portfolio's Projects section in a **separate session** (this demo store session should not edit it).
- The user's other repos Health-app, music-player and aqsoft-denials-command-center are private;
  never link them publicly.
