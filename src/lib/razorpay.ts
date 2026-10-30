import { createHmac, timingSafeEqual } from "node:crypto";

function credentials() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return { keyId, keySecret };
}

export function razorpayConfigured() {
  return credentials() !== null;
}

/** Creates an order on Razorpay. `amountInr` is whole rupees; Razorpay wants paise. */
export async function createRazorpayOrder(amountInr: number, receipt: string) {
  const creds = credentials();
  if (!creds) throw new Error("Razorpay is not configured");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString("base64")}`,
    },
    body: JSON.stringify({ amount: amountInr * 100, currency: "INR", receipt }),
  });
  if (!res.ok) throw new Error(`Razorpay order failed (${res.status})`);
  const order = (await res.json()) as { id: string; amount: number; currency: string };
  return { order, keyId: creds.keyId };
}

/** Razorpay signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret), hex. */
export function verifySignature(orderId: string, paymentId: string, signature: string) {
  const creds = credentials();
  if (!creds) return false;
  const expected = createHmac("sha256", creds.keySecret).update(`${orderId}|${paymentId}`).digest();
  const given = Buffer.from(signature, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
