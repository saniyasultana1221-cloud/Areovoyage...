import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayoutGrid, ChevronLeft, ChevronRight, Type, Lock, Mic, Plus, Share2, Copy,
  Pin, Heart, User, Maximize2, MapPin, Sparkles, Volume2, VolumeX, Eye,
  ArrowRight, Palette, Globe, Layers, Plane
} from 'lucide-react';
import { Destination, Landmark, Currency, AestheticTheme } from '../types';
import { CURRENCIES } from '../utils/currency';

interface Spatial3DCoverflowProps {
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
  onReplayIntro?: () => void;
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

export const Spatial3DCoverflow: React.FC<Spatial3DCoverflowProps> = ({
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
  onReplayIntro,
  viewMode,
  onViewModeChange,
  currentTheme,
  onThemeChange,
  bucketListCount,
}) => {
  const landmarks: Landmark[] = currentDestination.landmarks && currentDestination.landmarks.length > 0 
    ? currentDestination.landmarks 
    : [
        {
          id: `${currentDestination.id}-main`,
          name: currentDestination.name,
          subtext: currentDestination.country,
          image: currentDestination.image,
          location: currentDestination.country,
          coordinates: currentDestination.coordinates || '41.8902° N, 12.4922° E',
          category: 'Iconic Wonder',
          description: currentDestination.description,
          rating: currentDestination.rating,
        }
      ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showDestPicker, setShowDestPicker] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [currentDestination.id]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : landmarks.length - 1));
  }, [landmarks.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < landmarks.length - 1 ? prev + 1 : 0));
  }, [landmarks.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const activeLandmark = landmarks[activeIndex] || landmarks[0];

  return (
    <section className="relative w-full min-h-screen pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden room-backdrop select-none flex flex-col justify-between">
      
      {/* Ambient Lighting Depth of Field */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[500px] h-[350px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* TOP FLOATING VISIONOS CAPSULE BAR (EXACT REFERENCE 1) */}
        {/* ========================================================================= */}
        <div className="flex justify-center mb-6 sm:mb-10 relative z-50">
          <div className="visionos-glass-pill rounded-full px-3 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3.5 shadow-2xl">
            
            {/* Grid menu (Destinations) */}
            <button 
              onClick={() => {
                setShowDestPicker(!showDestPicker);
                setShowThemePicker(false);
                setShowCurrencyPicker(false);
              }} 
              className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition"
              title="Select Destination"
            >
              <LayoutGrid className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Prev/Next chevrons */}
            <div className="flex items-center gap-0.5">
              <button 
                onClick={() => {
                  const currIdx = destinations.findIndex(d => d.id === currentDestination.id);
                  const prevIdx = currIdx > 0 ? currIdx - 1 : destinations.length - 1;
                  onSelectDestination(destinations[prevIdx]);
                }}
                className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition"
                title="Previous Destination"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const currIdx = destinations.findIndex(d => d.id === currentDestination.id);
                  const nextIdx = currIdx < destinations.length - 1 ? currIdx + 1 : 0;
                  onSelectDestination(destinations[nextIdx]);
                }}
                className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition"
                title="Next Destination"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Typography / Vibe Quiz */}
            <button 
              onClick={onOpenQuiz}
              className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition hidden xs:flex items-center"
              title="Vibe Assessment"
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Centered Destination Pill */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowDestPicker(!showDestPicker);
                  setShowThemePicker(false);
                  setShowCurrencyPicker(false);
                }}
                className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-bold text-white transition tracking-wide shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentDestination.shortName || currentDestination.name} Explorer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
              </button>

              {/* Destination Switcher Popover */}
              {showDestPicker && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 visionos-glass-window rounded-3xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-white/10">
                    Switch 3D Destination
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 mt-1.5">
                    {destinations.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          onSelectDestination(d);
                          setShowDestPicker(false);
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition ${
                          d.id === currentDestination.id 
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md' 
                            : 'text-slate-200 hover:bg-white/10'
                        }`}
                      >
                        <span>{d.shortName || d.name}</span>
                        <span className="text-[10px] opacity-75 font-mono">{d.country}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Audio narration / Mic toggle */}
            <button 
              onClick={() => setAudioPlaying(!audioPlaying)}
              className={`p-2 rounded-full transition ${audioPlaying ? 'bg-amber-500 text-slate-950 shadow-lg' : 'hover:bg-white/20 text-slate-300 hover:text-white'}`}
              title={audioPlaying ? 'Audio Guide Active' : 'Listen to Narration'}
            >
              {audioPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => {
                  setShowCurrencyPicker(!showCurrencyPicker);
                  setShowThemePicker(false);
                  setShowDestPicker(false);
                }}
                className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition"
                title="Change Currency"
              >
                <Globe className="w-4 h-4" />
              </button>

              {showCurrencyPicker && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-48 visionos-glass-window rounded-3xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
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

            {/* Theme Palette Switcher */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowThemePicker(!showThemePicker);
                  setShowDestPicker(false);
                  setShowCurrencyPicker(false);
                }}
                className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-amber-400 transition"
                title="Aesthetic Color Palette"
              >
                <Palette className="w-4 h-4" />
              </button>

              {showThemePicker && (
                <div className="absolute right-0 top-full mt-3 w-52 visionos-glass-window rounded-3xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-white/10">
                    Aesthetic Palette
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

            {/* Add to bucket list */}
            <button 
              onClick={() => onToggleBookmark(currentDestination)}
              className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-rose-400 transition"
              title="Save Destination"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Share */}
            <button 
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('3D Voyager link copied to clipboard!');
                }
              }}
              className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition hidden md:flex"
              title="Share Experience"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Switch to Spatial Window (Photo 2) */}
            <button 
              onClick={() => onViewModeChange('spatial-window')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition"
              title="Switch to Spatial Window Dashboard (Photo 2)"
            >
              <Copy className="w-4 h-4" />
            </button>

            {/* Replay intro */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-amber-300 transition hidden sm:flex"
                title="Replay Takeoff"
              >
                <Plane className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 3D STAGE & FLOATING LEFT DOCK */}
        {/* ========================================================================= */}
        <div className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[580px] flex items-center justify-center">
          
          {/* Floating Left Vertical Action Pill (EXACT REFERENCE 1) */}
          <div className="hidden md:flex absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 visionos-glass-pill p-2 rounded-full shadow-2xl">
            <button 
              onClick={() => {
                const el = document.getElementById('destinations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-amber-400 transition"
              title="Jump to Catalog Map"
            >
              <Pin className="w-4.5 h-4.5" />
            </button>

            <button 
              onClick={onOpenBucketList}
              className="relative p-2.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-rose-400 transition"
              title="Saved Bucket List"
            >
              <Heart className={`w-4.5 h-4.5 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
              {bucketListCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {bucketListCount}
                </span>
              )}
            </button>

            <button 
              onClick={onOpenSpinWheel}
              className="p-2.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-cyan-400 transition"
              title="Member Privilege Perks"
            >
              <User className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* 3D COVERFLOW PERSPECTIVE CAROUSEL */}
          <div className="w-full coverflow-stage flex items-center justify-center px-4">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[530px] h-[460px] sm:h-[520px] lg:h-[560px] flex items-center justify-center">
              
              {landmarks.map((landmark, idx) => {
                const offset = idx - activeIndex;
                
                let cardClass = 'opacity-0 pointer-events-none';
                if (offset === 0) {
                  cardClass = 'card-3d-active';
                } else if (offset === -1 || (offset === landmarks.length - 1 && landmarks.length > 2)) {
                  cardClass = 'card-3d-prev cursor-pointer';
                } else if (offset === 1 || (offset === -(landmarks.length - 1) && landmarks.length > 2)) {
                  cardClass = 'card-3d-next cursor-pointer';
                } else if (offset === -2) {
                  cardClass = 'card-3d-far-prev';
                } else if (offset === 2) {
                  cardClass = 'card-3d-far-next';
                }

                const isActive = offset === 0;

                return (
                  <div
                    key={landmark.id}
                    onClick={() => {
                      if (!isActive) setActiveIndex(idx);
                    }}
                    className={`absolute inset-0 rounded-[32px] sm:rounded-[38px] overflow-hidden visionos-glass-card coverflow-card-container ${cardClass}`}
                    style={{
                      border: isActive 
                        ? '1.5px solid rgba(255, 255, 255, 0.45)' 
                        : '1px solid rgba(255, 255, 255, 0.18)',
                    }}
                  >
                    {/* High-res Image Background */}
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={landmark.image}
                        alt={landmark.name}
                        className={`w-full h-full object-cover transition duration-1000 ${
                          isActive ? 'scale-105 filter brightness-100' : 'scale-100 filter brightness-85'
                        }`}
                        loading="eager"
                      />

                      {/* Glass Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/40 to-black/25" />
                      <div className="absolute inset-0 glass-sheen" />

                      {/* Top Action Bar inside active card */}
                      {isActive && (
                        <div className="absolute top-4 sm:top-5 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between z-20">
                          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                            {landmark.category}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenDetails(currentDestination);
                              }}
                              className="px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white text-xs font-bold flex items-center gap-1.5 transition"
                            >
                              <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Expand</span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleBookmark(currentDestination);
                              }}
                              className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white transition"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Bottom Info Glass Overlay (EXACT REFERENCE 1 TYPOGRAPHY & LAYOUT) */}
                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-20 flex flex-col justify-end space-y-2.5">
                        
                        {/* Title & Index Counter */}
                        <div className="flex items-baseline justify-between">
                          <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight drop-shadow-md">
                            {landmark.name}
                          </h3>
                          <span className="text-xs sm:text-sm font-mono font-black text-amber-400/90 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15">
                            {idx + 1}/{landmarks.length}
                          </span>
                        </div>

                        {/* Storytelling Narrative Description */}
                        <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed line-clamp-3 drop-shadow">
                          {landmark.description}
                        </p>

                        {/* Coordinates & Geo-Pin */}
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 font-medium pt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span className="truncate">{landmark.location}</span>
                        </div>

                        {/* Action CTA Bar */}
                        {isActive && (
                          <div className="pt-2 flex items-center gap-2.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookNow(currentDestination);
                              }}
                              className="flex-1 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                              <span>Reserve Access</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenDetails(currentDestination);
                              }}
                              className="px-4 py-2.5 sm:py-3 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition flex items-center gap-1.5"
                            >
                              <Eye className="w-4 h-4 text-amber-300" />
                              <span className="hidden sm:inline">Itinerary</span>
                            </button>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM FLOATING MINI-DOCK & PAGINATION DOTS (EXACT REFERENCE 1) */}
        {/* ========================================================================= */}
        <div className="mt-4 sm:mt-8 flex flex-col items-center gap-3">
          
          {/* Floating Pill Dock */}
          <div className="visionos-glass-pill rounded-full px-4 py-2 flex items-center gap-4 shadow-2xl">
            
            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Mini Circular Thumbnail & Subtext */}
            <div className="flex items-center gap-2.5 px-2">
              <img
                src={activeLandmark.image}
                alt={activeLandmark.name}
                className="w-8 h-8 rounded-full object-cover border border-amber-400/60 shadow-md"
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">
                  {currentDestination.shortName || currentDestination.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium leading-tight">
                  {activeLandmark.name} • {currentDestination.temp}
                </span>
              </div>
            </div>

            {/* Heart bookmark */}
            <button
              onClick={() => onToggleBookmark(currentDestination)}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-rose-400 transition"
              title="Bookmark"
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition"
              title="Next"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Active Glowing Pagination Dots */}
          <div className="flex items-center gap-2">
            {landmarks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex 
                    ? 'w-6 h-2 bg-amber-400 shadow-[0_0_12px_#F59E0B]' 
                    : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
