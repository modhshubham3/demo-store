import type { NextConfig } from "next";

// No `output: "export"` on purpose: the Razorpay/Stripe order-creation step
// needs a server route (src/app/api/...), which a static export cannot host.
const nextConfig: NextConfig = {};

export default nextConfig;
