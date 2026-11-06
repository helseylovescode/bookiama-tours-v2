-- =============================================================================
-- BOKIAMA TOURS & TRAVEL — SEED DATA
-- File: 20261106000000_seed_data.sql
-- Run AFTER all three schema migrations have been applied successfully.
--
-- Apply in Supabase Dashboard → SQL Editor → New query → paste → Run
-- =============================================================================

begin;

-- =============================================================================
-- 1. TOUR CATEGORIES
-- =============================================================================

insert into public.tour_categories (id, name, slug, description) values
  ('a1000001-0000-4000-8000-000000000001', 'Wildlife & Safari', 'wildlife-safari', 'Game drives, safaris and wildlife experiences across East Africa.'),
  ('a1000001-0000-4000-8000-000000000002', 'Coastal Escapes',   'coastal-escapes', 'Beach holidays, reef snorkelling and Indian Ocean retreats.')
on conflict (slug) do nothing;

-- =============================================================================
-- 2. DESTINATIONS
-- =============================================================================

insert into public.destinations (id, name, slug, country_code, region, description, is_published, display_order) values
  (
    'b2000001-0000-4000-8000-000000000001',
    'Kenya', 'kenya', 'KE', 'East Africa',
    'Kenya is where Africa comes alive. From the sweeping plains of the Maasai Mara to the coral reefs of Diani Beach, it is a country of extraordinary contrasts.',
    true, 1
  ),
  (
    'b2000001-0000-4000-8000-000000000002',
    'Tanzania', 'tanzania', 'TZ', 'East Africa',
    'Tanzania is home to Kilimanjaro, the Serengeti, the Ngorongoro Crater and the spice-scented shores of Zanzibar. A country of superlatives.',
    true, 2
  )
on conflict (slug) do nothing;

-- =============================================================================
-- 3. TOUR COLLECTIONS
-- =============================================================================

insert into public.tour_collections (id, name, slug, description, is_published, display_order) values
  ('c3000001-0000-4000-8000-000000000001', 'Bokiama Wild',        'bokiama-wild',        'For wildlife lovers and adventure seekers. Safaris, game drives and wilderness experiences.',  true, 1),
  ('c3000001-0000-4000-8000-000000000002', 'Bokiama Escape',      'bokiama-escape',      'For people who want to relax and recharge. Beaches, retreats and coastal holidays.',          true, 2),
  ('c3000001-0000-4000-8000-000000000003', 'Bokiama Together',    'bokiama-together',    'For families, couples and groups. Shared experiences and memorable journeys.',               true, 3),
  ('c3000001-0000-4000-8000-000000000004', 'Bokiama Beyond',      'bokiama-beyond',      'For international travellers. Experiences that take you further.',                            true, 4),
  ('c3000001-0000-4000-8000-000000000005', 'Bokiama Hidden Gems', 'bokiama-hidden-gems', 'Lesser-known destinations and local experiences that most visitors never discover.',          true, 5)
on conflict (slug) do nothing;

-- =============================================================================
-- 4. TOURS
-- =============================================================================

insert into public.tours (
  id, destination_id, category_id, title, slug, summary, description,
  duration_days, duration_nights, highlights, inclusions, exclusions,
  meeting_point, is_published, is_featured, display_order
) values

-- ── Tour 001: Wild Kenya Safari ─────────────────────────────────────────────
(
  'd4000001-0000-4000-8000-000000000001',
  'b2000001-0000-4000-8000-000000000001',
  'a1000001-0000-4000-8000-000000000001',
  'Wild Kenya Safari',
  'wild-kenya-safari',
  'Five nights through Amboseli, Lake Nakuru and the Maasai Mara — Kenya''s most iconic wildlife circuit.',
  'Kenya''s most celebrated parks in one seamless journey. You will witness elephant herds beneath Kilimanjaro, flamingos at Lake Nakuru and the open savannah of the Maasai Mara — all with expert guiding and full-board accommodation.',
  6, 5,
  ARRAY['Game drives in Amboseli with Kilimanjaro views','Flamingos at Lake Nakuru','Great Migration territory in the Maasai Mara','Optional Maasai village visit'],
  ARRAY['All accommodation (lodge & camp)','Full board meals throughout','All game drives with expert guide','Airport and inter-park transfers','Park entry fees','Bottled water on all transfers'],
  ARRAY['International flights','Travel insurance','Optional hot-air balloon safari','Personal spending and tips','Visa fees'],
  'Nairobi — JKIA or your Nairobi hotel',
  true, true, 1
),

