import React from 'react';
import { 
  X, MapPin, Calendar, Sun, Star, Compass, ArrowRight, Sparkles, 
  Loader2, Check, Clock, ShieldCheck, Tag, Database 
} from 'lucide-react';
import { CityInfo } from '../data/worldDatabase';
import { useDestinationData } from '../hooks/useDestinationData';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface LocationInfoCardProps {
  info: CityInfo | null;
  onClose: () => void;
  onExploreMore?: (info: CityInfo) => void;
  currency?: Currency;
}

export const LocationInfoCard: React.FC<LocationInfoCardProps> = ({
  info,
  onClose,
  onExploreMore,
  currency = { code: 'USD', symbol: '$', rateToUSD: 1, name: 'US Dollar' },
}) => {
  if (!info) return null;

  // Asynchronously query dynamic destination details from Supabase
  const { data: dynamicData, loading } = useDestinationData(info.id || info.name);

  // Computed values combining dynamic database response with local coordinates
  const cityName = dynamicData?.city_name || info.name;
  const countryName = dynamicData?.country || info.country;
  const flagIcon = dynamicData?.flag || info.flag;
  const continent = dynamicData?.continent || info.continent;
  const heroImage = dynamicData?.hero_image_url || info.image;
  const ratingValue = dynamicData?.rating || info.rating;
  const climateText = dynamicData?.climate || info.weather;
  const descriptionText = dynamicData?.description || info.description;
  const bestTimeToVisit = dynamicData?.best_time_to_visit || info.bestTimeToVisit;
  const dailyRate = dynamicData?.daily_rate || 320;
  const landmarksList = dynamicData?.landmarks || (info.landmarksDetail?.map(lm => ({
    name: lm.name,
    category: lm.tag || 'Historic Monument',
    image: lm.image,
    description: lm.description,
    rating: 4.95,
    tag: lm.tag
  })) || info.highlights.map(h => ({
    name: h,
    category: 'Celebrated Landmark',
    image: info.image,
    description: `Iconic highlight in ${info.name}`,
    rating: 4.95,
    tag: 'Highlight'
  })));

  return (
    <div className="absolute top-6 sm:top-8 right-4 sm:right-8 z-40 w-[340px] sm:w-[420px] animate-in fade-in slide-in-from-top-4 duration-300 select-none">
      
      {/* ========================================================================= */}
      {/* SOLID VISIONOS FROSTED GLASS DYNAMIC DATABASE CARD */}
      {/* ========================================================================= */}
      <div 
        className="rounded-[32px] overflow-hidden p-5 sm:p-6 shadow-2xl space-y-4 border border-white/25"
        style={{
          background: 'linear-gradient(180deg, rgba(24, 32, 46, 0.96) 0%, rgba(12, 17, 26, 0.98) 100%)',
          backdropFilter: 'blur(40px) saturate(210%)',
          WebkitBackdropFilter: 'blur(40px) saturate(210%)',
          boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45)',
        }}
      >
        
        {/* Top Image with Badge and Close */}
        <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/15 shadow-inner">
          <img
            src={heroImage}
            alt={cityName}
            className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
          
          {/* Country Flag & Continent Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs sm:text-sm font-bold text-white shadow-md">
            <span>{flagIcon}</span>
            <span>{countryName}</span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-amber-400 font-mono font-bold">{continent}</span>
            {dynamicData?.is_live_db && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1 font-mono">
                <Database className="w-2.5 h-2.5" />
                <span>DB</span>
              </span>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md hover:bg-white/20 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white transition shadow-md cursor-pointer"
            title="Dismiss Location Insight"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Rating & Weather at Bottom of Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs sm:text-sm text-white">
            <div className="flex items-center gap-1.5 bg-amber-500/30 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-amber-300 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{ratingValue.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 text-slate-200 font-medium">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>{climateText}</span>
            </div>
          </div>
        </div>

        {/* LOADING SKELETON STATE */}
        {loading ? (
          <div className="py-8 text-center space-y-3 animate-pulse">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
            <p className="text-xs sm:text-sm font-mono text-amber-300">Fetching dynamic database records...</p>
          </div>
        ) : (
          <>
            {/* City Title & Coordinates */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                  {cityName}
                </h3>
                <span className="text-xs font-mono font-bold text-amber-400/90 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                  {info.lat.toFixed(2)}°, {info.lon.toFixed(2)}°
                </span>
              </div>

              {/* Dynamic Tagline */}
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-400">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{dynamicData?.tagline || info.famousFor}</span>
              </div>

              {/* About / Description */}
              <p className="text-xs sm:text-sm text-slate-200/90 font-normal leading-relaxed tracking-normal line-clamp-3 pt-0.5">
                {descriptionText}
              </p>
            </div>

            {/* Dynamic Landmarks Grid (e.g. Charminar, Golconda Fort, Palaces) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                  Dynamic Landmarks ({landmarksList.length}):
                </span>
                <span className="text-[10px] font-mono text-amber-400">Verified Database</span>
              </div>

              <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                {landmarksList.map((lm: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-slate-200"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                      <span className="font-bold truncate text-white">{lm.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded flex-shrink-0 border border-white/10">
                      {lm.category || lm.tag || 'Monument'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Rate & Best Time */}
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <div className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Daily Rate:</span>
                <strong className="text-white font-mono text-amber-300 font-bold">{formatPrice(dailyRate, currency)}</strong>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Best Time:</span>
                <strong className="text-white font-bold truncate ml-1">{bestTimeToVisit}</strong>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onExploreMore && onExploreMore(info)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition flex items-center justify-center gap-2 transform hover:scale-[1.02] cursor-pointer"
            >
              <span>Explore {cityName} Voyage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

      </div>
    </div>
  );
};
