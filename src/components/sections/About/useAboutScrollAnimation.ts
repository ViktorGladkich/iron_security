import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../../lib/media';
import {
  STACK_ID,
  STACK_SCRUB_SVH,
  STACK_STICKY_TOP_PX,
  TEXT_LEAD_IN,
  TEXT_SETTLED_AT,
} from '../stack.constants';
import { WORDS_FROM, WORDS_TO } from './about.constants';

gsap.registerPlugin(ScrollTrigger);

export const useAboutScrollAnimation = (
  sectionRef: React.RefObject<HTMLElement | null>,
  manifestoRef: React.RefObject<HTMLDivElement | null>,
  statsRef: React.RefObject<HTMLDivElement | null>,
) => {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const words = gsap.utils.toArray<HTMLElement>('.about-manifesto-word');
      const mm = gsap.matchMedia();

      // Десктоп: прогресс считаем по треку — секция залипает
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(words, WORDS_FROM, {
          ...WORDS_TO,
          scrollTrigger: {
            trigger: document.getElementById(STACK_ID) ?? sectionRef.current,
            start: `top ${TEXT_LEAD_IN * 100}%`,
            end: () => {
              const frame = window.innerHeight;
              const approach = frame * TEXT_LEAD_IN - STACK_STICKY_TOP_PX;
              const pinned = frame * (STACK_SCRUB_SVH / 100) * TEXT_SETTLED_AT;
              return `+=${approach + pinned}`;
            },
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });
      });

      // Мобильные: обычный поток скраба по тексту
      mm.add('(max-width: 1023.98px)', () => {
        gsap.fromTo(words, WORDS_FROM, {
          ...WORDS_TO,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: 0.35,
          },
        });
      });

      // Появление карточек статистики
      gsap.fromTo(
        '.about-stat-box',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );
};