-- ── Tour 002: Diani Beach Escape ────────────────────────────────────────────
(
  'd4000001-0000-4000-8000-000000000002',
  'b2000001-0000-4000-8000-000000000001',
  'a1000001-0000-4000-8000-000000000002',
  'Diani Beach Escape',
  'diani-beach-escape',
  'Four nights on Kenya''s most beautiful coastline — white sand, warm Indian Ocean water and total relaxation.',
  'Diani Beach is consistently rated among Africa''s finest beaches. This package puts you on the sand with reef snorkelling, a sunset dhow cruise and the freedom to do as much or as little as you like.',
  5, 4,
  ARRAY['Beachfront accommodation in Diani','Snorkelling on Diani reef','Sunset dhow cruise','Optional Shimba Hills day trip'],
  ARRAY['Beachfront hotel accommodation','Breakfast and dinner daily','Return road transfers Mombasa–Diani','Reef snorkelling excursion','Sunset dhow cruise'],
  ARRAY['Flights to Mombasa','Lunch','Personal spending','Travel insurance','Optional activities not listed'],
  'Mombasa — Moi International Airport or CBD',
  true, true, 2
),

-- ── Tour 003: Zanzibar Island Adventure ─────────────────────────────────────
(
  'd4000001-0000-4000-8000-000000000003',
  'b2000001-0000-4000-8000-000000000002',
  'a1000001-0000-4000-8000-000000000002',
  'Zanzibar Island Adventure',
  'zanzibar-island-adventure',
  'Six days on the Spice Island — Stone Town history, pristine beaches, and world-class snorkelling.',
  'Zanzibar is one of the Indian Ocean''s most distinctive destinations. UNESCO-listed Stone Town, spice farms, Mnemba Atoll snorkelling and white sand beaches combine in this six-day island adventure.',
  6, 5,
  ARRAY['UNESCO World Heritage Stone Town walking tour','Spice farm visit','Snorkelling at Mnemba Atoll','Sunset cruise on a traditional dhow'],
  ARRAY['All accommodation','Breakfast daily','Stone Town guided tour','Spice farm tour','Snorkelling excursion','Airport transfers'],
  ARRAY['Flights to Zanzibar','Lunch and dinner (except on included excursions)','Travel insurance','Personal spending','Visa fees'],
  'Zanzibar International Airport (ZNZ)',
  true, true, 3
),

-- ── Tour 004: Amboseli Family Safari ────────────────────────────────────────
(
  'd4000001-0000-4000-8000-000000000004',
  'b2000001-0000-4000-8000-000000000001',
  'a1000001-0000-4000-8000-000000000001',
  'Amboseli Family Safari',
  'amboseli-family-safari',
  'Three nights at the foot of Kilimanjaro — designed for families with young travellers in mind.',
  'Amboseli''s famous elephant herds, the iconic Kilimanjaro backdrop and a family-friendly lodge make this the ideal first safari for children and parents alike. Includes a dedicated children''s activity programme.',
  4, 3,
  ARRAY['Elephant herds with Kilimanjaro backdrop','Guided bush walks (adults)','Maasai cultural village visit','Family-friendly lodge with swimming pool'],
  ARRAY['Family lodge accommodation','Full board','All game drives','Nairobi return transfers','Park entry fees','Children''s safari activity programme'],
  ARRAY['Flights to Nairobi','Travel insurance','Personal spending','Optional balloon safari'],
  'Nairobi — JKIA or your hotel',
  true, false, 4
),

