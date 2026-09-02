import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, MapPin, Sparkles, Calendar, DollarSign, Compass, 
  SlidersHorizontal, X, ArrowRight, Star, Heart, Check, 
  ChevronDown, Globe, Flame, Shield, Eye, Navigation, Award, RotateCcw
} from 'lucide-react';
import { Destination, Currency, TravelVibe, Continent, AestheticTheme } from '../types';
import { formatPrice, CURRENCIES } from '../utils/currency';

interface SpatialSearchEngineProps {
  destinations: Destination[];
  currentDestination: Destination;
  onSelectDestination: (destination: Destination) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  isBookmarked: boolean;
  onToggleBookmark: (destination: Destination) => void;
  onOpenDetails: (destination: Destination) => void;
  onBookNow: (destination: Destination) => void;
  onOpenBucketList: () => void;
  onOpenQuiz: () => void;
  onOpenSpinWheel: () => void;
  currentTheme: AestheticTheme;
  onThemeChange: (theme: AestheticTheme) => void;
  onSearchQueryChange?: (query: string) => void;
  onScrollToCatalog?: () => void;
}

const CONTINENT_OPTIONS: Continent[] = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];

const VIBE_OPTIONS: { label: string; vibe: TravelVibe; icon: string }[] = [
  { label: 'All Vibes', vibe: 'All', icon: '✨' },
  { label: 'Romantic Escape', vibe: 'Romantic Escape', icon: '🍷' },
  { label: 'Iconic Wonders', vibe: 'Cultural', icon: '🏛️' },
  { label: 'Tropical Beach', vibe: 'Tropical Beach', icon: '🏝️' },
  { label: 'Alpine & Peaks', vibe: 'Adventure & Peaks', icon: '🏔️' },
  { label: 'Neon City', vibe: 'Neon City & Culture', icon: '🌆' },
  { label: 'Foodie Safari', vibe: 'Foodie Safari', icon: '🍜' },
];

const CURATED_PROMPTS = [
  { text: 'Colosseum & Ancient Rome VIP access', destId: 'rome-italy' },
  { text: 'Taj Mahal sunrise & Mughal palaces', destId: 'agra-india' },
  { text: 'Kyoto zen temples & bamboo groves', destId: 'tokyo-kyoto-japan' },
  { text: 'Amalfi cliffside sunset & limoncello coast', destId: 'amalfi-italy' },
  { text: 'Santorini whitewashed caldera views', destId: 'santorini-greece' },
  { text: 'Swiss Alps Zermatt & Matterhorn peaks', destId: 'swiss-alps' },
  { text: 'Bali tropical waterfalls & rice terraces', destId: 'bali-indonesia' },
  { text: 'Paris Eiffel Tower & Louvre after-hours', destId: 'paris-france' },
];

