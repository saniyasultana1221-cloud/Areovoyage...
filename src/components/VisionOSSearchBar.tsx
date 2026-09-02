import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, ChevronLeft, ChevronRight, Lock, Mic, Plus, Share2, Copy,
  Search, X, Sparkles, MapPin, Star, ArrowRight, Heart, Globe as GlobeIcon,
  Palette, Compass, Check, SlidersHorizontal, Layers
} from 'lucide-react';
import { Destination, Currency, AestheticTheme, TravelVibe } from '../types';
import { formatPrice, CURRENCIES } from '../utils/currency';

interface VisionOSSearchBarProps {
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

const QUICK_TAGS = [
  { label: '🏛️ Iconic Wonders', query: 'Wonder' },
  { label: '🏝️ Tropical Beach', query: 'Tropical Beach' },
  { label: '🏔️ Alpine & Peaks', query: 'Alps' },
  { label: '🌆 Neon Cities', query: 'City' },
  { label: '🍷 Romantic', query: 'Romantic' },
  { label: '🍣 Foodie Safari', query: 'Foodie' },
];

const THEME_OPTIONS: { id: AestheticTheme; name: string; color: string }[] = [
  { id: 'sunset-amber', name: 'Sunset Amber', color: '#F59E0B' },
  { id: 'visionos-obsidian', name: 'VisionOS Dark', color: '#8B5CF6' },
  { id: 'azure-laguna', name: 'Azure Cyan', color: '#06B6D4' },
  { id: 'emerald-riviera', name: 'Emerald Jade', color: '#10B981' },
];

export const VisionOSSearchBar: React.FC<VisionOSSearchBarProps> = ({
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
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAAMenu, setShowAAMenu] = useState(false);
  const [showGridMenu, setShowGridMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedBookmark, setAddedBookmark] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setShowAAMenu(false);
        setShowGridMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter destinations based on search term
  const searchResults = destinations.filter((d) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const matchName = d.name.toLowerCase().includes(term);
    const matchCountry = d.country.toLowerCase().includes(term);
    const matchVibe = d.vibe.toLowerCase().includes(term);
    const matchTag = d.tags.some((t) => t.toLowerCase().includes(term));
    const matchLandmark = d.landmarks?.some((l) => 
      l.name.toLowerCase().includes(term) || 
      l.description.toLowerCase().includes(term) ||
      l.location.toLowerCase().includes(term)
    );
    return matchName || matchCountry || matchVibe || matchTag || matchLandmark;
  });

