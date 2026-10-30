import { verifySignature } from "@/lib/razorpay";

export async function POST(request: Request) {
  const b = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const orderId = b?.razorpay_order_id;
  const paymentId = b?.razorpay_payment_id;
  const signature = b?.razorpay_signature;
  if (typeof orderId !== "string" || typeof paymentId !== "string" || typeof signature !== "string") {
    return Response.json({ verified: false }, { status: 400 });
  }
  const verified = verifySignature(orderId, paymentId, signature);
  return Response.json({ verified }, { status: verified ? 200 : 400 });
}
