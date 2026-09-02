import React, { useState, useMemo } from 'react';
import { 
  Sparkles, ArrowUpDown, Search, Compass, MapPin, Globe, 
  SlidersHorizontal, Star, Heart, ArrowRight, Eye, CheckCircle2 
} from 'lucide-react';
import { Destination, Currency, TravelVibe, Continent } from '../types';
import { DestinationCard } from './DestinationCard';
import { CosmicStarfield } from './CosmicStarfield';
import { Cosmos3DFloatingStage, FloatingCardItem } from './Cosmos3DFloatingStage';

interface DestinationExplorerProps {
  destinations: Destination[];
  currency: Currency;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  selectedVibe: TravelVibe;
  onSelectedVibeChange: (vibe: TravelVibe) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (destination: Destination) => void;
  onSelectDestination: (dest: Destination) => void;
  onBookNow: (dest: Destination) => void;
}

const REGIONS: Continent[] = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];

const VIBES: { label: TravelVibe; icon: string }[] = [
  { label: 'All', icon: '✦' },
  { label: 'Tropical Beach', icon: '🌴' },
  { label: 'Adventure & Peaks', icon: '🏔️' },
  { label: 'Neon City & Culture', icon: '🏮' },
  { label: 'Foodie Safari', icon: '🍷' },
  { label: 'Romantic Escape', icon: '✨' },
  { label: 'Party & Festivals', icon: '🎉' },
  { label: 'Cultural', icon: '🏛️' },
  { label: 'Luxury', icon: '👑' },
  { label: 'Adventure', icon: '🧗' },
];

