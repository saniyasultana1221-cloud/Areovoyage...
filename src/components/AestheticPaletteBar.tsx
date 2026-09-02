import React from 'react';
import { Palette, Sparkles, Sun, Moon, Droplets, Leaf } from 'lucide-react';
import { AestheticTheme } from '../types';

interface AestheticPaletteBarProps {
  currentTheme: AestheticTheme;
  onThemeChange: (theme: AestheticTheme) => void;
  viewMode: '3d-coverflow' | 'spatial-window' | 'curated-catalog';
  onViewModeChange: (mode: '3d-coverflow' | 'spatial-window' | 'curated-catalog') => void;
}

interface ThemeOption {
  id: AestheticTheme;
  name: string;
  badge: string;
  colors: string[];
  icon: React.ReactNode;
}

const THEMES: ThemeOption[] = [
  {
    id: 'sunset-amber',
    name: 'Sunset Amber & Gold',
    badge: 'Pro Designer',
    colors: ['#F59E0B', '#FB923C', '#FEF3C7'],
    icon: <Sun className="w-3.5 h-3.5 text-amber-400" />
  },
  {
    id: 'visionos-obsidian',
    name: 'VisionOS Obsidian Dark',
    badge: 'Spatial Glass',
    colors: ['#8B5CF6', '#3B82F6', '#0F172A'],
    icon: <Moon className="w-3.5 h-3.5 text-violet-400" />
  },
  {
    id: 'azure-laguna',
    name: 'Azure Laguna Cyan',
    badge: 'High Vibrancy',
    colors: ['#06B6D4', '#38BDF8', '#E0F2FE'],
    icon: <Droplets className="w-3.5 h-3.5 text-cyan-400" />
  },
  {
    id: 'emerald-riviera',
    name: 'Emerald Riviera',
    badge: 'Luxury Resort',
    colors: ['#10B981', '#34D399', '#D1FAE5'],
    icon: <Leaf className="w-3.5 h-3.5 text-emerald-400" />
  }
];

export const AestheticPaletteBar: React.FC<AestheticPaletteBarProps> = ({
  currentTheme,
  onThemeChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="sticky top-20 z-30 py-3 px-4 bg-[#080C14]/80 backdrop-blur-2xl border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: View Mode Toggle (3D Carousel, Spatial Window, Full Catalog) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
          <button
            onClick={() => onViewModeChange('3d-coverflow')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === '3d-coverflow'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>✨ 3D Coverflow (Photo 1)</span>
          </button>

          <button
            onClick={() => onViewModeChange('spatial-window')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'spatial-window'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🪟 Spatial Window (Photo 2)</span>
          </button>

          <button
            onClick={() => onViewModeChange('curated-catalog')}
            className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 hidden md:flex ${
              viewMode === 'curated-catalog'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🌐 Full Catalog</span>
          </button>
        </div>

        {/* Right: Bright & Aesthetic Designer Color Themes */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Palette:</span>
          </div>

          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-white/20 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
                title={theme.name}
              >
                {theme.icon}
                <span className="hidden sm:inline">{theme.name.split(' ')[0]}</span>
                {/* Color swatches dots */}
                <div className="flex items-center -space-x-1">
                  {theme.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-2.5 h-2.5 rounded-full border border-black/40"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
