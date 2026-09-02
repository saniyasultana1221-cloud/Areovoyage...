import React, { useState } from 'react';
import { X, Sparkles, Gift, Copy, Check, Award, ArrowRight } from 'lucide-react';
import { SPIN_PRIZES } from '../data/reviews';
import { triggerConfetti } from '../utils/confetti';
import { CosmicStarfield } from './CosmicStarfield';

interface SpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPrizeCode: (code: string) => void;
}

export const SpinWheelModal: React.FC<SpinWheelModalProps> = ({ isOpen, onClose, onApplyPrizeCode }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<typeof SPIN_PRIZES[0] | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWonPrize(null);
    setCopied(false);

    // Pick random prize
    const randomIndex = Math.floor(Math.random() * SPIN_PRIZES.length);
    const selectedPrize = SPIN_PRIZES[randomIndex];

    // Compute rotation degrees
    const sliceDeg = 360 / SPIN_PRIZES.length;
    const extraSpins = 5 * 360;
    const targetDeg = extraSpins + (360 - randomIndex * sliceDeg - sliceDeg / 2);

    setRotation((prev) => prev + targetDeg);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(selectedPrize);
      triggerConfetti();
    }, 4500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative space-cosmos-backdrop rounded-[32px] max-w-md w-full overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200 text-white">
        
        {/* Background Starfield */}
        <CosmicStarfield density={40} speed={0.1} />
        
        {/* Header */}
        <div className="bg-black/50 border-b border-white/10 p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase border border-amber-400/40 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spatial Privileges Wheel</span>
          </div>
          <h3 className="text-xl font-black font-display text-white">Spin & Claim Privileges</h3>
          <p className="text-xs text-slate-300 mt-1">Unlock exclusive charter credits and VIP concierge passes.</p>
        </div>

        {/* Wheel Body */}
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center space-y-6 bg-[#0B0F19]/90">
          
          {/* Wheel Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            
            {/* Top Indicator Arrow */}
            <div className="absolute -top-3 z-30 transform -translate-x-1/2 left-1/2">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            </div>

            {/* Rotating Wheel Disk */}
            <div
              className="w-full h-full rounded-full border-4 border-white/30 shadow-[0_0_40px_rgba(245,158,11,0.25)] relative overflow-hidden transition-transform duration-[4500ms] ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                background: 'conic-gradient(#F59E0B 0deg 60deg, #8B5CF6 60deg 120deg, #06B6D4 120deg 180deg, #10B981 180deg 240deg, #FF5C5C 240deg 300deg, #B45309 300deg 360deg)',
              }}
            >
              {/* Wheel Slice Labels */}
              {SPIN_PRIZES.map((prize, idx) => {
                const angle = idx * 60 + 30;
                return (
                  <div
                    key={prize.id}
                    className="absolute w-full h-full flex justify-center pt-3 text-[10px] sm:text-xs font-black text-slate-950 uppercase tracking-tighter"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <span className="bg-white/85 px-2 py-0.5 rounded-full shadow-sm">
                      {prize.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Center Hub */}
            <div className="absolute w-16 h-16 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-2xl z-20">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          {/* Spin Trigger Button */}
          <button
            onClick={handleSpin}
            disabled={spinning}
            className={`w-full py-3.5 rounded-2xl font-black text-sm shadow-xl transition transform flex items-center justify-center gap-2 ${
              spinning
                ? 'bg-white/20 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 hover:-translate-y-0.5'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>{spinning ? 'Calibrating Spatial Orbit...' : 'Spin the Privilege Wheel'}</span>
          </button>

          {/* Won Prize Banner */}
          {wonPrize && (
            <div className="w-full p-4 rounded-2xl visionos-glass-card border border-amber-400/80 space-y-3 animate-in zoom-in-95 duration-300 text-center shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">Congratulations!</span>
                <h4 className="text-lg font-black text-white">{wonPrize.name}</h4>
                <p className="text-xs text-slate-300">{wonPrize.description}</p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-black/60 font-mono font-black text-amber-300 text-sm border border-white/20">
                  {wonPrize.code}
                </span>
                <button
                  onClick={() => handleCopyCode(wonPrize.code)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/15"
                  title="Copy Privilege Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <button
                onClick={() => {
                  onApplyPrizeCode(wonPrize.code);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
              >
                Apply Privilege Code Now
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