// 6 Aesthetic 3x4 Rectangle Photos Beautifully Placed Around the Central Name Lines (Cosmos Aesthetic)
const FLOATING_SHOWCASE: FloatingCardItem[] = [
  {
    id: 'amalfi',
    title: 'Amalfi Coast',
    subtitle: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=85',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'top-6 left-4 lg:left-8 xl:left-14',
    rotation: '-rotate-3',
    parallaxFactor: 16,
  },
  {
    id: 'swiss',
    title: 'Swiss Alps',
    subtitle: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=85',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'top-1/2 -translate-y-1/2 left-2 lg:left-4 xl:left-8',
    rotation: 'rotate-2',
    parallaxFactor: 18,
  },
  {
    id: 'paris',
    title: 'Paris Lights',
    subtitle: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=85',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'bottom-6 left-4 lg:left-8 xl:left-14',
    rotation: '-rotate-2',
    parallaxFactor: 14,
  },
  {
    id: 'tokyo',
    title: 'Kyoto & Tokyo',
    subtitle: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=85',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'top-6 right-4 lg:right-8 xl:right-14',
    rotation: 'rotate-3',
    parallaxFactor: 16,
  },
  {
    id: 'santorini',
    title: 'Santorini Caldera',
    subtitle: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=85',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'top-1/2 -translate-y-1/2 right-2 lg:right-4 xl:right-8',
    rotation: '-rotate-2',
    parallaxFactor: 18,
  },
  {
    id: 'bali',
    title: 'Bali Sanctuary',
    subtitle: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=85',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'bottom-6 right-4 lg:right-8 xl:right-14',
    rotation: 'rotate-2',
    parallaxFactor: 14,
  },
];

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  destinations,
  currency,
  searchQuery,
  onSearchQueryChange,
  selectedVibe,
  onSelectedVibeChange,
  bookmarkedIds,
  onToggleBookmark,
  onSelectDestination,
  onBookNow,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<Continent>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating'>('recommended');

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Search query match
        const matchesQuery =
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.continent.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (dest.landmarks && dest.landmarks.some((lm) => lm.name.toLowerCase().includes(searchQuery.toLowerCase())));

        // Region filter match
        const matchesRegion = selectedRegion === 'All' || dest.continent.toLowerCase() === selectedRegion.toLowerCase();

        // Vibe match
        const matchesVibe = selectedVibe === 'All' || dest.vibe.toLowerCase() === selectedVibe.toLowerCase();

        return matchesQuery && matchesRegion && matchesVibe;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.pricePerDayUSD - b.pricePerDayUSD;
        if (sortBy === 'price-high') return b.pricePerDayUSD - a.pricePerDayUSD;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.rating - a.rating; // default recommended
      });
  }, [destinations, searchQuery, selectedRegion, selectedVibe, sortBy]);

  return (
    <section id="destinations" className="py-24 bg-transparent relative overflow-hidden select-none">
      
      {/* Background Deep Space Starfield & Cosmic Dust */}
      <CosmicStarfield density={90} speed={0.15} />

      {/* Ambient Deep Space Backdrops */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 3D FLOATING PARTICLES & CARDS CANVAS WITH PARALLAX & COSMOS TYPOGRAPHY */}
        {/* ========================================================================= */}
        <Cosmos3DFloatingStage
          centralWord="COSMOS"
          titlePrefix="Curated Destination"
          titleSuffix="Portfolio"
          subtitle="Hand-picked verified luxury properties, private cliffside villas, and bespoke cultural expeditions across 6 continents."
          taglineRoles={['photographers', 'architects', 'luxury voyagers', 'curators', 'explorers']}
          cards={FLOATING_SHOWCASE}
          filterTags={['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania']}
          activeTag={selectedRegion}
          onTagSelect={(tag) => setSelectedRegion(tag as any)}
          onCardClick={(card) => onSearchQueryChange(card.title)}
        />

        {/* ========================================================================= */}
        {/* BEAUTIFUL UNIFIED FLOATING CONTROLS & PILL BAR */}
        {/* ========================================================================= */}
        <div className="space-y-5 mb-12">
          
          {/* Main Floating Glass Capsule Bar for Search & Controls */}
          <div 
            className="visionos-glass-card rounded-[28px] p-3.5 sm:p-4 border border-white/20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-3.5"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 27, 40, 0.94) 0%, rgba(10, 14, 22, 0.98) 100%)',
            }}
          >
            
            {/* Left: Region Pills Group */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-1.5 flex items-center gap-1 pl-1 flex-shrink-0">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Region:</span>
              </span>
              {REGIONS.map((region) => {
                const isActive = selectedRegion === region;
                return (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/25'
                        : 'bg-white/10 text-slate-200 hover:bg-white/20 hover:text-white border border-white/10'
                    }`}
                  >
                    {region === 'All' ? 'All Global' : region}
                  </button>
                );
              })}
            </div>

            {/* Right: Quick Search & Sort Bar */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
              
              {/* Search Capsule */}
              <div className="relative flex-1 sm:w-60 lg:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter catalog..."
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2 bg-black/40 text-white placeholder-slate-400 text-xs font-semibold rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchQueryChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1 bg-black/40 px-3 py-2 rounded-xl border border-white/15 text-xs font-semibold text-slate-200 flex-shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white focus:outline-none cursor-pointer font-bold text-xs"
                >
                  <option value="recommended" className="bg-slate-900 text-white">Curator's Pick</option>
                  <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
                  <option value="price-low" className="bg-slate-900 text-white">Price: Low to High</option>
                  <option value="price-high" className="bg-slate-900 text-white">Price: High to Low</option>
                </select>
              </div>

            </div>

          </div>

          {/* Travel Vibe Filter Carousel Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none px-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1 flex-shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Vibe:</span>
            </span>
            {VIBES.map((v) => {
              const isActive = selectedVibe === v.label;
              return (
                <button
                  key={v.label}
                  onClick={() => onSelectedVibeChange(v.label)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-950 font-black shadow-lg'
                      : 'bg-white/[0.07] text-slate-300 hover:bg-white/15 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{v.icon}</span>
                  <span>{v.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* DESTINATION CARDS GRID */}
        {/* ========================================================================= */}
        {filteredDestinations.length === 0 ? (
          <div className="py-16 text-center space-y-3 rounded-3xl bg-white/[0.03] border border-white/10">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-amber-400 mx-auto text-xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white font-display">No Destinations Match Your Filter</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              We couldn't find any bespoke expeditions matching "{searchQuery}". Try clearing filters or exploring other regions.
            </p>
            <button
              onClick={() => {
                onSearchQueryChange('');
                setSelectedRegion('All');
                onSelectedVibeChange('All');
              }}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                currency={currency}
                isBookmarked={bookmarkedIds.includes(destination.id)}
                onToggleBookmark={onToggleBookmark}
                onSelect={onSelectDestination}
                onBookNow={onBookNow}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
