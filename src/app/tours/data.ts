// Static tour data — replace with Supabase queries once packages are loaded.

export type PricingCategory =
  | "kenyan_citizen"
  | "kenyan_resident"
  | "international_visitor";

export interface TourPrice {
  category: PricingCategory;
  label: string;
  adult: number;
  child: number | null;
  currency: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  overnight: string;
  meals: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  summary: string;
  destination: string;
  destinationSlug: string;
  country: "KE" | "TZ";
  category: string;
  collection: string | null;
  durationDays: number;
  durationNights: number;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  image: string;
  images: string[];
  isFeatured: boolean;
  pricing: TourPrice[];
  itinerary: ItineraryDay[];
  meetingPoint: string;
  groupSize: string;
  accommodation: string;
}

export const TOURS: Tour[] = [
  {
    id: "tour-001",
    slug: "wild-kenya-safari",
    title: "Wild Kenya Safari",
    summary:
      "Five nights through Amboseli, Lake Nakuru and the Maasai Mara — Kenya's most iconic wildlife circuit.",
    destination: "Maasai Mara · Amboseli · Lake Nakuru",
    destinationSlug: "kenya",
    country: "KE",
    category: "Wildlife & Safari",
    collection: "Bokiama Wild",
    durationDays: 6,
    durationNights: 5,
    meetingPoint: "Nairobi — JKIA or your Nairobi hotel",
    groupSize: "Min 2 · Max 8 per vehicle",
    accommodation: "Sopa Lodge in Amboseli and Lake Nakuru; Mara Trails Camp in the Maasai Mara",
    highlights: [
      "Game drives in Amboseli with Kilimanjaro views",
      "Flamingos at Lake Nakuru",
      "Great Migration territory in the Maasai Mara",
      "Optional Maasai village visit",
    ],
    inclusions: [
      "Accommodation at Sopa Lodge (Amboseli and Lake Nakuru) and Mara Trails Camp",
      "Private road transfers between Nairobi, Amboseli, Lake Nakuru and the Maasai Mara",
      "Full-board meals and non-alcoholic beverages as listed in the itinerary",
      "Private game drives with an English-speaking Maasai guide",
      "Guided bush walk on camp nature trails",
      "Park and community fees",
      "Wi-Fi at camp",
    ],
    exclusions: [
      "International flights",
      "Kenya eTA or visa fees",
      "Travel and medical insurance",
      "Pre- and post-safari accommodation in Nairobi unless requested",
      "Alcoholic beverages",
      "Optional activities",
      "Personal expenses, including souvenirs and laundry",
      "Domestic-flight excess baggage (the supplied itinerary estimates USD 6–8 per kg)",
      "Bank or card transaction charges",
      "Gratuities (optional; the supplied itinerary suggests USD 15–20 per guest per day for the guide and camp staff)",
    ],
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1400&q=85",
    ],
    isFeatured: true,
    pricing: [
      { category: "kenyan_citizen", label: "Kenyan Citizen", adult: 45000, child: 28000, currency: "KES" },
      { category: "kenyan_resident", label: "Kenyan Resident", adult: 52000, child: 32000, currency: "KES" },
      { category: "international_visitor", label: "International Visitor", adult: 850, child: 520, currency: "USD" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi Arrival · Transfer to Amboseli",
        description:
          "Your guide meets you at JKIA or your hotel for the scenic 4-hour drive to Amboseli National Park. Arrive at camp in time for an afternoon game drive around the famous Observation Hill, with views of Kilimanjaro at sunset.",
        overnight: "Amboseli",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Full Day in Amboseli",
        description:
          "Rise early for a dawn game drive among Amboseli's famous elephant herds — some of the largest in Africa. Spend the morning photographing elephants against Kilimanjaro's snowy peak. Afternoon at leisure or optional guided nature walk. Evening game drive at dusk.",
        overnight: "Amboseli",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 3,
        title: "Amboseli to Lake Nakuru",
        description:
          "After breakfast, drive north through the Great Rift Valley to Lake Nakuru National Park — a UNESCO Biosphere Reserve. Afternoon game drive to see the famous flamingos, white rhinos, leopards and an abundance of birdlife along the lake shore.",
        overnight: "Lake Nakuru",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 4,
        title: "Lake Nakuru to Maasai Mara",
        description:
          "Morning game drive to make the most of Lake Nakuru's wildlife, then drive west to the Maasai Mara National Reserve — Kenya's most celebrated game park. Arrive for a late-afternoon game drive across the open savannah.",
        overnight: "Maasai Mara",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 5,
        title: "Full Day in the Maasai Mara",
        description:
          "A full day in the Mara — morning and evening game drives with your guide, with a packed lunch at a scenic viewpoint. Encounter lions, cheetahs, elephants, hippos and, depending on the season, the Great Migration river crossings. Optional Maasai village visit in the afternoon.",
        overnight: "Maasai Mara",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 6,
        title: "Morning Drive · Return to Nairobi",
        description:
          "One last morning game drive before breakfast, then transfer back to Nairobi. Arrive late afternoon — you'll be dropped at JKIA or your hotel, with a head full of memories.",
        overnight: "— (departure day)",
        meals: "Breakfast",
      },
    ],
  },
  {
    id: "tour-002",
    slug: "diani-beach-escape",
    title: "Diani Beach Escape",
    summary:
      "Four nights on Kenya's most beautiful coastline — white sand, warm Indian Ocean water and total relaxation.",
    destination: "Diani Beach, Coast",
    destinationSlug: "kenya",
    country: "KE",
    category: "Coastal Escapes",
    collection: "Bokiama Escape",
    durationDays: 5,
    durationNights: 4,
    meetingPoint: "Mombasa — Moi International Airport or CBD",
    groupSize: "Min 2 · Max 12",
    accommodation: "Beachfront hotel",
    highlights: [
      "Beachfront accommodation in Diani",
      "Snorkelling on Diani reef",
      "Sunset dhow cruise",
      "Optional Shimba Hills day trip",
    ],
    inclusions: [
      "Beachfront hotel accommodation",
      "Breakfast and dinner daily",
      "Return road transfers Mombasa–Diani",
      "Reef snorkelling excursion",
      "Sunset dhow cruise",
    ],
    exclusions: [
      "Flights to Mombasa",
      "Lunch",
      "Personal spending",
      "Travel insurance",
      "Optional activities not listed",
    ],
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
    ],
    isFeatured: true,
    pricing: [
      { category: "kenyan_citizen", label: "Kenyan Citizen", adult: 28000, child: 17000, currency: "KES" },
      { category: "kenyan_resident", label: "Kenyan Resident", adult: 32000, child: 19000, currency: "KES" },
      { category: "international_visitor", label: "International Visitor", adult: 480, child: 290, currency: "USD" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival · Transfer to Diani",
        description:
          "Meet your driver at Mombasa airport or CBD for the 1-hour scenic transfer south along the coast to Diani Beach. Check in, change into your swimwear and spend the rest of the day settling into beach life. Evening dinner at the hotel.",
        overnight: "Diani Beach",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Reef Snorkelling Excursion",
        description:
          "Morning snorkelling trip to the Diani coral reef — one of Kenya's best. Your guide introduces you to colourful fish, sea turtles and the reef ecosystem. Afternoon free on the beach. Sunset dhow cruise along the coastline.",
        overnight: "Diani Beach",
        meals: "Breakfast · Dinner",
      },
      {
        day: 3,
        title: "Free Day at Leisure",
        description:
          "Today is entirely yours. Relax on the beach, read a book, take a swim or arrange optional activities: kite surfing, stand-up paddleboarding, deep-sea fishing or a day trip to Shimba Hills National Reserve for elephant sightings.",
        overnight: "Diani Beach",
        meals: "Breakfast · Dinner",
      },
      {
        day: 4,
        title: "Coastal Culture & Relaxation",
        description:
          "Optional morning visit to the local market and the historic Kongo Mosque (15th century). Afternoon back at the beach. Final evening dinner with fresh seafood — a Diani speciality.",
        overnight: "Diani Beach",
        meals: "Breakfast · Dinner",
      },
      {
        day: 5,
        title: "Breakfast · Transfer to Mombasa",
        description:
          "Last morning on the beach before checkout. Transfer back to Mombasa airport or CBD for your onward journey.",
        overnight: "— (departure day)",
        meals: "Breakfast",
      },
    ],
  },
  {
    id: "tour-003",
    slug: "zanzibar-island-adventure",
    title: "Zanzibar Island Adventure",
    summary:
      "Six days on the Spice Island — Stone Town history, pristine beaches, and world-class snorkelling.",
    destination: "Zanzibar, Tanzania",
    destinationSlug: "tanzania",
    country: "TZ",
    category: "Coastal Escapes",
    collection: "Bokiama Beyond",
    durationDays: 6,
    durationNights: 5,
    meetingPoint: "Zanzibar International Airport (ZNZ)",
    groupSize: "Min 2 · Max 14",
    accommodation: "Boutique hotel and beach resort",
    highlights: [
      "UNESCO World Heritage Stone Town walking tour",
      "Spice farm visit",
      "Snorkelling at Mnemba Atoll",
      "Sunset cruise on a traditional dhow",
    ],
    inclusions: [
      "All accommodation",
      "Breakfast daily",
      "Stone Town guided tour",
      "Spice farm tour",
      "Snorkelling excursion",
      "Airport transfers",
    ],
    exclusions: [
      "Flights to Zanzibar",
      "Lunch and dinner (except on included excursions)",
      "Travel insurance",
      "Personal spending",
      "Visa fees",
    ],
    image:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1400&q=85",
    ],
    isFeatured: true,
    pricing: [
      { category: "kenyan_citizen", label: "From Kenya", adult: 68000, child: 42000, currency: "KES" },
      { category: "international_visitor", label: "International Visitor", adult: 950, child: 580, currency: "USD" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival · Stone Town",
        description:
          "Arrive at Zanzibar International Airport and transfer to your Stone Town hotel. Explore the labyrinthine alleys of this UNESCO World Heritage city at your own pace — visit the Old Fort, the House of Wonders and the famous spice market. Evening welcome dinner.",
        overnight: "Stone Town",
        meals: "Breakfast",
      },
      {
        day: 2,
        title: "Stone Town Guided Tour · Spice Farm",
        description:
          "Morning guided walking tour of Stone Town with a local expert — discover the history, architecture and culture of this extraordinary Swahili trading city. Afternoon visit to a working spice farm to learn about Zanzibar's famous cloves, nutmeg, cinnamon and more.",
        overnight: "Stone Town",
        meals: "Breakfast",
      },
      {
        day: 3,
        title: "Transfer to Beach · Snorkelling at Mnemba Atoll",
        description:
          "Transfer to the north or east coast beach resort. Afternoon snorkelling excursion to Mnemba Atoll — one of the finest dive sites in the Indian Ocean, with sea turtles, dolphins and extraordinary coral.",
        overnight: "Beach resort",
        meals: "Breakfast",
      },
      {
        day: 4,
        title: "Beach Day · Sunset Dhow Cruise",
        description:
          "A free day at the beach — swim, relax and enjoy the turquoise water. Optional watersports available (extra cost). Late afternoon sunset dhow cruise along the coast with drinks on board.",
        overnight: "Beach resort",
        meals: "Breakfast",
      },
      {
        day: 5,
        title: "Free Day · Optional Dolphin Tour",
        description:
          "Another free day at leisure. Optional dolphin swimming tour at Kizimkazi (extra cost) — one of Zanzibar's most memorable experiences. Evening at the beach.",
        overnight: "Beach resort",
        meals: "Breakfast",
      },
      {
        day: 6,
        title: "Checkout · Departure",
        description:
          "Breakfast and checkout. Transfer to Zanzibar Airport for your onward flight. End of a remarkable journey.",
        overnight: "— (departure day)",
        meals: "Breakfast",
      },
    ],
  },
  {
    id: "tour-004",
    slug: "amboseli-family-safari",
    title: "Amboseli Family Safari",
    summary:
      "Three nights at the foot of Kilimanjaro — designed for families with young travellers in mind.",
    destination: "Amboseli National Park",
    destinationSlug: "kenya",
    country: "KE",
    category: "Wildlife & Safari",
    collection: "Bokiama Together",
    durationDays: 4,
    durationNights: 3,
    meetingPoint: "Nairobi — JKIA or your hotel",
    groupSize: "Families welcome · Max 8",
    accommodation: "Family-friendly lodge with pool",
    highlights: [
      "Elephant herds with Kilimanjaro backdrop",
      "Guided bush walks (adults)",
      "Maasai cultural village visit",
      "Family-friendly lodge with swimming pool",
    ],
    inclusions: [
      "Family lodge accommodation",
      "Full board",
      "All game drives",
      "Nairobi return transfers",
      "Park entry fees",
      "Children's safari activity programme",
    ],
    exclusions: [
      "Flights to Nairobi",
      "Travel insurance",
      "Personal spending",
      "Optional balloon safari",
    ],
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85",
    ],
    isFeatured: false,
    pricing: [
      { category: "kenyan_citizen", label: "Kenyan Citizen", adult: 32000, child: 19000, currency: "KES" },
      { category: "kenyan_resident", label: "Kenyan Resident", adult: 37000, child: 22000, currency: "KES" },
      { category: "international_visitor", label: "International Visitor", adult: 620, child: 370, currency: "USD" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi · Transfer to Amboseli",
        description:
          "Depart Nairobi after breakfast for the scenic 4-hour drive to Amboseli. The whole family will spot Kilimanjaro rising above the plains as you enter the park. Afternoon game drive to find the famous elephant herds. Children's activity programme at the lodge after dinner.",
        overnight: "Amboseli",
        meals: "Lunch · Dinner",
      },
      {
        day: 2,
        title: "Full Day in Amboseli",
        description:
          "Dawn game drive for the best elephant photography — the herds move through the marsh at first light with Kilimanjaro behind them. Afternoon guided walk for adults while younger ones enjoy the children's programme. Evening drive at sunset.",
        overnight: "Amboseli",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 3,
        title: "Maasai Village Visit · Afternoon Drive",
        description:
          "Morning at leisure by the pool. After lunch, visit a local Maasai community — a highlight for children and adults alike. Learn about Maasai culture, see traditional dances and visit the homestead. Late afternoon game drive.",
        overnight: "Amboseli",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 4,
        title: "Morning Drive · Return to Nairobi",
        description:
          "Final early morning game drive before breakfast. Transfer back to Nairobi, arriving early afternoon. Drop-off at JKIA or your hotel.",
        overnight: "— (departure day)",
        meals: "Breakfast",
      },
    ],
  },
  {
    id: "tour-005",
    slug: "lake-nakuru-flamingo-weekend",
    title: "Lake Nakuru Flamingo Weekend",
    summary:
      "A two-night weekend escape to see flamingos, rhinos and leopards at Lake Nakuru National Park.",
    destination: "Lake Nakuru National Park",
    destinationSlug: "kenya",
    country: "KE",
    category: "Wildlife & Safari",
    collection: "Bokiama Wild",
    durationDays: 3,
    durationNights: 2,
    meetingPoint: "Nairobi — collect from your hotel",
    groupSize: "Min 2 · Max 8",
    accommodation: "Lake-view lodge",
    highlights: [
      "Millions of flamingos on the lake shore",
      "White and black rhino tracking",
      "Leopards in the fig trees",
      "Sunrise game drive",
    ],
    inclusions: [
      "Lodge accommodation",
      "Full board",
      "All game drives",
      "Return transfers from Nairobi",
      "Park fees",
    ],
    exclusions: [
      "Personal spending",
      "Travel insurance",
      "Tips",
    ],
    image:
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85",
    ],
    isFeatured: false,
    pricing: [
      { category: "kenyan_citizen", label: "Kenyan Citizen", adult: 18000, child: 11000, currency: "KES" },
      { category: "kenyan_resident", label: "Kenyan Resident", adult: 21000, child: 13000, currency: "KES" },
      { category: "international_visitor", label: "International Visitor", adult: 380, child: 230, currency: "USD" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi · Arrive Lake Nakuru",
        description:
          "Depart Nairobi and drive 2.5 hours through the Rift Valley to Lake Nakuru. Arrive for lunch and check in. Afternoon game drive along the lake shore — keep your eyes open for flamingos, white rhino and the leopards that are often spotted in the fever tree forest.",
        overnight: "Lake Nakuru",
        meals: "Lunch · Dinner",
      },
      {
        day: 2,
        title: "Full Day in Lake Nakuru",
        description:
          "Rise before dawn for a sunrise game drive — the best light for photography and the most active time for predators. Return for breakfast, then an afternoon drive focusing on the southern sector of the park where rhinos are frequently spotted. Evening sundowner overlooking the lake.",
        overnight: "Lake Nakuru",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 3,
        title: "Morning Drive · Return to Nairobi",
        description:
          "One final morning game drive before checkout. Drive back to Nairobi, arriving mid-afternoon.",
        overnight: "— (departure day)",
        meals: "Breakfast",
      },
    ],
  },
  {
    id: "tour-006",
    slug: "serengeti-wildebeest-migration",
    title: "Serengeti Migration Safari",
    summary:
      "Seven nights chasing the Great Migration across the Serengeti — one of nature's greatest spectacles.",
    destination: "Serengeti, Tanzania",
    destinationSlug: "tanzania",
    country: "TZ",
    category: "Wildlife & Safari",
    collection: "Bokiama Wild",
    durationDays: 8,
    durationNights: 7,
    meetingPoint: "Kilimanjaro International Airport (JRO) or Arusha",
    groupSize: "Min 2 · Max 8 per vehicle",
    accommodation: "Tented camps and lodges — following the migration",
    highlights: [
      "Witness the Great Wildebeest Migration",
      "Big Five game drives",
      "Ngorongoro Crater visit",
      "Mobile tented camps following the herds",
    ],
    inclusions: [
      "All tented camp and lodge accommodation",
      "Full board",
      "All game drives and park fees",
      "Expert Tanzanian safari guide",
      "Airstrip transfers within Tanzania",
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal spending and tips",
    ],
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85",
    images: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85",
    ],
    isFeatured: true,
    pricing: [
      { category: "kenyan_citizen", label: "From Nairobi", adult: 145000, child: 88000, currency: "KES" },
      { category: "international_visitor", label: "International Visitor", adult: 2400, child: 1450, currency: "USD" },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Arusha · Overnight",
        description:
          "Arrive at Kilimanjaro International Airport and transfer to your Arusha lodge for a pre-safari overnight. Briefing with your guide over dinner — learn about the Serengeti ecosystem and what to expect on your journey.",
        overnight: "Arusha",
        meals: "Dinner",
      },
      {
        day: 2,
        title: "Arusha to Ngorongoro Crater",
        description:
          "Drive west into the Ngorongoro Conservation Area. Descend into the crater — the world's largest intact volcanic caldera — for an extraordinary full-day game drive. Encounter lion, leopard, buffalo, elephant, black rhino and flamingo in this concentrated wildlife arena.",
        overnight: "Ngorongoro rim",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 3,
        title: "Enter the Serengeti",
        description:
          "Drive into the Serengeti National Park through the Naabi Hill Gate. Depending on season, head north or south to find the migration herds. Afternoon game drive across the open plains with your expert guide.",
        overnight: "Serengeti (Central)",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 4,
        title: "Full Day — Following the Herds",
        description:
          "A full day in the Serengeti — two game drives with a bush lunch. Your guide tracks the wildebeest and zebra, positioning for the dramatic river crossings if you are in the north during July–October. Big cat sightings are almost guaranteed.",
        overnight: "Serengeti (migration area)",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 5,
        title: "Serengeti — Full Day",
        description:
          "Another full day following the migration. The vast scale of the Serengeti means every drive reveals something new. Dawn light over the plains is unforgettable. Evening campfire under the stars.",
        overnight: "Serengeti",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 6,
        title: "Western Corridor · Grumeti River",
        description:
          "Drive to the western Serengeti and the Grumeti River — famous for its enormous Nile crocodiles and dramatic crossings between June and July. Even outside the main crossing period, the river wildlife is spectacular.",
        overnight: "Serengeti (Western)",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 7,
        title: "Final Full Day in the Serengeti",
        description:
          "Your last full day in the wild. Morning and evening game drives, with time to consolidate your best sightings. Sundowner champagne in the bush — a Bokiama tradition.",
        overnight: "Serengeti",
        meals: "Breakfast · Lunch · Dinner",
      },
      {
        day: 8,
        title: "Fly Out · Return",
        description:
          "Early morning optional game drive before breakfast. Transfer to the airstrip for your charter flight back to Arusha or Nairobi. End of an unforgettable journey.",
        overnight: "— (departure day)",
        meals: "Breakfast",
      },
    ],
  },
];

export const CATEGORIES = [...new Set(TOURS.map((t) => t.category))];
export const COLLECTIONS = [
  ...new Set(TOURS.filter((t) => t.collection).map((t) => t.collection as string)),
];
export const DESTINATIONS = [
  { label: "All Destinations", value: "all" },
  { label: "Kenya", value: "KE" },
  { label: "Tanzania", value: "TZ" },
];
