import React, { useEffect, useState } from 'react';
import { Compass, Sparkles, Navigation, Globe } from 'lucide-react';
import { CityInfo } from '../data/worldDatabase';

interface AtmosphericDiveTransitionProps {
  city: CityInfo;
  onComplete: () => void;
}

export const AtmosphericDiveTransition: React.FC<AtmosphericDiveTransitionProps> = ({
  city,
  onComplete,
}) => {
  const [altitude, setAltitude] = useState(420);
  const [phase, setPhase] = useState<'aligning' | 'diving' | 'landing'>('aligning');

  useEffect(() => {
    // 1. Initial lock-on in orbit
    const t1 = setTimeout(() => {
      setPhase('diving');
    }, 600);

    // 2. Altitude countdown
    const altInterval = setInterval(() => {
      setAltitude((prev) => {
        if (prev <= 5) {
          clearInterval(altInterval);
          return 2;
        }
        return Math.max(2, Math.floor(prev - (prev * 0.14) - 8));
      });
    }, 80);

    // 3. Final splash and landing
    const t2 = setTimeout(() => {
      setPhase('landing');
    }, 2200);

    const t3 = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(altInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden select-none">
      
      {/* Hyper-Speed Atmospheric Vortex Rings */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${phase === 'diving' ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Radial Re-Entry Speed Tunnel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(245,158,11,0.15)_60%,rgba(0,0,0,0.95)_100%)] animate-pulse" />

        {/* Shockwave Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] rounded-full border-2 border-amber-400/40 animate-ping duration-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[700px] sm:h-[700px] rounded-full border border-cyan-400/30 animate-pulse" />

        {/* Speed Streaks */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(255,255,255,0.06)_100%)]" />
      </div>

      {/* Atmospheric Flash Splash on Landing */}
      <div 
        className={`absolute inset-0 bg-white transition-opacity duration-500 ${
          phase === 'landing' ? 'opacity-90' : 'opacity-0'
        }`} 
      />

      {/* Futuristic Spatial Flight Telemetry HUD */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-4">
        
        {/* Target Reticle */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-amber-400/60 border-dashed animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-white/30" />
          <div className="w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_20px_#F59E0B] animate-ping" />
          <Navigation className="w-8 h-8 text-amber-400 animate-bounce" />
        </div>

        {/* Telemetry Labels */}
        <div 
          className="rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/25 space-y-2 backdrop-blur-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(20, 26, 38, 0.90) 0%, rgba(10, 14, 22, 0.95) 100%)',
          }}
        >
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{phase === 'aligning' ? 'ORBITAL TARGET LOCK' : phase === 'diving' ? 'ATMOSPHERIC FLY-IN' : 'TOUCHDOWN'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            Entering {city.name}, {city.country} {city.flag}
          </h2>

          {/* Altitude & Coordinates Telemetry */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm font-mono text-slate-300">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Altitude</span>
              <span className="font-black text-amber-300 text-sm sm:text-base">
                {altitude > 100 ? `${altitude} KM (ORBIT)` : altitude > 10 ? `${altitude} KM (STRATO)` : `${altitude} KM (APPROACH)`}
              </span>
            </div>

            <div className="h-6 w-[1px] bg-white/20" />

            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Coordinates</span>
              <span className="font-bold text-white">
                {city.lat.toFixed(4)}°, {city.lon.toFixed(4)}°
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
