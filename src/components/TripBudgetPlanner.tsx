import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, Shield, Compass, Hotel, Plane, Utensils, Anchor, Clock } from 'lucide-react';
import { Destination, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { CosmicStarfield } from './CosmicStarfield';

interface TripBudgetPlannerProps {
  destinations: Destination[];
  currency: Currency;
  onBookCustomTrip: (plan: any) => void;
}

interface HotelTier {
  id: string;
  name: string;
  pricePerNightUSD: number;
  description: string;
  badge?: string;
}

const HOTEL_TIERS: HotelTier[] = [
  {
    id: 'boutique',
    name: 'Boutique Comfort',
    pricePerNightUSD: 240,
    description: 'Curated 4-star boutique hotels with authentic local architecture.',
  },
  {
    id: 'executive',
    name: 'Executive Explorer',
    pricePerNightUSD: 450,
    description: 'Five-star classic hotel chains with club lounge access and spa.',
    badge: 'Popular',
  },
  {
    id: 'luxury-villa',
    name: 'Luxury Villa / Resort',
    pricePerNightUSD: 850,
    description: 'Private infinity pool villa with 24/7 dedicated butler service.',
  },
  {
    id: 'presidential',
    name: 'Presidential Suite',
    pricePerNightUSD: 1600,
    description: 'Ultra-exclusive private estate with helicopter transfer inclusion.',
  },
];

const ADDONS = [
  { id: 'private-guide', name: 'Dedicated Cultural Concierge & Guide', priceUSD: 600 },
  { id: 'michelin-dining', name: 'Curated Michelin Tasting Menus (3 Dinners)', priceUSD: 750 },
  { id: 'private-yacht', name: 'Private Sunset Catamaran / Yacht Charter', priceUSD: 1200 },
  { id: 'fast-track-vip', name: 'VIP Airport Escort & Fast-Track Customs', priceUSD: 350 },
];

// 6 Floating Feature Cards around Title
const FLOATING_PLANNER_CARDS = [
  {
    id: 'feat-1',
    title: '5-Star Villas',
    tag: 'Private Butler Service',
    icon: '🏨',
    position: 'top-2 sm:top-5 left-2 sm:left-4 lg:left-6',
    rotation: '-rotate-7',
    animClass: 'animate-float-drift-1',
  },
  {
    id: 'feat-2',
    title: 'Heli Charters',
    tag: 'VIP Airport Transfers',
    icon: '🚁',
    position: 'top-0 left-[26%] sm:left-[28%]',
    rotation: 'rotate-4',
    animClass: 'animate-float-drift-2',
  },
  {
    id: 'feat-3',
    title: 'Michelin Menus',
    tag: 'Curated Gastronomy',
    icon: '🍷',
    position: 'top-3 sm:top-5 right-2 sm:right-4 lg:right-6',
    rotation: 'rotate-6',
    animClass: 'animate-float-drift-3',
  },
  {
    id: 'feat-4',
    title: 'Sunset Yachts',
    tag: 'Private Catamaran',
    icon: '⛵',
    position: 'top-[44%] -translate-y-1/2 left-1 sm:left-3 lg:left-5',
    rotation: 'rotate-6',
    animClass: 'animate-float-drift-4',
  },
  {
    id: 'feat-5',
    title: '100% Escrow',
    tag: 'Bank-Grade Protection',
    icon: '🛡️',
    position: 'top-[46%] -translate-y-1/2 right-1 sm:right-3 lg:right-5',
    rotation: '-rotate-6',
    animClass: 'animate-float-drift-5',
  },
  {
    id: 'feat-6',
    title: 'Custom Days',
    tag: '3 to 21 Day Schedules',
    icon: '📅',
    position: 'bottom-2 sm:bottom-4 left-1/3 sm:left-[35%]',
    rotation: 'rotate-5',
    animClass: 'animate-float-drift-6',
  },
];

export const TripBudgetPlanner: React.FC<TripBudgetPlannerProps> = ({ destinations, currency, onBookCustomTrip }) => {
  const [durationDays, setDurationDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [selectedTierId, setSelectedTierId] = useState('executive');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['fast-track-vip']);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(destinations[0]?.id || 'rome-italy');

  const selectedTier = HOTEL_TIERS.find((t) => t.id === selectedTierId) || HOTEL_TIERS[1];
  const selectedDest = destinations.find((d) => d.id === selectedDestinationId) || destinations[0];

  const estimatedTotalUSD = useMemo(() => {
    const lodgingTotal = selectedTier.pricePerNightUSD * durationDays;
    const dailyActivitiesUSD = 180 * durationDays * travelers;
    const addonsTotal = selectedAddonIds.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id);
      return sum + (addon ? addon.priceUSD : 0);
    }, 0);

    return lodgingTotal + dailyActivitiesUSD + addonsTotal;
  }, [durationDays, travelers, selectedTier, selectedAddonIds]);

  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
      setSelectedAddonIds(selectedAddonIds.filter((item) => item !== id));
    } else {
      setSelectedAddonIds([...selectedAddonIds, id]);
    }
  };

  const handleCreateBooking = () => {
    const addonNames = selectedAddonIds
      .map((id) => ADDONS.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[];

    onBookCustomTrip({
      destination: selectedDest,
      durationDays,
      travelers,
      hotelTier: selectedTier.name,
      addons: addonNames,
      estimatedTotalUSD,
    });
  };

  return (
    <section id="planner" className="py-24 bg-transparent text-white relative overflow-hidden select-none">
      
      {/* Background Deep Space Starfield & Cosmic Dust */}
      <CosmicStarfield density={90} speed={0.15} />

      {/* Deep Space Glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* COSMOS / MOODBOARD HERO HEADER WITH FLOATING FEATURE PILLS AROUND TITLE */}
        {/* ========================================================================= */}
        <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex flex-col items-center justify-center text-center px-4 mb-16 overflow-hidden">
          
          {/* 6 Scattered Floating Feature Pills (Sleek Glass Aesthetic) */}
          {FLOATING_PLANNER_CARDS.map((item) => (
            <div
              key={item.id}
              className={`absolute ${item.position} ${item.animClass} z-10 hidden lg:block pointer-events-auto`}
            >
              <div
                className={`transform ${item.rotation} cursor-pointer group transition-all duration-500 ease-out hover:scale-108 hover:rotate-0 hover:z-50`}
              >
                <div 
                  className="px-4 py-3 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-white/20 backdrop-blur-xl transition duration-500 group-hover:border-amber-400/90 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.35)] flex items-center gap-3 text-left"
                  style={{
                    background: 'linear-gradient(145deg, rgba(20, 27, 40, 0.92) 0%, rgba(10, 14, 22, 0.98) 100%)',
                  }}
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-snug">{item.title}</h4>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/90 block truncate">
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Center Title */}
          <div className="relative z-20 max-w-2xl mx-auto space-y-3.5 px-4 py-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-black uppercase tracking-wider shadow-lg backdrop-blur-md">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <span>Transparent Spatial Estimator</span>
            </div>

            {/* Title */}
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white leading-tight"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.2), 0 10px 25px rgba(0, 0, 0, 0.9)',
              }}
            >
              Trip Architect & <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Real-Time Estimator</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-lg mx-auto leading-relaxed">
              Customize duration, luxury hospitality tiers, and VIP additions for a transparent real-time quote with instant concierge reservation.
            </p>

            {/* Live Indicator */}
            <div className="pt-1.5 flex items-center justify-center gap-2.5 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Dynamic Pricing Engine</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400/90 font-mono text-xs">Zero Hidden Fees</span>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* ESTIMATOR WORKBENCH & REAL-TIME QUOTE */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* Controls Box */}
          <div className="lg:col-span-7 rounded-[28px] p-6 sm:p-7 border border-white/10 bg-gradient-to-b from-[#111827]/90 to-[#070B14]/98 shadow-2xl space-y-7">
            
            {/* Destination Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                Target Destination
              </label>
              <select
                value={selectedDestinationId}
                onChange={(e) => setSelectedDestinationId(e.target.value)}
                className="w-full bg-black/50 text-white text-xs sm:text-sm font-bold px-3.5 py-3 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                    {d.name} ({d.country})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300 uppercase tracking-wider">Voyage Duration</span>
                  <span className="text-amber-400 font-mono text-sm font-black">{durationDays} Days</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="21"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-black/50 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>3 Days</span>
                  <span>10 Days</span>
                  <span>21 Days</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300 uppercase tracking-wider">Party Size</span>
                  <span className="text-amber-400 font-mono text-sm font-black">{travelers} Guests</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-black/50 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>Solo</span>
                  <span>Couple (2)</span>
                  <span>Group (8)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                Select Hospitality Tier
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HOTEL_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`p-3.5 sm:p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                      selectedTierId === tier.id
                        ? 'bg-white/15 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                        : 'bg-black/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-xs sm:text-sm text-white">{tier.name}</h4>
                      {tier.badge && (
                        <span className="bg-amber-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                          {tier.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                      {tier.description}
                    </p>
                    <div className="mt-2 text-xs font-mono font-black text-amber-300">
                      {formatPrice(tier.pricePerNightUSD, currency)} <span className="text-[10px] text-slate-400 font-normal">/ night</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                Bespoke Concierge Add-ons
              </span>
              <div className="space-y-2">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl cursor-pointer border flex items-center justify-between transition ${
                        isChecked
                          ? 'bg-amber-500/15 border-amber-400/80 text-white'
                          : 'bg-black/20 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-white/30'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-semibold text-xs text-white">{addon.name}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-400">
                        +{formatPrice(addon.priceUSD, currency)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary Box */}
          <div className="lg:col-span-5 rounded-[28px] p-6 sm:p-7 border border-white/10 bg-gradient-to-b from-[#111827]/90 to-[#070B14]/98 shadow-2xl space-y-5 sticky top-24">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                Estimated Comprehensive Quote
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-mono text-white mt-1">
                {formatPrice(estimatedTotalUSD, currency)}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Includes all taxes, concierge escort, and 24/7 private transport.
              </p>
            </div>

            <div className="space-y-2.5 py-4 border-y border-white/10 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Destination:</span>
                <span className="font-bold text-white">{selectedDest?.name}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Duration:</span>
                <span className="font-bold text-white">{durationDays} Days / {travelers} Guests</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hospitality Tier:</span>
                <span className="font-bold text-white">{selectedTier.name}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Active Add-ons:</span>
                <span className="font-bold text-white">{selectedAddonIds.length} Selected</span>
              </div>
            </div>

            <button
              onClick={handleCreateBooking}
              className="w-full py-3.5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 shadow-xl shadow-amber-500/25 transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4" />
              <span>Lock In Custom Itinerary</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
