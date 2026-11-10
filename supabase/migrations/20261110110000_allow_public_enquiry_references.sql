-- Allow public enquiries to set their status and server-generated reference
-- without granting visitors SELECT access to customer contact details.
grant insert (request_reference, status)
on public.custom_trip_requests to anon, authenticated;
