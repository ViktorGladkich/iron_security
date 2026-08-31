import React from 'react';

import { HERO_TITLE_LETTERS, hx } from '../hero.constants';

interface HeroGiantTitleProps {
  titleRef: React.RefObject<HTMLDivElement | null>;
}

/** Гигантский фоновый титул IRON, разнесённый по ширине фрейма. */
export const HeroGiantTitle: React.FC<HeroGiantTitleProps> = ({ titleRef }) => (
  <div
    ref={titleRef}
    aria-hidden
    className="absolute top-[8%] sm:top-[10%] inset-x-0 z-10 px-4 sm:px-8 pointer-events-none select-none"
  >
    <div className="w-full grid grid-cols-4 text-center items-center text-white/40 font-tactical font-black leading-none text-[52px] sm:text-[90px] md:text-[120px] lg:text-[150px] xl:text-[170px] drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]">
      {HERO_TITLE_LETTERS.map(({ char, className }) => (
        <span key={char} className={`${hx.titleLetter} ${className}`}>
          {char}
        </span>
      ))}
    </div>
  </div>
);
