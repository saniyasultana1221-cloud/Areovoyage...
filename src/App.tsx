import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Compass, Heart, Lock, Sparkles, Globe, ChevronDown, ArrowDown } from 'lucide-react';
import { Spatial3DGlobe } from './components/Spatial3DGlobe';
import { GlassSearchBar } from './components/GlassSearchBar';
import { LocationInfoCard } from './components/LocationInfoCard';
import { ImmersiveCityExperience } from './components/ImmersiveCityExperience';
import { AtmosphericDiveTransition } from './components/AtmosphericDiveTransition';
import { CityInfo, findLocationInfo, WORLD_CITIES } from './data/worldDatabase';
import { VibeQuiz } from './components/VibeQuiz';
import { SpinWheelModal } from './components/SpinWheelModal';
import { DestinationModal } from './components/DestinationModal';
import { BookingModal } from './components/BookingModal';
import { BucketListDrawer } from './components/BucketListDrawer';
import { AirplaneIntro } from './components/AirplaneIntro';
import { Global3DSpaceCanvas } from './components/Global3DSpaceCanvas';
import { DestinationExplorer } from './components/DestinationExplorer';

import { DESTINATIONS } from './data/destinations';
import { CURRENCIES } from './utils/currency';
import { Destination, PackageTour, Currency, TravelVibe, AestheticTheme } from './types';
import { triggerConfetti } from './utils/confetti';

