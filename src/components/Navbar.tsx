import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Compass, Menu, X, Globe, Shield, Award, Plane } from 'lucide-react';
import { Currency } from '../types';
import { CURRENCIES } from '../utils/currency';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  bucketListCount: number;
  onOpenBucketList: () => void;
  onOpenSpinWheel: () => void;
  onOpenQuiz: () => void;
  onOpenPlanner: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  bucketListCount,
  onOpenBucketList,
  onOpenSpinWheel,
  onOpenQuiz,
  onOpenPlanner,
  onReplayIntro,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070A10]/85 backdrop-blur-2xl border-b border-white/15 transition-all">
      {/* Top Banner Ticker in Frosted Dark Glass & Amber Glow */}
      <div className="bg-[#05070D]/90 text-slate-200 py-1.5 px-4 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 overflow-hidden border-b border-white/10">
        <span className="flex items-center gap-1 text-amber-400 font-bold">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          SPATIAL TRAVEL PRIVILEGE:
        </span>
        <span>Use code <strong className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full uppercase font-black tracking-wider text-[11px]">VOYAGE20</strong> for 20% off luxury departures</span>
        {onReplayIntro && (
          <button 
            onClick={onReplayIntro}
            className="hidden md:inline-flex items-center gap-1 ml-3 bg-white/10 hover:bg-white/20 text-amber-300 border border-white/15 px-2.5 py-0.5 rounded-full text-xs font-bold transition"
            title="Replay 3D Airplane Takeoff"
          >
            <span>🛫 Replay Takeoff</span>
          </button>
        )}
        <button 
          onClick={onOpenSpinWheel}
          className="hidden md:inline-flex items-center gap-1 ml-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-xs font-bold transition"
        >
          <Gift className="w-3 h-3 text-amber-400" /> Member Perks
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 border border-amber-300 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)] transform group-hover:scale-105 transition duration-300">
              <Compass className="w-6 h-6 text-slate-950 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black font-display tracking-tight text-white">
                  AERO<span className="text-amber-400">VOYAGE</span>
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Spatial Travel Concierge
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#destinations" className="text-sm font-bold text-slate-300 hover:text-amber-400 transition">
              Destinations
            </a>
            <a href="#deals" className="text-sm font-bold text-slate-300 hover:text-amber-400 transition flex items-center gap-1.5">
              <span>Curated Deals</span>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">NEW</span>
            </a>
            <button 
              onClick={onOpenQuiz}
              className="text-sm font-bold text-slate-300 hover:text-amber-400 transition"
            >
              Vibe Assessment
            </button>
            <button 
              onClick={onOpenPlanner}
              className="text-sm font-bold text-slate-300 hover:text-amber-400 transition"
            >
              Trip Architect
            </button>
            <a href="#stories" className="text-sm font-bold text-slate-300 hover:text-amber-400 transition">
              Guest Stories
            </a>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentCurrency.code} ({currentCurrency.symbol})</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 visionos-glass-window rounded-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-white/10">
                    Select Currency
                  </div>
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl flex items-center justify-between transition ${
                        currentCurrency.code === c.code 
                          ? 'bg-amber-500 text-slate-950 font-black' 
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="font-mono opacity-80 font-bold">{c.symbol} {c.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Privilege Wheel Button */}
            <button
              onClick={onOpenSpinWheel}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock Perks</span>
            </button>

            {/* Saved Bucket List Drawer Trigger */}
            <button
              onClick={onOpenBucketList}
              className="relative p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 transition"
              title="View Saved Itineraries"
            >
              <Heart className="w-5 h-5 text-slate-200 hover:text-rose-400 transition" />
              {bucketListCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {bucketListCount}
                </span>
              )}
            </button>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenBucketList}
              className="relative p-2.5 rounded-xl bg-white/10 text-white"
            >
              <Heart className="w-5 h-5" />
              {bucketListCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {bucketListCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden visionos-glass-window border-b border-white/15 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-2">
            <a 
              href="#destinations" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-white/10"
            >
              Destinations
            </a>
            <a 
              href="#deals" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-white/10 flex items-center justify-between"
            >
              <span>Curated Deals</span>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">NEW</span>
            </a>
            <button 
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-white/10"
            >
              Vibe Assessment
            </button>
            <button 
              onClick={() => {
                onOpenPlanner();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-white/10"
            >
              Trip Architect
            </button>
            <a 
              href="#stories" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-bold text-slate-200 hover:bg-white/10"
            >
              Guest Stories
            </a>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenSpinWheel();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>Member Privileges Wheel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
