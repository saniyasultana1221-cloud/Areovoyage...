/**
 * AEROVOYAGE Dynamic Database Service (Supabase & REST API Integration)
 * - Relational queries: cities (*), landmarks (*), itineraries (*), reviews (*)
 * - In-memory client-side SWR caching (5 min TTL)
 * - Real-time review & rating submission
 * - Pre-seeded offline fallback repository
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WORLD_CITIES, CityInfo } from '../data/worldDatabase';

export interface LandmarkRecord {
  id: string;
  city_id: string;
  name: string;
  category: string;
  image_url: string;
  description: string;
  rating: number;
  tag: string;
}

export interface ItineraryActivity {
  time?: string;
  title: string;
  type?: string;
}

export interface ItineraryRecord {
  id: string;
  city_id: string;
  title: string;
  duration_days: number;
  day_number: number;
  activities: ItineraryActivity[];
}

export interface ReviewRecord {
  id: string;
  city_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface DynamicCityData {
  id: string;
  name: string;
  country: string;
  country_code: string;
  continent: string;
  flag: string;
  latitude: number;
  longitude: number;
  description: string;
  hero_image_url: string;
  average_rating: number;
  best_time_to_visit: string;
  weather: string;
  famous_for: string;
  landmarks: LandmarkRecord[];
  itineraries: ItineraryRecord[];
  reviews: ReviewRecord[];
  isDynamic: boolean;
}

// Environment placeholders
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

let supabase: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes('placeholder') &&
    !SUPABASE_ANON_KEY.includes('placeholder')
  ) {
    if (!supabase) {
      supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabase;
  }
  return null;
}

// In-Memory Client-Side Cache (SWR with 5-minute TTL)
interface CacheEntry {
  data: DynamicCityData;
  timestamp: number;
}
const CACHE_TTL_MS = 5 * 60 * 1000;
const memoryCache = new Map<string, CacheEntry>();

/**
 * Normalizes city id/slug for uniform key lookups
 */
function normalizeKey(identifier: string): string {
  return identifier.toLowerCase().trim().replace(/\s+/g, '-');
}

/**
 * Construct Fallback City Data from local database when Supabase is offline
 */
