import React from 'react';
import { MapPin, Navigation, Clock, ExternalLink } from 'lucide-react';

const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=вулиця+Хрещатик,+22,+Київ,+01001';

export const OfficeMap: React.FC = () => {
  return (
    <div className="relative w-full rounded-[26px] bg-[#0c0e14] border border-blue-500/25 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-white select-none group">
      
      {/* Верхний неоновый луч-блик */}
      <div className="pointer-events-none absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent z-10" />

      {/* ── Верхняя тактическая плашка с адресом и быстрой кнопкой маршрута ── */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-7 border-b border-white/10 bg-gradient-to-r from-[#0c0e14] via-[#101420] to-[#0c0e14]">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-mono text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                ГОЛОВНИЙ ОФІС // ШТАБ IRON SECURITY
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-[9px] font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ВІДКРИТО 24/7
              </span>
            </div>
            <h4 className="font-sans text-base sm:text-lg font-bold text-white tracking-tight">
              м. Київ, вул. Хрещатик, 22 (Центральний командний пункт)
            </h4>
          </div>
        </div>

        {/* Кнопка проложить маршрут */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-400 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Прийом клієнтів: 24/7</span>
          </div>

          <a
            href={GOOGLE_MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] hover:brightness-110 text-white font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-[0_8px_25px_rgba(37,99,235,0.35)] active:scale-95 shrink-0"
          >
            <Navigation className="w-4 h-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5" />
            <span>ПРОКЛАСТИ МАРШРУТ</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* ── Интерактивная карта Google Maps с темным фильтром и меткой ────── */}
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] bg-[#0a0c10] overflow-hidden isolate">
        
        {/* Iframe Google Maps для Хрещатик 22 */}
        <iframe
          title="Розташування офісу IRON SECURITY на Хрещатику"
          src="https://maps.google.com/maps?q=вулиця%20Хрещатик,%2022,%20Київ&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          className="w-full h-full border-0 contrast-[1.05] brightness-[0.88] grayscale-[0.35] invert-[0.92] hue-rotate-[185deg]"
          style={{ pointerEvents: 'auto' }}
        />

        {/* Кликабельный оверлей в углу карты с быстрой подсказкой */}
        <a
          href={GOOGLE_MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl transition-all duration-300 hover:bg-black hover:border-blue-400 hover:scale-[1.02]"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <span>Натисніть, щоб відкрити навігатор</span>
              <ExternalLink className="w-3 h-3 text-blue-400" />
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              Хрещатик, 22 • 50°27'00" N 30°31'24" E
            </div>
          </div>
        </a>

      </div>

    </div>
  );
};
