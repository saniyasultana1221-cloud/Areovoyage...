import React from 'react';
import { 
  X, MapPin, Plane, Sun, Wind, Droplets, Compass, 
  ArrowRight, Sparkles, AlertCircle, RefreshCw, Radio, Lock
} from 'lucide-react';
import { LiveDestinationReport } from '../services/travelDataService';
import { Currency } from '../types';
import { formatPrice } from '../utils/currency';

interface LiveTelemetryPanelProps {
  report: LiveDestinationReport | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onExploreLocation: (report: LiveDestinationReport) => void;
  onReserveAccess?: (report: LiveDestinationReport) => void;
  currency: Currency;
}

export const LiveTelemetryPanel: React.FC<LiveTelemetryPanelProps> = ({
  report,
  isLoading,
  error,
  onClose,
  onExploreLocation,
  onReserveAccess,
  currency,
}) => {
  if (!report && !isLoading && !error) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 w-[320px] sm:w-[380px] select-none">
      
      {/* ========================================================================= */}
      {/* SOLID VISIONOS TRANSLUCENT FROSTED GLASS TELEMETRY PANEL */}
      {/* ========================================================================= */}
      <div 
        className="rounded-[28px] overflow-hidden p-5 shadow-2xl space-y-4 border border-white/20"
        style={{
          background: 'linear-gradient(180deg, rgba(20, 28, 44, 0.94) 0%, rgba(10, 15, 24, 0.98) 100%)',
          backdropFilter: 'blur(36px) saturate(200%)',
          WebkitBackdropFilter: 'blur(36px) saturate(200%)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
        }}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 font-mono flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>LIVE SATELLITE TELEMETRY</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white transition"
            title="Close Live Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="py-8 text-center space-y-3 animate-pulse">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin mx-auto" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Fetching Real-Time Satellite Data...</h4>
              <p className="text-xs text-slate-400 font-mono">Querying OpenStreetMap & Open-Meteo...</p>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !isLoading && (
          <div className="py-4 px-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Location Lookup Error</span>
            </div>
            <p className="text-xs text-rose-200/90 font-normal leading-relaxed">{error}</p>
          </div>
        )}

        {/* LIVE DATA CARD CONTENT */}
        {report && !isLoading && !error && (
          <div className="space-y-4">
            
            {/* City Title & Geo Coordinates */}
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight leading-tight">
                    {report.location.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="truncate">{report.location.country}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-[10px] font-mono text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                      {report.location.countryCode}
                    </span>
                  </div>
                </div>

                {/* Real-Time Temperature Badge */}
                <div className="text-right flex-shrink-0 bg-white/[0.07] border border-white/15 px-3 py-1.5 rounded-2xl backdrop-blur-md">
                  <div className="text-2xl font-black font-mono text-white flex items-center gap-1">
                    <span>{report.weather.icon}</span>
                    <span>{report.weather.temperatureC}°C</span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium block">
                    {report.weather.condition}
                  </span>
                </div>
              </div>

              {/* Precise 3D Coordinates */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                  Lat: {report.location.lat.toFixed(4)}°
                </span>
                <span className="bg-black/40 px-2 py-0.5 rounded-md border border-white/10">
                  Lon: {report.location.lon.toFixed(4)}°
                </span>
                <span className="bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  3D ({report.location.cartesian3D.x}, {report.location.cartesian3D.y}, {report.location.cartesian3D.z})
                </span>
              </div>
            </div>

            {/* Weather Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 space-y-0.5">
                <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Feels Like</span>
                </div>
                <div className="text-xs font-black font-mono text-white">
                  {report.weather.feelsLikeC}°C
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 space-y-0.5">
                <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                  <Wind className="w-3 h-3 text-cyan-400" />
                  <span>Wind</span>
                </div>
                <div className="text-xs font-black font-mono text-white">
                  {report.weather.windSpeedKmh} km/h
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 space-y-0.5">
                <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-slate-400">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span>Humidity</span>
                </div>
                <div className="text-xs font-black font-mono text-white">
                  {report.weather.humidityPercent}%
                </div>
              </div>
            </div>

            {/* Flight Rate Matrix (Amadeus Engine Live Estimate) */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white/[0.04] to-transparent border border-amber-400/25 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Plane className="w-3.5 h-3.5" />
                  <span>Live Flight Matrix</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  ~{report.flights.flightDurationHours}h • {report.flights.stops}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Economy</span>
                  <div className="text-sm font-black font-mono text-white">
                    {formatPrice(report.flights.economyRateUSD, currency)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-amber-400/90 uppercase tracking-wider block font-bold">Business Class</span>
                  <div className="text-sm font-black font-mono text-amber-300">
                    {formatPrice(report.flights.businessRateUSD, currency)}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono pt-1 flex items-center justify-between border-t border-white/10">
                <span>Partner: {report.flights.airlineCarrier}</span>
                <span className="text-emerald-400">● Best Fare Rate</span>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="space-y-2 pt-1">
              
              {/* Button 1: Primary "Reserve Access" (Opens Stripe & Supabase Checkout Modal) */}
              <button
                onClick={() => onReserveAccess && onReserveAccess(report)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-slate-950" />
                <span>Reserve Access & Book Flight</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button 2: Center Globe & Explore 3D View */}
              <button
                onClick={() => onExploreLocation(report)}
                className="w-full py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Center Globe on {report.location.name}</span>
              </button>
            </div>

            {/* Data Source Footer */}
            <div className="text-[9px] text-center text-slate-400/80 font-mono">
              Data verified via {report.source} at {report.timestamp}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
