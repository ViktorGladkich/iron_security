import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from '../../../lib/media';
import { FooterTopCutout } from './FooterTopCutout';
import { FooterBrandCol } from './FooterBrandCol';
import { FooterNavCol } from './FooterNavCol';
import { FooterContactsCol } from './FooterContactsCol';
import { FooterBigBanner } from './FooterBigBanner';
import { FooterLegalBar } from './FooterLegalBar';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const cutoutRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const lettersContainerRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── GSAP ScrollTrigger Entrance Animation ──────────────────────────────
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      if (auraRef.current) {
        gsap.to(auraRef.current, {
          scale: 1.12,
          opacity: 0.18,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 88%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      // 1. Верхний трапециевидный вырез
      tl.from(cutoutRef.current, {
        y: -35,
        opacity: 0,
        scale: 0.96,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
      // 2. Три информационные колонки
      .from(
        [col1Ref.current, col2Ref.current, col3Ref.current],
        {
          y: 28,
          opacity: 0,
          filter: 'blur(6px)',
          stagger: 0.14,
          duration: 1.05,
          ease: 'power3.out',
          clearProps: 'transform,opacity,filter',
        },
        '-=0.6'
      );

      // 3. Посимвольное появление букв IRON SECURITY
      const letters = lettersContainerRef.current?.querySelectorAll('.footer-letter');
      if (letters && letters.length > 0) {
        tl.from(
          letters,
          {
            y: 45,
            opacity: 0,
            scale: 0.8,
            filter: 'blur(8px)',
            stagger: 0.04,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'transform,opacity,filter',
          },
          '-=0.7'
        );
      }

      // 4. Нижняя строка копирайта
      tl.from(
        bottomBarRef.current,
        {
          y: 12,
          opacity: 0,
          duration: 0.85,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
        '-=0.5'
      );
    },
    { scope: footerRef }
  );

  return (
    <footer id="footer" ref={footerRef} className="relative w-full px-[15px] pb-[15px] pt-2 text-zinc-400 select-none">
      <div className="relative w-full rounded-[20px] bg-[#0c0e14] overflow-hidden pt-16 sm:pt-20 pb-10 px-6 sm:px-10 md:px-14 lg:px-16">
        
        {/* Фоновое атмосферное свечение */}
        <div
          ref={auraRef}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.12)_0%,transparent_65%)] transform-gpu will-change-transform"
        />

        {/* 1. Верхний трапециевидный вырез */}
        <FooterTopCutout ref={cutoutRef} onScrollToTop={scrollToTop} />

        {/* 2. Основная сетка контента (3 Колонки) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pt-6 mb-12 lg:mb-16">
          <FooterBrandCol ref={col1Ref} />
          <FooterNavCol ref={col2Ref} onScrollToSection={scrollToSection} />
          <FooterContactsCol ref={col3Ref} />
        </div>

        {/* 3. Монументальный баннер с посимвольной анимацией */}
        <FooterBigBanner ref={lettersContainerRef} />

        {/* 4. Нижняя строка копирайта и регламента */}
        <FooterLegalBar ref={bottomBarRef} />

      </div>
    </footer>
  );
};
