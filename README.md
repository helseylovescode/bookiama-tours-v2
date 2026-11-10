This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Admin dashboard

The owner-only dashboard is available at `/admin`. Before signing in:

1. Apply the Supabase migrations in `supabase/migrations`, including
   `20261110110000_allow_public_enquiry_references.sql` and
   `20261110120000_create_owner_quotation_rpc.sql`.
2. Create the owner account in Supabase Authentication.
3. Promote that account by setting its `public.profiles.role` to `owner`. The
   initial schema migration includes the SQL for this step.

The dashboard includes an enquiry inbox, overview metrics, tour management,
and draft quotations. Quotations are not emailed automatically; use
**Prepare email** to open a message in your mail app, then update the quotation
status after sending it.

### Pesapal payments

Accepted KES quotations can have a secure payment link created from the
quotation in `/admin/quotations`. Share the link with the customer; they are
sent to Pesapal checkout for the full quoted amount. The app marks a payment
complete only after it asks Pesapal to verify the transaction. Refunds must
currently be arranged in the Pesapal merchant account and recorded outside
the app.

Before enabling payments on the hosted site:

1. Apply `supabase/migrations/20261110130000_create_pesapal_quotation_payments.sql`.
2. Obtain Pesapal API credentials for the merchant account and configure these
   server environment variables in the hosting provider (never prefix secret
   values with `NEXT_PUBLIC_`):

   | Variable | Value |
   | --- | --- |
   | `PESAPAL_ENVIRONMENT` | `sandbox` while testing; set to `production` after approval |
   | `PESAPAL_CONSUMER_KEY` | Pesapal API consumer key |
   | `PESAPAL_CONSUMER_SECRET` | Pesapal API consumer secret |
   | `PESAPAL_IPN_ID` | Notification ID returned when registering the IPN URL |
   | `NEXT_PUBLIC_SITE_URL` | Canonical hosted site origin, e.g. `https://example.com` |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key; server-only secret |

3. Register `https://your-site-domain.com/api/payments/pesapal/ipn` as the
   Pesapal IPN URL and use the returned notification ID for `PESAPAL_IPN_ID`.
   The same endpoint is used as the browser return URL. Ensure the merchant
   account is enabled for online M-Pesa and card payments.
4. Test the complete flow with Pesapal sandbox credentials and a test KES
   quotation before switching the environment to production.

Payment links can only be created for accepted, unexpired KES quotations.
Other currencies, PayPal, Apple Pay and Google Pay are not enabled by this
initial integration; availability should be confirmed with the payment
provider before adding them.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
