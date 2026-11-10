// Static destination data — replace with Supabase queries once live.

import { TOURS } from "../tours/data";
import type { IconName } from "../components/LineIcon";

export interface Highlight {
  icon: IconName;
  title: string;
  description: string;
}

export interface Season {
  name: string;
  months: string;
  description: string;
  rating: "excellent" | "good" | "fair";
}

export interface PracticalInfo {
  icon: IconName;
  label: string;
  value: string;
}

export interface Destination {
  slug: "kenya" | "tanzania";
  country: "KE" | "TZ";
  name: string;
  tagline: string;
  heroImage: string;
  intro: string;
  overview: string;
  highlights: Highlight[];
  seasons: Season[];
  practical: PracticalInfo[];
  regions: Region[];
}

export interface Region {
  name: string;
  description: string;
  image: string;
  tourSlugs: string[];
}

export const DESTINATIONS: Record<string, Destination> = {
  kenya: {
    slug: "kenya",
    country: "KE",
    name: "Kenya",
    tagline: "Where the wild things are — and so much more.",
    heroImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2200&q=90",
    intro:
      "Kenya is where Africa comes alive. From the sweeping plains of the Maasai Mara to the coral reefs of Diani Beach, it is a country of extraordinary contrasts — and Bokiama knows it better than anyone.",
    overview:
      "Covering 580,000 square kilometres from the Indian Ocean coastline to the high peaks of Mount Kenya, this is a country of extraordinary diversity. Savannah, forest, desert, coast and mountain — Kenya holds them all. It is home to the greatest wildlife spectacle on earth, some of Africa's most welcoming people and a growing culture of responsible tourism that Bokiama is proud to support.",
    highlights: [
      {
        icon: "paw",
        title: "Wildlife & Safaris",
        description:
          "The Big Five, the Great Migration and year-round game viewing across national parks and conservancies.",
      },
      {
        icon: "beach",
        title: "Coastal Beauty",
        description:
          "Over 500km of Indian Ocean coastline — white sand, warm water, coral reefs and laid-back beach towns.",
      },
      {
        icon: "mountain",
        title: "Mountain Adventures",
        description:
          "Mount Kenya, the Aberdares and the Rift Valley for trekking, hiking and dramatic landscapes.",
      },
      {
        icon: "culture",
        title: "Culture & People",
        description:
          "Over 40 distinct communities, vibrant markets, traditional ceremonies and remarkable local hospitality.",
      },
      {
        icon: "leaf",
        title: "Conservation",
        description:
          "World-leading wildlife conservation, community conservancies and responsible tourism initiatives.",
      },
      {
        icon: "utensils",
        title: "Food & Flavour",
        description:
          "Coastal Swahili cuisine, nyama choma traditions, fresh seafood and East African flavours.",
      },
    ],
    seasons: [
      {
        name: "Long Dry Season",
        months: "July – October",
        description:
          "The best time for wildlife. The Great Migration river crossings happen in the Mara. Dry, warm and clear — ideal for game drives.",
        rating: "excellent",
      },
      {
        name: "Short Dry Season",
        months: "January – March",
        description:
          "Another excellent game-viewing period with less rainfall. Good for the coast and mountain climbing.",
        rating: "excellent",
      },
      {
        name: "Long Rains",
        months: "April – June",
        description:
          "Heavy afternoon rains, lush landscapes and fewer tourists. Some parks accessible, rates often lower.",
        rating: "fair",
      },
      {
        name: "Short Rains",
        months: "November – December",
        description:
          "Light, short rains that usually fall in the afternoon. Wildlife disperses but birding is exceptional.",
        rating: "good",
      },
    ],
    practical: [
      { icon: "coin", label: "Currency", value: "Kenyan Shilling (KES)" },
      { icon: "sun", label: "Climate", value: "Tropical; varies by altitude" },
      { icon: "plane", label: "Main Gateway", value: "Nairobi (JKIA)" },
      { icon: "language", label: "Languages", value: "Swahili & English" },
      { icon: "badge", label: "Visa", value: "Check current eTA eligibility" },
      { icon: "clock", label: "Time Zone", value: "EAT (UTC+3)" },
      { icon: "plug", label: "Power", value: "240V, Type G plugs" },
      { icon: "medical", label: "Vaccinations", value: "Check requirements for your route" },
    ],
    regions: [
      {
        name: "Maasai Mara",
        description:
          "Kenya's most famous reserve — home to lions, elephants, cheetahs and the greatest wildlife show on earth. The annual Great Migration brings over 1.5 million wildebeest through this landscape every year.",
        image:
          "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=85",
        tourSlugs: ["wild-kenya-safari", "lake-nakuru-flamingo-weekend"],
      },
      {
        name: "Amboseli",
        description:
          "Framed by the iconic silhouette of Kilimanjaro, Amboseli is famous for its large elephant herds and sweeping open plains. One of Kenya's most photographed landscapes.",
        image:
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=900&q=85",
        tourSlugs: ["amboseli-family-safari", "wild-kenya-safari"],
      },
      {
        name: "The Coast",
        description:
          "From Mombasa to Diani and north to Malindi, Kenya's coastline offers world-class beaches, Swahili culture, coral reefs and fresh seafood. The perfect complement to a safari.",
        image:
          "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85",
        tourSlugs: ["diani-beach-escape"],
      },
      {
        name: "Lake Nakuru & Rift Valley",
        description:
          "The Great Rift Valley is one of Africa's most dramatic landscapes. Lake Nakuru is famous for flamingos, white rhinos and leopards. Nearby Naivasha and Bogoria offer more wildlife and scenery.",
        image:
          "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=85",
        tourSlugs: ["lake-nakuru-flamingo-weekend", "wild-kenya-safari"],
      },
    ],
  },

  tanzania: {
    slug: "tanzania",
    country: "TZ",
    name: "Tanzania",
    tagline: "Serengeti to Zanzibar — Africa at its most extraordinary.",
    heroImage:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2200&q=90",
    intro:
      "Tanzania is home to Kilimanjaro, the Serengeti, the Ngorongoro Crater and the spice-scented shores of Zanzibar. A country of superlatives — and every journey here feels earned.",
    overview:
      "From the world's largest intact volcanic caldera to the planet's highest freestanding mountain, Tanzania deals in extraordinary things. The Serengeti alone covers 30,000 square kilometres of open savannah. Add Zanzibar's historic Stone Town and coral beaches, Selous's remote wilderness, and the warm hospitality of the Tanzanian people, and you have one of Africa's most rewarding travel destinations.",
    highlights: [
      {
        icon: "paw",
        title: "The Great Migration",
        description:
          "Over 1.5 million wildebeest and 300,000 zebra move continuously through the Serengeti ecosystem — one of nature's greatest events.",
      },
      {
        icon: "volcano",
        title: "Ngorongoro Crater",
        description:
          "The world's largest intact volcanic caldera — a 600-metre-deep bowl sheltering the highest density of wildlife in Africa.",
      },
      {
        icon: "mountain",
        title: "Mount Kilimanjaro",
        description:
          "Africa's highest peak at 5,895m. The classic Uhuru Peak summit is on many travellers' bucket lists.",
      },
      {
        icon: "island",
        title: "Zanzibar",
        description:
          "The Spice Island — pristine beaches, turquoise water, ancient Stone Town and warm Indian Ocean culture.",
      },
      {
        icon: "paw",
        title: "Remote Wilderness",
        description:
          "Selous, Ruaha and Katavi offer vast, uncrowded wilderness for travellers seeking something beyond the well-trodden circuit.",
      },
      {
        icon: "snorkel",
        title: "Marine Life",
        description:
          "Mnemba Atoll, Mafia Island and Pemba offer world-class diving and snorkelling on pristine reefs.",
      },
    ],
    seasons: [
      {
        name: "Long Dry Season",
        months: "June – October",
        description:
          "The best game viewing across all parks. River crossings in the northern Serengeti. Ideal for the Crater and Kilimanjaro climbing.",
        rating: "excellent",
      },
      {
        name: "Short Dry Season",
        months: "January – February",
        description:
          "Excellent conditions, calving season in the southern Serengeti. Zanzibar at its best.",
        rating: "excellent",
      },
      {
        name: "Short Rains",
        months: "November – December",
        description:
          "Green season begins. Some afternoon rain, fewer crowds, good birding. Wildlife remains easily visible.",
        rating: "good",
      },
      {
        name: "Long Rains",
        months: "March – May",
        description:
          "Heavier rains, some roads difficult. Dramatic landscapes, very low visitor numbers, reduced rates at many camps.",
        rating: "fair",
      },
    ],
    practical: [
      { icon: "coin", label: "Currency", value: "Tanzanian Shilling (TZS)" },
      { icon: "sun", label: "Climate", value: "Tropical; dry season ideal" },
      { icon: "plane", label: "Main Gateways", value: "Dar es Salaam, Kilimanjaro, Zanzibar" },
      { icon: "language", label: "Languages", value: "Swahili & English" },
      { icon: "badge", label: "Visa", value: "Check current visa eligibility" },
      { icon: "clock", label: "Time Zone", value: "EAT (UTC+3)" },
      { icon: "plug", label: "Power", value: "230V, Type D/G plugs" },
      { icon: "medical", label: "Vaccinations", value: "Check requirements for your route" },
    ],
    regions: [
      {
        name: "Serengeti",
        description:
          "One of the world's last great wildlife wildernesses — 30,000 square kilometres of open savannah where the Great Migration plays out year-round. Big cats, elephant, buffalo and more roam freely across the endless plains.",
        image:
          "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85",
        tourSlugs: ["serengeti-wildebeest-migration"],
      },
      {
        name: "Zanzibar",
        description:
          "The Spice Island sits 35km off the coast of Tanzania. Stone Town's labyrinthine alleys, spice farms, dhow harbours and the white beaches of the north and east make Zanzibar one of East Africa's most distinctive experiences.",
        image:
          "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=900&q=85",
        tourSlugs: ["zanzibar-island-adventure"],
      },
      {
        name: "Ngorongoro",
        description:
          "The Crater is a UNESCO World Heritage Site and one of Africa's most extraordinary wildlife arenas. On a single game drive you can encounter lion, leopard, elephant, black rhino, hippo and flamingo within a few hours.",
        image:
          "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=900&q=85",
        tourSlugs: ["serengeti-wildebeest-migration"],
      },
      {
        name: "Kilimanjaro",
        description:
          "Africa's highest peak stands at 5,895 metres above sea level. Several established routes offer climbers different experiences — from the popular Marangu route to the scenic Lemosho traverse.",
        image:
          "https://images.unsplash.com/photo-1621414050946-1e7f0e7b9a9a?auto=format&fit=crop&w=900&q=85",
        tourSlugs: [],
      },
    ],
  },
};

// Return only tours that belong to this destination
export function getToursForDestination(countryCode: "KE" | "TZ") {
  return TOURS.filter((t) => t.country === countryCode);
}
