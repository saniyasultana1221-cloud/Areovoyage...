import React from 'react';
import { Heart, Star, MapPin, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Destination, Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface DestinationCardProps {
  destination: Destination;
  currency: Currency;
  isBookmarked: boolean;
  onToggleBookmark: (destination: Destination) => void;
  onSelect: (destination: Destination) => void;
  onBookNow: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  currency,
  isBookmarked,
  onToggleBookmark,
  onSelect,
  onBookNow,
}) => {
  return (
    <div className="group rounded-[28px] overflow-hidden bg-gradient-to-b from-[#111827]/90 to-[#070B14]/98 border border-white/10 hover:border-amber-400/60 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.2)] transition-all duration-500 flex flex-col transform hover:-translate-y-1.5 select-none">
      
      {/* Image Container */}
      <div className="relative h-60 sm:h-64 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-black/20 to-black/40" />
        <div className="absolute inset-0 glass-sheen" />

        {/* Region & Vibe Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-black/70 text-amber-400 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-md uppercase tracking-wider border border-white/15 shadow-md">
            {destination.continent}
          </span>
          <span className="bg-white/15 text-slate-100 font-bold text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/15 shadow-md">
            {destination.vibe}
          </span>
        </div>

        {/* Bookmark Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(destination);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition border z-10 cursor-pointer ${
            isBookmarked
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg'
              : 'bg-black/60 text-slate-200 hover:bg-black/90 border-white/20 hover:text-white'
          }`}
          title={isBookmarked ? 'Remove from Saved' : 'Save to Bucket List'}
        >
          <Heart className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
        </button>

        {/* Bottom Image Details (Rating & Weather) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-bold text-amber-300">{destination.rating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-300">({destination.reviewCount})</span>
          </div>

          <span className="bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full font-semibold text-[11px] border border-white/15 text-slate-200">
            {destination.temp} • {destination.weather}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Country Location Pill */}
          <div className="flex items-center gap-1 text-xs font-bold text-amber-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>{destination.country}</span>
          </div>

          {/* Destination Title */}
          <h3 
            onClick={() => onSelect(destination)}
            className="text-xl font-bold text-white hover:text-amber-300 cursor-pointer transition line-clamp-1 font-display tracking-tight"
          >
            {destination.name}
          </h3>

          {/* Clean Description */}
          <p className="text-xs sm:text-sm text-slate-300/90 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {destination.description}
          </p>

          {/* Highlights / Landmarks Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {destination.landmarks ? (
              destination.landmarks.slice(0, 3).map((lm) => (
                <span
                  key={lm.id}
                  className="text-[11px] font-semibold bg-white/[0.06] text-slate-300 px-2.5 py-0.5 rounded-lg border border-white/10"
                >
                  {lm.name}
                </span>
              ))
            ) : (
              destination.highlights.slice(0, 3).map((h, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold bg-white/[0.06] text-slate-300 px-2.5 py-0.5 rounded-lg border border-white/10"
                >
                  {h}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Footer / Pricing & Actions */}
        <div className="pt-3.5 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
              VIP Daily Rate
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-white font-mono">
                {formatPrice(destination.pricePerDayUSD, currency)}
              </span>
              <span className="text-xs text-slate-400 font-medium">/ day</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(destination)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Details</span>
            </button>

            <button
              onClick={() => onBookNow(destination)}
              className="px-4 py-2 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 transition flex items-center gap-1 cursor-pointer"
            >
              <span>Reserve</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