export function App() {
  // Inertia-based Smooth Scrolling via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // 3D Airplane Intro State
  const [showIntro, setShowIntro] = useState(false);

  // Global State
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVibe, setSelectedVibe] = useState<TravelVibe>('All');
  
  // 3D Spatial & Aesthetic State
  const [currentTheme, setCurrentTheme] = useState<AestheticTheme>('sunset-amber');
  const [current3DDestination, setCurrent3DDestination] = useState<Destination>(DESTINATIONS[0]);
  const [targetLocation, setTargetLocation] = useState<{ 
    lat: number; 
    lon: number; 
    name?: string;
    cartesian3D?: { x: number; y: number; z: number };
  } | null>(null);
  const [activeCityInfo, setActiveCityInfo] = useState<CityInfo | null>(null);
  const [immersiveCity, setImmersiveCity] = useState<CityInfo | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('bengaluru') || hash.includes('bangalore')) {
        return WORLD_CITIES.find((c) => c.id === 'bengaluru-in') || null;
      }
    }
    return null;
  });
  const [divingCity, setDivingCity] = useState<CityInfo | null>(null);

  // Listen for hash changes to navigate directly to city portals (e.g. #bengaluru)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('bengaluru') || hash.includes('bangalore')) {
        const b = WORLD_CITIES.find((c) => c.id === 'bengaluru-in');
        if (b) setImmersiveCity(b);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('travia_bucket_list');
      return saved ? JSON.parse(saved) : ['rome-italy', 'agra-india', 'tokyo-kyoto-japan'];
    } catch {
      return ['rome-italy', 'agra-india', 'tokyo-kyoto-japan'];
    }
  });

  // Modal / Drawer States
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isBucketListOpen, setIsBucketListOpen] = useState(false);
  const [selectedDestinationModal, setSelectedDestinationModal] = useState<Destination | null>(null);

  const [bookingState, setBookingState] = useState<{
    isOpen: boolean;
    destination?: Destination | null;
    package?: PackageTour | null;
    customPlan?: any | null;
    promoCode?: string;
  }>({
    isOpen: false,
    destination: null,
    package: null,
    customPlan: null,
    promoCode: 'VOYAGE20',
  });

  // Toast alert state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleBookmark = (destination: Destination) => {
    setBookmarkedIds((prev) => {
      let updated: string[];
      if (prev.includes(destination.id)) {
        updated = prev.filter((id) => id !== destination.id);
        showToast(`Removed ${destination.name} from Bucket List`);
      } else {
        updated = [...prev, destination.id];
        showToast(`Added ${destination.name} to Bucket List! ✈️`);
        triggerConfetti();
      }
      try {
        localStorage.setItem('travia_bucket_list', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleBookDestination = (destination: Destination) => {
    setBookingState({
      isOpen: true,
      destination,
      package: null,
      customPlan: null,
      promoCode: 'VOYAGE20',
    });
  };

  const handleBookPackage = (pkg: PackageTour) => {
    setBookingState({
      isOpen: true,
      destination: null,
      package: pkg,
      customPlan: null,
      promoCode: 'VOYAGE20',
    });
  };

  const handleBookCustomTrip = (plan: any) => {
    setBookingState({
      isOpen: true,
      destination: null,
      package: null,
      customPlan: plan,
      promoCode: 'VOYAGE20',
    });
  };

  // Switch Theme Dynamically
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-sunset-amber', 'theme-aurora-cyan', 'theme-tokyo-neon', 'theme-monaco-gold');
    root.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  // If user enters full-screen Immersive City Portal Experience
  if (immersiveCity) {
    return (
      <ImmersiveCityExperience
        city={immersiveCity}
        onBackToOrbit={() => {
          setImmersiveCity(null);
          setActiveCityInfo(null);
          setTargetLocation(null);
          if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname);
          }
        }}
        onBookVoyage={(city) => {
          setBookingState({
            isOpen: true,
            destination: null,
            package: null,
            customPlan: {
              destination: city.name,
              country: city.country,
              days: 5,
              nights: 4,
              price: 1850,
              vibe: 'Luxury Exploration',
            },
            promoCode: 'VOYAGE20',
          });
        }}
        currency={currency}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#050811] text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Universal True 3D Three.js WebGL Deep Space Starfield across All Pages */}
      <Global3DSpaceCanvas />

      {/* 3D Airplane Intro Animation on Opening */}
      {showIntro && (
        <AirplaneIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 visionos-glass-pill text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-2xl border border-white/25 flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300">
          <span className="text-amber-400">✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Spatial Stage */}
      <main className="flex-grow">
        
        {/* ========================================================================= */}
        {/* INTERACTIVE 3D EARTH GLOBE STAGE WITH TOP NAV & LIVE SATELLITE SEARCH */}
        {/* ========================================================================= */}
        <div className="relative w-full h-screen min-h-[650px] overflow-hidden">
          
          {/* ========================================================================= */}
          {/* TOP LUXURY VISIONOS NAVIGATION BAR WITH "RESERVE ACCESS" CTA BUTTON */}
          {/* ========================================================================= */}
          <header className="absolute top-0 left-0 right-0 z-40 p-4 sm:p-6 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 border border-amber-300 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                <Compass className="w-5 h-5 animate-spin-slow text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-sm sm:text-base tracking-wider text-white">
                    AERO<span className="text-amber-400">VOYAGE</span>
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                </div>
                <p className="text-[9px] text-amber-300/80 font-bold tracking-widest uppercase hidden sm:block">
                  3D SPATIAL TRAVEL CONCIERGE
                </p>
              </div>
            </div>

            {/* Center: Interactive VisionOS Status & Tools */}
            <div className="hidden lg:flex items-center gap-2 visionos-glass-pill px-4 py-1.5 rounded-full pointer-events-auto border border-white/15 shadow-xl text-xs">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>3D Spatial Orbit</span>
              </span>
              <span className="text-white/20">|</span>
              <button
                onClick={() => {
                  const el = document.getElementById('stage-cosmos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-slate-300 hover:text-amber-300 transition font-bold cursor-pointer flex items-center gap-1"
              >
                <span>Cosmos Portfolio</span>
                <span className="text-amber-400 text-[10px]">↓</span>
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="text-slate-300 hover:text-amber-300 transition font-bold cursor-pointer"
              >
                Vibe Matcher
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setIsSpinWheelOpen(true)}
                className="text-slate-300 hover:text-amber-300 transition font-bold cursor-pointer"
              >
                Spin & Win
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => {
                  const b = WORLD_CITIES.find((c) => c.id === 'bengaluru-in');
                  if (b) {
                    setImmersiveCity(b);
                    window.location.hash = 'bengaluru';
                  }
                }}
                className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition font-black cursor-pointer bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40"
              >
                <span>🇮🇳</span>
                <span>Bengaluru Portal</span>
              </button>
            </div>

            {/* Right: Actions & "Reserve Access" CTA */}
            <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
              
              {/* Currency Selector */}
              <div className="relative">
                <select
                  value={currency.code}
                  onChange={(e) => {
                    const c = CURRENCIES.find((curr) => curr.code === e.target.value);
                    if (c) setCurrency(c);
                  }}
                  className="bg-black/40 backdrop-blur-xl border border-white/20 text-xs font-mono font-bold text-amber-300 px-3 py-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer shadow-lg"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                      {c.symbol} {c.code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bucket List Button */}
              <button
                onClick={() => setIsBucketListOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-xl transition shadow-lg"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Saved ({bookmarkedIds.length})</span>
              </button>

              {/* Spin & Win Promo */}
              <button
                onClick={() => setIsSpinWheelOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold text-xs backdrop-blur-xl transition shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Spin & Win</span>
              </button>

              {/* PRIMARY "RESERVE ACCESS" BUTTON (Triggers Stripe & Supabase Checkout Modal) */}
              <button
                onClick={() => {
                  setBookingState({
                    isOpen: true,
                    destination: DESTINATIONS[0],
                    package: null,
                    customPlan: null,
                    promoCode: 'VOYAGE20',
                  });
                }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs shadow-[0_0_25px_rgba(245,158,11,0.5)] transition transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-950" />
                <span>Reserve Access</span>
              </button>

            </div>
          </header>

          {/* Quick Direct 1-Click Launch Pill to Bengaluru Portal */}
          <div className="absolute top-20 right-4 sm:right-6 z-40 pointer-events-auto">
            <button
              onClick={() => {
                const b = WORLD_CITIES.find((c) => c.id === 'bengaluru-in');
                if (b) {
                  setImmersiveCity(b);
                  window.location.hash = 'bengaluru';
                }
              }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#050811]/90 hover:bg-black border border-amber-400/60 text-white text-xs font-bold backdrop-blur-2xl shadow-[0_0_25px_rgba(245,158,11,0.35)] transition transform hover:scale-105 cursor-pointer group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-left">
                <div className="text-[9px] text-amber-400 font-mono font-bold uppercase tracking-wider">Live Preview</div>
                <div className="text-white text-xs font-black group-hover:text-amber-300 transition flex items-center gap-1">
                  <span>🇮🇳 Bengaluru Section</span>
                  <span className="text-amber-400 font-bold">→</span>
                </div>
              </div>
            </button>
          </div>

          {/* Hypersonic Atmospheric Dive Transition Overlay */}
          {divingCity && (
            <AtmosphericDiveTransition
              city={divingCity}
              onComplete={() => {
                const target = divingCity;
                setDivingCity(null);
                setImmersiveCity(target);
              }}
            />
          )}

          {/* Top-Right Location Insight Info Card (When a city/country is searched) */}
          {activeCityInfo && !divingCity && (
            <LocationInfoCard
              info={activeCityInfo}
              onClose={() => {
                setActiveCityInfo(null);
                setTargetLocation(null);
              }}
              onExploreMore={(info) => {
                // Plunge into the city with hypersonic splash effect!
                setTargetLocation({ lat: info.lat, lon: info.lon, name: info.name });
                setActiveCityInfo(info);
                setDivingCity(info);
              }}
              currency={currency}
            />
          )}

          {/* Bottom-Left Solid Glass Search Bar */}
          <div className="absolute bottom-8 left-6 sm:left-10 z-40">
            <GlassSearchBar
              destinations={DESTINATIONS}
              onSelectDestination={(dest) => {
                setCurrent3DDestination(dest);
                const matchedCity = WORLD_CITIES.find(
                  (c) => c.name.toLowerCase() === dest.name.toLowerCase() || c.id === dest.id
                );
                if (matchedCity) {
                  setTargetLocation({ lat: matchedCity.lat, lon: matchedCity.lon, name: matchedCity.name });
                  showToast(`🌍 Orbit aligning to ${matchedCity.name}... Descending through atmosphere!`);
                  setActiveCityInfo(null);
                  setTimeout(() => {
                    setDivingCity(matchedCity);
                  }, 1100);
                } else {
                  setSelectedDestinationModal(dest);
                }
              }}
              onLocateCoordinates={(coords) => {
                setTargetLocation(coords);
                showToast(`🌍 3D Orbit zooming to ${coords.name || 'destination'}...`);
              }}
              onSelectCityInfo={(info) => {
                // 1. Smoothly spin the Earth Globe to target coordinates
                setTargetLocation({ lat: info.lat, lon: info.lon, name: info.name });
                showToast(`🌍 3D Orbit locked on ${info.name}! Descending into ${info.name} Portal...`);
                setActiveCityInfo(null); // Clean front page

                // 2. Allow 1.1s for the 3D globe to complete its smooth spin, then plunge into full city experience page
                setTimeout(() => {
                  setDivingCity(info);
                }, 1100);
              }}
              currency={currency}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Easy Scroll Down Floating Pill (Smooth Scroll to Cosmos 2nd Page) */}
          <div className="absolute bottom-8 right-6 sm:right-10 z-40">
            <button
              onClick={() => {
                const el = document.getElementById('stage-cosmos');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-amber-400/60 text-white text-xs font-bold backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.8)] transition transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <span className="text-amber-400 animate-bounce font-mono">↓</span>
              <span className="text-slate-200 group-hover:text-amber-300 transition">Scroll to Explore Portfolio</span>
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            </button>
          </div>

          {/* 3D WebGL Earth Globe with Watermark & Dynamic Zoom */}
          <Spatial3DGlobe 
            targetLocation={targetLocation} 
            isDiving={!!divingCity}
            onTriggerDive={(city) => {
              setTargetLocation({ lat: city.lat, lon: city.lon, name: city.name });
              setActiveCityInfo(null);
              showToast(`🌍 Descending into ${city.name} Portal...`);
              setTimeout(() => {
                setDivingCity(city);
              }, 600);
            }}
          />
        </div>

        {/* ========================================================================= */}
        {/* PAGE 2: COSMOS 3D FLOATING SHOWCASE & PORTFOLIO (SAME GALAXY VIEW) */}
        {/* ========================================================================= */}
        <section id="stage-cosmos" className="relative w-full min-h-screen bg-transparent">
          <DestinationExplorer
            destinations={DESTINATIONS}
            currency={currency}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedVibe={selectedVibe}
            onSelectedVibeChange={setSelectedVibe}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectDestination={(dest) => {
              setSelectedDestinationModal(dest);
            }}
            onBookNow={handleBookDestination}
          />

          {/* Effortless Return to 3D Orbit Floating Pill at bottom of Page 2 */}
          <div className="flex justify-center pb-20 pt-6 relative z-20">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-black/75 hover:bg-black/95 border border-white/20 hover:border-amber-400/60 text-white text-xs font-bold backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.9)] transition transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <span className="text-amber-400 font-mono text-sm">↑</span>
              <span className="text-slate-200 group-hover:text-amber-300 transition">Return to 3D Orbit</span>
              <Globe className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition duration-300" />
            </button>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* GLOBAL MODALS & FLYOUT DRAWERS */}
      {/* ========================================================================= */}
      
      {/* 1. Travel Personality Quiz Modal */}
      <VibeQuiz
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        currency={currency}
        onSelectDestination={(dest) => {
          setSelectedDestinationModal(dest);
        }}
        onBookNow={handleBookDestination}
      />

      {/* 2. Spin The Wheel Giveaway Modal */}
      <SpinWheelModal
        isOpen={isSpinWheelOpen}
        onClose={() => setIsSpinWheelOpen(false)}
        onApplyPrizeCode={(code) => {
          showToast(`🎉 Applied Code: ${code}!`);
          setBookingState((prev) => ({ ...prev, promoCode: code }));
        }}
      />

      {/* 3. Bucket List Drawer */}
      <BucketListDrawer
        isOpen={isBucketListOpen}
        onClose={() => setIsBucketListOpen(false)}
        bookmarkedDestinations={DESTINATIONS.filter((d) => bookmarkedIds.includes(d.id))}
        currency={currency}
        onRemoveBookmark={(dest) => handleToggleBookmark(dest)}
        onSelectDestination={(dest) => setSelectedDestinationModal(dest)}
        onBookNow={(dest) => {
          setIsBucketListOpen(false);
          handleBookDestination(dest);
        }}
      />

      {/* 4. Full Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestinationModal}
        onClose={() => setSelectedDestinationModal(null)}
        currency={currency}
        isBookmarked={selectedDestinationModal ? bookmarkedIds.includes(selectedDestinationModal.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onBookNow={handleBookDestination}
      />

      {/* 5. Reservation & Checkout Modal */}
      <BookingModal
        isOpen={bookingState.isOpen}
        onClose={() => setBookingState((prev) => ({ ...prev, isOpen: false }))}
        currency={currency}
        initialDestination={bookingState.destination}
        initialPackage={bookingState.package}
        customPlanData={bookingState.customPlan}
        appliedPromoCode={bookingState.promoCode}
      />

    </div>
  );
}

export default App;
