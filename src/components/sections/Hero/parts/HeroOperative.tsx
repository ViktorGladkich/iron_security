import React from 'react';

import { hx } from '../hero.constants';

interface HeroOperativeProps {
  operativeRef: React.RefObject<HTMLImageElement | null>;
}

/**
 * Оперативник IRON SECURITY.
 *
 * `filter` элемента принадлежит исключительно Tailwind: в v4 все фильтры
 * (включая `drop-shadow-*`) собираются в один shorthand, поэтому любой
 * инлайновый `filter` от GSAP стирает тень целиком. Интро и параллакс трогают
 * только `transform` и `opacity`.
 */
export const HeroOperative: React.FC<HeroOperativeProps> = ({ operativeRef }) => (
  <div className="absolute inset-0 z-15 flex items-end justify-center pointer-events-none">
    <img
      ref={operativeRef}
      src="/images/human_hero_security_cropped.png"
      alt="Оперативник охоронної компанії IRON SECURITY"
      width={485}
      height={914}
      decoding="async"
      fetchPriority="high"
      className={`${hx.operative} h-[84%] sm:h-[90%] max-h-[750px] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] contrast-105 brightness-100`}
    />
  </div>
);