-- ── Tour 005: Lake Nakuru Flamingo Weekend ───────────────────────────────────
(
  'd4000001-0000-4000-8000-000000000005',
  'b2000001-0000-4000-8000-000000000001',
  'a1000001-0000-4000-8000-000000000001',
  'Lake Nakuru Flamingo Weekend',
  'lake-nakuru-flamingo-weekend',
  'A two-night weekend escape to see flamingos, rhinos and leopards at Lake Nakuru National Park.',
  'Lake Nakuru is one of Kenya''s most rewarding parks — flamingos carpet the lake shore, white rhinos graze in the grasslands and leopards rest in the fever trees. Perfect for a Nairobi weekend escape.',
  3, 2,
  ARRAY['Millions of flamingos on the lake shore','White and black rhino tracking','Leopards in the fig trees','Sunrise game drive'],
  ARRAY['Lodge accommodation','Full board','All game drives','Return transfers from Nairobi','Park fees'],
  ARRAY['Personal spending','Travel insurance','Tips'],
  'Nairobi — collect from your hotel',
  true, false, 5
),

-- ── Tour 006: Serengeti Migration Safari ────────────────────────────────────
(
  'd4000001-0000-4000-8000-000000000006',
  'b2000001-0000-4000-8000-000000000002',
  'a1000001-0000-4000-8000-000000000001',
  'Serengeti Migration Safari',
  'serengeti-wildebeest-migration',
  'Seven nights chasing the Great Migration across the Serengeti — one of nature''s greatest spectacles.',
  'The Great Migration is one of the most extraordinary events in the natural world. This eight-day journey takes you through Ngorongoro Crater and deep into the Serengeti, following the wildebeest herds with expert Tanzanian guides.',
  8, 7,
  ARRAY['Witness the Great Wildebeest Migration','Big Five game drives','Ngorongoro Crater visit','Mobile tented camps following the herds'],
  ARRAY['All tented camp and lodge accommodation','Full board','All game drives and park fees','Expert Tanzanian safari guide','Airstrip transfers within Tanzania'],
  ARRAY['International flights','Visa fees','Travel insurance','Personal spending and tips'],
  'Kilimanjaro International Airport (JRO) or Arusha',
  true, true, 6
)

on conflict (slug) do nothing;

-- =============================================================================
-- 5. TOUR IMAGES
-- =============================================================================

