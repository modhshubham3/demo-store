const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatINR = (amount: number) => inr.format(amount);

// Public origin used for canonical URLs, sitemap and structured data.
// Set NEXT_PUBLIC_SITE_URL in Vercel once the real domain exists.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_NAME = "Demo Store";
