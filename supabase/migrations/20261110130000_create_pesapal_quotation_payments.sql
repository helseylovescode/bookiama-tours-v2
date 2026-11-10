begin;

create table public.custom_trip_payments (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null
    references public.custom_trip_quotations(id) on delete cascade,
  provider text not null default 'pesapal'
    check (provider = 'pesapal'),
  payment_token text not null unique,
  merchant_reference text not null unique,
  order_tracking_id text unique,
  checkout_url text,
  amount numeric(12,2) not null check (amount > 0),
  currency_code text not null check (currency_code = 'KES'),
  status text not null default 'created'
    check (status in ('created', 'initiating', 'pending', 'completed', 'failed', 'reversed')),
  provider_status text,
  confirmation_code text,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index custom_trip_payments_quotation_id_created_idx
  on public.custom_trip_payments(quotation_id, created_at desc);
create unique index custom_trip_payments_one_active_per_quote_idx
  on public.custom_trip_payments(quotation_id)
  where status in ('created', 'initiating', 'pending');

create trigger custom_trip_payments_set_updated_at
before update on public.custom_trip_payments
for each row execute function public.set_updated_at();

alter table public.custom_trip_payments enable row level security;
revoke all on public.custom_trip_payments from anon, authenticated;
grant select, insert on public.custom_trip_payments to authenticated;

create policy "Owner reads custom trip payments"
on public.custom_trip_payments
for select to authenticated
using ((select public.is_bokiama_owner()));

create policy "Owner creates custom trip payment links"
on public.custom_trip_payments
for insert to authenticated
with check (
  (select public.is_bokiama_owner())
  and exists (
    select 1
    from public.custom_trip_quotations q
    where q.id = quotation_id
      and q.status = 'accepted'
      and q.currency_code = 'KES'
      and q.total_amount = amount
  )
);

commit;
