import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../../lib/media';

gsap.registerPlugin(ScrollTrigger);

export const useServicesArchAnimation = (
  sectionRef: React.RefObject<HTMLElement | null>,
  archRef: React.RefObject<HTMLDivElement | null>,
  rightColRef: React.RefObject<HTMLDivElement | null>,
) => {
  useGSAP(
    () => {
      const arch = archRef.current;
      const rightCol = rightColRef.current;
      if (!arch || !rightCol || prefersReducedMotion()) return;

      const imgWrappers = gsap.utils.toArray<HTMLElement>('.arch-img-wrapper', rightCol);
      if (!imgWrappers.length) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        gsap.set(imgWrappers, {
          clipPath: 'inset(0% 0% 0% 0%)',
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: arch,
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        imgWrappers.forEach((wrapper, index) => {
          if (index < imgWrappers.length - 1) {
            const innerImg = wrapper.querySelector('img');
            const nextWrapper = imgWrappers[index + 1];
            const nextImg = nextWrapper?.querySelector('img');

            timeline.to(
              wrapper,
              {
                clipPath: 'inset(0% 0% 100% 0%)',
                ease: 'none',
                duration: 1,
              },
              index,
            );

            if (innerImg) {
              timeline.to(
                innerImg,
                {
                  scale: 1.08,
                  ease: 'none',
                  duration: 1,
                },
                index,
              );
            }

            if (nextImg) {
              timeline.fromTo(
                nextImg,
                { scale: 1.06 },
                { scale: 1, ease: 'none', duration: 1 },
                index,
              );
            }
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );
};
