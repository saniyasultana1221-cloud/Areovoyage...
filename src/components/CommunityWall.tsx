import React, { useState } from 'react';
import { Heart, Star, MessageSquare, Quote, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { REVIEWS } from '../data/reviews';
import { CosmicStarfield } from './CosmicStarfield';

// 6 Floating Traveler Review Polaroids around Title
const FLOATING_COMMUNITY_CARDS = [
  {
    id: 'comm-1',
    author: 'Elena Rostova',
    location: 'Positano, Italy',
    comment: 'Pure magic on the Amalfi cliffs. Private yacht was breathtaking.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    position: 'top-2 sm:top-5 left-2 sm:left-4 lg:left-6',
    rotation: '-rotate-7',
    animClass: 'animate-float-drift-1',
  },
  {
    id: 'comm-2',
    author: 'Marcus Vance',
    location: 'Kyoto, Japan',
    comment: 'Private tea master ceremony in Arashiyama. Flawless concierge.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    position: 'top-0 left-[26%] sm:left-[28%]',
    rotation: 'rotate-4',
    animClass: 'animate-float-drift-2',
  },
  {
    id: 'comm-3',
    author: 'Sophia Laurent',
    location: 'Agra, India',
    comment: 'VIP sunrise access to Taj Mahal with private historian guide.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    position: 'top-3 sm:top-5 right-2 sm:right-4 lg:right-6',
    rotation: 'rotate-6',
    animClass: 'animate-float-drift-3',
  },
  {
    id: 'comm-4',
    author: 'David Chen',
    location: 'Zermatt, Switzerland',
    comment: 'Matterhorn glacier helicopter pass was the trip of a lifetime.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    position: 'top-[44%] -translate-y-1/2 left-1 sm:left-3 lg:left-5',
    rotation: 'rotate-6',
    animClass: 'animate-float-drift-4',
  },
  {
    id: 'comm-5',
    author: 'Arjun & Maya',
    location: 'Hyderabad, India',
    comment: 'The Nizami banquet at Falaknuma was royalty personified.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    position: 'top-[46%] -translate-y-1/2 right-1 sm:right-3 lg:right-5',
    rotation: '-rotate-6',
    animClass: 'animate-float-drift-5',
  },
  {
    id: 'comm-6',
    author: 'Sarah Jenkins',
    location: 'Santorini, Greece',
    comment: 'Private infinity villa watching Oia sunset with zero crowds.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    position: 'bottom-2 sm:bottom-4 left-1/3 sm:left-[35%]',
    rotation: 'rotate-5',
    animClass: 'animate-float-drift-6',
  },
];

export const CommunityWall: React.FC = () => {
  const [likes, setLikes] = useState<{ [id: string]: number }>({
    'rev-1': 48,
    'rev-2': 34,
    'rev-3': 52,
    'rev-4': 29,
  });

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="stories" className="py-24 bg-transparent text-white relative overflow-hidden select-none">
      
      {/* Background Deep Space Starfield & Cosmic Dust */}
      <CosmicStarfield density={90} speed={0.15} />

      {/* Deep Space Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[400px] bg-rose-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* COSMOS / MOODBOARD HERO HEADER WITH FLOATING REVIEW CARDS AROUND TITLE */}
        {/* ========================================================================= */}
        <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex flex-col items-center justify-center text-center px-4 mb-16 overflow-hidden">
          
          {/* 6 Scattered Floating Traveler Vignettes */}
          {FLOATING_COMMUNITY_CARDS.map((item) => (
            <div
              key={item.id}
              className={`absolute ${item.position} ${item.animClass} z-10 hidden lg:block pointer-events-auto`}
            >
              <div
                className={`transform ${item.rotation} cursor-pointer group transition-all duration-500 ease-out hover:scale-108 hover:rotate-0 hover:z-50`}
              >
                <div 
                  className="w-44 sm:w-48 lg:w-52 p-3 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.85)] border border-white/20 backdrop-blur-xl transition duration-500 group-hover:border-amber-400/90 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.35)] text-left"
                  style={{
                    background: 'linear-gradient(145deg, rgba(20, 27, 40, 0.92) 0%, rgba(10, 14, 22, 0.98) 100%)',
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <img
                      src={item.image}
                      alt={item.author}
                      className="w-8 h-8 rounded-full object-cover border border-amber-400/70 shadow-md flex-shrink-0"
                    />
                    <div className="truncate">
                      <h5 className="text-xs font-bold text-white truncate">{item.author}</h5>
                      <span className="text-[10px] text-amber-400/90 font-black block truncate">{item.location}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Center Title */}
          <div className="relative z-20 max-w-2xl mx-auto space-y-3.5 px-4 py-8">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-black uppercase tracking-wider shadow-lg backdrop-blur-md">
              <Quote className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Spatial Dispatches</span>
            </div>

            {/* Title */}
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white leading-tight"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.2), 0 10px 25px rgba(0, 0, 0, 0.9)',
              }}
            >
              Guest Testimonials & <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">Reflections</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-lg mx-auto leading-relaxed">
              Real unfiltered stories, photos, and ratings from our private circle members and chartered expedition guests.
            </p>

            {/* Live Counter */}
            <div className="pt-1.5 flex items-center justify-center gap-2.5 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>4.98 / 5.0 Average Guest Rating</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400/90 font-mono text-xs">Verified Dispatches Only</span>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* TESTIMONIAL CARDS GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="rounded-[28px] p-5 sm:p-6 border border-white/10 bg-gradient-to-b from-[#111827]/90 to-[#070B14]/98 hover:border-amber-400/60 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(245,158,11,0.2)] transition-all duration-500 flex flex-col justify-between transform hover:-translate-y-1.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3.5 border-t border-white/10 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover border border-amber-400/50 shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-white">{rev.author}</h4>
                    <span className="text-[10px] text-slate-400">{rev.authorLocation}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-rose-400 transition cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 hover:fill-rose-400" />
                  <span>{likes[rev.id] || rev.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