insert into public.tour_images (tour_id, storage_path, alt_text, is_cover, display_order) values
  ('d4000001-0000-4000-8000-000000000001', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85', 'Maasai Mara savannah at golden hour',        true,  1),
  ('d4000001-0000-4000-8000-000000000001', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85', 'Elephant herd in Amboseli with Kilimanjaro', false, 2),
  ('d4000001-0000-4000-8000-000000000001', 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1400&q=85', 'Flamingos at Lake Nakuru',                   false, 3),
  ('d4000001-0000-4000-8000-000000000002', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85', 'Diani Beach white sand and turquoise water', true,  1),
  ('d4000001-0000-4000-8000-000000000002', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85', 'Indian Ocean sunset from the beach',         false, 2),
  ('d4000001-0000-4000-8000-000000000003', 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1400&q=85', 'Stone Town Zanzibar harbour',                true,  1),
  ('d4000001-0000-4000-8000-000000000003', 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1400&q=85', 'Zanzibar beach and clear water',             false, 2),
  ('d4000001-0000-4000-8000-000000000004', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85', 'Elephants in Amboseli with Kilimanjaro',     true,  1),
  ('d4000001-0000-4000-8000-000000000004', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85', 'Amboseli open plains at dawn',              false, 2),
  ('d4000001-0000-4000-8000-000000000005', 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1400&q=85', 'Lake Nakuru flamingos at sunrise',           true,  1),
  ('d4000001-0000-4000-8000-000000000005', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85', 'Rift Valley landscape',                     false, 2),
  ('d4000001-0000-4000-8000-000000000006', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85', 'Wildebeest crossing the Serengeti',         true,  1),
  ('d4000001-0000-4000-8000-000000000006', 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85', 'Elephant in Ngorongoro Crater',              false, 2)
;

-- =============================================================================
-- 6. TOUR ITINERARIES
-- =============================================================================

insert into public.tour_itineraries (tour_id, day_number, title, description, overnight_location, display_order) values

-- Wild Kenya Safari (6 days)
('d4000001-0000-4000-8000-000000000001', 1, 'Nairobi Arrival · Transfer to Amboseli',
 'Your guide meets you at JKIA or your hotel for the scenic 4-hour drive to Amboseli National Park. Arrive at camp in time for an afternoon game drive around the famous Observation Hill, with views of Kilimanjaro at sunset.',
 'Amboseli', 1),
('d4000001-0000-4000-8000-000000000001', 2, 'Full Day in Amboseli',
 'Rise early for a dawn game drive among Amboseli''s famous elephant herds — some of the largest in Africa. Spend the morning photographing elephants against Kilimanjaro''s snowy peak. Afternoon at leisure or optional guided nature walk. Evening game drive at dusk.',
 'Amboseli', 2),
('d4000001-0000-4000-8000-000000000001', 3, 'Amboseli to Lake Nakuru',
 'After breakfast, drive north through the Great Rift Valley to Lake Nakuru National Park — a UNESCO Biosphere Reserve. Afternoon game drive to see the famous flamingos, white rhinos, leopards and an abundance of birdlife along the lake shore.',
 'Lake Nakuru', 3),
('d4000001-0000-4000-8000-000000000001', 4, 'Lake Nakuru to Maasai Mara',
 'Morning game drive to make the most of Lake Nakuru''s wildlife, then drive west to the Maasai Mara National Reserve — Kenya''s most celebrated game park. Arrive for a late-afternoon game drive across the open savannah.',
 'Maasai Mara', 4),
('d4000001-0000-4000-8000-000000000001', 5, 'Full Day in the Maasai Mara',
 'A full day in the Mara — morning and evening game drives with your guide, with a packed lunch at a scenic viewpoint. Encounter lions, cheetahs, elephants, hippos and, depending on the season, the Great Migration river crossings. Optional Maasai village visit in the afternoon.',
 'Maasai Mara', 5),
('d4000001-0000-4000-8000-000000000001', 6, 'Morning Drive · Return to Nairobi',
 'One last morning game drive before breakfast, then transfer back to Nairobi. Arrive late afternoon — you''ll be dropped at JKIA or your hotel, with a head full of memories.',
 'Nairobi (departure)', 6),

-- Diani Beach Escape (5 days)
('d4000001-0000-4000-8000-000000000002', 1, 'Arrival · Transfer to Diani',
 'Meet your driver at Mombasa airport or CBD for the 1-hour scenic transfer south along the coast to Diani Beach. Check in, change into your swimwear and spend the rest of the day settling into beach life. Evening dinner at the hotel.',
 'Diani Beach', 1),
('d4000001-0000-4000-8000-000000000002', 2, 'Reef Snorkelling Excursion',
 'Morning snorkelling trip to the Diani coral reef — one of Kenya''s best. Your guide introduces you to colourful fish, sea turtles and the reef ecosystem. Afternoon free on the beach. Sunset dhow cruise along the coastline.',
 'Diani Beach', 2),
('d4000001-0000-4000-8000-000000000002', 3, 'Free Day at Leisure',
 'Today is entirely yours. Relax on the beach, read a book, take a swim or arrange optional activities: kite surfing, stand-up paddleboarding, deep-sea fishing or a day trip to Shimba Hills National Reserve for elephant sightings.',
 'Diani Beach', 3),
('d4000001-0000-4000-8000-000000000002', 4, 'Coastal Culture & Relaxation',
 'Optional morning visit to the local market and the historic Kongo Mosque (15th century). Afternoon back at the beach. Final evening dinner with fresh seafood — a Diani speciality.',
 'Diani Beach', 4),
('d4000001-0000-4000-8000-000000000002', 5, 'Breakfast · Transfer to Mombasa',
 'Last morning on the beach before checkout. Transfer back to Mombasa airport or CBD for your onward journey.',
 'Departure', 5),

-- Zanzibar Island Adventure (6 days)
('d4000001-0000-4000-8000-000000000003', 1, 'Arrival · Stone Town',
 'Arrive at Zanzibar International Airport and transfer to your Stone Town hotel. Explore the labyrinthine alleys of this UNESCO World Heritage city at your own pace — visit the Old Fort, the House of Wonders and the famous spice market.',
 'Stone Town', 1),
('d4000001-0000-4000-8000-000000000003', 2, 'Stone Town Guided Tour · Spice Farm',
 'Morning guided walking tour of Stone Town with a local expert — discover the history, architecture and culture of this extraordinary Swahili trading city. Afternoon visit to a working spice farm to learn about Zanzibar''s famous cloves, nutmeg, cinnamon and more.',
 'Stone Town', 2),
('d4000001-0000-4000-8000-000000000003', 3, 'Transfer to Beach · Snorkelling at Mnemba Atoll',
 'Transfer to the north or east coast beach resort. Afternoon snorkelling excursion to Mnemba Atoll — one of the finest dive sites in the Indian Ocean, with sea turtles, dolphins and extraordinary coral.',
 'Beach resort', 3),
('d4000001-0000-4000-8000-000000000003', 4, 'Beach Day · Sunset Dhow Cruise',
 'A free day at the beach — swim, relax and enjoy the turquoise water. Optional watersports available (extra cost). Late afternoon sunset dhow cruise along the coast with drinks on board.',
 'Beach resort', 4),
('d4000001-0000-4000-8000-000000000003', 5, 'Free Day · Optional Dolphin Tour',
 'Another free day at leisure. Optional dolphin swimming tour at Kizimkazi (extra cost) — one of Zanzibar''s most memorable experiences. Evening at the beach.',
 'Beach resort', 5),
('d4000001-0000-4000-8000-000000000003', 6, 'Checkout · Departure',
 'Breakfast and checkout. Transfer to Zanzibar Airport for your onward flight. End of a remarkable journey.',
 'Departure', 6),

-- Amboseli Family Safari (4 days)
('d4000001-0000-4000-8000-000000000004', 1, 'Nairobi · Transfer to Amboseli',
 'Depart Nairobi after breakfast for the scenic 4-hour drive to Amboseli. The whole family will spot Kilimanjaro rising above the plains as you enter the park. Afternoon game drive to find the famous elephant herds. Children''s activity programme at the lodge after dinner.',
 'Amboseli', 1),
('d4000001-0000-4000-8000-000000000004', 2, 'Full Day in Amboseli',
 'Dawn game drive for the best elephant photography — the herds move through the marsh at first light with Kilimanjaro behind them. Afternoon guided walk for adults while younger ones enjoy the children''s programme. Evening drive at sunset.',
 'Amboseli', 2),
('d4000001-0000-4000-8000-000000000004', 3, 'Maasai Village Visit · Afternoon Drive',
 'Morning at leisure by the pool. After lunch, visit a local Maasai community — a highlight for children and adults alike. Learn about Maasai culture, see traditional dances and visit the homestead. Late afternoon game drive.',
 'Amboseli', 3),
('d4000001-0000-4000-8000-000000000004', 4, 'Morning Drive · Return to Nairobi',
 'Final early morning game drive before breakfast. Transfer back to Nairobi, arriving early afternoon. Drop-off at JKIA or your hotel.',
 'Nairobi (departure)', 4),

-- Lake Nakuru Flamingo Weekend (3 days)
('d4000001-0000-4000-8000-000000000005', 1, 'Nairobi · Arrive Lake Nakuru',
 'Depart Nairobi and drive 2.5 hours through the Rift Valley to Lake Nakuru. Arrive for lunch and check in. Afternoon game drive along the lake shore — keep your eyes open for flamingos, white rhino and the leopards that are often spotted in the fever tree forest.',
 'Lake Nakuru', 1),
('d4000001-0000-4000-8000-000000000005', 2, 'Full Day in Lake Nakuru',
 'Rise before dawn for a sunrise game drive — the best light for photography and the most active time for predators. Return for breakfast, then an afternoon drive focusing on the southern sector of the park where rhinos are frequently spotted. Evening sundowner overlooking the lake.',
 'Lake Nakuru', 2),
('d4000001-0000-4000-8000-000000000005', 3, 'Morning Drive · Return to Nairobi',
 'One final morning game drive before checkout. Drive back to Nairobi, arriving mid-afternoon.',
 'Nairobi (departure)', 3),

-- Serengeti Migration Safari (8 days)
('d4000001-0000-4000-8000-000000000006', 1, 'Arrive Arusha · Overnight',
 'Arrive at Kilimanjaro International Airport and transfer to your Arusha lodge for a pre-safari overnight. Briefing with your guide over dinner — learn about the Serengeti ecosystem and what to expect on your journey.',
 'Arusha', 1),
('d4000001-0000-4000-8000-000000000006', 2, 'Arusha to Ngorongoro Crater',
 'Drive west into the Ngorongoro Conservation Area. Descend into the crater — the world''s largest intact volcanic caldera — for an extraordinary full-day game drive. Encounter lion, leopard, buffalo, elephant, black rhino and flamingo in this concentrated wildlife arena.',
 'Ngorongoro rim', 2),
('d4000001-0000-4000-8000-000000000006', 3, 'Enter the Serengeti',
 'Drive into the Serengeti National Park through the Naabi Hill Gate. Depending on season, head north or south to find the migration herds. Afternoon game drive across the open plains with your expert guide.',
 'Serengeti — Central', 3),
('d4000001-0000-4000-8000-000000000006', 4, 'Full Day — Following the Herds',
 'A full day in the Serengeti — two game drives with a bush lunch. Your guide tracks the wildebeest and zebra, positioning for the dramatic river crossings if you are in the north during July–October. Big cat sightings are almost guaranteed.',
 'Serengeti — migration area', 4),
('d4000001-0000-4000-8000-000000000006', 5, 'Serengeti — Full Day',
 'Another full day following the migration. The vast scale of the Serengeti means every drive reveals something new. Dawn light over the plains is unforgettable. Evening campfire under the stars.',
 'Serengeti', 5),
('d4000001-0000-4000-8000-000000000006', 6, 'Western Corridor · Grumeti River',
 'Drive to the western Serengeti and the Grumeti River — famous for its enormous Nile crocodiles and dramatic crossings between June and July. Even outside the main crossing period, the river wildlife is spectacular.',
 'Serengeti — Western', 6),
('d4000001-0000-4000-8000-000000000006', 7, 'Final Full Day in the Serengeti',
 'Your last full day in the wild. Morning and evening game drives, with time to consolidate your best sightings. Sundowner champagne in the bush — a Bokiama tradition.',
 'Serengeti', 7),
('d4000001-0000-4000-8000-000000000006', 8, 'Fly Out · Return',
 'Early morning optional game drive before breakfast. Transfer to the airstrip for your charter flight back to Arusha or Nairobi. End of an unforgettable journey.',
 'Departure', 8)
;

-- =============================================================================
-- 7. PRICING OPTIONS
-- =============================================================================

insert into public.tour_pricing_options (
  tour_id, label, pricing_type, currency_code,
  adult_price, child_price, pricing_category_code,
  is_active, display_order
) values
-- Wild Kenya Safari
('d4000001-0000-4000-8000-000000000001', 'Kenyan Citizen',        'per_person', 'KES', 45000, 28000, 'kenyan_citizen',        true, 1),
('d4000001-0000-4000-8000-000000000001', 'Kenyan Resident',       'per_person', 'KES', 52000, 32000, 'kenyan_resident',       true, 2),
('d4000001-0000-4000-8000-000000000001', 'International Visitor', 'per_person', 'USD',   850,   520, 'international_visitor', true, 3),
-- Diani Beach Escape
('d4000001-0000-4000-8000-000000000002', 'Kenyan Citizen',        'per_person', 'KES', 28000, 17000, 'kenyan_citizen',        true, 1),
('d4000001-0000-4000-8000-000000000002', 'Kenyan Resident',       'per_person', 'KES', 32000, 19000, 'kenyan_resident',       true, 2),
('d4000001-0000-4000-8000-000000000002', 'International Visitor', 'per_person', 'USD',   480,   290, 'international_visitor', true, 3),
-- Zanzibar Island Adventure
('d4000001-0000-4000-8000-000000000003', 'From Kenya',            'per_person', 'KES', 68000, 42000, 'kenyan_citizen',        true, 1),
('d4000001-0000-4000-8000-000000000003', 'International Visitor', 'per_person', 'USD',   950,   580, 'international_visitor', true, 2),
-- Amboseli Family Safari
('d4000001-0000-4000-8000-000000000004', 'Kenyan Citizen',        'per_person', 'KES', 32000, 19000, 'kenyan_citizen',        true, 1),
('d4000001-0000-4000-8000-000000000004', 'Kenyan Resident',       'per_person', 'KES', 37000, 22000, 'kenyan_resident',       true, 2),
('d4000001-0000-4000-8000-000000000004', 'International Visitor', 'per_person', 'USD',   620,   370, 'international_visitor', true, 3),
-- Lake Nakuru Flamingo Weekend
('d4000001-0000-4000-8000-000000000005', 'Kenyan Citizen',        'per_person', 'KES', 18000, 11000, 'kenyan_citizen',        true, 1),
('d4000001-0000-4000-8000-000000000005', 'Kenyan Resident',       'per_person', 'KES', 21000, 13000, 'kenyan_resident',       true, 2),
('d4000001-0000-4000-8000-000000000005', 'International Visitor', 'per_person', 'USD',   380,   230, 'international_visitor', true, 3),
-- Serengeti Migration Safari
('d4000001-0000-4000-8000-000000000006', 'From Nairobi',          'per_person', 'KES',145000, 88000, 'kenyan_citizen',        true, 1),
('d4000001-0000-4000-8000-000000000006', 'International Visitor', 'per_person', 'USD',  2400,  1450, 'international_visitor', true, 2)
;

-- =============================================================================
-- 8. TOUR → COLLECTION ASSIGNMENTS
-- =============================================================================

insert into public.tour_collection_items (collection_id, tour_id, display_order) values
  -- Bokiama Wild
  ('c3000001-0000-4000-8000-000000000001', 'd4000001-0000-4000-8000-000000000001', 1),
  ('c3000001-0000-4000-8000-000000000001', 'd4000001-0000-4000-8000-000000000005', 2),
  ('c3000001-0000-4000-8000-000000000001', 'd4000001-0000-4000-8000-000000000006', 3),
  -- Bokiama Escape
  ('c3000001-0000-4000-8000-000000000002', 'd4000001-0000-4000-8000-000000000002', 1),
  ('c3000001-0000-4000-8000-000000000002', 'd4000001-0000-4000-8000-000000000003', 2),
  -- Bokiama Together
  ('c3000001-0000-4000-8000-000000000003', 'd4000001-0000-4000-8000-000000000004', 1),
  -- Bokiama Beyond
  ('c3000001-0000-4000-8000-000000000004', 'd4000001-0000-4000-8000-000000000003', 1),
  ('c3000001-0000-4000-8000-000000000004', 'd4000001-0000-4000-8000-000000000006', 2)
on conflict do nothing;

-- =============================================================================
-- 9. TOUR MARKET SEGMENTS
-- =============================================================================

insert into public.tour_market_segments (tour_id, market_segment_code) values
  ('d4000001-0000-4000-8000-000000000001', 'kenya_domestic'),
  ('d4000001-0000-4000-8000-000000000001', 'inbound_to_kenya'),
  ('d4000001-0000-4000-8000-000000000002', 'kenya_domestic'),
  ('d4000001-0000-4000-8000-000000000002', 'inbound_to_kenya'),
  ('d4000001-0000-4000-8000-000000000003', 'inbound_to_kenya'),
  ('d4000001-0000-4000-8000-000000000003', 'outbound_from_kenya'),
  ('d4000001-0000-4000-8000-000000000004', 'kenya_domestic'),
  ('d4000001-0000-4000-8000-000000000004', 'inbound_to_kenya'),
  ('d4000001-0000-4000-8000-000000000005', 'kenya_domestic'),
  ('d4000001-0000-4000-8000-000000000005', 'inbound_to_kenya'),
  ('d4000001-0000-4000-8000-000000000006', 'inbound_to_kenya'),
  ('d4000001-0000-4000-8000-000000000006', 'outbound_from_kenya')
on conflict do nothing;

-- =============================================================================
-- 10. PAYMENT METHOD SETTINGS
-- =============================================================================

insert into public.payment_method_settings (method, display_name, instructions, is_enabled) values
  (
    'mpesa',
    'M-Pesa',
    '{"paybill":"000000","account_name":"Bokiama Tours","note":"Use your booking reference as the account number when paying."}'::jsonb,
    true
  ),
  (
    'bank_transfer',
    'Bank Transfer',
    '{"bank":"Equity Bank Kenya","account_name":"Bokiama Tours & Travel","account_number":"0000000000000","branch":"Nairobi","swift":"EQBLKENA","note":"Include your booking reference in the payment description."}'::jsonb,
    true
  )
on conflict (method) do update set
  instructions = excluded.instructions,
  is_enabled   = excluded.is_enabled;

-- =============================================================================
-- 11. SITE SETTINGS
-- =============================================================================

insert into public.site_settings (setting_key, setting_value, is_public) values
  ('whatsapp_number',  '"254700000000"'::jsonb,           true),
  ('contact_email',    '"hello@bokiamatours.com"'::jsonb, true),
  ('company_name',     '"Bokiama Tours & Travel"'::jsonb, true),
  ('company_location', '"Nairobi, Kenya"'::jsonb,         true),
  ('booking_policy',
   '{"deposit_percent":30,"full_payment_days_before":30,"cancellation_free_days":30,"currency_primary":"KES","currency_international":"USD"}'::jsonb,
   false)
on conflict (setting_key) do update set
  setting_value = excluded.setting_value;

commit;

-- =============================================================================
-- VERIFICATION — run each in a separate new query to confirm success
-- =============================================================================
--
-- ① Destinations (expect 2 rows):
--   select name, slug, country_code, is_published from public.destinations;
--
-- ② Tours (expect 6 rows):
--   select title, slug, duration_days, is_featured from public.tours order by display_order;
--
-- ③ Pricing (expect 16 rows):
--   select t.title, p.label, p.currency_code, p.adult_price
--   from public.tour_pricing_options p
--   join public.tours t on t.id = p.tour_id
--   order by t.display_order, p.display_order;
--
-- ④ Itineraries (expect 34 total rows, grouped by tour):
--   select t.title, count(*) as days
--   from public.tour_itineraries i
--   join public.tours t on t.id = i.tour_id
--   group by t.title order by t.title;
--
-- ⑤ Collections (expect 8 assignment rows):
--   select c.name as collection, t.title as tour
--   from public.tour_collection_items ci
--   join public.tour_collections c on c.id = ci.collection_id
--   join public.tours t on t.id = ci.tour_id
--   order by c.display_order, ci.display_order;
-- =============================================================================
