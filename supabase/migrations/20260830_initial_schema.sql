-- =========================================================================
-- AEROVOYAGE DATABASE MIGRATION & NORMALIZED SCHEMA (SUPABASE / POSTGRESQL)
-- =========================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CITIES TABLE
CREATE TABLE IF NOT EXISTS public.cities (
    id VARCHAR(64) PRIMARY KEY, -- e.g. 'rome-it', 'tokyo-jp', 'agra-in'
    name VARCHAR(128) NOT NULL,
    country VARCHAR(128) NOT NULL,
    country_code VARCHAR(8) NOT NULL DEFAULT 'UN',
    continent VARCHAR(64) NOT NULL DEFAULT 'Global',
    flag VARCHAR(16) NOT NULL DEFAULT '📍',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    description TEXT NOT NULL,
    hero_image_url TEXT NOT NULL,
    average_rating NUMERIC(3, 2) NOT NULL DEFAULT 4.9,
    best_time_to_visit VARCHAR(128) NOT NULL DEFAULT 'Year-Round',
    weather VARCHAR(128) NOT NULL DEFAULT '24°C • Pleasant',
    famous_for TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. LANDMARKS TABLE (Foreign Key -> cities.id)
CREATE TABLE IF NOT EXISTS public.landmarks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city_id VARCHAR(64) REFERENCES public.cities(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(256) NOT NULL,
    category VARCHAR(128) NOT NULL DEFAULT 'Iconic Landmark',
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.9,
    tag VARCHAR(128) NOT NULL DEFAULT 'Heritage & Culture',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ITINERARIES TABLE (Foreign Key -> cities.id)
CREATE TABLE IF NOT EXISTS public.itineraries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city_id VARCHAR(64) REFERENCES public.cities(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(256) NOT NULL,
    duration_days INT NOT NULL DEFAULT 5,
    day_number INT NOT NULL,
    activities JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REVIEWS & RATINGS TABLE (Real-Time User Feedback)
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city_id VARCHAR(64) REFERENCES public.cities(id) ON DELETE CASCADE NOT NULL,
    user_name VARCHAR(128) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. RESERVATIONS TABLE (Stripe Checkout Persistence)
CREATE TABLE IF NOT EXISTS public.reservations (
    id VARCHAR(64) PRIMARY KEY,
    user_email VARCHAR(256) NOT NULL,
    full_name VARCHAR(256) NOT NULL,
    destination VARCHAR(256) NOT NULL,
    dates JSONB NOT NULL,
    guest_count INT NOT NULL DEFAULT 1,
    special_requests TEXT,
    amount_paid NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(8) NOT NULL DEFAULT 'USD',
    stripe_payment_intent_id VARCHAR(128) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'paid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for rapid spatial and foreign key queries
CREATE INDEX IF NOT EXISTS idx_landmarks_city_id ON public.landmarks(city_id);
CREATE INDEX IF NOT EXISTS idx_itineraries_city_id ON public.itineraries(city_id);
CREATE INDEX IF NOT EXISTS idx_reviews_city_id ON public.reviews(city_id);
CREATE INDEX IF NOT EXISTS idx_cities_country ON public.cities(country);

-- Row Level Security (RLS) Policies
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Allow public read access to catalog data
CREATE POLICY "Public Read Access for Cities" ON public.cities FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Landmarks" ON public.landmarks FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Itineraries" ON public.itineraries FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Reviews" ON public.reviews FOR SELECT USING (true);

-- Allow public inserts for ratings & reservations
CREATE POLICY "Public Insert Access for Reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Access for Reservations" ON public.reservations FOR INSERT WITH CHECK (true);

-- =========================================================================
-- SEED DATA (3+ MAJOR WORLD CITIES WITH RELATIONAL LANDMARKS & ITINERARIES)
-- =========================================================================

-- SEED CITIES
INSERT INTO public.cities (id, name, country, country_code, continent, flag, latitude, longitude, description, hero_image_url, average_rating, best_time_to_visit, weather, famous_for) VALUES
('rome-it', 'Rome', 'Italy', 'IT', 'Europe', '🇮🇹', 41.8902, 12.4922, 'The Eternal City with thousands of years of ancient history, Renaissance palaces, and iconic basilicas.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80', 4.95, 'April - October', '22°C • Sunny', 'Colosseum, Vatican City & Historic Forum'),
('tokyo-jp', 'Tokyo', 'Japan', 'JP', 'Asia', '🇯🇵', 35.6762, 139.6503, 'A futuristic metropolis where neon skyscrapers blend seamlessly with historic shrines and Michelin dining.', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80', 4.98, 'March - May, Sept - Nov', '19°C • Clear', 'Shibuya Crossing, Mount Fuji & Shinto Shrines'),
('agra-in', 'Agra', 'India', 'IN', 'Asia', '🇮🇹', 27.1751, 78.0421, 'Home of the timeless white marble Taj Mahal, Mughal forts, and royal imperial heritage.', 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80', 4.96, 'October - March', '26°C • Fair', 'Taj Mahal & UNESCO Mughal Fortresses'),
('paris-fr', 'Paris', 'France', 'FR', 'Europe', '🇫🇷', 48.8566, 2.3522, 'The City of Light renowned for haute cuisine, high fashion, the Eiffel Tower, and iconic art galleries.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80', 4.92, 'May - September', '21°C • Mild', 'Eiffel Tower, Louvre Museum & Seine Cruises')
ON CONFLICT (id) DO UPDATE SET
    description = EXCLUDED.description,
    average_rating = EXCLUDED.average_rating,
    weather = EXCLUDED.weather;

-- SEED LANDMARKS
INSERT INTO public.landmarks (city_id, name, category, image_url, description, rating, tag) VALUES
-- Rome
('rome-it', 'Colosseum & Roman Forum', 'Ancient Wonder', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', 'The iconic oval amphitheatre in the heart of Rome, once hosting gladiatorial contests.', 4.98, 'Ancient Architecture'),
('rome-it', 'Vatican City & St. Peter''s Basilica', 'Sacred Monument', 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80', 'The spiritual center of the Catholic world housing Michelangelo’s Sistine Chapel.', 4.99, 'Renaissance Masterpieces'),
('rome-it', 'Trevi Fountain', 'Baroque Landmark', 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=800&q=80', 'Rome’s grandest Baroque fountain where travelers toss coins to ensure their return.', 4.93, 'Baroque Sculpture'),
('rome-it', 'Pantheon', 'Imperial Temple', 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80', 'The best-preserved monument of imperial Rome featuring the largest unreinforced concrete dome.', 4.96, 'Roman Engineering'),

-- Tokyo
('tokyo-jp', 'Shibuya Crossing & Hachiko', 'Urban Landmark', 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80', 'The world’s busiest pedestrian intersection illuminated by towering neon billboards.', 4.97, 'Modern Metropolis'),
('tokyo-jp', 'Senso-ji Temple Asakusa', 'Ancient Shrine', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80', 'Tokyo’s oldest Buddhist temple founded in 645 AD with the famous Thunder Gate lantern.', 4.95, 'Shinto & Buddhist Heritage'),
('tokyo-jp', 'Mount Fuji Panoramic Overlook', 'Natural Wonder', 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=800&q=80', 'Japan’s sacred active volcano offering breathtaking snow-capped panoramic horizons.', 4.99, 'Scenic Mountain'),
('tokyo-jp', 'TeamLab Planets & Odaiba', 'Digital Art', 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80', 'Immersive spatial digital art museum where visitors walk through water and luminous light installations.', 4.94, 'Futuristic Art'),

-- Agra
('agra-in', 'Taj Mahal at Sunrise', 'Wonder of the World', 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80', 'The sublime ivory-white marble mausoleum on the southern bank of the Yamuna river.', 5.00, 'UNESCO World Heritage'),
('agra-in', 'Agra Fort', 'Mughal Citadel', 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80', 'The historic red sandstone fort which served as the main residence of the Mughal emperors.', 4.92, 'Mughal Architecture'),
('agra-in', 'Fatehpur Sikri', 'Imperial Ghost City', 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80', 'A masterfully preserved 16th-century Mughal capital built entirely from red sandstone.', 4.88, 'Historic Citadel'),
('agra-in', 'Mehtab Bagh Moonlight Garden', 'Royal Garden', 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80', 'Charbagh garden complex perfectly aligned across the river from the Taj Mahal.', 4.91, 'Panoramic Sunset');

-- SEED ITINERARIES
INSERT INTO public.itineraries (city_id, title, duration_days, day_number, activities) VALUES
('rome-it', 'Ancient Caesars & Vatican Treasures', 4, 1, '[{"time": "09:00", "title": "Private Colosseum Gladiator Floor Tour", "type": "History"}, {"time": "13:00", "title": "Artisan Pasta Masterclass in Trastevere", "type": "Gastronomy"}, {"time": "18:00", "title": "Golden Hour Stroll past the Pantheon & Trevi", "type": "Sightseeing"}]'::jsonb),
('rome-it', 'Ancient Caesars & Vatican Treasures', 4, 2, '[{"time": "08:30", "title": "VIP Early Access to Sistine Chapel & Vatican", "type": "Art"}, {"time": "14:00", "title": "St. Peter’s Dome Climb & Vatican Gardens", "type": "Scenic"}, {"time": "19:30", "title": "Rooftop Dining overlooking Piazza Navona", "type": "Fine Dining"}]'::jsonb),
('tokyo-jp', 'Neon Horizons & Zen Sanctuaries', 5, 1, '[{"time": "09:30", "title": "Senso-ji Asakusa Morning Prayer Ceremony", "type": "Culture"}, {"time": "13:30", "title": "Tsukiji Outer Market Omakase Tasting", "type": "Culinary"}, {"time": "18:30", "title": "Shibuya Sky Observation Deck at Sunset", "type": "Panoramic"}]'::jsonb),
('tokyo-jp', 'Neon Horizons & Zen Sanctuaries', 5, 2, '[{"time": "10:00", "title": "TeamLab Planets Immersive Light Experience", "type": "Digital Art"}, {"time": "14:00", "title": "Harajuku & Meiji Shrine Forest Walk", "type": "Nature"}, {"time": "19:00", "title": "Ginza Michelin-Starred Yakitori Dinner", "type": "Gastronomy"}]'::jsonb),
('agra-in', 'Imperial Mughal Heritage Expedition', 3, 1, '[{"time": "05:45", "title": "Private Sunrise Gate Access to the Taj Mahal", "type": "Monument"}, {"time": "11:00", "title": "Marble Inlay Pietra Dura Workshop with Artisans", "type": "Artisan"}, {"time": "16:30", "title": "Sunset View of Taj from Mehtab Bagh across the Yamuna", "type": "Photography"}]'::jsonb);

-- SEED SAMPLE REVIEWS
INSERT INTO public.reviews (city_id, user_name, rating, comment) VALUES
('rome-it', 'Archduke Charles of Austria', 5, 'An unparalleled private tour of the Vatican and Colosseum. AEROVOYAGE execution was flawless.'),
('tokyo-jp', 'Lady Jacqueline Bennett', 5, 'The helicopter transfer to Mount Fuji and seamless dinner at Ginza was extraordinary.'),
('agra-in', 'Prince Devendra Singh', 5, 'Witnessing the Taj Mahal at dawn without crowds is an unforgettable privilege.');
