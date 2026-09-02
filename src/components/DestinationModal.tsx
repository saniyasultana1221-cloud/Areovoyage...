import React, { useState } from 'react';
import { X, Star, MapPin, Heart, Calendar, Check, ArrowRight, ShieldCheck, Clock, Users, Eye, Maximize2 } from 'lucide-react';
import { Destination, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { CosmicStarfield } from './CosmicStarfield';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  currency: Currency;
  isBookmarked: boolean;
  onToggleBookmark: (destination: Destination) => void;
  onBookNow: (destination: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  currency,
  isBookmarked,
  onToggleBookmark,
  onBookNow,
}) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  if (!destination) return null;

  const photos = [
    destination.image,
    ...(destination.landmarks?.map(l => l.image) || []),
    ...destination.gallery
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="relative space-cosmos-backdrop rounded-[36px] max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col text-white">
        
        {/* Background Starfield */}
        <CosmicStarfield density={60} speed={0.1} />
        
        {/* Modal Header Bar */}
        <div className="p-6 sm:p-7 bg-black/50 border-b border-white/10 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-black uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>{destination.country} • {destination.continent}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">{destination.name}</h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onToggleBookmark(destination)}
              className={`p-3 rounded-2xl backdrop-blur-md transition border ${
                isBookmarked
                  ? 'bg-rose-500 text-white border-rose-400 shadow-lg'
                  : 'bg-white/10 text-slate-200 hover:text-white border-white/15'
              }`}
            >
              <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#0B0F19]/90">
          
          {/* Photo Gallery Viewer */}
          <div className="space-y-3.5">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-white/15">
              <img
                src={photos[selectedPhotoIndex] || destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 border border-white/20">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-amber-300 font-bold">{destination.rating.toFixed(1)}</span>
                <span className="text-slate-200">({destination.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {photos.slice(0, 6).map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhotoIndex(i)}
                  className={`relative h-20 rounded-2xl overflow-hidden border-2 transition cursor-pointer ${
                    selectedPhotoIndex === i 
                      ? 'border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Description & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="visionos-glass-card p-6 sm:p-7 rounded-3xl border border-white/15">
                <h3 className="text-xl font-black text-white mb-3 font-display">Experience Overview</h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal tracking-wide">
                  {destination.description}
                </p>
              </div>

              {/* Day-by-Day Curated Schedule */}
              <div>
                <h3 className="text-xl font-black text-white mb-3.5 font-display">
                  Day-by-Day Curated Schedule ({destination.itinerary.length} Days)
                </h3>
                <div className="space-y-3.5">
                  {destination.itinerary.map((item) => (
                    <div
                      key={item.day}
                      className="p-5 rounded-2xl visionos-glass-card border border-white/15 flex gap-4 items-start"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex flex-col items-center justify-center flex-shrink-0 text-amber-400 shadow-md">
                        <span className="text-[10px] font-black uppercase tracking-wider">DAY</span>
                        <span className="font-mono font-black text-base text-white">{item.day}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-normal">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary & Booking Sidebar */}
            <div className="space-y-6">
              <div className="visionos-glass-card p-6 sm:p-7 rounded-3xl border border-white/20 shadow-xl space-y-4">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                  All-Inclusive Package Rate
                </span>
                <div className="text-4xl font-black text-white font-mono">
                  {formatPrice(destination.pricePerDayUSD * destination.durationDays, currency)}
                </div>
                <span className="text-xs sm:text-sm text-slate-200 block font-medium">
                  Per person for {destination.durationDays} days luxury stay + chartered transfers
                </span>

                <button
                  onClick={() => {
                    onBookNow(destination);
                    onClose();
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Initialize Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Escrow protected, refundable up to 72h</span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="visionos-glass-card p-6 rounded-3xl border border-white/15 space-y-3.5">
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400">
                  Curated Highlights
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 font-normal">
                  {destination.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
