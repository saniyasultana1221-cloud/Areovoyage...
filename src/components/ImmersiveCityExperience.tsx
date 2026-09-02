import React, { useState, useEffect } from 'react';
import { 
  Globe, X, MapPin, Star, Calendar, Sun, ArrowRight, Heart, Share2, 
  Sparkles, Compass, Check, Utensils, Camera, BookOpen, Clock, ShieldCheck, 
  ChevronRight, MessageSquare, Plus, Send, Loader2, Award, CheckCircle2
} from 'lucide-react';
import { CityInfo } from '../data/worldDatabase';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { triggerConfetti } from '../utils/confetti';
import { 
  fetchCityDetails, 
  submitCityReview, 
  DynamicCityData, 
  ReviewRecord 
} from '../services/databaseService';
import { CosmicStarfield } from './CosmicStarfield';
import { Global3DSpaceCanvas } from './Global3DSpaceCanvas';

interface ImmersiveCityExperienceProps {
  city: CityInfo;
  onBackToOrbit: () => void;
  onBookVoyage: (city: CityInfo) => void;
  onToggleBookmark?: (city: CityInfo) => void;
  currency: Currency;
}

export const ImmersiveCityExperience: React.FC<ImmersiveCityExperienceProps> = ({
  city,
  onBackToOrbit,
  onBookVoyage,
  onToggleBookmark,
  currency,
}) => {
  const [activeTab, setActiveTab] = useState<'landmarks' | 'itinerary' | 'reviews' | 'culture'>('landmarks');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic Database State & Loading
  const [dbData, setDbData] = useState<DynamicCityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Interactive Review Submission Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Fetch live city relational details from Supabase / Cached Repository
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setIsLoading(true);
      try {
        const data = await fetchCityDetails(city.id || city.name);
        if (isMounted && data) {
          setDbData(data);
        }
      } catch (err) {
        console.warn('Error fetching dynamic city data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [city]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    setIsSubmittingReview(true);
    try {
      const cityId = dbData?.id || city.id;
      const res = await submitCityReview(cityId, {
        userName: newReviewAuthor || 'Distinguished Voyager',
        rating: newReviewRating,
        comment: newReviewComment,
      });

      if (res.success && dbData) {
        setDbData({
          ...dbData,
          reviews: [res.review, ...dbData.reviews],
          average_rating: Number(
            (
              (dbData.average_rating * dbData.reviews.length + newReviewRating) /
              (dbData.reviews.length + 1)
            ).toFixed(2)
          ),
        });
        setReviewSuccess(true);
        triggerConfetti();
        setTimeout(() => {
          setIsReviewModalOpen(false);
          setReviewSuccess(false);
          setNewReviewComment('');
          setNewReviewAuthor('');
        }, 1800);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const landmarksList = dbData?.landmarks && dbData.landmarks.length > 0 
    ? dbData.landmarks.map(lm => ({
        id: lm.id,
        name: lm.name,
        category: lm.category || 'Heritage',
        image: lm.image_url,
        description: lm.description,
        tag: lm.tag || 'Verified Landmark'
      }))
    : (city.landmarksDetail || []).map((lm, idx) => ({
        id: String(idx),
        name: lm.name,
        category: lm.tag || 'Heritage',
        image: lm.image,
        description: lm.description,
        tag: lm.tag || 'Verified Landmark'
      }));

  // Determine City Hero Background Image (specifically for Bengaluru: Vidhana Soudha, or city's heroImage)
  const isBengaluru = 
    city.name.toLowerCase().includes('bengaluru') || 
    city.name.toLowerCase().includes('bangalore') ||
    city.id.includes('bengaluru');

  const cityHeroBg = isBengaluru
    ? '/images/bengaluru_lake.png'
    : (city.heroImage || city.image || (landmarksList[0]?.image) || '/images/bengaluru_lake.png');

  return (
    <div className="min-h-screen bg-[#03150d] text-white font-sans selection:bg-emerald-400 selection:text-slate-950 pb-24 select-none relative overflow-hidden">
      
      {/* Full-bleed Vivid Natural Lake Background (User's 2nd Image - Lalbagh Lake, Bengaluru) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src={cityHeroBg}
          alt={`${city.name} background`}
          className="w-full h-full object-cover object-center scale-100 filter brightness-95 contrast-105"
        />
        {/* Soft Organic Nature Scrim for crisp typography without dark blue tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />
        <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[500px] bg-emerald-500/[0.08] rounded-full blur-[160px]" />
      </div>

      {/* ========================================================================= */}
      {/* TOP NATURE VISIONOS TRANSLUCENT NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl border-b border-emerald-500/25 bg-[#041a12]/80 px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xl">
        
        {/* Return to 3D Orbit Button */}
        <button
          onClick={onBackToOrbit}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-400/30 text-emerald-100 hover:text-white transition group shadow-md cursor-pointer"
        >
          <Globe className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition duration-300" />
          <span className="text-xs font-bold font-mono tracking-wider">RETURN TO ORBIT</span>
        </button>

        {/* Center Title */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981] animate-pulse" />
          <span>PORTAL ACTIVE: {city.name.toUpperCase()}, {city.country.toUpperCase()}</span>
          {dbData?.isDynamic && (
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
              SUPABASE LIVE
            </span>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-400/30 text-emerald-100 hover:text-white transition shadow-sm cursor-pointer"
            title="Share Destination Portal"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setSaved(!saved);
              if (onToggleBookmark) onToggleBookmark(city);
            }}
            className={`p-2 rounded-xl border transition shadow-sm cursor-pointer ${
              saved
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-emerald-900/40 hover:bg-emerald-800/60 border-emerald-400/30 text-emerald-100 hover:text-white'
            }`}
            title="Save to Bucket List"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={() => onBookVoyage(city)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Reserve Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CINEMATIC CITY HERO HEADER (CLEAN, NO FLOATING OVERLAY CARDS) */}
      {/* ========================================================================= */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-10 pb-6">
        <div className="flex flex-col items-center justify-center text-center px-4 mb-8">
          
          {/* Center Title & Telemetry Capsule */}
          <div className="relative z-20 max-w-2xl mx-auto space-y-4 px-4 py-6">
            
            {/* Country Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-400/40 text-emerald-200 text-xs font-black uppercase tracking-wider shadow-xl backdrop-blur-xl">
              <span>{city.flag}</span>
              <span>{city.country}</span>
              <span className="text-emerald-400/60">•</span>
              <span className="text-emerald-300">{city.continent}</span>
            </div>

            {/* City Title */}
            <h1 
              className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white leading-tight"
              style={{
                textShadow: '0 4px 30px rgba(0, 0, 0, 0.9), 0 0 40px rgba(16, 185, 129, 0.35)',
              }}
            >
              {city.name}
            </h1>

            {/* Famous For Subtext in Frosted Emerald Glass */}
            <div className="bg-black/45 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-emerald-500/30 shadow-2xl max-w-xl mx-auto">
              <p className="text-xs sm:text-sm text-emerald-50 font-medium leading-relaxed">
                {dbData?.description || city.description}
              </p>
            </div>

            {/* Telemetry Capsule Grid */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-xs">
              <div className="bg-emerald-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/35 flex items-center gap-1.5 shadow-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-amber-300">{dbData?.average_rating ? dbData.average_rating.toFixed(1) : city.rating.toFixed(1)}</span>
                <span className="text-emerald-300/80 text-[10px]">({dbData?.reviews.length || 24} reviews)</span>
              </div>

              <div className="bg-emerald-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/35 flex items-center gap-1.5 text-emerald-100 shadow-lg">
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span>{dbData?.weather || city.weather}</span>
              </div>

              <div className="bg-emerald-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/35 flex items-center gap-1.5 text-emerald-100 shadow-lg">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{dbData?.best_time_to_visit || city.bestTimeToVisit}</span>
              </div>

              <div className="bg-emerald-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/35 font-mono text-emerald-300 text-[11px] shadow-lg">
                {city.lat.toFixed(2)}°N, {city.lon.toFixed(2)}°E
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE NAVIGATION TABS */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="rounded-2xl p-1.5 border border-emerald-500/30 bg-emerald-950/70 backdrop-blur-xl flex items-center gap-2 shadow-2xl">
            <button
              onClick={() => setActiveTab('landmarks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'landmarks'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Landmarks & Heritage ({landmarksList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('itinerary')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Curated Itinerary</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30'
                  : 'text-emerald-200 hover:text-white hover:bg-emerald-900/40'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Reviews ({dbData?.reviews.length || 0})</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: DYNAMIC LANDMARKS GRID */}
        {/* ========================================================================= */}
        {activeTab === 'landmarks' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landmarksList.map((lm, idx) => (
                <div
                  key={lm.id || idx}
                  className="rounded-[28px] overflow-hidden bg-gradient-to-b from-emerald-950/80 to-[#02170e]/95 border border-emerald-500/30 hover:border-emerald-400/80 shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-xl transition-all duration-500 flex flex-col justify-between group transform hover:-translate-y-1.5"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={lm.image}
                      alt={lm.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02170e] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-emerald-950/90 text-emerald-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-400/40 backdrop-blur-md uppercase tracking-wider shadow-md">
                      {lm.category || 'Landmark'}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-lg font-bold text-white font-display group-hover:text-emerald-300 transition">
                        {lm.name}
                      </h4>
                      <p className="text-xs text-emerald-100/80 mt-1.5 leading-relaxed font-normal">
                        {lm.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300/80">
                      <span>{city.name}</span>
                      <span className="font-mono text-emerald-400 font-bold">{lm.tag || 'Verified Heritage'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CURATED ITINERARY */}
        {/* ========================================================================= */}
        {activeTab === 'itinerary' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {(dbData?.itineraries || []).map((day, idx) => (
              <div
                key={day.id || idx}
                className="rounded-2xl p-5 border border-emerald-500/30 bg-gradient-to-b from-emerald-950/80 to-[#02170e]/95 backdrop-blur-xl shadow-2xl flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 font-black font-mono text-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  D{day.day_number || (idx + 1)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{day.title}</h4>
                    <span className="text-xs font-mono text-emerald-400 font-bold">{day.duration_days ? `${day.duration_days} Days` : 'Full Day'}</span>
                  </div>
                  <div className="space-y-1 mt-2">
                    {(day.activities || []).map((act, actIdx) => (
                      <div key={actIdx} className="text-xs text-emerald-100/80 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{act.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LIVE REVIEWS & SUBMISSION */}
        {/* ========================================================================= */}
        {activeTab === 'reviews' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display">Guest Dispatches & Reviews</h3>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-lg cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write a Dispatch</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(dbData?.reviews || []).map((rev) => (
                <div
                  key={rev.id}
                  className="rounded-2xl p-5 border border-emerald-500/30 bg-gradient-to-b from-emerald-950/80 to-[#02170e]/95 backdrop-blur-xl shadow-2xl space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-100">{rev.user_name}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-emerald-100/90 italic">"{rev.comment}"</p>
                  <span className="text-[10px] text-emerald-400/60 block">{rev.created_at || 'Verified Guest'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* WRITE REVIEW MODAL */}
      {/* ========================================================================= */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative rounded-3xl max-w-md w-full p-6 border border-emerald-500/30 bg-[#041d13] shadow-2xl text-white space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-500/20">
              <h3 className="text-base font-bold text-emerald-100">Write a Guest Review for {city.name}</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-emerald-300 hover:text-white cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-black/40 text-white text-xs px-3.5 py-2.5 rounded-xl border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-1">Rating</label>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="w-full bg-black/40 text-white text-xs px-3.5 py-2.5 rounded-xl border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
                >
                  <option value={5} className="bg-slate-900">5 Stars - Outstanding</option>
                  <option value={4} className="bg-slate-900">4 Stars - Excellent</option>
                  <option value={3} className="bg-slate-900">3 Stars - Good</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-1">Your Reflection</label>
                <textarea
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows={3}
                  className="w-full bg-black/40 text-white text-xs p-3 rounded-xl border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg hover:from-emerald-400"
              >
                {isSubmittingReview ? 'Submitting...' : 'Post Dispatch'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
