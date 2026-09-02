import React, { useState, useEffect } from 'react';
import { Clock, Zap, Check, ArrowRight, ShieldCheck, Flame, Sparkles, Star, Plane } from 'lucide-react';
import { PackageTour, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { CosmicStarfield } from './CosmicStarfield';
import { Cosmos3DFloatingStage, FloatingCardItem } from './Cosmos3DFloatingStage';

interface FlashDealsProps {
  packages: PackageTour[];
  currency: Currency;
  onBookPackage: (pkg: PackageTour) => void;
}

// 6 Aesthetic 3x4 Rectangle Photos Beautifully Placed Around the Central Name Lines (Cosmos Aesthetic)
const FLOATING_DEAL_CARDS: FloatingCardItem[] = [
  {
    id: 'deal-1',
    title: 'Private Jet Charter',
    subtitle: 'Zurich ➔ Nice',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=500&q=80',
    badge: '-35%',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'top-6 left-4 lg:left-8 xl:left-14',
    rotation: '-rotate-3',
    parallaxFactor: 16,
  },
  {
    id: 'deal-3',
    title: 'Swiss Alpine Chalet',
    subtitle: 'Zermatt & St. Moritz',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=500&q=80',
    badge: '-25%',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'top-1/2 -translate-y-1/2 left-2 lg:left-4 xl:left-8',
    rotation: 'rotate-2',
    parallaxFactor: 18,
  },
  {
    id: 'deal-6',
    title: 'Nizami Royal Palace',
    subtitle: 'Taj Falaknuma & Chowmahalla',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
    badge: '-35%',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'bottom-6 left-4 lg:left-8 xl:left-14',
    rotation: '-rotate-2',
    parallaxFactor: 14,
  },
  {
    id: 'deal-2',
    title: 'Overwater Lagoon Villa',
    subtitle: 'Bora Bora & Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=500&q=80',
    badge: '-40%',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'top-6 right-4 lg:right-8 xl:right-14',
    rotation: 'rotate-3',
    parallaxFactor: 16,
  },
  {
    id: 'deal-4',
    title: 'Ginza Michelin Omakase',
    subtitle: 'Tokyo Culinary VIP',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80',
    badge: '-30%',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'top-1/2 -translate-y-1/2 right-2 lg:right-4 xl:right-8',
    rotation: '-rotate-2',
    parallaxFactor: 18,
  },
  {
    id: 'deal-5',
    title: 'Amalfi Sunset Yacht',
    subtitle: 'Capri & Positano',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=80',
    badge: '-45%',
    size: 'w-36 sm:w-40 lg:w-44 xl:w-48',
    position: 'bottom-6 right-4 lg:right-8 xl:right-14',
    rotation: 'rotate-2',
    parallaxFactor: 14,
  },
];

export const FlashDeals: React.FC<FlashDealsProps> = ({ packages, currency, onBookPackage }) => {
  const [dealFilter, setDealFilter] = useState('All Offers');
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="deals" className="py-24 bg-transparent text-white relative overflow-hidden select-none">
      
      {/* Background Deep Space Starfield & Cosmic Dust */}
      <CosmicStarfield density={90} speed={0.15} />

      {/* Deep Space Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 3D FLOATING PARTICLES & DEALS CANVAS WITH PARALLAX & COSMOS TYPOGRAPHY */}
        {/* ========================================================================= */}
        <Cosmos3DFloatingStage
          centralWord="COSMOS"
          titlePrefix="Curated Tour Bundles &"
          titleSuffix="Privileges"
          subtitle="All-inclusive private itineraries with guaranteed five-star hospitality, chartered transfers, and verified luxury access."
          taglineRoles={['VIP voyagers', 'jet-setters', 'connoisseurs', 'explorers', 'collectors']}
          cards={FLOATING_DEAL_CARDS}
          filterTags={['All Offers', 'Private Jets', 'Lagoon Villas', 'Alps Chalets', 'Michelin Omakase']}
          activeTag={dealFilter}
          onTagSelect={(tag) => setDealFilter(tag)}
          onCardClick={(card) => {
            const matched = packages.find((p) => p.title.toLowerCase().includes(card.title.toLowerCase()));
            if (matched) onBookPackage(matched);
          }}
        />

        {/* Live Countdown Window Capsule */}
        <div className="flex items-center justify-center -mt-8 mb-14 relative z-20">
          <div className="visionos-glass-pill rounded-full px-5 py-2.5 flex items-center gap-3 border border-white/20 shadow-2xl backdrop-blur-md bg-black/40">
            <Clock className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Exclusive Window Closes In:
            </span>
            <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-white">
              <span className="bg-black/70 px-2.5 py-1 rounded-md border border-white/15">
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              <span>:</span>
              <span className="bg-black/70 px-2.5 py-1 rounded-md border border-white/15">
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              <span>:</span>
              <span className="bg-black/70 px-2.5 py-1 rounded-md border border-white/15 text-amber-400">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TOUR PACKAGES GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="rounded-[28px] overflow-hidden bg-gradient-to-b from-[#111827]/90 to-[#070B14]/98 border border-white/10 hover:border-amber-400/60 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.2)] flex flex-col justify-between group transition duration-500 transform hover:-translate-y-1.5"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent" />
                <div className="absolute inset-0 glass-sheen" />

                <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                  Save {pkg.discountPercentage}%
                </div>

                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl border border-white/15">
                  {pkg.days} Days / {pkg.nights} Nights
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-bold text-amber-400 mb-1">
                    {pkg.destination}, {pkg.country}
                  </div>
                  <h3 className="text-xl font-bold text-white font-display group-hover:text-amber-300 transition">
                    {pkg.title}
                  </h3>

                  <div className="space-y-2 mt-4">
                    {pkg.included.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] line-through text-slate-500 font-mono block">
                      {formatPrice(pkg.originalPriceUSD, currency)}
                    </span>
                    <span className="text-xl font-black text-white font-mono">
                      {formatPrice(pkg.salePriceUSD, currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookPackage(pkg)}
                    className="px-4 py-2 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 shadow-md shadow-amber-500/20 transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Claim Privilege</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
