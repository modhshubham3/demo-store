import { priceCart } from "@/lib/orders";
import { createRazorpayOrder, razorpayConfigured } from "@/lib/razorpay";

export async function POST(request: Request) {
  if (!razorpayConfigured()) {
    return Response.json({ error: "Payments are not configured on this server." }, { status: 503 });
  }
  const body: unknown = await request.json().catch(() => null);
  const priced = priceCart((body as { items?: unknown } | null)?.items);
  if (!priced) return Response.json({ error: "Invalid cart." }, { status: 400 });

  try {
    const { order, keyId } = await createRazorpayOrder(priced.total, `ds_${Date.now()}`);
    return Response.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch {
    return Response.json({ error: "Could not start payment. Try again." }, { status: 502 });
  }
}
