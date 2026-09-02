import React, { useState } from 'react';
import { Compass, Mail, ArrowRight, ShieldCheck, Award, Headphones, Globe } from 'lucide-react';
import { CosmicStarfield } from './CosmicStarfield';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="space-cosmos-backdrop text-slate-300 pt-20 pb-14 relative overflow-hidden select-none">
      
      {/* Background Deep Space Starfield */}
      <CosmicStarfield density={80} speed={0.1} />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Top Grid: Newsletter & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 border border-amber-300 flex items-center justify-center text-slate-950 shadow-md">
                <Compass className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
                AERO<span className="text-amber-400">VOYAGE</span>
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm font-normal">
              The premier bespoke luxury travel and chartered expedition concierge. Designing once-in-a-lifetime journeys across 48 countries with uncompromising safety and distinction.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400 block mb-2">
                Subscribe to The Spatial Travel Journal
              </span>
              {subscribed ? (
                <div className="p-3.5 rounded-2xl visionos-glass-card border border-white/20 text-xs sm:text-sm text-amber-300 font-bold">
                  ✓ Thank you. Exclusive dispatches will be delivered to your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter executive email..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-white/10 text-white placeholder-slate-400 text-sm px-4 py-3 rounded-2xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400 flex-1 transition font-medium"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links 1: Destinations */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Destinations</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-normal">
              <li><a href="#destinations" className="hover:text-amber-400 transition">Rome & Vatican City, Italy</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Agra & Taj Mahal, India</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Kyoto & Tokyo, Japan</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Amalfi Coast & Positano</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Swiss Alps, Zermatt</a></li>
            </ul>
          </div>

          {/* Quick Links 2: Concierge Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Concierge Desk</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-normal">
              <li><a href="#deals" className="hover:text-amber-400 transition">Chartered Aviation</a></li>
              <li><a href="#planner" className="hover:text-amber-400 transition">Custom Trip Architect</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Private Island Rentals</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Michelin Culinary Tours</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Corporate & Family Escapes</a></li>
            </ul>
          </div>

          {/* Quick Links 3: Corporate & Trust */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">Accreditation</h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-normal">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>IATA Verified Partner</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Luxury Travel Guild 2026</span>
              </li>
              <li className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>24/7 VIP Diplomatic Line</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Zero Carbon Charter Offset</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 AEROVOYAGE Spatial Systems Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Charter Terms</a>
            <a href="#" className="hover:text-white transition">Security & Escrow</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