function buildFallbackCityData(cityInfo: CityInfo): DynamicCityData {
  const landmarks: LandmarkRecord[] = (cityInfo.landmarksDetail || []).map((lm, idx) => ({
    id: `lm-${cityInfo.id}-${idx + 1}`,
    city_id: cityInfo.id,
    name: lm.name,
    category: lm.tag || 'Iconic Landmark',
    image_url: lm.image,
    description: lm.description,
    rating: 4.95,
    tag: lm.tag,
  }));

  if (landmarks.length === 0) {
    landmarks.push(
      {
        id: `lm-${cityInfo.id}-1`,
        city_id: cityInfo.id,
        name: `${cityInfo.name} Historic Quarter`,
        category: 'Ancient Architecture',
        image_url: cityInfo.image,
        description: `The architectural and historic center of ${cityInfo.name}, celebrating timeless cultural heritage.`,
        rating: 4.98,
        tag: 'Heritage & Culture',
      },
      {
        id: `lm-${cityInfo.id}-2`,
        city_id: cityInfo.id,
        name: `${cityInfo.name} Panoramic Overlook`,
        category: 'Scenic Viewpoint',
        image_url: cityInfo.heroImage || cityInfo.image,
        description: `Breathtaking 360-degree vistas across the surrounding valleys, waters, and skyline.`,
        rating: 4.94,
        tag: 'Scenic Views',
      }
    );
  }

  const itineraries: ItineraryRecord[] = [
    {
      id: `itin-${cityInfo.id}-d1`,
      city_id: cityInfo.id,
      title: `${cityInfo.name} Grand Arrival & Private Horizon Tour`,
      duration_days: 4,
      day_number: 1,
      activities: [
        { time: '09:30', title: `VIP Arrival & Private Escort to ${cityInfo.name} Suites`, type: 'Arrival' },
        { time: '13:00', title: `Bespoke Culinary Walk & Historic Center Exploration`, type: 'Gastronomy' },
        { time: '18:00', title: `Sunset Cocktail Cruise / Panorama Viewpoint`, type: 'Scenic' },
      ],
    },
    {
      id: `itin-${cityInfo.id}-d2`,
      city_id: cityInfo.id,
      title: `Iconic Landmarks & Royal Heritage Immersion`,
      duration_days: 4,
      day_number: 2,
      activities: [
        { time: '08:45', title: `Private Access to Primary Heritage Monuments`, type: 'Culture' },
        { time: '14:00', title: `Artisan Workshops & Master Sculptor Guilds`, type: 'Art' },
        { time: '19:30', title: `Michelin-Tier Gala Dinner with Regional Wine Pairings`, type: 'Fine Dining' },
      ],
    },
  ];

  const reviews: ReviewRecord[] = [
    {
      id: `rev-${cityInfo.id}-1`,
      city_id: cityInfo.id,
      user_name: 'Lord Montgomery Vance',
      rating: 5,
      comment: `The spatial itinerary for ${cityInfo.name} was sublime. Flawless private guides and private tarmac access.`,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: `rev-${cityInfo.id}-2`,
      city_id: cityInfo.id,
      user_name: 'Contessa Alessandra Moretti',
      rating: 5,
      comment: `A masterclass in luxury travel. Every landmark was seamlessly curated with zero waiting lines.`,
      created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
  ];

  return {
    id: cityInfo.id,
    name: cityInfo.name,
    country: cityInfo.country,
    country_code: cityInfo.countryCode,
    continent: cityInfo.continent,
    flag: cityInfo.flag,
    latitude: cityInfo.lat,
    longitude: cityInfo.lon,
    description: cityInfo.description,
    hero_image_url: cityInfo.heroImage || cityInfo.image,
    average_rating: cityInfo.rating,
    best_time_to_visit: cityInfo.bestTimeToVisit,
    weather: cityInfo.weather,
    famous_for: cityInfo.famousFor,
    landmarks,
    itineraries,
    reviews,
    isDynamic: false,
  };
}

/**
 * 1. Fetch Complete City Details with Relational Landmarks, Itineraries & Reviews
 */
export async function fetchCityDetails(cityIdentifier: string): Promise<DynamicCityData | null> {
  const cleanKey = normalizeKey(cityIdentifier);

  // 1. Check in-memory SWR cache
  const cached = memoryCache.get(cleanKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  const client = getClient();

  // 2. Try Supabase Relational Query
  if (client) {
    try {
      // Find city record by id or name
      const { data: cityData, error: cityError } = await client
        .from('cities')
        .select('*')
        .or(`id.ilike.%${cleanKey}%,name.ilike.%${cityIdentifier}%`)
        .limit(1)
        .single();

      if (!cityError && cityData) {
        const cityId = cityData.id;

        // Parallel fetch for associated relational tables
        const [landmarksRes, itinerariesRes, reviewsRes] = await Promise.all([
          client.from('landmarks').select('*').eq('city_id', cityId),
          client.from('itineraries').select('*').eq('city_id', cityId).order('day_number', { ascending: true }),
          client.from('reviews').select('*').eq('city_id', cityId).order('created_at', { ascending: false }),
        ]);

        const result: DynamicCityData = {
          id: cityData.id,
          name: cityData.name,
          country: cityData.country,
          country_code: cityData.country_code,
          continent: cityData.continent,
          flag: cityData.flag,
          latitude: cityData.latitude,
          longitude: cityData.longitude,
          description: cityData.description,
          hero_image_url: cityData.hero_image_url,
          average_rating: Number(cityData.average_rating),
          best_time_to_visit: cityData.best_time_to_visit,
          weather: cityData.weather,
          famous_for: cityData.famous_for,
          landmarks: (landmarksRes.data as LandmarkRecord[]) || [],
          itineraries: (itinerariesRes.data as ItineraryRecord[]) || [],
          reviews: (reviewsRes.data as ReviewRecord[]) || [],
          isDynamic: true,
        };

        memoryCache.set(cleanKey, { data: result, timestamp: Date.now() });
        return result;
      }
    } catch (err) {
      console.warn('Supabase query failed, falling back to local pre-seeded database:', err);
    }
  }

  // 3. Fallback to Local Catalog Repository
  const matchedLocal = WORLD_CITIES.find(
    (c) =>
      c.id.toLowerCase().includes(cleanKey) ||
      c.name.toLowerCase().includes(cityIdentifier.toLowerCase()) ||
      c.country.toLowerCase().includes(cityIdentifier.toLowerCase())
  );

  if (matchedLocal) {
    const fallbackData = buildFallbackCityData(matchedLocal);
    memoryCache.set(cleanKey, { data: fallbackData, timestamp: Date.now() });
    return fallbackData;
  }

  // Default dynamic generated placeholder for searched locations outside local database
  const dynamicFallback: DynamicCityData = {
    id: cleanKey,
    name: cityIdentifier.split(',')[0].trim(),
    country: cityIdentifier.includes(',') ? cityIdentifier.split(',')[1].trim() : 'Global Destination',
    country_code: 'UN',
    continent: 'Global',
    flag: '📍',
    latitude: 20.0,
    longitude: 0.0,
    description: `An extraordinary global destination celebrating magnificent landscapes, rich culture, and world-class hospitality.`,
    hero_image_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80',
    average_rating: 4.95,
    best_time_to_visit: 'Year-Round',
    weather: '24°C • Clear Sky',
    famous_for: 'Scenic vistas, historic quarters, and bespoke cultural experiences.',
    landmarks: [
      {
        id: `lm-${cleanKey}-1`,
        city_id: cleanKey,
        name: 'City Center & Architectural Promenade',
        category: 'Urban Landmark',
        image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
        description: 'The architectural heart of the city featuring celebrated public squares and historic monuments.',
        rating: 4.95,
        tag: 'Architecture',
      },
      {
        id: `lm-${cleanKey}-2`,
        city_id: cleanKey,
        name: 'Heritage Quarter & Cultural District',
        category: 'Historic Quarter',
        image_url: 'https://images.unsplash.com/photo-1477959858617-67f30bc54b38?auto=format&fit=crop&w=800&q=80',
        description: 'Wander through preserved cobblestone streets, local artisan boutiques, and landmark museums.',
        rating: 4.92,
        tag: 'Heritage',
      },
    ],
    itineraries: [
      {
        id: `itin-${cleanKey}-1`,
        city_id: cleanKey,
        title: 'Bespoke Discovery & Culinary Voyage',
        duration_days: 3,
        day_number: 1,
        activities: [
          { time: '10:00', title: 'Private Guided Walking Tour of Historic Sights', type: 'History' },
          { time: '14:30', title: 'Local Artisan & Gastronomy Tasting Experience', type: 'Food' },
          { time: '19:00', title: 'Sunset Panorama & Fine Dining Reservation', type: 'Dining' },
        ],
      },
    ],
    reviews: [
      {
        id: `rev-${cleanKey}-1`,
        city_id: cleanKey,
        user_name: 'Julian St. Claire',
        rating: 5,
        comment: 'A magnificent voyage arranged with absolute attention to detail.',
        created_at: new Date().toISOString(),
      },
    ],
    isDynamic: false,
  };

  memoryCache.set(cleanKey, { data: dynamicFallback, timestamp: Date.now() });
  return dynamicFallback;
}

/**
 * 2. Submit Real-Time User Rating & Review to Database
 */
export async function submitCityReview(
  cityId: string,
  review: { userName: string; rating: number; comment: string }
): Promise<{ success: boolean; review: ReviewRecord }> {
  const newReview: ReviewRecord = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    city_id: cityId,
    user_name: review.userName.trim() || 'Anonymous VIP Guest',
    rating: review.rating,
    comment: review.comment.trim(),
    created_at: new Date().toISOString(),
  };

  const client = getClient();

  // Try DB Insert
  if (client) {
    try {
      const { data, error } = await client
        .from('reviews')
        .insert([
          {
            id: newReview.id,
            city_id: newReview.city_id,
            user_name: newReview.user_name,
            rating: newReview.rating,
            comment: newReview.comment,
            created_at: newReview.created_at,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        // Invalidate cache
        memoryCache.delete(normalizeKey(cityId));
        return { success: true, review: data as ReviewRecord };
      }
    } catch (e) {
      console.warn('Review write to Supabase failed, updating local cache:', e);
    }
  }

  // Update local memory cache entry
  const cached = memoryCache.get(normalizeKey(cityId));
  if (cached) {
    cached.data.reviews.unshift(newReview);
    // Recalculate average rating
    const sum = cached.data.reviews.reduce((acc, r) => acc + r.rating, 0);
    cached.data.average_rating = Number((sum / cached.data.reviews.length).toFixed(2));
  }

  return { success: true, review: newReview };
}
