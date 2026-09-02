import React from 'react';
import { X, Trash2, ArrowRight, Heart, MapPin, Eye } from 'lucide-react';
import { Destination, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { CosmicStarfield } from './CosmicStarfield';

interface BucketListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedDestinations: Destination[];
  currency: Currency;
  onRemoveBookmark: (destination: Destination) => void;
  onSelectDestination: (dest: Destination) => void;
  onBookNow: (dest: Destination) => void;
}

export const BucketListDrawer: React.FC<BucketListDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedDestinations,
  currency,
  onRemoveBookmark,
  onSelectDestination,
  onBookNow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md space-cosmos-backdrop relative h-full shadow-2xl flex flex-col justify-between border-l border-white/20 animate-in slide-in-from-right duration-300 text-white overflow-hidden">
        
        {/* Background Starfield */}
        <CosmicStarfield density={40} speed={0.1} />
        
        {/* Drawer Header */}
        <div className="p-6 bg-black/50 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="font-black text-lg font-display text-white">Saved Spatial Itineraries</h3>
            <span className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
              {bookmarkedDestinations.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer List Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4 bg-[#0B0F19]/90">
          {bookmarkedDestinations.length > 0 ? (
            bookmarkedDestinations.map((dest) => (
              <div
                key={dest.id}
                className="visionos-glass-card rounded-2xl p-3.5 border border-white/15 flex gap-3.5 items-center group hover:border-amber-400/60 transition shadow-lg"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-20 h-20 rounded-xl object-cover border border-white/20"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                    <MapPin className="w-3 h-3" />
                    <span>{dest.country}</span>
                  </div>

                  <h4 
                    onClick={() => {
                      onSelectDestination(dest);
                      onClose();
                    }}
                    className="font-bold text-sm text-white truncate cursor-pointer hover:text-amber-300 transition"
                  >
                    {dest.name}
                  </h4>

                  <span className="font-mono text-xs font-black text-amber-300 block mt-0.5">
                    {formatPrice(dest.pricePerDayUSD * dest.durationDays, currency)}
                  </span>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        onBookNow(dest);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black transition"
                    >
                      Reserve
                    </button>
                    <button
                      onClick={() => {
                        onSelectDestination(dest);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-bold transition"
                    >
                      View
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(dest)}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/10 rounded-xl transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 visionos-glass-card rounded-2xl border border-white/15 p-6 space-y-2">
              <Heart className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="font-bold text-sm text-white">Your Bucket List is Empty</h4>
              <p className="text-xs text-slate-400">
                Explore destinations in 3D and tap the heart icon to save itineraries.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedDestinations.length > 0 && (
          <div className="p-6 bg-black/60 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                onBookNow(bookmarkedDestinations[0]);
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs shadow-xl transition flex items-center justify-center gap-2"
            >
              <span>Reserve First Saved Voyage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