export const SpatialSearchEngine: React.FC<SpatialSearchEngineProps> = ({
  destinations,
  currentDestination,
  onSelectDestination,
  currency,
  onCurrencyChange,
  isBookmarked,
  onToggleBookmark,
  onOpenDetails,
  onBookNow,
  onOpenBucketList,
  onOpenQuiz,
  onOpenSpinWheel,
  currentTheme,
  onThemeChange,
  onSearchQueryChange,
  onScrollToCatalog,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<Continent>('All');
  const [selectedVibe, setSelectedVibe] = useState<TravelVibe>('All');
  const [maxPricePerDay, setMaxPricePerDay] = useState<number>(600);
  const [selectedDuration, setSelectedDuration] = useState<number>(14);
  const [activeTab, setActiveTab] = useState<'all' | 'curated' | 'trending'>('all');

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close expanded panel on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter destinations based on search query, continent, vibe, price, duration
  const filteredResults = destinations.filter((dest) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = dest.name.toLowerCase().includes(q);
      const matchCountry = dest.country.toLowerCase().includes(q);
      const matchTag = dest.tags.some((t) => t.toLowerCase().includes(q));
      const matchLandmark = dest.landmarks?.some((l) => 
        l.name.toLowerCase().includes(q) || 
        l.description.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q)
      );
      if (!matchName && !matchCountry && !matchTag && !matchLandmark) return false;
    }

    // Continent match
    if (selectedContinent !== 'All' && dest.continent !== selectedContinent) {
      return false;
    }

    // Vibe match
    if (selectedVibe !== 'All' && dest.vibe !== selectedVibe) {
      return false;
    }

    // Price match
    if (dest.pricePerDayUSD > maxPricePerDay) {
      return false;
    }

    // Duration match
    if (dest.durationDays > selectedDuration) {
      return false;
    }

    return true;
  });

  const handleSelectVoyage = (dest: Destination) => {
    onSelectDestination(dest);
    setIsExpanded(false);
    setSearchQuery('');
    if (onSearchQueryChange) onSearchQueryChange('');
  };

  const handleSurpriseMe = () => {
    const otherDestinations = destinations.filter((d) => d.id !== currentDestination.id);
    const randomPick = otherDestinations[Math.floor(Math.random() * otherDestinations.length)] || destinations[0];
    onSelectDestination(randomPick);
    setIsExpanded(false);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedContinent('All');
    setSelectedVibe('All');
    setMaxPricePerDay(600);
    setSelectedDuration(14);
    if (onSearchQueryChange) onSearchQueryChange('');
  };

  return (
    <div ref={containerRef} className="relative z-50 w-full max-w-5xl mx-auto px-4 select-none">
      
      {/* ========================================================================= */}
      {/* 1. MASTER SOLID FROSTED GLASS CAPSULE SEARCH BAR */}
      {/* ========================================================================= */}
      <div 
        className="rounded-full p-2 sm:p-2.5 shadow-2xl transition-all duration-500 select-none"
        style={{
          background: 'linear-gradient(180deg, rgba(32, 40, 56, 0.88) 0%, rgba(16, 22, 34, 0.94) 100%)',
          backdropFilter: 'blur(40px) saturate(220%)',
          WebkitBackdropFilter: 'blur(40px) saturate(220%)',
          border: '1px solid rgba(255, 255, 255, 0.24)',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.8), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.45)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
          
          {/* Destination Segment */}
          <button
            onClick={() => {
              setIsExpanded(true);
              if (inputRef.current) inputRef.current.focus();
            }}
            className="flex-1 min-w-[140px] px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-white/25 text-left transition flex items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition flex-shrink-0">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none">
                Destination
              </span>
              <span className="text-xs sm:text-sm font-black text-white truncate block mt-0.5">
                {searchQuery || currentDestination.shortName || 'Explore World'}
              </span>
            </div>
          </button>

          {/* Vibe / Experience Segment */}
          <button
            onClick={() => setIsExpanded(true)}
            className="hidden md:flex px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-white/25 text-left transition items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-full bg-violet-500/20 border border-violet-400/40 flex items-center justify-center text-violet-300 group-hover:scale-110 transition flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none">
                Vibe & Style
              </span>
              <span className="text-xs font-black text-white truncate block mt-0.5">
                {selectedVibe === 'All' ? 'All Experiences' : selectedVibe}
              </span>
            </div>
          </button>

          {/* Budget & Currency Segment */}
          <button
            onClick={() => setIsExpanded(true)}
            className="hidden lg:flex px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-white/25 text-left transition items-center gap-2.5 group"
          >
            <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition flex-shrink-0">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none">
                Rate / Day
              </span>
              <span className="text-xs font-black text-white truncate block mt-0.5 font-mono">
                Up to {formatPrice(maxPricePerDay, currency)}
              </span>
            </div>
          </button>

          {/* Quick Surprise Button */}
          <button
            onClick={handleSurpriseMe}
            className="px-3 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-slate-200 hover:text-amber-300 text-xs font-bold transition flex items-center gap-1.5"
            title="Spin to a random luxury destination"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          {/* Luminous Search Engine Trigger */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition transform hover:scale-105 flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-slate-950" />
            <span>Search</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-950/20 text-slate-950 font-mono text-[10px] font-black">
              {filteredResults.length}
            </span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SOLID FROSTED GLASS EXPANDED SEARCH HUB MATRIX */}
      {/* ========================================================================= */}
      {isExpanded && (
        <div 
          className="absolute left-4 right-4 top-full mt-3.5 rounded-[32px] sm:rounded-[38px] p-5 sm:p-7 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 space-y-6"
          style={{
            background: 'linear-gradient(180deg, rgba(26, 33, 48, 0.96) 0%, rgba(12, 17, 28, 0.98) 100%)',
            backdropFilter: 'blur(45px) saturate(220%)',
            WebkitBackdropFilter: 'blur(45px) saturate(220%)',
            border: '1px solid rgba(255, 255, 255, 0.24)',
            boxShadow: '0 35px 90px -15px rgba(0, 0, 0, 0.9), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.45)',
          }}
        >
          
          {/* Top Search Input Bar */}
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
            
            <div className="flex-1 flex items-center gap-3 bg-black/40 rounded-2xl px-4 py-3 border border-white/15 focus-within:border-amber-400/80 transition">
              <Search className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearchQueryChange) onSearchQueryChange(e.target.value);
                }}
                placeholder="Search any country, landmark (e.g. Colosseum, Taj Mahal, Eiffel), or vibe..."
                className="w-full bg-transparent text-sm font-bold text-white placeholder-slate-400 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full hover:bg-white/20 text-slate-400 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="p-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-slate-300 hover:text-white transition"
              title="Close Search Engine"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

          {/* Curated AI Prompt Suggestions */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              Instant Curated Voyages
            </span>
            <div className="flex flex-wrap gap-2">
              {CURATED_PROMPTS.map((prompt) => (
                <button
                  key={prompt.destId}
                  onClick={() => {
                    const target = destinations.find((d) => d.id === prompt.destId);
                    if (target) handleSelectVoyage(target);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/10 hover:border-amber-400/50 text-slate-200 hover:text-white text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span className="text-amber-400">✦</span>
                  <span>{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Matrix: Continents & Vibes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            {/* Continents */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Region / Continent
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CONTINENT_OPTIONS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedContinent(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                      selectedContinent === c
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                        : 'bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 border-white/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Vibes */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Travel Style & Atmosphere
              </span>
              <div className="flex flex-wrap gap-1.5">
                {VIBE_OPTIONS.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVibe(v.vibe)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border flex items-center gap-1 ${
                      selectedVibe === v.vibe
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                        : 'bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 border-white/10'
                    }`}
                  >
                    <span>{v.icon}</span>
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Budget & Duration Range Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
            
            {/* Price Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Max Daily Rate:</span>
                <span className="font-mono font-black text-amber-400">{formatPrice(maxPricePerDay, currency)} / day</span>
              </div>
              <input
                type="range"
                min="100"
                max="600"
                step="25"
                value={maxPricePerDay}
                onChange={(e) => setMaxPricePerDay(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Duration Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">Max Trip Duration:</span>
                <span className="font-mono font-black text-amber-400">{selectedDuration} Days</span>
              </div>
              <input
                type="range"
                min="3"
                max="14"
                step="1"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Real-time Matching Destination Results Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Matching Destinations ({filteredResults.length})
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-amber-400 transition flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredResults.length > 0 ? (
                filteredResults.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => handleSelectVoyage(dest)}
                    className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-amber-400/60 transition cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-14 h-14 rounded-xl object-cover border border-white/20 flex-shrink-0 group-hover:scale-105 transition"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                        <MapPin className="w-3 h-3" />
                        <span>{dest.country}</span>
                      </div>
                      <h4 className="text-xs font-black text-white truncate group-hover:text-amber-300 transition">
                        {dest.name}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] mt-1">
                        <span className="font-mono font-bold text-amber-300">
                          {formatPrice(dest.pricePerDayUSD, currency)}/d
                        </span>
                        <span className="text-slate-400 text-[10px]">★ {dest.rating}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-xs text-slate-400">
                  No destinations match your exact filter combination. Try expanding the price or resetting filters.
                </div>
              )}
            </div>
          </div>

          {/* Footer Action Strip */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/10">
            <span>Selecting any voyage smoothly rotates the 3D Earth to that coordinates</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition"
            >
              Done
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
