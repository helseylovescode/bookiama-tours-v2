import "server-only";

type PesapalOrderResponse = {
  orderTrackingId: string;
  merchantReference: string;
  redirectUrl: string;
};

type PesapalTransactionStatus = {
  amount: number;
  confirmationCode: string | null;
  currency: string;
  merchantReference: string;
  paymentStatusDescription: string;
  statusCode: number;
};

function getApiBaseUrl() {
  const environment = process.env.PESAPAL_ENVIRONMENT ?? "sandbox";
  if (environment === "sandbox") return "https://cybqa.pesapal.com/pesapalv3";
  if (environment === "production") return "https://pay.pesapal.com/v3";
  throw new Error("PESAPAL_ENVIRONMENT must be sandbox or production.");
}

async function readJson(response: Response, operation: string): Promise<unknown> {
  const body: unknown = await response.json();
  if (!response.ok) {
    const message =
      typeof body === "object" && body !== null && "message" in body &&
      typeof body.message === "string"
        ? body.message
        : `Pesapal ${operation} failed with HTTP ${response.status}.`;
    throw new Error(message);
  }
  return body;
}

function requiredString(
  value: unknown,
  field: string,
): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Pesapal response is missing ${field}.`);
  }
  return value;
}

export async function getPesapalAccessToken() {
  const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
  const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
  if (!consumerKey || !consumerSecret) {
    throw new Error("Pesapal credentials are not configured.");
  }

  const response = await fetch(`${getApiBaseUrl()}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
    }),
    cache: "no-store",
  });
  const body = await readJson(response, "authentication");
  if (typeof body !== "object" || body === null) {
    throw new Error("Pesapal returned an invalid authentication response.");
  }
  return requiredString("token" in body ? body.token : null, "an access token");
}

export async function submitPesapalOrder(input: {
  accessToken: string;
  merchantReference: string;
  notificationId: string;
  callbackUrl: string;
  amount: number;
  description: string;
  email: string;
  phone: string;
  name: string;
}) {
  const names = input.name.trim().split(/\s+/);
  const response = await fetch(`${getApiBaseUrl()}/api/Transactions/SubmitOrderRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${input.accessToken}`,
    },
    body: JSON.stringify({
      id: input.merchantReference,
      currency: "KES",
      amount: input.amount,
      description: input.description.slice(0, 100),
      callback_url: input.callbackUrl,
      notification_id: input.notificationId,
      redirect_mode: "PARENT_WINDOW",
      billing_address: {
        email_address: input.email,
        phone_number: input.phone,
        country_code: "KE",
        first_name: names[0] ?? input.name,
        last_name: names.slice(1).join(" "),
      },
    }),
    cache: "no-store",
  });
  const body = await readJson(response, "order submission");
  if (typeof body !== "object" || body === null) {
    throw new Error("Pesapal returned an invalid order response.");
  }
  const orderTrackingId = requiredString(
    "order_tracking_id" in body ? body.order_tracking_id : null,
    "an order tracking ID",
  );
  const merchantReference = requiredString(
    "merchant_reference" in body ? body.merchant_reference : null,
    "a merchant reference",
  );
  const redirectUrl = requiredString(
    "redirect_url" in body ? body.redirect_url : null,
    "a checkout URL",
  );
  const parsedRedirectUrl = new URL(redirectUrl);
  if (
    parsedRedirectUrl.protocol !== "https:" ||
    !["pay.pesapal.com", "cybqa.pesapal.com"].includes(parsedRedirectUrl.hostname)
  ) {
    throw new Error("Pesapal returned an unexpected checkout URL.");
  }

  return {
    orderTrackingId,
    merchantReference,
    redirectUrl,
  } satisfies PesapalOrderResponse;
}

export async function getPesapalTransactionStatus(orderTrackingId: string) {
  const accessToken = await getPesapalAccessToken();
  const url = new URL(`${getApiBaseUrl()}/api/Transactions/GetTransactionStatus`);
  url.searchParams.set("orderTrackingId", orderTrackingId);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  const body = await readJson(response, "transaction verification");
  if (typeof body !== "object" || body === null) {
    throw new Error("Pesapal returned an invalid transaction status.");
  }

  const amount = "amount" in body ? Number(body.amount) : Number.NaN;
  const statusCode = "status_code" in body ? Number(body.status_code) : Number.NaN;
  if (!Number.isFinite(amount) || !Number.isInteger(statusCode)) {
    throw new Error("Pesapal returned incomplete transaction details.");
  }

  const confirmationCode =
    "confirmation_code" in body && typeof body.confirmation_code === "string"
      ? body.confirmation_code
      : null;
  return {
    amount,
    confirmationCode,
    currency: requiredString("currency" in body ? body.currency : null, "a transaction currency"),
    merchantReference: requiredString(
      "merchant_reference" in body ? body.merchant_reference : null,
      "a transaction merchant reference",
    ),
    paymentStatusDescription: requiredString(
      "payment_status_description" in body
        ? body.payment_status_description
        : null,
      "a transaction status",
    ),
    statusCode,
  } satisfies PesapalTransactionStatus;
}

export function getPublicSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!configuredUrl) throw new Error("NEXT_PUBLIC_SITE_URL is not configured.");
  const url = new URL(configuredUrl);
  if (
    url.protocol !== "https:" &&
    !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))
  ) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS outside local development.");
  }
  return url.origin;
}
