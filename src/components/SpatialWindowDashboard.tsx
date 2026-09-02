import React, { useState } from 'react';
import { 
  Home, Map, Bookmark, Ticket, Settings, Search, Heart, Bell, 
  MapPin, Sun, CloudSun, Sparkles, ChevronRight, Camera, Navigation,
  Compass, ArrowRight, Star, ShieldCheck, Check, Palette, Globe, Layers
} from 'lucide-react';
import { Destination, Landmark, Currency, AestheticTheme } from '../types';
import { CURRENCIES, formatPrice } from '../utils/currency';

interface SpatialWindowDashboardProps {
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
  onSwitchTo3DView?: () => void;
  viewMode: '3d-coverflow' | 'spatial-window' | 'curated-catalog';
  onViewModeChange: (mode: '3d-coverflow' | 'spatial-window' | 'curated-catalog') => void;
  currentTheme: AestheticTheme;
  onThemeChange: (theme: AestheticTheme) => void;
  bucketListCount: number;
}

const THEME_OPTIONS: { id: AestheticTheme; name: string; color: string }[] = [
  { id: 'sunset-amber', name: 'Sunset Amber', color: '#F59E0B' },
  { id: 'visionos-obsidian', name: 'VisionOS Dark', color: '#8B5CF6' },
  { id: 'azure-laguna', name: 'Azure Cyan', color: '#06B6D4' },
  { id: 'emerald-riviera', name: 'Emerald Jade', color: '#10B981' },
];

