import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Анимация появления элементов при скролле (fade up)
 */
export const animateFadeUp = (
  targets: string | Element | Element[],
  options?: gsap.TweenVars
) => {
  return gsap.from(targets, {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: typeof targets === 'string' ? targets : (Array.isArray(targets) ? targets[0] : targets),
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...options,
  });
};

/**
 * Горизонтальная линия / рамка (reveal)
 */
export const animateBorderReveal = (target: string | Element) => {
  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 90%',
      },
    }
  );
};
