import React from 'react';

import { HERO_STATS, hx } from '../hero.constants';

/** Правый нижний SVG-вырез со скошенным углом и тремя ключевыми метриками. */
export const HeroStatsBar: React.FC = () => (
  <div className={`${hx.statsBar} absolute bottom-0 right-0 z-30 w-[430px] sm:w-[540px] h-[82px] sm:h-[90px]`}>
    <svg
      viewBox="0 0 540 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d="M 540 0 L 110 0 Q 85 0 70 20 L 24 74 Q 10 90 0 90 L 540 90 Z" fill="#f2f4f7" />
    </svg>

    {/* Вогнутая дуга, скругляющая тёмный внутренний угол над вырезом */}
    <div className="absolute top-[-24px] right-0 w-6 h-6 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden>
        <path d="M24 0 V24 H0 A24 24 0 0 0 24 0 Z" fill="#f2f4f7" />
      </svg>
    </div>

    <ul className="absolute inset-0 flex items-center justify-end pr-7 sm:pr-12 gap-6 sm:gap-9 text-black">
      {HERO_STATS.map(({ value, label }, index) => (
        <li key={label} className="flex items-center gap-6 sm:gap-9 shrink-0">
          {index > 0 && <span aria-hidden className="w-px h-7 bg-zinc-300" />}
          <div className={`${hx.statItem} text-left`}>
            <span className="block font-tactical font-extrabold text-xl sm:text-2xl tracking-tight leading-none">
              {value}
            </span>
            <span className="block text-[10px] text-zinc-600 uppercase tracking-wider mt-1 whitespace-nowrap">
              {label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
