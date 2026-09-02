/**
 * AEROVOYAGE Dynamic Destinations Service Layer (Supabase Integration)
 * - Tables: `destinations` & `destination_details`
 * - Full relational resolution: landmarks, itinerary_days, daily_rate, ratings
 * - Zero-config offline fallback with Hyderabad & global cities
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface LandmarkItem {
  name: string;
  category: string;
  image: string;
  description: string;
  rating: number;
  tag: string;
}

export interface ItineraryDayItem {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export interface FullDestinationPayload {
  city_slug: string;
  city_name: string;
  country: string;
  country_code: string;
  continent: string;
  flag: string;
  latitude: number;
  longitude: number;
  daily_rate: number;
  rating: number;
  hero_image_url: string;
  tagline: string;
  vibe: string;
  description: string;
  climate: string;
  best_time_to_visit: string;
  landmarks: LandmarkItem[];
  itinerary_days: ItineraryDayItem[];
  image_urls: string[];
  is_live_db: boolean;
}

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

let supabaseClient: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes('placeholder') &&
    !SUPABASE_ANON_KEY.includes('placeholder')
  ) {
    if (!supabaseClient) {
      supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
  }
  return null;
}

// In-Memory SWR Cache with 5-minute TTL
const destinationCache = new Map<string, { data: FullDestinationPayload; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000;

// Pre-seeded local repository (Fallback if Supabase is offline)
const PRESEEDED_DESTINATIONS: Record<string, FullDestinationPayload> = {
  'hyderabad-in': {
    city_slug: 'hyderabad-in',
    city_name: 'Hyderabad',
    country: 'India',
    country_code: 'IN',
    continent: 'Asia',
    flag: '🇮🇳',
    latitude: 17.3850,
    longitude: 78.4867,
    daily_rate: 320,
    rating: 4.96,
    hero_image_url: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The City of Pearls & Royal Nizami Heritage',
    vibe: 'Heritage & Gastronomy',
    description: 'The historic imperial capital of the Nizams, renowned worldwide for its 400-year-old Charminar, diamond fortresses, opulent marble palaces, and world-famous royal Hyderabadi Dum Biryani.',
    climate: '27°C • Sunny & Fair',
    best_time_to_visit: 'October - March',
    landmarks: [
      {
        name: 'Charminar Monument & Laad Bazaar',
        category: '16th-Century Monument',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
        description: 'The four-minaret grand landmark built in 1591 AD surrounded by traditional pearl artisans and lacquer bangle ateliers.',
        rating: 4.98,
        tag: 'Iconic Architecture',
      },
      {
        name: 'Golconda Fort & Acoustic Citadel',
        category: 'Medieval Diamond Citadel',
        image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
        description: 'The legendary fortress vault of the Hope & Koh-i-Noor diamonds featuring revolutionary acoustic engineering.',
        rating: 4.96,
        tag: 'Royal Citadel',
      },
      {
        name: 'Chowmahalla & Taj Falaknuma Palaces',
        category: 'Nizami Royal Palace',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        description: 'The lavish 101-seat dining hall and Italian marble courtyards once belonging to the world’s richest sovereign.',
        rating: 4.99,
        tag: 'Imperial Luxury',
      },
      {
        name: 'Ramoji Film City Studios',
        category: 'Cinematic Wonderland',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
        description: 'Guinness World Record largest film studio complex spanning over 2,000 acres of cinematic sets and thematic landscapes.',
        rating: 4.92,
        tag: 'Entertainment',
      },
    ],
    itinerary_days: [
      {
        day: 1,
        title: 'Royal Nizami Arrival & Charminar Heritage Walk',
        morning: 'VIP tarmac arrival and luxury transfer to the Taj Falaknuma Palace high above the city.',
        afternoon: 'Private guided walk through Charminar, Mecca Masjid, and the gemstone boutiques of Laad Bazaar.',
        evening: 'Sunset cocktails on the Jade Terrace followed by an authentic 7-course Nizami Dawat feast.',
      },
      {
        day: 2,
        title: 'Golconda Diamond Citadel & Qutb Shahi Tombs',
        morning: 'Exclusive early entry to Golconda Fort with personal acoustic demonstrations at the Fateh Darwaza.',
        afternoon: 'Exploration of the newly restored dome mausoleums of the Qutb Shahi dynasty with lead conservationists.',
        evening: 'Sound and light historical narration under starlit citadel ruins.',
      },
      {
        day: 3,
        title: 'Chowmahalla Palace & Gourmet Masterclass',
        morning: 'Private access to the Nizams vintage Rolls-Royce fleet and grand Khilwat coronation hall.',
        afternoon: 'Hands-on culinary masterclass with royal chefs preparing authentic saffron Dum Biryani and Mirchi ka Salan.',
        evening: 'Private boat cruise across Hussain Sagar lake past the illuminated Buddha monolith.',
      },
    ],
    image_urls: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    ],
    is_live_db: false,
  },
  'rome-it': {
    city_slug: 'rome-it',
    city_name: 'Rome',
    country: 'Italy',
    country_code: 'IT',
    continent: 'Europe',
    flag: '🇮🇹',
    latitude: 41.8902,
    longitude: 12.4922,
    daily_rate: 420,
    rating: 4.98,
    hero_image_url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80',
    tagline: 'The Eternal City with Ancient Caesars & Vatican Wonders',
    vibe: 'Romantic & Ancient',
    description: 'Walk in the footsteps of emperors through the Colosseum, Roman Forum, and private Vatican chapels.',
    climate: '22°C • Sunny',
    best_time_to_visit: 'April - October',
    landmarks: [
      {
        name: 'Colosseum & Roman Forum',
        category: 'Ancient Wonder',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
        description: 'Gladiatorial amphitheatre and the heart of the Roman Republic.',
        rating: 4.98,
        tag: 'Imperial Rome',
      },
      {
        name: 'Vatican City & St. Peter’s',
        category: 'Sacred Monument',
        image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80',
        description: 'Sistine Chapel with Michelangelo’s ceiling frescoes.',
        rating: 4.99,
        tag: 'Renaissance Art',
      },
    ],
    itinerary_days: [
      {
        day: 1,
        title: 'Imperial Colosseum & Ancient Forum',
        morning: 'VIP underground gladiator arena tour.',
        afternoon: 'Trastevere artisanal food walk.',
        evening: 'Rooftop dining overlooking Piazza Navona.',
      },
      {
        day: 2,
        title: 'Private Vatican & Sistine Chapel',
        morning: 'Early access before public opening.',
        afternoon: 'Vatican gardens and St. Peter’s dome ascent.',
        evening: 'Sunset walk by Trevi Fountain.',
      },
    ],
    image_urls: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80'],
    is_live_db: false,
  },
  'tokyo-jp': {
    city_slug: 'tokyo-jp',
    city_name: 'Tokyo',
    country: 'Japan',
    country_code: 'JP',
    continent: 'Asia',
    flag: '🇯🇵',
    latitude: 35.6762,
    longitude: 139.6503,
    daily_rate: 480,
    rating: 4.99,
    hero_image_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Futuristic Cyberpunk Skyline Meets Timeless Shinto Sanctuaries',
    vibe: 'Neon City & Culture',
    description: 'Experience Michelin omakase dining, high-tech spatial digital art, and ancient wooden shrines.',
    climate: '19°C • Clear',
    best_time_to_visit: 'March - May, Sept - Nov',
    landmarks: [
      {
        name: 'Shibuya Crossing & Sky Tower',
        category: 'Urban Skyline',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
        description: 'Iconic world intersection and observation deck.',
        rating: 4.97,
        tag: 'Metropolis',
      },
      {
        name: 'Senso-ji Temple Asakusa',
        category: 'Ancient Shrine',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
        description: 'Founded in 645 AD with the iconic red Thunder Gate lantern.',
        rating: 4.95,
        tag: 'Culture',
      },
    ],
    itinerary_days: [
      {
        day: 1,
        title: 'Asakusa Traditions & Tsukiji Omakase',
        morning: 'Private tea ceremony and shrine blessings.',
        afternoon: 'Chef-guided market tasting.',
        evening: 'Shibuya Sky 360 observation at sunset.',
      },
      {
        day: 2,
        title: 'TeamLab Digital Art & Ginza Dining',
        morning: 'Immersive walk through light & water.',
        afternoon: 'Harajuku fashion & Meiji forest.',
        evening: '3-Star Michelin Kaiseki banquet.',
      },
    ],
    image_urls: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'],
    is_live_db: false,
  },
};

/**
 * Asynchronously Fetch Destination Data from Supabase with Relational Details
 */
