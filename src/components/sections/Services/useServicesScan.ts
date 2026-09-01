import { type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from '../../../lib/media';
import { sel } from './services.constants';

gsap.registerPlugin(ScrollTrigger);

/**
 * Плавное премиальное появление карточек при скролле (каскадный вход).
 */
export const useServicesScan = (
  scope: RefObject<HTMLElement | null>,
  gridRef: RefObject<HTMLElement | null>,
) => {
  useGSAP(
    () => {
      const grid = gridRef.current;
      const cards = grid ? gsap.utils.toArray<HTMLElement>(sel.card, grid) : [];

      if (!grid || !cards.length || prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope },
  );
};