export const SpatialWindowDashboard: React.FC<SpatialWindowDashboardProps> = ({
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
  onSwitchTo3DView,
  viewMode,
  onViewModeChange,
  currentTheme,
  onThemeChange,
  bucketListCount,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'map' | 'saved' | 'tickets' | 'settings'>('home');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string | null>(null);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  const landmarks: Landmark[] = currentDestination.landmarks || [];
  const activeLandmark = landmarks.find((l) => l.id === selectedLandmarkId) || landmarks[0] || {
    id: `${currentDestination.id}-main`,
    name: currentDestination.name,
    subtext: currentDestination.country,
    image: currentDestination.image,
    location: currentDestination.country,
    category: 'Wonder',
    description: currentDestination.description,
    rating: currentDestination.rating,
  };

  const filteredLandmarks = landmarks.filter((l) => 
    l.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.subtext.toLowerCase().includes(searchFilter.toLowerCase()) ||
    l.location.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <section className="relative w-full min-h-screen py-8 lg:py-14 overflow-hidden room-backdrop select-none flex items-center justify-center">
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[450px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[400px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ========================================================================= */}
        {/* VISIONOS SPATIAL FLOATING GLASS MASTER WINDOW (EXACT REFERENCE 2) */}
        {/* ========================================================================= */}
        <div className="visionos-glass-window rounded-[36px] sm:rounded-[44px] p-4 sm:p-7 lg:p-9 relative z-10 shadow-2xl transition duration-500">
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* ===================================================================== */}
            {/* LEFT VERTICAL NAVIGATION DOCK (EXACT REFERENCE 2) */}
            {/* ===================================================================== */}
            <div className="flex lg:flex-col items-center justify-between lg:justify-start gap-3 sm:gap-5 pb-4 lg:pb-0 lg:pr-5 border-b lg:border-b-0 lg:border-r border-white/10">
              
              {/* App / City Icon Thumbnail */}
              <div 
                onClick={() => onViewModeChange('3d-coverflow')}
                className="w-12 h-12 rounded-2xl overflow-hidden border border-white/30 shadow-lg cursor-pointer transform hover:scale-105 transition"
                title="Switch to 3D Coverflow"
              >
                <img
                  src={currentDestination.image}
                  alt={currentDestination.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Navigation Pill Buttons */}
              <div className="flex lg:flex-col items-center gap-2 sm:gap-3">
                
                {/* Home (Active Amber Glowing Button in Ref 2) */}
                <button
                  onClick={() => setActiveTab('home')}
                  className={`p-3 rounded-2xl transition duration-300 ${
                    activeTab === 'home'
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                      : 'hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                  title="Dashboard Home"
                >
                  <Home className="w-5 h-5" />
                </button>

                {/* Map / 3D Coverflow */}
                <button
                  onClick={() => {
                    setActiveTab('map');
                    onViewModeChange('3d-coverflow');
                  }}
                  className={`p-3 rounded-2xl transition duration-300 ${
                    activeTab === 'map'
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                      : 'hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                  title="3D Spatial Stage (Photo 1)"
                >
                  <Map className="w-5 h-5" />
                </button>

                {/* Saved / Bookmarks */}
                <button
                  onClick={() => {
                    setActiveTab('saved');
                    onOpenBucketList();
                  }}
                  className={`relative p-3 rounded-2xl transition duration-300 ${
                    activeTab === 'saved'
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                      : 'hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                  title="Saved Itineraries"
                >
                  <Bookmark className="w-5 h-5" />
                  {bucketListCount > 0 && (
                    <span className="absolute 1 top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </button>

                {/* Tickets / Flash Deals */}
                <button
                  onClick={() => {
                    setActiveTab('tickets');
                    const el = document.getElementById('deals');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-3 rounded-2xl transition duration-300 ${
                    activeTab === 'tickets'
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                      : 'hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                  title="Exclusive Deals & Passes"
                >
                  <Ticket className="w-5 h-5" />
                </button>

                {/* Settings / Quiz */}
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    onOpenQuiz();
                  }}
                  className={`p-3 rounded-2xl transition duration-300 ${
                    activeTab === 'settings'
                      ? 'bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                      : 'hover:bg-white/10 text-slate-300 hover:text-white'
                  }`}
                  title="Vibe Assessment & Preferences"
                >
                  <Settings className="w-5 h-5" />
                </button>

              </div>

            </div>

            {/* ===================================================================== */}
            {/* RIGHT MAIN CONTENT AREA */}
            {/* ===================================================================== */}
            <div className="flex-1 flex flex-col space-y-6">
              
              {/* TOP HEADER BAR (EXACT REFERENCE 2) */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                {/* Destination Explorer Title Dropdown */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20 shadow-md">
                    <img src={currentDestination.image} alt="icon" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={currentDestination.id}
                      onChange={(e) => {
                        const target = destinations.find(d => d.id === e.target.value);
                        if (target) onSelectDestination(target);
                      }}
                      className="bg-transparent text-lg sm:text-xl font-black font-display text-white focus:outline-none cursor-pointer tracking-tight"
                    >
                      {destinations.map((d) => (
                        <option key={d.id} value={d.id} className="bg-slate-900 text-white font-bold">
                          {d.shortName || d.name} Explorer
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Center / Right Search Pill Input & Actions */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  
                  {/* Frosted Glass Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search landmarks..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="pl-9 pr-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white placeholder-slate-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 w-36 sm:w-56 transition"
                    />
                  </div>

                  {/* Switch to 3D Coverflow */}
                  <button
                    onClick={() => onViewModeChange('3d-coverflow')}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition"
                    title="Switch to 3D Perspective Carousel (Photo 1)"
                  >
                    <Layers className="w-4 h-4 text-amber-400" />
                  </button>

                  {/* Theme Palette Popover */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowThemePicker(!showThemePicker);
                        setShowCurrencyPicker(false);
                      }}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition"
                      title="Aesthetic Palette"
                    >
                      <Palette className="w-4 h-4 text-amber-400" />
                    </button>

                    {showThemePicker && (
                      <div className="absolute right-0 top-full mt-3 w-48 visionos-glass-window rounded-3xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-white/10">
                          Color Theme
                        </div>
                        <div className="space-y-1 mt-1">
                          {THEME_OPTIONS.map((t) => (
                            <button
                              key={t.id}
                              onClick={() => {
                                onThemeChange(t.id);
                                setShowThemePicker(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                                currentTheme === t.id 
                                  ? 'bg-white/20 text-white font-black border border-white/25' 
                                  : 'text-slate-200 hover:bg-white/10'
                              }`}
                            >
                              <span>{t.name}</span>
                              <span className="w-3 h-3 rounded-full border border-black/40" style={{ backgroundColor: t.color }} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Currency Popover */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowCurrencyPicker(!showCurrencyPicker);
                        setShowThemePicker(false);
                      }}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition"
                      title="Change Currency"
                    >
                      <Globe className="w-4 h-4" />
                    </button>

                    {showCurrencyPicker && (
                      <div className="absolute right-0 top-full mt-3 w-48 visionos-glass-window rounded-3xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-white/10">
                          Currency
                        </div>
                        <div className="space-y-1 mt-1">
                          {CURRENCIES.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => {
                                onCurrencyChange(c);
                                setShowCurrencyPicker(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                                currency.code === c.code 
                                  ? 'bg-amber-500 text-slate-950 font-black' 
                                  : 'text-slate-200 hover:bg-white/10'
                              }`}
                            >
                              <span>{c.name}</span>
                              <span className="font-mono text-[10px]">{c.symbol}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={() => onToggleBookmark(currentDestination)}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition"
                    title="Bookmark Destination"
                  >
                    <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Notifications with Red Active Dot */}
                  <button
                    onClick={onOpenSpinWheel}
                    className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition"
                    title="Member Privileges"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
                  </button>

                  {/* Profile Avatar */}
                  <button
                    onClick={onOpenSpinWheel}
                    className="w-9 h-9 rounded-full overflow-hidden border border-white/30 shadow-md transform hover:scale-105 transition"
                    title="VIP Account"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </button>

                </div>

              </div>

              {/* TWO PANE MAIN SHOWCASE: HERO CARD + MUST-SEE DESTINATIONS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                
                {/* =================================================================== */}
                {/* LEFT PANE: FEATURED DESTINATION HERO SHOWCASE (EXACT REF 2) */}
                {/* =================================================================== */}
                <div className="lg:col-span-7 relative rounded-[28px] overflow-hidden visionos-glass-card border border-white/25 shadow-2xl flex flex-col justify-between min-h-[440px] sm:min-h-[500px]">
                  
                  {/* Scenic Photo Background */}
                  <img
                    src={activeLandmark.image}
                    alt={activeLandmark.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 transform hover:scale-105"
                  />

                  {/* Glass Gradients for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/40 to-black/30" />
                  <div className="absolute inset-0 glass-sheen" />

                  {/* Top Overlay: Title, Flag & Weather Widget */}
                  <div className="relative z-10 p-6 sm:p-8 space-y-4">
                    
                    <div>
                      <h2 className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight drop-shadow-md">
                        {currentDestination.shortName || currentDestination.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-slate-200">{currentDestination.country}</span>
                        {currentDestination.countryCode === 'IT' && <span>🇮🇹</span>}
                        {currentDestination.countryCode === 'IN' && <span>🇮🇳</span>}
                        {currentDestination.countryCode === 'JP' && <span>🇯🇵</span>}
                        {currentDestination.countryCode === 'FR' && <span>🇫🇷</span>}
                        {currentDestination.countryCode === 'GR' && <span>🇬🇷</span>}
                        {currentDestination.countryCode === 'CH' && <span>🇨🇭</span>}
                        {currentDestination.countryCode === 'ID' && <span>🇮🇩</span>}
                      </div>
                    </div>

                    {/* Story Description */}
                    <p className="text-xs sm:text-sm text-slate-200 max-w-md leading-relaxed drop-shadow">
                      {activeLandmark.description}
                    </p>

                    {/* Live Weather Widget (EXACT REFERENCE 2) */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-bold text-amber-300">
                      <CloudSun className="w-4 h-4 text-amber-400" />
                      <span>{currentDestination.temp}</span>
                      <span className="text-slate-300 font-normal">• {currentDestination.weather}</span>
                    </div>

                  </div>

                  {/* Bottom Floating Glass Info Pill Bar (EXACT REFERENCE 2) */}
                  <div className="relative z-10 p-5 sm:p-7">
                    <div className="visionos-glass-pill rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-xl">
                      
                      {/* Landmark Name & Address */}
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 text-amber-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col truncate">
                          <span className="text-xs sm:text-sm font-black text-white truncate">
                            {activeLandmark.name}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-slate-300 truncate font-medium">
                            {activeLandmark.location}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons: Bookmark & Explore */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => onToggleBookmark(currentDestination)}
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition"
                          title="Save Landmark"
                        >
                          <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        <button
                          onClick={() => onBookNow(currentDestination)}
                          className="p-2 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition transform hover:scale-105 flex items-center gap-1.5"
                          title="Reserve Experience"
                        >
                          <span className="hidden sm:inline">Reserve</span>
                          <Navigation className="w-4 h-4 transform rotate-45" />
                        </button>
                      </div>

                    </div>
                  </div>

                </div>

                {/* =================================================================== */}
                {/* RIGHT PANE: "MUST-SEE DESTINATIONS" LIST (EXACT REF 2) */}
                {/* =================================================================== */}
                <div className="lg:col-span-5 flex flex-col space-y-4">
                  
                  {/* Header + "View all >" pill button */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-black font-display text-white">
                      Must-See Destinations
                    </h3>
                    <button
                      onClick={() => onOpenDetails(currentDestination)}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-slate-200 transition flex items-center gap-1"
                    >
                      <span>View all</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>

                  {/* Scrollable Landmark Cards List */}
                  <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1 scrollbar-thin">
                    {filteredLandmarks.length > 0 ? (
                      filteredLandmarks.map((landmark) => {
                        const isSelected = activeLandmark.id === landmark.id;
                        return (
                          <div
                            key={landmark.id}
                            onClick={() => setSelectedLandmarkId(landmark.id)}
                            className={`p-3 sm:p-3.5 rounded-2xl visionos-glass-card border cursor-pointer transition-all duration-300 flex items-center justify-between gap-3 group ${
                              isSelected
                                ? 'bg-white/20 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                                : 'hover:bg-white/10 border-white/15'
                            }`}
                          >
                            {/* Thumbnail & Landmark Info */}
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 flex-shrink-0 shadow-md">
                                <img
                                  src={landmark.image}
                                  alt={landmark.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                              </div>

                              <div className="flex flex-col truncate">
                                <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition truncate">
                                  {landmark.name}
                                </h4>
                                <span className="text-[11px] text-slate-300 font-medium truncate">
                                  {landmark.subtext}
                                </span>
                                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                                  <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                                  <span className="truncate">{landmark.location}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Action Button */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onBookNow(currentDestination);
                                }}
                                className={`p-2 rounded-xl border transition ${
                                  isSelected 
                                    ? 'bg-amber-500 text-slate-950 border-amber-400' 
                                    : 'bg-white/10 hover:bg-white/20 text-slate-300 border-white/15'
                                }`}
                                title="Reserve Pass"
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 visionos-glass-card rounded-2xl border border-white/15 p-4 text-xs text-slate-400">
                        No landmarks match your search query.
                      </div>
                    )}
                  </div>

                  {/* Quick Price / Book Strip */}
                  <div className="p-4 rounded-2xl visionos-glass-card border border-white/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        VIP Daily Rate
                      </span>
                      <span className="text-lg font-black text-white font-mono">
                        {formatPrice(currentDestination.pricePerDayUSD, currency)}
                        <span className="text-xs font-normal text-slate-400"> / guest</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onBookNow(currentDestination)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition"
                    >
                      Instant Book
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
