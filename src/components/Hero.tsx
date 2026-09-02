import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Calendar, Users, Shield, Award, Headphones, ArrowRight, Star, Plane } from 'lucide-react';
import { TravelVibe } from '../types';
import { CosmicStarfield } from './CosmicStarfield';

interface HeroProps {
  onSearch: (params: { destination: string; vibe: TravelVibe }) => void;
  onOpenQuiz: () => void;
  onOpenSpinWheel: () => void;
}

// 6 Floating Showcase Photos around Hero (Cosmos Aesthetic)
const FLOATING_HERO_CARDS = [
  {
    id: 'hero-1',
    title: 'Amalfi Coast',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=85',
    size: 'w-36 h-48 sm:w-40 sm:h-52',
    position: 'top-2 sm:top-5 left-3 sm:left-6 lg:left-8',
    rotation: '-rotate-6',
    animClass: 'animate-float-drift-1',
  },
  {
    id: 'hero-2',
    title: 'Kyoto Bamboo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=85',
    size: 'w-44 h-32 sm:w-48 sm:h-34',
    position: 'top-0 left-[26%] sm:left-[28%]',
    rotation: 'rotate-4',
    animClass: 'animate-float-drift-2',
  },
  {
    id: 'hero-3',
    title: 'Swiss Alps',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=500&q=85',
    size: 'w-38 h-38 sm:w-42 sm:h-42',
    position: 'top-3 sm:top-5 right-3 sm:right-6 lg:right-8',
    rotation: 'rotate-6',
    animClass: 'animate-float-drift-3',
  },
  {
    id: 'hero-4',
    title: 'Santorini Domes',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=85',
    size: 'w-44 h-32 sm:w-48 sm:h-34',
    position: 'top-[46%] -translate-y-1/2 left-2 sm:left-5',
    rotation: 'rotate-5',
    animClass: 'animate-float-drift-4',
  },
  {
    id: 'hero-5',
    title: 'Taj Mahal',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=500&q=85',
    size: 'w-38 h-38 sm:w-42 sm:h-42',
    position: 'top-[48%] -translate-y-1/2 right-2 sm:right-5',
    rotation: '-rotate-6',
    animClass: 'animate-float-drift-5',
  },
  {
    id: 'hero-6',
    title: 'Bali Sanctuary',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=85',
    size: 'w-36 h-48 sm:w-40 sm:h-52',
    position: 'bottom-2 sm:bottom-4 left-1/3 sm:left-[35%]',
    rotation: 'rotate-5',
    animClass: 'animate-float-drift-6',
  },
];

export const Hero: React.FC<HeroProps> = ({ onSearch, onOpenQuiz, onOpenSpinWheel }) => {
  const [destinationQuery, setDestinationQuery] = useState('');
  const [vibeSelect, setVibeSelect] = useState<TravelVibe>('All');
  const [durationSelect, setDurationSelect] = useState('7-10 Days');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ destination: destinationQuery, vibe: vibeSelect });
    const target = document.getElementById('destinations');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden space-cosmos-backdrop py-20 lg:py-28 select-none">
      
      {/* Background Deep Space Starfield & Cosmic Dust */}
      <CosmicStarfield density={90} speed={0.15} />

      {/* Ambient Dark Space Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* COSMOS / MOODBOARD HERO HEADER WITH FLOATING POLAROIDS AROUND TITLE */}
        {/* ========================================================================= */}
        <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex flex-col items-center justify-center text-center px-4 mb-14 overflow-hidden">
          
          {/* 6 Scattered Floating Photos (Pure Cosmos Moodboard) */}
          {FLOATING_HERO_CARDS.map((item) => (
            <div
              key={item.id}
              className={`absolute ${item.position} ${item.animClass} z-10 hidden lg:block pointer-events-auto`}
            >
              <div
                className={`transform ${item.rotation} cursor-pointer group transition-all duration-500 ease-out hover:scale-108 hover:rotate-0 hover:z-50`}
              >
                <div className={`relative ${item.size} rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.08)] border border-white/20 transition-all duration-500 group-hover:border-amber-400/90 group-hover:shadow-[0_25px_55px_rgba(0,0,0,0.92),0_0_35px_rgba(245,158,11,0.4)]`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                  />
                  {/* Subtle glass vignette overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block truncate">
                      {item.country}
                    </span>
                    <span className="text-xs font-bold text-white truncate block">
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Center Title & CTAs */}
          <div className="relative z-20 max-w-2xl mx-auto space-y-4 px-4 py-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-black uppercase tracking-wider shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Bespoke Itineraries & Luxury Charters</span>
            </div>

            {/* Headline */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white leading-tight"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.2), 0 10px 25px rgba(0, 0, 0, 0.9)',
              }}
            >
              Exceptional Journeys, <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Crafted with Precision.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-lg mx-auto leading-relaxed">
              Experience curated private villas, chartered yachts, and bespoke cultural expeditions worldwide with our 24/7 executive concierge service.
            </p>

            {/* Direct CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#destinations"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenQuiz}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Personalized Vibe Match</span>
              </button>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* OMNI-SEARCH FLOATING GLASS CARD */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto">
          <div className="visionos-glass-card rounded-[28px] p-4 sm:p-5 border border-white/20 shadow-2xl bg-gradient-to-b from-[#111827]/95 to-[#070B14]/98">
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-center">
              
              {/* Destination Search Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>Where To?</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amalfi, Tokyo, Swiss..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  className="w-full bg-black/50 text-white placeholder-slate-400 text-xs font-semibold px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Travel Style Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Travel Style</span>
                </label>
                <select
                  value={vibeSelect}
                  onChange={(e) => setVibeSelect(e.target.value as TravelVibe)}
                  className="w-full bg-black/50 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  <option value="All" className="bg-slate-900">All Vibes</option>
                  <option value="Tropical Beach" className="bg-slate-900">Tropical Beach</option>
                  <option value="Adventure & Peaks" className="bg-slate-900">Adventure & Peaks</option>
                  <option value="Neon City & Culture" className="bg-slate-900">Neon City & Culture</option>
                  <option value="Foodie Safari" className="bg-slate-900">Foodie Safari</option>
                  <option value="Romantic Escape" className="bg-slate-900">Romantic Escape</option>
                  <option value="Party & Festivals" className="bg-slate-900">Party & Festivals</option>
                </select>
              </div>

              {/* Duration Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  <span>Duration</span>
                </label>
                <select
                  value={durationSelect}
                  onChange={(e) => setDurationSelect(e.target.value)}
                  className="w-full bg-black/50 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                >
                  <option value="3-5 Days" className="bg-slate-900">3-5 Days (Weekend Excursion)</option>
                  <option value="7-10 Days" className="bg-slate-900">7-10 Days (Standard Curated)</option>
                  <option value="14+ Days" className="bg-slate-900">14+ Days (Grand Tour)</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4 sm:pt-0 sm:self-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Catalog</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
