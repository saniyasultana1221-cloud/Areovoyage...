import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, MapPin, X, ArrowRight, Sparkles, Navigation, Globe, 
  Loader2, Mic, Radio, Compass 
} from 'lucide-react';
import { Destination, Currency } from '../types';
import { WORLD_CITIES, CityInfo, resolveLocationCoordinates } from '../data/worldDatabase';
import { formatPrice } from '../utils/currency';
import { fetchLiveDestinationReport, LiveDestinationReport, latLonToCartesian } from '../services/travelDataService';

interface GlassSearchBarProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  onLocateCoordinates?: (coords: { lat: number; lon: number; name?: string; cartesian3D?: { x: number; y: number; z: number } }) => void;
  onSelectCityInfo?: (cityInfo: CityInfo) => void;
  onLiveTelemetryUpdate?: (report: LiveDestinationReport | null, isLoading: boolean, error: string | null) => void;
  currency: Currency;
  onSearchChange?: (term: string) => void;
}

export const GlassSearchBar: React.FC<GlassSearchBarProps> = ({
  destinations,
  onSelectDestination,
  onLocateCoordinates,
  onSelectCityInfo,
  onLiveTelemetryUpdate,
  currency,
  onSearchChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // 300ms Debounce listener for asynchronous live coordinate lookup
  useEffect(() => {
    const trimmed = searchTerm.trim();
    if (!trimmed || trimmed.length < 2) {
      if (onLiveTelemetryUpdate) onLiveTelemetryUpdate(null, false, null);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setIsSearchingLive(true);
      if (onLiveTelemetryUpdate) onLiveTelemetryUpdate(null, true, null);

      try {
        const liveReport = await fetchLiveDestinationReport(trimmed);
        if (liveReport) {
          if (onLiveTelemetryUpdate) onLiveTelemetryUpdate(liveReport, false, null);
        } else {
          // Check local offline database fallback
          const localCoords = resolveLocationCoordinates(trimmed);
          if (localCoords) {
            const fallbackReport: LiveDestinationReport = {
              location: {
                name: localCoords.name || trimmed,
                cityName: localCoords.name || trimmed,
                country: localCoords.country || 'Global',
                countryCode: 'UN',
                lat: localCoords.lat,
                lon: localCoords.lon,
                displayName: `${localCoords.name}, ${localCoords.country || ''}`,
                cartesian3D: latLonToCartesian(localCoords.lat, localCoords.lon, 80),
              },
              weather: {
                temperatureC: 24,
                temperatureF: 75,
                feelsLikeC: 25,
                condition: 'Pleasant & Clear',
                weatherCode: 1,
                icon: '☀️',
                windSpeedKmh: 12,
                humidityPercent: 45,
                surfacePressureHpa: 1013,
                isDay: true,
              },
              flights: {
                fromHub: 'Global Gateway',
                toCity: localCoords.name || trimmed,
                distanceKm: 4200,
                flightDurationHours: 5.5,
                economyRateUSD: 380,
                businessRateUSD: 1250,
                airlineCarrier: 'AEROVOYAGE VIP',
                stops: 'Direct',
              },
              source: 'Cached Telemetry',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            if (onLiveTelemetryUpdate) onLiveTelemetryUpdate(fallbackReport, false, null);
          } else {
            if (onLiveTelemetryUpdate) onLiveTelemetryUpdate(null, false, `No satellite telemetry found for "${trimmed}". Try searching by major city or country name.`);
          }
        }
      } catch (err: any) {
        if (onLiveTelemetryUpdate) onLiveTelemetryUpdate(null, false, err.message || 'Live network lookup failed.');
      } finally {
        setIsSearchingLive(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onLiveTelemetryUpdate]);

  // Filter matching world cities & destinations
  const matchingCities = WORLD_CITIES.filter((city) => {
    if (!searchTerm.trim()) return false;
    const q = searchTerm.toLowerCase();
    return (
      city.name.toLowerCase().includes(q) ||
      city.country.toLowerCase().includes(q) ||
      city.continent.toLowerCase().includes(q) ||
      city.famousFor.toLowerCase().includes(q) ||
      city.highlights.some((h) => h.toLowerCase().includes(q))
    );
  });

  const matchingCatalogDestinations = destinations.filter((dest) => {
    if (!searchTerm.trim()) return false;
    const q = searchTerm.toLowerCase();
    return (
      dest.name.toLowerCase().includes(q) ||
      dest.country.toLowerCase().includes(q) ||
      dest.continent.toLowerCase().includes(q) ||
      dest.tagline.toLowerCase().includes(q) ||
      (dest.shortName && dest.shortName.toLowerCase().includes(q))
    );
  });

  const hasResults = matchingCities.length > 0 || matchingCatalogDestinations.length > 0;

  // Trigger search execution
  const triggerLocationSearch = async (query: string) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    // 1. Check world database
    const matchedCity = WORLD_CITIES.find(
      (c) =>
        c.name.toLowerCase().includes(cleanQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(cleanQuery.toLowerCase())
    );

    if (matchedCity && onSelectCityInfo) {
      onSelectCityInfo(matchedCity);
    }

    // 2. Check local catalog
    const clean = cleanQuery.toLowerCase();
    const matchingDest = destinations.find((d) => 
      d.name.toLowerCase().includes(clean) || 
      d.country.toLowerCase().includes(clean) ||
      (d.shortName && d.shortName.toLowerCase().includes(clean))
    );
    if (matchingDest) {
      onSelectDestination(matchingDest);
    }

    // 3. Resolve live geographic coordinates from Nominatim
    let coords = resolveLocationCoordinates(cleanQuery);
    if (!coords) {
      try {
        const liveReport = await fetchLiveDestinationReport(cleanQuery);
        if (liveReport) {
          coords = {
            name: liveReport.location.name,
            country: liveReport.location.country,
            lat: liveReport.location.lat,
            lon: liveReport.location.lon,
          };
          if (onLiveTelemetryUpdate) onLiveTelemetryUpdate(liveReport, false, null);

          // If not in static database, build dynamic CityInfo for LocationInfoCard
          if (!matchedCity && onSelectCityInfo) {
            onSelectCityInfo({
              id: `dynamic-${liveReport.location.name.toLowerCase().replace(/\s+/g, '-')}`,
              name: liveReport.location.name,
              country: liveReport.location.country,
              countryCode: liveReport.location.countryCode,
              continent: 'Global',
              flag: '📍',
              lat: liveReport.location.lat,
              lon: liveReport.location.lon,
              famousFor: `Celebrated location in ${liveReport.location.country}`,
              rating: 4.95,
              weather: `${liveReport.weather.temperatureC}°C • ${liveReport.weather.condition}`,
              bestTimeToVisit: 'Year-Round',
              image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
              description: liveReport.location.displayName,
              highlights: ['Historic Architecture', 'Cultural Heritage Quarter', 'Scenic Vistas', 'Local Cuisine'],
            });
          }
        }
      } catch (err) {
        console.warn('Live geocode resolution error:', err);
      }
    }

    if (coords && onLocateCoordinates) {
      onLocateCoordinates({
        lat: coords.lat,
        lon: coords.lon,
        name: coords.name,
        cartesian3D: latLonToCartesian(coords.lat, coords.lon, 80),
      });
    }

    setIsOpen(false);
  };

  const handleSelectCity = (city: CityInfo) => {
    if (onSelectCityInfo) onSelectCityInfo(city);
    if (onLocateCoordinates) {
      onLocateCoordinates({
        lat: city.lat,
        lon: city.lon,
        name: city.name,
        cartesian3D: latLonToCartesian(city.lat, city.lon, 80),
      });
    }
    setSearchTerm('');
    setIsOpen(false);
    if (onSearchChange) onSearchChange('');
  };

  const handleSelectCatalog = (dest: Destination) => {
    onSelectDestination(dest);
    setSearchTerm('');
    setIsOpen(false);
    if (onSearchChange) onSearchChange('');
    
    // Auto-rotate globe smoothly to destination coordinates
    const coords = resolveLocationCoordinates(dest.shortName || dest.name || dest.country);
    if (coords && onLocateCoordinates) {
      onLocateCoordinates({
        lat: coords.lat,
        lon: coords.lon,
        name: coords.name,
        cartesian3D: latLonToCartesian(coords.lat, coords.lon, 80),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerLocationSearch(searchTerm);
    }
  };

  const handleVoiceSearch = () => {
    const samples = ['Rome', 'India', 'Kyoto', 'Amalfi Coast', 'Swiss Alps', 'Santorini', 'Paris', 'Bali', 'Cairo', 'New York', 'Sydney', 'Rio de Janeiro', 'Dubai', 'Barcelona', 'Tokyo', 'London'];
    const randomPick = samples[Math.floor(Math.random() * samples.length)];
    setSearchTerm(randomPick);
    setIsOpen(true);
    if (onSearchChange) onSearchChange(randomPick);
    triggerLocationSearch(randomPick);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div ref={containerRef} className="relative w-[340px] sm:w-[480px] select-none">
      
      {/* ========================================================================= */}
      {/* SOLID VISIONOS TRANSLUCENT RESULTS DROPDOWN (OPENS UPWARD FROM BOTTOM) */}
      {/* ========================================================================= */}
      {isOpen && searchTerm.trim() && (
        <div 
          className="absolute left-0 right-0 bottom-full mb-3 rounded-3xl overflow-hidden p-3 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-2 max-h-[380px] overflow-y-auto"
          style={{
            background: 'linear-gradient(180deg, rgba(28, 35, 48, 0.96) 0%, rgba(14, 19, 30, 0.98) 100%)',
            backdropFilter: 'blur(40px) saturate(210%)',
            WebkitBackdropFilter: 'blur(40px) saturate(210%)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), inset 0 1px 1px 0 rgba(255, 255, 255, 0.35)',
          }}
        >
          {/* Header */}
          <div className="px-2 pt-1 pb-1.5 flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-300 border-b border-white/10">
            <span className="flex items-center gap-1.5">
              {isSearchingLive ? (
                <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              ) : (
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>Global Satellite Results</span>
            </span>
            <span className="text-amber-400 font-mono font-bold">Zoom to Spot</span>
          </div>

          {hasResults ? (
            <>
              {/* World Cities Match */}
              {matchingCities.map((city) => (
                <div
                  key={city.id}
                  onClick={() => handleSelectCity(city)}
                  className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.14] border border-white/10 hover:border-amber-400/60 transition cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-white/20 flex-shrink-0 group-hover:scale-105 transition shadow-md"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition truncate">
                          {city.name}
                        </h4>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                          {city.flag} {city.country}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300/90 truncate mt-0.5 font-normal">
                        {city.famousFor}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Catalog Destinations Match */}
              {matchingCatalogDestinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => handleSelectCatalog(dest)}
                  className="p-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.14] border border-white/10 hover:border-amber-400/60 transition cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-white/20 flex-shrink-0 group-hover:scale-105 transition shadow-md"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition truncate">
                          {dest.name}
                        </h4>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                          {dest.country}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300/90 truncate mt-0.5 font-normal">
                        {dest.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right mr-1">
                      <div className="text-sm font-black font-mono text-amber-300">
                        {formatPrice(dest.pricePerDayUSD, currency)}
                      </div>
                      <span className="text-[10px] text-slate-400">/ day</span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="py-6 px-4 text-center space-y-2">
              <Compass className="w-8 h-8 text-slate-400 mx-auto opacity-70 animate-pulse" />
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                No matching cached record for "{searchTerm}".
              </p>
              <button
                onClick={() => triggerLocationSearch(searchTerm)}
                className="mt-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold flex items-center gap-1.5 mx-auto transition"
              >
                <span>Rotate 3D Globe to "{searchTerm}"</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SOLID VISIONOS FROSTED GLASS CAPSULE SEARCH PILL */}
      {/* ========================================================================= */}
      <div 
        onClick={() => {
          if (inputRef.current) inputRef.current.focus();
          setIsOpen(true);
        }}
        className="rounded-full px-5 py-3 sm:py-3.5 flex items-center gap-3.5 shadow-2xl transition-all duration-300 group cursor-text"
        style={{
          background: 'linear-gradient(180deg, rgba(35, 42, 58, 0.90) 0%, rgba(18, 24, 36, 0.96) 100%)',
          backdropFilter: 'blur(36px) saturate(200%)',
          WebkitBackdropFilter: 'blur(36px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.24)',
          boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.75), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45)',
        }}
      >
        {/* Search / Spinner Icon */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            triggerLocationSearch(searchTerm);
          }}
          title="Search & Rotate to Location"
        >
          {isSearchingLive ? (
            <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-amber-400 flex-shrink-0 group-hover:scale-110 transition" />
          )}
        </button>

        {/* Search Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            if (onSearchChange) onSearchChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search any country or city (e.g. India, Rome, Tokyo)..."
          className="w-full bg-transparent text-sm sm:text-base font-semibold text-white placeholder-slate-400/90 focus:outline-none tracking-wide"
        />

        {/* Clear Button (when text exists) */}
        {searchTerm && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSearchTerm('');
              if (onSearchChange) onSearchChange('');
              if (onLiveTelemetryUpdate) onLiveTelemetryUpdate(null, false, null);
            }}
            className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Voice Search Mic Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleVoiceSearch();
          }}
          className="p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-slate-200 hover:text-amber-400 border border-white/15 transition flex-shrink-0"
          title="Voice Search / Quick Suggestion"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