  const handleDestinationClick = (dest: Destination) => {
    onSelectDestination(dest);
    setIsFocused(false);
    setSearchTerm('');
    if (onSearchQueryChange) onSearchQueryChange('');
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice listening effect with random exciting query
    const sampleQueries = ['Rome Colosseum', 'Kyoto Cherry Blossom', 'Agra Taj Mahal', 'Amalfi Coast Italy', 'Swiss Alps Matterhorn', 'Santorini Sunset'];
    setTimeout(() => {
      const picked = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setSearchTerm(picked);
      setIsFocused(true);
      setIsListening(false);
      if (onSearchQueryChange) onSearchQueryChange(picked);
    }, 1800);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleBookmarkToggle = () => {
    onToggleBookmark(currentDestination);
    setAddedBookmark(true);
    setTimeout(() => setAddedBookmark(false), 1800);
  };

  const handlePrev = () => {
    const currIdx = destinations.findIndex((d) => d.id === currentDestination.id);
    const prevIdx = currIdx > 0 ? currIdx - 1 : destinations.length - 1;
    onSelectDestination(destinations[prevIdx]);
  };

  const handleNext = () => {
    const currIdx = destinations.findIndex((d) => d.id === currentDestination.id);
    const nextIdx = currIdx < destinations.length - 1 ? currIdx + 1 : 0;
    onSelectDestination(destinations[nextIdx]);
  };

  return (
    <div ref={containerRef} className="relative z-50 w-full max-w-4xl mx-auto px-3 sm:px-6">
      
      {/* ========================================================================= */}
      {/* MAIN SOLID FROSTED GLASS CAPSULE BAR (EXACT REFERENCE DESIGN) */}
      {/* ========================================================================= */}
      <div 
        className="rounded-full px-2.5 sm:px-3.5 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-2.5 shadow-2xl transition-all duration-300 select-none"
        style={{
          background: 'linear-gradient(180deg, rgba(38, 45, 60, 0.85) 0%, rgba(20, 26, 38, 0.90) 100%)',
          backdropFilter: 'blur(36px) saturate(210%)',
          WebkitBackdropFilter: 'blur(36px) saturate(210%)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.7), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45)',
        }}
      >
        
        {/* Left Circular Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          
          {/* Grid Menu Button */}
          <button
            onClick={() => {
              setShowGridMenu(!showGridMenu);
              setShowAAMenu(false);
              setIsFocused(false);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition shadow-sm"
            title="Browse All Destinations Grid"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Previous Chevron */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition shadow-sm"
            title="Previous Destination"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Chevron */}
          <button
            onClick={handleNext}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition shadow-sm"
            title="Next Destination"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* ======================================================================= */}
        {/* CENTER OMNIBOX SEARCH INPUT PILL */}
        {/* ======================================================================= */}
        <div 
          onClick={() => {
            setIsFocused(true);
            setShowAAMenu(false);
            setShowGridMenu(false);
            if (inputRef.current) inputRef.current.focus();
          }}
          className={`flex-1 flex items-center justify-between rounded-full px-3 sm:px-4 py-1 sm:py-1.5 mx-1 transition-all duration-300 border ${
            isFocused 
              ? 'bg-black/60 border-amber-400/70 shadow-[0_0_20px_rgba(245,158,11,0.25)]' 
              : 'bg-black/35 hover:bg-black/45 border-white/15'
          }`}
        >
          {/* Left: AA Reader & Display Settings Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAAMenu(!showAAMenu);
              setShowGridMenu(false);
            }}
            className="p-1 sm:px-2 py-0.5 rounded-full hover:bg-white/15 text-slate-300 hover:text-white transition text-xs font-serif font-bold tracking-tight flex items-center gap-0.5"
            title="Display & Aesthetic Settings"
          >
            <span>AA</span>
          </button>

          {/* Center: Search Field or Active Destination Label */}
          <div className="flex-1 flex items-center justify-center px-2 min-w-0">
            {isFocused ? (
              <div className="w-full flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (onSearchQueryChange) onSearchQueryChange(e.target.value);
                  }}
                  placeholder="Search destinations, landmarks, vibes..."
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white placeholder-slate-400 focus:outline-none truncate"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchTerm('');
                      if (onSearchQueryChange) onSearchQueryChange('');
                    }}
                    className="p-1 rounded-full hover:bg-white/20 text-slate-400 hover:text-white transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 cursor-text truncate">
                <Lock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                  {currentDestination.shortName || currentDestination.name} Explorer
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] flex-shrink-0" />
              </div>
            )}
          </div>

          {/* Right: Microphone Voice Search Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleVoiceSearch();
            }}
            className={`p-1.5 rounded-full transition ${
              isListening 
                ? 'bg-amber-500 text-slate-950 animate-pulse shadow-[0_0_12px_#F59E0B]' 
                : 'hover:bg-white/15 text-slate-300 hover:text-amber-400'
            }`}
            title="Voice Search"
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Circular Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          
          {/* Add to Bucket list (+) */}
          <button
            onClick={handleBookmarkToggle}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition shadow-sm ${
              addedBookmark 
                ? 'bg-amber-500 text-slate-950 border-amber-400' 
                : isBookmarked 
                ? 'bg-rose-500/20 text-rose-400 border-rose-400/40 hover:bg-rose-500/30' 
                : 'bg-white/[0.08] hover:bg-white/[0.18] border-white/15 text-slate-300 hover:text-white'
            }`}
            title={isBookmarked ? 'Saved in Bucket List' : 'Add to Bucket List'}
          >
            {addedBookmark ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>

          {/* Share Action Button */}
          <button
            onClick={handleShare}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition shadow-sm ${
              copiedLink 
                ? 'bg-emerald-500 text-slate-950 border-emerald-400' 
                : 'bg-white/[0.08] hover:bg-white/[0.18] border-white/15 text-slate-300 hover:text-white'
            }`}
            title={copiedLink ? 'Link Copied!' : 'Share Voyager Experience'}
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Tabs / Catalog View Switcher */}
          <button
            onClick={() => {
              if (onScrollToCatalog) {
                onScrollToCatalog();
              } else {
                const el = document.getElementById('destinations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 flex items-center justify-center text-slate-300 hover:text-amber-400 transition shadow-sm"
            title="Switch to Catalog Grid & Itineraries"
          >
            <Copy className="w-4 h-4" />
          </button>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* SOLID FROSTED GLASS SEARCH RESULTS FLYOUT DROPDOWN */}
      {/* ========================================================================= */}
      {isFocused && (
        <div 
          className="absolute left-3 right-3 sm:left-6 sm:right-6 top-full mt-3 rounded-[28px] overflow-hidden shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200"
          style={{
            background: 'linear-gradient(180deg, rgba(28, 35, 48, 0.94) 0%, rgba(14, 19, 30, 0.96) 100%)',
            backdropFilter: 'blur(40px) saturate(210%)',
            WebkitBackdropFilter: 'blur(40px) saturate(210%)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.85), inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.45)',
          }}
        >
          {/* Quick Filter Tag Pills */}
          <div className="p-3.5 border-b border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag.label}
                onClick={() => {
                  setSearchTerm(tag.query);
                  if (onSearchQueryChange) onSearchQueryChange(tag.query);
                }}
                className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.18] border border-white/15 text-slate-200 hover:text-white text-xs font-bold whitespace-nowrap transition"
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Search Result Items */}
          <div className="max-h-[380px] overflow-y-auto p-3 space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => handleDestinationClick(dest)}
                  className={`p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3.5 group ${
                    dest.id === currentDestination.id
                      ? 'bg-amber-500/20 border-amber-400/60 shadow-lg'
                      : 'bg-white/[0.05] hover:bg-white/[0.12] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/20 flex-shrink-0 shadow-md group-hover:scale-105 transition"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition truncate">
                          {dest.name}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                          {dest.country}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 truncate mt-0.5">
                        {dest.tagline}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-amber-400 font-bold mt-0.5">
                        <span>★ {dest.rating}</span>
                        <span className="text-slate-400">•</span>
                        <span>{dest.vibe}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-mono font-black text-amber-300 hidden sm:inline">
                      {formatPrice(dest.pricePerDayUSD, currency)}/d
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetails(dest);
                        setIsFocused(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition"
                    >
                      Itinerary
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookNow(dest);
                        setIsFocused(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-black shadow-md transition"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 text-xs">
                No matching voyages found for "{searchTerm}". Try searching by country, landmark, or vibe.
              </div>
            )}
          </div>

          {/* Bottom Footer Info */}
          <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Showing {searchResults.length} spatial destinations</span>
            <span className="text-amber-400 font-bold">Press ESC to dismiss</span>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* AA DISPLAY & AESTHETIC PREFERENCES POPOVER */}
      {/* ========================================================================= */}
      {showAAMenu && (
        <div 
          className="absolute left-12 top-full mt-3 w-64 rounded-3xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 space-y-4"
          style={{
            background: 'linear-gradient(180deg, rgba(28, 35, 48, 0.94) 0%, rgba(14, 19, 30, 0.96) 100%)',
            backdropFilter: 'blur(36px) saturate(210%)',
            WebkitBackdropFilter: 'blur(36px) saturate(210%)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.85)',
          }}
        >
          {/* Aesthetic Palette */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              Color Theme Palette
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange(t.id)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between transition border ${
                    currentTheme === t.id
                      ? 'bg-white/20 text-white border-white/30 font-black'
                      : 'bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 border-white/10'
                  }`}
                >
                  <span className="truncate">{t.name}</span>
                  <span className="w-2.5 h-2.5 rounded-full border border-black/40 flex-shrink-0" style={{ backgroundColor: t.color }} />
                </button>
              ))}
            </div>
          </div>

          {/* Currency Switcher */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
              Currency
            </span>
            <div className="grid grid-cols-3 gap-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => onCurrencyChange(c)}
                  className={`py-1 rounded-xl text-xs font-bold transition border ${
                    currency.code === c.code
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                      : 'bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 border-white/10'
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          {/* Vibe Assessment Trigger */}
          <button
            onClick={() => {
              onOpenQuiz();
              setShowAAMenu(false);
            }}
            className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Launch Vibe Assessment</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GRID ALL-DESTINATIONS OVERVIEW DRAWER */}
      {/* ========================================================================= */}
      {showGridMenu && (
        <div 
          className="absolute left-3 right-3 sm:left-6 sm:right-6 top-full mt-3 rounded-[32px] p-5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200"
          style={{
            background: 'linear-gradient(180deg, rgba(28, 35, 48, 0.96) 0%, rgba(14, 19, 30, 0.98) 100%)',
            backdropFilter: 'blur(40px) saturate(210%)',
            WebkitBackdropFilter: 'blur(40px) saturate(210%)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9)',
          }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-display font-black text-base text-white">Spatial Voyager Catalog</h3>
            <span className="text-xs text-amber-400 font-bold">{destinations.length} Destinations</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 max-h-[360px] overflow-y-auto pr-1">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => {
                  onSelectDestination(dest);
                  setShowGridMenu(false);
                }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group border transition transform hover:-translate-y-1 ${
                  dest.id === currentDestination.id
                    ? 'border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-2 ring-amber-400/50'
                    : 'border-white/15 hover:border-white/30'
                }`}
              >
                <div className="h-28 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider block">
                    {dest.country}
                  </span>
                  <h4 className="text-xs font-black text-white truncate">
                    {dest.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
