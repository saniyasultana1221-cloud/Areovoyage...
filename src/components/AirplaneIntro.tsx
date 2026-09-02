import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, Sparkles, Plane } from 'lucide-react';

interface AirplaneIntroProps {
  onComplete: () => void;
}

export const AirplaneIntro: React.FC<AirplaneIntroProps> = ({ onComplete }) => {
  // Sequence States:
  // 1. 'zoomed' (Starts zoomed into screen on Translucent Spatial Frosted Glass)
  // 2. 'minimized' (Calibrates into standing climb position inclined to the left)
  // 3. 'thrust' (Turbines ignite with luminous amber & cyan exhaust thrust)
  // 4. 'takeoff' (Seamless supersonic climb soaring up and to the left into 3D Earth)
  // 5. 'complete' (Website fully interactive)
  const [phase, setPhase] = useState<'zoomed' | 'minimized' | 'thrust' | 'takeoff' | 'complete'>('zoomed');

  useEffect(() => {
    // 1 -> 2: Zoomed in -> Calibrates into standing steep climb angle inclined left
    const t1 = setTimeout(() => {
      setPhase('minimized');
    }, 600);

    // 2 -> 3: Engine ignition with luminous vapor trails
    const t2 = setTimeout(() => {
      setPhase('thrust');
    }, 1400);

    // 3 -> 4: Takeoff: Seamless smooth supersonic flight cut into 3D Earth
    const t3 = setTimeout(() => {
      setPhase('takeoff');
    }, 2200);

    // 5: Transition complete
    const t4 = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 3600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  if (phase === 'complete') return null;

  const isTakingOff = phase === 'takeoff';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none select-none">
      
      {/* ========================================================================= */}
      {/* LUXURY TRANSLUCENT FROSTED GLASS BACKDROP WITH AMBIENT LIGHT REFRACTION */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 z-10 transition-all duration-[1200ms] ease-out pointer-events-none"
        style={{
          opacity: isTakingOff ? 0 : 1,
          transform: isTakingOff ? 'scale(1.05)' : 'scale(1)',
          backdropFilter: 'blur(36px)',
          WebkitBackdropFilter: 'blur(36px)',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(14, 23, 42, 0.68) 0%, rgba(7, 10, 16, 0.84) 100%)',
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Soft Ambient Refraction Glows behind the glass */}
        <div className="absolute top-1/4 left-1/3 w-[750px] h-[500px] bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[450px] bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      {/* Top VisionOS Glass Header Overlay with Skip Button */}
      <div
        className={`relative z-30 flex items-center justify-between p-6 sm:p-8 max-w-7xl mx-auto w-full transition-opacity duration-300 ${
          isTakingOff ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 border border-amber-300 flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <Compass className="w-6 h-6 animate-spin-slow text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-base tracking-wider text-white">
                AERO<span className="text-amber-400">VOYAGE</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            </div>
            <p className="text-[10px] text-amber-300/80 font-bold tracking-widest uppercase">
              3D SPATIAL TRAVEL CONCIERGE
            </p>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl visionos-glass-pill text-white font-black text-xs shadow-2xl hover:border-amber-400 transition transform hover:-translate-y-0.5"
        >
          <span>Enter Spatial Explorer</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3D JETLINER IN STANDING INCLINED LEFT CLIMB POSITION */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          className="relative transition-all ease-in-out pointer-events-none"
          style={{
            transform:
              phase === 'zoomed'
                ? 'scale(1.75) translate(-4vw, 4vh) rotate(12deg)'
                : phase === 'minimized' || phase === 'thrust'
                ? 'scale(0.92) translate(-6vw, 0vh) rotate(16deg)' // Standing inclined left (steep climb attitude)
                : 'scale(1.35) translate(-170vw, -100vh) rotate(24deg)', // Soars up and to the left steeply
            transitionDuration:
              phase === 'minimized'
                ? '900ms'
                : phase === 'takeoff'
                ? '1600ms'
                : '600ms',
            transitionTimingFunction:
              phase === 'takeoff'
                ? 'cubic-bezier(0.22, 1, 0.36, 1)'
                : 'ease-out',
            filter: isTakingOff
              ? 'drop-shadow(0 35px 60px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 35px rgba(245, 158, 11, 0.6))'
              : 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.8))',
          }}
        >
          {/* Airplane Image Cutout */}
          <div className="relative w-[640px] sm:w-[880px] lg:w-[1050px] max-w-[96vw]">
            
            {/* Glowing Luminous Thrust Trails from Behind the Engines (z-0 behind airplane) */}
            {(phase === 'thrust' || phase === 'takeoff') && (
              <div className="absolute inset-0 pointer-events-none z-0">
                
                {/* Main Turbine Engine Amber Thrust Plume (Behind Turbine) */}
                <div
                  className="absolute w-44 sm:w-72 h-20 sm:h-32 rounded-full bg-gradient-to-r from-amber-400 via-amber-500/80 to-transparent blur-xl animate-smoke"
                  style={{
                    bottom: '6%',
                    left: '58%',
                    transform: 'rotate(-25deg)',
                  }}
                />

                {/* Second Wing Turbine Blue Thrust Plume */}
                <div
                  className="absolute w-36 sm:w-56 h-16 sm:h-28 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500/80 to-transparent blur-lg animate-smoke"
                  style={{
                    bottom: '26%',
                    left: '42%',
                    transform: 'rotate(-25deg)',
                    animationDelay: '0.1s',
                  }}
                />

                {/* APU Tail Vapor Trail */}
                <div
                  className="absolute w-52 sm:w-80 h-24 sm:h-36 rounded-full bg-gradient-to-r from-white via-amber-300/70 to-transparent blur-xl animate-smoke"
                  style={{
                    top: '24%',
                    right: '12%',
                    transform: 'rotate(-25deg)',
                    animationDelay: '0.05s',
                  }}
                />
              </div>
            )}

            <img
              src="/cartoon_plane_transparent.png"
              alt="AEROVOYAGE 3D Airplane Standing Inclined Left"
              className="relative z-10 w-full h-auto object-contain block filter brightness-105"
              loading="eager"
            />

            {/* Flashing Navigation Beacons */}
            <div
              className="absolute z-20 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping pointer-events-none shadow-[0_0_15px_#EF4444]"
              style={{ top: '6%', left: '17%' }}
            />
            <div
              className="absolute z-20 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-pulse pointer-events-none shadow-[0_0_15px_#34D399]"
              style={{ bottom: '11%', right: '1%' }}
            />

          </div>
        </div>
      </div>

      {/* Billowing Thrust Keyframes */}
      <style>{`
        @keyframes smokeBillow {
          0% {
            opacity: 0;
            transform: scale(0.3) translate(0px, 0px);
          }
          35% {
            opacity: 0.95;
            transform: scale(1.3) translate(60px, 20px);
          }
          100% {
            opacity: 0;
            transform: scale(3.2) translate(180px, 50px);
          }
        }
        .animate-smoke {
          animation: smokeBillow 1.2s infinite ease-out;
        }
      `}</style>

    </div>
  );
};
