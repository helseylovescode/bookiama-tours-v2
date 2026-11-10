begin;

create or replace function public.create_owner_custom_trip_quotation(
  p_request_id uuid,
  p_currency_code text,
  p_taxes_and_fees numeric,
  p_valid_until date,
  p_customer_message text,
  p_items jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_item jsonb;
  v_item_type text;
  v_description text;
  v_quantity numeric;
  v_unit_price numeric;
  v_line_total numeric;
  v_subtotal numeric := 0;
  v_version integer;
  v_quotation_id uuid;
  v_display_order integer := 0;
begin
  if not (select public.is_bokiama_owner()) then
    raise exception 'Owner access is required to create quotations.';
  end if;

  if p_currency_code is null
    or p_currency_code !~ '^[A-Z]{3}$'
    or p_taxes_and_fees is null
    or p_taxes_and_fees < 0
    or p_items is null
    or pg_catalog.jsonb_typeof(p_items) <> 'array'
    or pg_catalog.jsonb_array_length(p_items) < 1
    or pg_catalog.jsonb_array_length(p_items) > 50
  then
    raise exception 'Quotation details are invalid.';
  end if;

  if not exists (
    select 1
    from public.custom_trip_requests r
    where r.id = p_request_id
  ) then
    raise exception 'The enquiry does not exist.';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(p_request_id::text, 0)
  );

  select coalesce(max(q.version), 0) + 1
  into v_version
  from public.custom_trip_quotations q
  where q.custom_trip_request_id = p_request_id;

  for v_item in
    select item.value
    from pg_catalog.jsonb_array_elements(p_items) as item(value)
  loop
    v_item_type := v_item ->> 'item_type';
    v_description := pg_catalog.btrim(v_item ->> 'description');
    v_quantity := (v_item ->> 'quantity')::numeric;
    v_unit_price := (v_item ->> 'unit_price')::numeric;

    if v_item_type is null
      or v_item_type not in (
      'accommodation', 'transport', 'activity', 'entry_fee',
      'meal', 'guide', 'other'
    )
      or v_description is null
      or v_description = ''
      or pg_catalog.length(v_description) > 500
      or v_quantity is null
      or v_quantity <= 0
      or v_unit_price is null
      or v_unit_price < 0
    then
      raise exception 'A quotation line item is invalid.';
    end if;

    v_line_total := pg_catalog.round(v_quantity * v_unit_price, 2);
    v_subtotal := v_subtotal + v_line_total;
  end loop;

  insert into public.custom_trip_quotations (
    custom_trip_request_id,
    version,
    currency_code,
    subtotal,
    taxes_and_fees,
    total_amount,
    valid_until,
    customer_message,
    status
  )
  values (
    p_request_id,
    v_version,
    p_currency_code,
    v_subtotal,
    p_taxes_and_fees,
    v_subtotal + p_taxes_and_fees,
    p_valid_until,
    nullif(pg_catalog.btrim(p_customer_message), ''),
    'draft'
  )
  returning id into v_quotation_id;

  for v_item in
    select item.value
    from pg_catalog.jsonb_array_elements(p_items) as item(value)
  loop
    v_item_type := v_item ->> 'item_type';
    v_description := pg_catalog.btrim(v_item ->> 'description');
    v_quantity := (v_item ->> 'quantity')::numeric;
    v_unit_price := (v_item ->> 'unit_price')::numeric;
    v_line_total := pg_catalog.round(v_quantity * v_unit_price, 2);

    insert into public.quotation_items (
      quotation_id,
      item_type,
      description,
      quantity,
      unit_price,
      line_total,
      display_order
    )
    values (
      v_quotation_id,
      v_item_type,
      v_description,
      v_quantity,
      v_unit_price,
      v_line_total,
      v_display_order
    );

    v_display_order := v_display_order + 1;
  end loop;

  return v_quotation_id;
end;
$$;

revoke all on function public.create_owner_custom_trip_quotation(
  uuid, text, numeric, date, text, jsonb
) from public, anon, authenticated;

grant execute on function public.create_owner_custom_trip_quotation(
  uuid, text, numeric, date, text, jsonb
) to authenticated;

commit;
