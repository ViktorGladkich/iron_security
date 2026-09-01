import React, { useCallback, useMemo, useRef } from 'react';

import { Header } from '../../layout/Header';
import { hx } from './hero.constants';
import { useHeroIntro } from './useHeroIntro';
import { useHeroParallax, type ParallaxLayer } from './useHeroParallax';
import { HeroBackdrop } from './parts/HeroBackdrop';
import { HeroGiantTitle } from './parts/HeroGiantTitle';
import { HeroMonitorCard } from './parts/HeroMonitorCard';
import { HeroOffer } from './parts/HeroOffer';
import { HeroOperative } from './parts/HeroOperative';
import { HeroStatsBar } from './parts/HeroStatsBar';

interface HeroProps {
  onOrderClick?: () => void;
  /** Вступление отыграло — главный поток свободен под тяжёлые секции ниже. */
  onIntroComplete?: () => void;
}

/**
 * Первый экран: фрейм во всю высоту вьюпорта со встроенной шапкой,
 * фоновым титулом, оперативником, оффером, карточкой мониторинга и метриками.
 *
 * Компонент отвечает только за композицию и за то, чтобы вступительный
 * таймлайн и параллакс не пересекались: параллакс включается строго из
 * `onComplete` интро.
 */
export const Hero: React.FC<HeroProps> = ({ onOrderClick, onIntroComplete }) => {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const operativeRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const layers = useMemo<ParallaxLayer[]>(
    () => [
      { ref: operativeRef, x: 30, y: 18, rotationY: 6, smoothing: 0.8 },
      { ref: titleRef, x: -20, y: -12, smoothing: 1.1 },
      { ref: glowRef, x: 50, y: 30, smoothing: 1.3 },
    ],
    [],
  );

  const { activate, handlePointerMove, handlePointerLeave } = useHeroParallax(frameRef, layers);

  const handleIntroComplete = useCallback(() => {
    activate();
    onIntroComplete?.();
  }, [activate, onIntroComplete]);

  useHeroIntro(heroRef, handleIntroComplete);

  return (
    <section ref={heroRef} className="relative w-full p-[15px] flex items-center justify-center overflow-hidden">
      <div
        ref={frameRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`${hx.frame} relative w-full h-[calc(100svh-30px)] max-h-[860px] min-h-[540px] rounded-[20px] overflow-hidden bg-[#04060b] cursor-default`}
      >
        <HeroBackdrop glowRef={glowRef} />
        <Header onOrderClick={onOrderClick} />
        <HeroGiantTitle titleRef={titleRef} />
        <HeroOperative operativeRef={operativeRef} />
        <HeroOffer onOrderClick={onOrderClick} />
        <HeroMonitorCard onOrderClick={onOrderClick} />
        <HeroStatsBar />
      </div>
    </section>
  );
};
