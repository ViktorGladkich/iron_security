import React, { useRef } from 'react';
import { AboutHeader } from './AboutHeader';
import { AboutManifesto } from './AboutManifesto';
import { AboutStatsCard } from './AboutStatsCard';
import { useAboutScrollAnimation } from './useAboutScrollAnimation';

interface AboutProps {
  onOrderClick?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOrderClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useAboutScrollAnimation(sectionRef, manifestoRef, statsRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full px-[15px] pb-[15px] flex items-center justify-center lg:sticky lg:top-[15px] lg:z-0"
    >
      <div className="relative w-full rounded-[20px] bg-black border border-white/10 overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-9 xl:py-11 lg:h-[calc(100svh-30px)] lg:flex lg:flex-col">
        {/* 1. Верхний информационный бар */}
        <AboutHeader />

        {/* 2. Манифест со скролл-скрабом слева, видео справа */}
        <AboutManifesto ref={manifestoRef} />

        {/* 3. Матрица цифр и CTA */}
        <AboutStatsCard ref={statsRef} onOrderClick={onOrderClick} />
      </div>
    </section>
  );
};
