import React from 'react';

import { Button } from '../../../common/Button';
import { hx } from '../hero.constants';

interface HeroMonitorCardProps {
  onOrderClick?: () => void;
}

/** SVG-подложка карточки: матовое стекло со скошенным нижним правым углом. */
const GlassPlate: React.FC = () => (
  <svg
    viewBox="0 0 380 170"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
    preserveAspectRatio="none"
    aria-hidden
  >
    <defs>
      {/* Стеклянный бордер с эффектом преломления */}
      <linearGradient id="heroGlassBorder" x1="0" y1="0" x2="380" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="rgba(255,255,255,0.6)" />
        <stop offset="0.3" stopColor="rgba(255,255,255,0.15)" />
        <stop offset="0.7" stopColor="rgba(255,255,255,0.05)" />
        <stop offset="1" stopColor="rgba(255,255,255,0.35)" />
      </linearGradient>

      {/* Многослойное матовое стекло */}
      <linearGradient id="heroGlassBg" x1="0" y1="0" x2="0" y2="170" gradientUnits="userSpaceOnUse">
        <stop stopColor="rgba(255,255,255,0.12)" />
        <stop offset="0.4" stopColor="rgba(15,20,30,0.55)" />
        <stop offset="1" stopColor="rgba(4,6,10,0.85)" />
      </linearGradient>

      {/* Блик по верхней грани */}
      <linearGradient id="heroGlassSheen" x1="0" y1="0" x2="380" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="transparent" />
        <stop offset="0.5" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="1" stopColor="transparent" />
      </linearGradient>
    </defs>

    <path
      d="M 16 0 L 364 0 A 16 16 0 0 1 380 16 L 380 100 Q 380 114 368 126 L 326 160 Q 314 170 298 170 L 16 170 A 16 16 0 0 1 0 154 L 0 16 A 16 16 0 0 1 16 0 Z"
      fill="url(#heroGlassBg)"
      stroke="url(#heroGlassBorder)"
      strokeWidth="1.2"
    />
    <line x1="24" y1="1" x2="356" y2="1" stroke="url(#heroGlassSheen)" strokeWidth="1" />
  </svg>
);

/** Правая карточка: ситуационный центр видеомониторинга. */
export const HeroMonitorCard: React.FC<HeroMonitorCardProps> = ({ onOrderClick }) => (
  <div
    className={`${hx.card} hidden lg:block absolute right-6 sm:right-8 bottom-28 sm:bottom-32 z-20 w-[365px] sm:w-[380px] h-[170px] pointer-events-auto`}
  >
    <article className="group/card relative w-full h-full transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.02]">
      <div className="absolute inset-0 z-0 backdrop-blur-2xl">
        <GlassPlate />
      </div>

    {/* Мягкое внутреннее свечение при наведении */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/[0.04] via-transparent to-white/[0.08] pointer-events-none opacity-60 group-hover/card:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10 w-full h-full p-5 sm:p-6 flex items-start justify-between gap-4">
      <div className="flex-1 pr-1 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-tactical font-bold text-xs sm:text-[13px] text-white tracking-wider uppercase leading-none mb-2">
            ВІДЕОМОНІТОРИНГ 24/7
          </h3>
          <p className="text-[11px] sm:text-[11.5px] text-zinc-300 leading-relaxed line-clamp-3">
            Безперервний відеоконтроль об'єктів у реальному часі, інтелектуальне виявлення загроз
            та миттєвий виїзд екіпажу.
          </p>
        </div>

        <Button
          onClick={onOrderClick}
          size="xs"
          chamferSize={10}
          className="w-[180px] mt-2 shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.45)]"
        >
          ЦЕНТРАЛЬНИЙ ПУЛЬТ
        </Button>
      </div>

      <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-black/60 shadow-[0_10px_25px_rgba(0,0,0,0.6)] mr-1">
        <img
          src="/images/camera_guard.png"
          alt="Оператор відеоспостереження IRON SECURITY"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover contrast-110 brightness-95 group-hover/card:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  </article>
</div>
);
