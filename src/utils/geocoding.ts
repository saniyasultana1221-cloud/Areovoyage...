// Comprehensive World Geocoding Database for 3D Globe Navigation
export interface GeoLocation {
  name: string;
  country?: string;
  lat: number;
  lon: number;
}

export const WORLD_GEO_DATABASE: Record<string, GeoLocation> = {
  // --- TOP DESTINATIONS & LANDMARKS ---
  'rome': { name: 'Rome', country: 'Italy', lat: 41.8902, lon: 12.4922 },
  'colosseum': { name: 'Colosseum, Rome', country: 'Italy', lat: 41.8902, lon: 12.4922 },
  'trevi fountain': { name: 'Trevi Fountain, Rome', country: 'Italy', lat: 41.9009, lon: 12.4833 },
  'vatican': { name: 'Vatican City', country: 'Vatican', lat: 41.9029, lon: 12.4534 },
  
  'agra': { name: 'Agra', country: 'India', lat: 27.1751, lon: 78.0421 },
  'taj mahal': { name: 'Taj Mahal, Agra', country: 'India', lat: 27.1751, lon: 78.0421 },
  'delhi': { name: 'New Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
  'new delhi': { name: 'New Delhi', country: 'India', lat: 28.6139, lon: 77.2090 },
  'mumbai': { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
  'jaipur': { name: 'Jaipur', country: 'India', lat: 26.9124, lon: 75.7873 },
  'hyderabad': { name: 'Hyderabad', country: 'India', lat: 17.3850, lon: 78.4867 },
  'charminar': { name: 'Charminar, Hyderabad', country: 'India', lat: 17.3616, lon: 78.4747 },
  'golconda': { name: 'Golconda Fort, Hyderabad', country: 'India', lat: 17.3833, lon: 78.4011 },
  'bengaluru': { name: 'Bengaluru', country: 'India', lat: 12.9716, lon: 77.5946 },
  'bangalore': { name: 'Bengaluru', country: 'India', lat: 12.9716, lon: 77.5946 },
  'india': { name: 'India', country: 'India', lat: 20.5937, lon: 78.9629 },
  'inida': { name: 'India', country: 'India', lat: 20.5937, lon: 78.9629 },

  'tokyo': { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
  'kyoto': { name: 'Kyoto', country: 'Japan', lat: 35.0116, lon: 135.7681 },
  'osaka': { name: 'Osaka', country: 'Japan', lat: 34.6937, lon: 135.5023 },
  'mount fuji': { name: 'Mount Fuji', country: 'Japan', lat: 35.3606, lon: 138.7274 },
  'fuji': { name: 'Mount Fuji', country: 'Japan', lat: 35.3606, lon: 138.7274 },
  'japan': { name: 'Japan', country: 'Japan', lat: 36.2048, lon: 138.2529 },

  'paris': { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
  'eiffel tower': { name: 'Eiffel Tower, Paris', country: 'France', lat: 48.8584, lon: 2.2945 },
  'eiffel': { name: 'Eiffel Tower, Paris', country: 'France', lat: 48.8584, lon: 2.2945 },
  'louvre': { name: 'Louvre Museum, Paris', country: 'France', lat: 48.8606, lon: 2.3376 },
  'france': { name: 'France', country: 'France', lat: 46.2276, lon: 2.2137 },

  'amalfi': { name: 'Amalfi Coast', country: 'Italy', lat: 40.6340, lon: 14.6027 },
  'positano': { name: 'Positano', country: 'Italy', lat: 40.6281, lon: 14.4850 },
  'venice': { name: 'Venice', country: 'Italy', lat: 45.4408, lon: 12.3155 },
  'florence': { name: 'Florence', country: 'Italy', lat: 43.7696, lon: 11.2558 },
  'milan': { name: 'Milan', country: 'Italy', lat: 45.4642, lon: 9.1900 },
  'italy': { name: 'Italy', country: 'Italy', lat: 41.8719, lon: 12.5674 },

  'santorini': { name: 'Santorini', country: 'Greece', lat: 36.3932, lon: 25.4615 },
  'athens': { name: 'Athens', country: 'Greece', lat: 37.9838, lon: 23.7275 },
  'acropolis': { name: 'Acropolis, Athens', country: 'Greece', lat: 37.9715, lon: 23.7257 },
  'mykonos': { name: 'Mykonos', country: 'Greece', lat: 37.4467, lon: 25.3289 },
  'greece': { name: 'Greece', country: 'Greece', lat: 39.0742, lon: 21.8243 },

  'swiss alps': { name: 'Swiss Alps', country: 'Switzerland', lat: 46.5585, lon: 8.5434 },
  'zermatt': { name: 'Zermatt & Matterhorn', country: 'Switzerland', lat: 45.9765, lon: 7.7491 },
  'matterhorn': { name: 'Matterhorn', country: 'Switzerland', lat: 45.9765, lon: 7.7491 },
  'zurich': { name: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417 },
  'geneva': { name: 'Geneva', country: 'Switzerland', lat: 46.2044, lon: 6.1432 },
  'switzerland': { name: 'Switzerland', country: 'Switzerland', lat: 46.8182, lon: 8.2275 },

  'bali': { name: 'Bali', country: 'Indonesia', lat: -8.4095, lon: 115.1889 },
  'ubud': { name: 'Ubud, Bali', country: 'Indonesia', lat: -8.5069, lon: 115.2625 },
  'jakarta': { name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lon: 106.8456 },
  'indonesia': { name: 'Indonesia', country: 'Indonesia', lat: -0.7893, lon: 113.9213 },

  'new york': { name: 'New York City', country: 'United States', lat: 40.7128, lon: -74.0060 },
  'nyc': { name: 'New York City', country: 'United States', lat: 40.7128, lon: -74.0060 },
  'los angeles': { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437 },
  'san francisco': { name: 'San Francisco', country: 'United States', lat: 37.7749, lon: -122.4194 },
  'las vegas': { name: 'Las Vegas', country: 'United States', lat: 36.1699, lon: -115.1398 },
  'miami': { name: 'Miami', country: 'United States', lat: 25.7617, lon: -80.1918 },
  'hawaii': { name: 'Hawaii', country: 'United States', lat: 19.8968, lon: -155.5828 },
  'grand canyon': { name: 'Grand Canyon', country: 'United States', lat: 36.1069, lon: -112.1129 },
  'usa': { name: 'United States', country: 'United States', lat: 37.0902, lon: -95.7129 },
  'united states': { name: 'United States', country: 'United States', lat: 37.0902, lon: -95.7129 },
  'america': { name: 'United States', country: 'United States', lat: 37.0902, lon: -95.7129 },

  'london': { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  'big ben': { name: 'Big Ben, London', country: 'United Kingdom', lat: 51.5007, lon: -0.1246 },
  'uk': { name: 'United Kingdom', country: 'United Kingdom', lat: 55.3781, lon: -3.4360 },
  'united kingdom': { name: 'United Kingdom', country: 'United Kingdom', lat: 55.3781, lon: -3.4360 },
  'england': { name: 'England', country: 'United Kingdom', lat: 52.3555, lon: -1.1743 },

  'sydney': { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
  'sydney opera house': { name: 'Sydney Opera House', country: 'Australia', lat: -33.8568, lon: 151.2153 },
  'melbourne': { name: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631 },
  'great barrier reef': { name: 'Great Barrier Reef', country: 'Australia', lat: -18.2871, lon: 147.6992 },
  'australia': { name: 'Australia', country: 'Australia', lat: -25.2744, lon: 133.7751 },

  'dubai': { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708 },
  'burj khalifa': { name: 'Burj Khalifa, Dubai', country: 'UAE', lat: 25.1972, lon: 55.2744 },
  'abu dhabi': { name: 'Abu Dhabi', country: 'UAE', lat: 24.4539, lon: 54.3773 },
  'uae': { name: 'United Arab Emirates', country: 'UAE', lat: 23.4241, lon: 53.8478 },

  'cairo': { name: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
  'pyramids': { name: 'Pyramids of Giza', country: 'Egypt', lat: 29.9792, lon: 31.1342 },
  'giza': { name: 'Giza', country: 'Egypt', lat: 29.9792, lon: 31.1342 },
  'egypt': { name: 'Egypt', country: 'Egypt', lat: 26.8206, lon: 30.8025 },

  'rio de janeiro': { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729 },
  'rio': { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729 },
  'christ the redeemer': { name: 'Christ the Redeemer, Rio', country: 'Brazil', lat: -22.9519, lon: -43.2105 },
  'sao paulo': { name: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333 },
  'brazil': { name: 'Brazil', country: 'Brazil', lat: -14.2350, lon: -51.9253 },

  'singapore': { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
  'bangkok': { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018 },
  'phuket': { name: 'Phuket', country: 'Thailand', lat: 7.8804, lon: 98.3923 },
  'thailand': { name: 'Thailand', country: 'Thailand', lat: 15.8700, lon: 100.9925 },

  'barcelona': { name: 'Barcelona', country: 'Spain', lat: 41.3851, lon: 2.1734 },
  'madrid': { name: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038 },
  'spain': { name: 'Spain', country: 'Spain', lat: 40.4637, lon: -3.7492 },

  'berlin': { name: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 },
  'munich': { name: 'Munich', country: 'Germany', lat: 48.1351, lon: 11.5820 },
  'germany': { name: 'Germany', country: 'Germany', lat: 51.1657, lon: 10.4515 },

  'amsterdam': { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041 },
  'netherlands': { name: 'Netherlands', country: 'Netherlands', lat: 52.1326, lon: 5.2913 },

  'vienna': { name: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738 },
  'austria': { name: 'Austria', country: 'Austria', lat: 47.5162, lon: 14.5501 },

  'prague': { name: 'Prague', country: 'Czech Republic', lat: 50.0755, lon: 14.4378 },
  'budapest': { name: 'Budapest', country: 'Hungary', lat: 47.4979, lon: 19.0402 },
  'istanbul': { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784 },
  'turkey': { name: 'Turkey', country: 'Turkey', lat: 38.9637, lon: 35.2433 },

  'lisbon': { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lon: -9.1393 },
  'portugal': { name: 'Portugal', country: 'Portugal', lat: 39.3999, lon: -8.2245 },

  'toronto': { name: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832 },
  'vancouver': { name: 'Vancouver', country: 'Canada', lat: 49.2827, lon: -123.1207 },
  'canada': { name: 'Canada', country: 'Canada', lat: 56.1304, lon: -106.3468 },

  'mexico city': { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332 },
  'cancun': { name: 'Cancún', country: 'Mexico', lat: 21.1619, lon: -86.8515 },
  'mexico': { name: 'Mexico', country: 'Mexico', lat: 23.6345, lon: -102.5528 },

  'cape town': { name: 'Cape Town', country: 'South Africa', lat: -33.9249, lon: 18.4241 },
  'south africa': { name: 'South Africa', country: 'South Africa', lat: -30.5595, lon: 22.9375 },

  'buenos aires': { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816 },
  'argentina': { name: 'Argentina', country: 'Argentina', lat: -38.4161, lon: -63.6167 },

  'seoul': { name: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.9780 },
  'korea': { name: 'South Korea', country: 'South Korea', lat: 35.9078, lon: 127.7669 },
  'south korea': { name: 'South Korea', country: 'South Korea', lat: 35.9078, lon: 127.7669 },

  'beijing': { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074 },
  'shanghai': { name: 'Shanghai', country: 'China', lat: 31.2304, lon: 121.4737 },
  'hong kong': { name: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lon: 114.1694 },
  'great wall': { name: 'Great Wall of China', country: 'China', lat: 40.4319, lon: 116.5704 },
  'china': { name: 'China', country: 'China', lat: 35.8617, lon: 104.1954 },

  'reykjavik': { name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lon: -21.9426 },
  'iceland': { name: 'Iceland', country: 'Iceland', lat: 64.9631, lon: -19.0208 },

  'auckland': { name: 'Auckland', country: 'New Zealand', lat: -36.8485, lon: 174.7633 },
  'new zealand': { name: 'New Zealand', country: 'New Zealand', lat: -40.9006, lon: 174.8860 },
};

import { WORLD_CITIES } from '../data/worldDatabase';

// Auto-populate from rich WORLD_CITIES dataset
WORLD_CITIES.forEach((city) => {
  WORLD_GEO_DATABASE[city.name.toLowerCase()] = {
    name: city.name,
    country: city.country,
    lat: city.lat,
    lon: city.lon,
  };
  WORLD_GEO_DATABASE[city.id.toLowerCase()] = {
    name: city.name,
    country: city.country,
    lat: city.lat,
    lon: city.lon,
  };
});

// Fast local geocode lookup
export function resolveLocationCoordinates(query: string): GeoLocation | null {
  if (!query || !query.trim()) return null;
  const clean = query.trim().toLowerCase();

  // 1. Exact Match
  if (WORLD_GEO_DATABASE[clean]) {
    return WORLD_GEO_DATABASE[clean];
  }

  // 2. Partial / Substring Match in database
  const keys = Object.keys(WORLD_GEO_DATABASE);
  for (const key of keys) {
    if (clean.includes(key) || key.includes(clean)) {
      return WORLD_GEO_DATABASE[key];
    }
  }

  return null;
}

// Fallback dynamic geocoder for any unknown city or country on Earth
export async function fetchLiveGeocode(query: string): Promise<GeoLocation | null> {
  const local = resolveLocationCoordinates(query);
  if (local) return local;

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.length > 0) {
      return {
        name: data[0].display_name.split(',')[0],
        country: data[0].display_name.split(',').slice(-1)[0]?.trim(),
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    }
  } catch (err) {
    console.warn('Live geocode fallback error', err);
  }
  return null;
}
