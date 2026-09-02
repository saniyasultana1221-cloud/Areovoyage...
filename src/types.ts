export type Continent = 'All' | 'Asia' | 'Europe' | 'Americas' | 'Africa' | 'Oceania';

export type TravelVibe = 'All' | 'Tropical Beach' | 'Adventure & Peaks' | 'Neon City & Culture' | 'Foodie Safari' | 'Romantic Escape' | 'Party & Festivals' | 'Cultural' | 'Luxury' | 'Adventure';

export type AestheticTheme = 'sunset-amber' | 'visionos-obsidian' | 'azure-laguna' | 'emerald-riviera';

export interface Landmark {
  id: string;
  name: string;
  subtext: string;
  image: string;
  location: string;
  coordinates?: string;
  category: string;
  rating?: number;
  description: string;
  tags?: string[];
  iconType?: 'monument' | 'camera' | 'pin' | 'water' | 'mountain' | 'food';
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlight: string;
  activityIcon?: string;
}

export interface Destination {
  id: string;
  name: string;
  shortName?: string;
  country: string;
  countryCode?: string;
  continent: Continent;
  vibe: TravelVibe;
  tagline: string;
  description: string;
  pricePerDayUSD: number;
  durationDays: number;
  rating: number;
  reviewCount: number;
  image: string;
  heroBg?: string;
  gallery: string[];
  weather: string;
  temp: string;
  coordinates?: string;
  bestTimeToVisit: string;
  tags: string[];
  highlights: string[];
  landmarks?: Landmark[];
  itinerary: ItineraryDay[];
  badge?: string;
  badgeColor?: string;
  isTrending?: boolean;
  featuredPackagePriceUSD: number;
}

export interface PackageTour {
  id: string;
  title: string;
  destination: string;
  country: string;
  image: string;
  days: number;
  nights: number;
  originalPriceUSD: number;
  salePriceUSD: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  vibes: TravelVibe[];
  included: string[];
  groupSize: string;
  accentGradient: string;
  departureDate: string;
  spotsLeft: number;
}

export interface QuizOption {
  id: string;
  text: string;
  subtext: string;
  emoji: string;
  vibeMatch: TravelVibe;
  destinationMatchId: string;
  image: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

export interface Review {
  id: string;
  author: string;
  authorLocation: string;
  avatar: string;
  rating: number;
  date: string;
  destination: string;
  comment: string;
  photoUrl?: string;
  likes: number;
}

export interface Currency {
  code: string;
  symbol: string;
  rateToUSD: number;
  name: string;
}

export interface BookingFormState {
  destinationId: string;
  destinationName: string;
  packageId?: string;
  packageName?: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: string;
  durationDays: number;
  travelersCount: number;
  roomType: 'standard' | 'deluxe' | 'luxury-villa';
  selectedAddons: string[];
  couponCode: string;
  discountPercent: number;
  basePriceUSD: number;
  totalPriceUSD: number;
  notes: string;
}

export interface SpinPrize {
  id: string;
  name: string;
  description: string;
  code: string;
  discountValue: string;
  color: string;
  textColor: string;
}