export async function fetchDestinationData(citySlugOrName: string): Promise<FullDestinationPayload | null> {
  const cleanKey = citySlugOrName.toLowerCase().trim().replace(/\s+/g, '-');

  // 1. Check in-memory SWR Cache
  const cached = destinationCache.get(cleanKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const client = getClient();

  // 2. Query Supabase Database
  if (client) {
    try {
      const { data: dest, error: destErr } = await client
        .from('destinations')
        .select('*')
        .or(`city_slug.ilike.%${cleanKey}%,city_name.ilike.%${citySlugOrName}%`)
        .limit(1)
        .single();

      if (!destErr && dest) {
        const { data: details } = await client
          .from('destination_details')
          .select('*')
          .eq('city_slug', dest.city_slug)
          .single();

        const payload: FullDestinationPayload = {
          city_slug: dest.city_slug,
          city_name: dest.city_name,
          country: dest.country,
          country_code: dest.country_code,
          continent: dest.continent,
          flag: dest.flag,
          latitude: dest.latitude,
          longitude: dest.longitude,
          daily_rate: Number(dest.daily_rate),
          rating: Number(dest.rating),
          hero_image_url: dest.hero_image_url,
          tagline: dest.tagline,
          vibe: dest.vibe,
          description: details?.description || dest.tagline,
          climate: details?.climate || '24°C • Fair',
          best_time_to_visit: details?.best_time_to_visit || 'Year-Round',
          landmarks: details?.landmarks || [],
          itinerary_days: details?.itinerary_days || [],
          image_urls: details?.image_urls || [dest.hero_image_url],
          is_live_db: true,
        };

        destinationCache.set(cleanKey, { data: payload, timestamp: Date.now() });
        return payload;
      }
    } catch (e) {
      console.warn('Supabase destination query failed, using pre-seeded fallback:', e);
    }
  }

  // 3. Fallback to Preseeded Repository (Hyderabad, Rome, Tokyo, etc.)
  const matchedSlug = Object.keys(PRESEEDED_DESTINATIONS).find(
    (k) => k.includes(cleanKey) || cleanKey.includes(k) || PRESEEDED_DESTINATIONS[k].city_name.toLowerCase() === citySlugOrName.toLowerCase()
  );

  if (matchedSlug && PRESEEDED_DESTINATIONS[matchedSlug]) {
    const fallback = PRESEEDED_DESTINATIONS[matchedSlug];
    destinationCache.set(cleanKey, { data: fallback, timestamp: Date.now() });
    return fallback;
  }

  return null;
}
