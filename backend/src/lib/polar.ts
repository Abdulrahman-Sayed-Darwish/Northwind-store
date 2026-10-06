import type { Env } from "./env.js";
// لما أطلب من Polar تعمل Checkout، البيانات اللي هبعتها شكلها إيه؟
type CheckoutCreateBody = {
  products: string[];
  prices?: Record<
    string,
    Array<{
      amount_type: "fixed";
      price_amount: number;
      price_currency: string;
    }>
  >;
  success_url: string;
  return_url?: string;
  external_customer_id?: string;
  customer_email?: string;
  metadata?: Record<string, string | number | boolean>;
};
// تحوّل بيانات الطلب عندك إلى Checkout في Polar، وتأخذ رابط الدفع من Polar.
export async function polarCreateCheckout(env: Env, body: CheckoutCreateBody) {
  const token = env.POLAR_ACCESS_TOKEN?.trim();
  if (!token) throw new Error("POLAR_ACCESS_TOKEN is not configured");

  const res = await fetch(
    `${env.POLAR_API_BASE.trim().replace(/\/+$/, "")}/v1/checkouts/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Polar checkout failed: ${res.status} ${errText}`);
  }

  const data = (await res.json()) as { id: string; url: string };
  //   ده الـ Checkout ID وده رابط صفحة الدفع
  return { id: data.id, url: data.url };
}
