-- =========================================================================
-- AEROVOYAGE DYNAMIC DESTINATIONS & DETAILS DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. DESTINATIONS TABLE (Primary Catalog)
CREATE TABLE IF NOT EXISTS public.destinations (
    city_slug VARCHAR(64) PRIMARY KEY,
    city_name VARCHAR(128) NOT NULL,
    country VARCHAR(128) NOT NULL,
    country_code VARCHAR(8) NOT NULL DEFAULT 'UN',
    continent VARCHAR(64) NOT NULL DEFAULT 'Global',
    flag VARCHAR(16) NOT NULL DEFAULT '📍',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    daily_rate NUMERIC(10, 2) NOT NULL DEFAULT 350.00,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.95,
    hero_image_url TEXT NOT NULL,
    tagline TEXT NOT NULL,
    vibe VARCHAR(64) NOT NULL DEFAULT 'Luxury Heritage',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. DESTINATION DETAILS TABLE (Rich Relational Content: Landmarks & Itineraries)
CREATE TABLE IF NOT EXISTS public.destination_details (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city_slug VARCHAR(64) REFERENCES public.destinations(city_slug) ON DELETE CASCADE UNIQUE NOT NULL,
    description TEXT NOT NULL,
    landmarks JSONB NOT NULL DEFAULT '[]'::jsonb,
    itinerary_days JSONB NOT NULL DEFAULT '[]'::jsonb,
    image_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
    climate TEXT NOT NULL DEFAULT '25°C • Pleasant',
    best_time_to_visit TEXT NOT NULL DEFAULT 'October - March',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and public read policies
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access for Destinations" ON public.destinations FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Destination Details" ON public.destination_details FOR SELECT USING (true);

-- Indices
CREATE INDEX IF NOT EXISTS idx_destinations_country ON public.destinations(country);
CREATE INDEX IF NOT EXISTS idx_destination_details_slug ON public.destination_details(city_slug);

-- =========================================================================
-- SEED DATA: HYDERABAD, ROME, TOKYO, AGRA, PARIS, DUBAI
-- =========================================================================

-- Seed 1: Hyderabad, India
INSERT INTO public.destinations (city_slug, city_name, country, country_code, continent, flag, latitude, longitude, daily_rate, rating, hero_image_url, tagline, vibe) VALUES
('hyderabad-in', 'Hyderabad', 'India', 'IN', 'Asia', '🇮🇳', 17.3850, 78.4867, 320.00, 4.96, 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=80', 'The City of Pearls & Royal Nizami Heritage', 'Heritage & Gastronomy')
ON CONFLICT (city_slug) DO UPDATE SET daily_rate = EXCLUDED.daily_rate, rating = EXCLUDED.rating;

INSERT INTO public.destination_details (city_slug, description, climate, best_time_to_visit, landmarks, itinerary_days, image_urls) VALUES
('hyderabad-in', 
 'The historic imperial capital of the Nizams, renowned worldwide for its 400-year-old Charminar, diamond fortresses, opulent marble palaces, and world-famous royal Hyderabadi Dum Biryani.',
 '27°C • Sunny & Fair',
 'October - March',
 '[
   {
     "name": "Charminar Monument & Laad Bazaar",
     "category": "16th-Century Monument",
     "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
     "description": "The four-minaret grand landmark built in 1591 AD surrounded by traditional pearl artisans and lacquer bangle ateliers.",
     "rating": 4.98,
     "tag": "Iconic Architecture"
   },
   {
     "name": "Golconda Fort & Sound-Light Arena",
     "category": "Medieval Diamond Citadel",
     "image": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
     "description": "The legendary fortress vault of the Hope & Koh-i-Noor diamonds featuring revolutionary acoustic engineering.",
     "rating": 4.96,
     "tag": "Royal Citadel"
   },
   {
     "name": "Chowmahalla & Taj Falaknuma Palaces",
     "category": "Nizami Royal Palace",
     "image": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
     "description": "The lavish 101-seat dining hall and Italian marble courtyards once belonging to the world''s richest sovereign.",
     "rating": 4.99,
     "tag": "Imperial Luxury"
   },
   {
     "name": "Ramoji Film City Studios",
     "category": "Cinematic Wonderland",
     "image": "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
     "description": "Guinness World Record largest film studio complex spanning over 2,000 acres of cinematic sets and thematic landscapes.",
     "rating": 4.92,
     "tag": "Entertainment"
   }
 ]'::jsonb,
 '[
   {
     "day": 1,
     "title": "Royal Nizami Arrival & Charminar Heritage Walk",
     "morning": "VIP tarmac arrival and luxury transfer to the Taj Falaknuma Palace high above the city.",
     "afternoon": "Private guided walk through Charminar, Mecca Masjid, and the gemstone boutiques of Laad Bazaar.",
     "evening": "Sunset cocktails on the Jade Terrace followed by an authentic 7-course Nizami Dawat feast."
   },
   {
     "day": 2,
     "title": "Golconda Diamond Citadel & Qutb Shahi Tombs",
     "morning": "Exclusive early entry to Golconda Fort with personal acoustic demonstrations at the Fateh Darwaza.",
     "afternoon": "Exploration of the newly restored dome mausoleums of the Qutb Shahi dynasty with lead conservationists.",
     "evening": "Sound and light historical narration under starlit citadel ruins."
   },
   {
     "day": 3,
     "title": "Chowmahalla Palace & Gourmet Masterclass",
     "morning": "Private access to the Nizams vintage Rolls-Royce fleet and grand Khilwat coronation hall.",
     "afternoon": "Hands-on culinary masterclass with royal chefs preparing authentic saffron Dum Biryani and Mirchi ka Salan.",
     "evening": "Private boat cruise across Hussain Sagar lake past the illuminated Buddha monolith."
   }
 ]'::jsonb,
 '[
   "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
   "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
   "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80"
 ]'::jsonb)
ON CONFLICT (city_slug) DO UPDATE SET
    description = EXCLUDED.description,
    landmarks = EXCLUDED.landmarks,
    itinerary_days = EXCLUDED.itinerary_days;

-- Seed 2: Rome, Italy
INSERT INTO public.destinations (city_slug, city_name, country, country_code, continent, flag, latitude, longitude, daily_rate, rating, hero_image_url, tagline, vibe) VALUES
('rome-it', 'Rome', 'Italy', 'IT', 'Europe', '🇮🇹', 41.8902, 12.4922, 420.00, 4.98, 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80', 'The Eternal City with Ancient Caesars & Vatican Wonders', 'Romantic & Ancient')
ON CONFLICT (city_slug) DO UPDATE SET daily_rate = EXCLUDED.daily_rate;

INSERT INTO public.destination_details (city_slug, description, climate, best_time_to_visit, landmarks, itinerary_days, image_urls) VALUES
('rome-it',
 'Walk in the footsteps of emperors through the Colosseum, Roman Forum, and private Vatican chapels.',
 '22°C • Sunny',
 'April - October',
 '[
   {"name": "Colosseum & Roman Forum", "category": "Ancient Wonder", "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80", "description": "Gladiatorial amphitheatre and the heart of the Roman Republic.", "rating": 4.98, "tag": "Imperial Rome"},
   {"name": "Vatican City & St. Peter''s", "category": "Sacred Monument", "image": "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80", "description": "Sistine Chapel with Michelangelos ceiling frescoes.", "rating": 4.99, "tag": "Renaissance Art"}
 ]'::jsonb,
 '[
   {"day": 1, "title": "Imperial Colosseum & Ancient Forum", "morning": "VIP underground gladiator arena tour.", "afternoon": "Trastevere artisanal food walk.", "evening": "Rooftop dining overlooking Piazza Navona."},
   {"day": 2, "title": "Private Vatican & Sistine Chapel", "morning": "Early access before public opening.", "afternoon": "Vatican gardens and St. Peters dome ascent.", "evening": "Sunset walk by Trevi Fountain."}
 ]'::jsonb,
 '["https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80"]'::jsonb)
ON CONFLICT (city_slug) DO UPDATE SET description = EXCLUDED.description;

-- Seed 3: Tokyo, Japan
INSERT INTO public.destinations (city_slug, city_name, country, country_code, continent, flag, latitude, longitude, daily_rate, rating, hero_image_url, tagline, vibe) VALUES
('tokyo-jp', 'Tokyo', 'Japan', 'JP', 'Asia', '🇯🇵', 35.6762, 139.6503, 480.00, 4.99, 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80', 'Futuristic Cyberpunk Skyline Meets Timeless Shinto Sanctuaries', 'Neon City & Culture')
ON CONFLICT (city_slug) DO UPDATE SET daily_rate = EXCLUDED.daily_rate;

INSERT INTO public.destination_details (city_slug, description, climate, best_time_to_visit, landmarks, itinerary_days, image_urls) VALUES
('tokyo-jp',
 'Experience Michelin omakase dining, high-tech spatial digital art, and ancient wooden shrines.',
 '19°C • Clear',
 'March - May, Sept - Nov',
 '[
   {"name": "Shibuya Crossing & Sky Tower", "category": "Urban Skyline", "image": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80", "description": "Iconic world intersection and observation deck.", "rating": 4.97, "tag": "Metropolis"},
   {"name": "Senso-ji Temple Asakusa", "category": "Ancient Shrine", "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80", "description": "Founded in 645 AD with the iconic red Thunder Gate lantern.", "rating": 4.95, "tag": "Culture"}
 ]'::jsonb,
 '[
   {"day": 1, "title": "Asakusa Traditions & Tsukiji Omakase", "morning": "Private tea ceremony and shrine blessings.", "afternoon": "Chef-guided market tasting.", "evening": "Shibuya Sky 360 observation at sunset."},
   {"day": 2, "title": "TeamLab Digital Art & Ginza Dining", "morning": "Immersive walk through light & water.", "afternoon": "Harajuku fashion & Meiji forest.", "evening": "3-Star Michelin Kaiseki banquet."}
 ]'::jsonb,
 '["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80"]'::jsonb)
ON CONFLICT (city_slug) DO UPDATE SET description = EXCLUDED.description;
