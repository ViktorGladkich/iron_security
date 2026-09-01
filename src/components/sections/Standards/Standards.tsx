import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from '../../../lib/media';
import { StandardsHeader } from './StandardsHeader';
import { StandardsGrid } from './StandardsGrid';
import { StandardsFooterBar } from './StandardsFooterBar';

gsap.registerPlugin(ScrollTrigger);

interface StandardsProps {
  onOrderClick?: () => void;
}

export const Standards: React.FC<StandardsProps> = ({ onOrderClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerTagRef = useRef<HTMLSpanElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // ── Fast, Smooth, One-Time Awwwards Entrance Animation ──
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      // 1. Шапка: быстрое и плавное проявление заголовков
      tl.from([headerTagRef.current, headerTitleRef.current, headerDescRef.current], {
        opacity: 0,
        y: 24,
        filter: 'blur(8px)',
        stagger: 0.08,
        duration: 0.55,
        ease: 'power3.out',
      })
      // 2. Орбитальный сход 5 карточек (Diamond X-Pattern)
      .from(card1Ref.current, {
        x: -80,
        y: -50,
        rotation: -4,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.out',
      }, '-=0.35')
      .from(card2Ref.current, {
        x: 80,
        y: -50,
        rotation: 4,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.out',
      }, '<+=0.06')
      .from(centerRef.current, {
        scale: 0.76,
        y: 35,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.7,
        ease: 'power3.out',
      }, '<+=0.06')
      .from(card3Ref.current, {
        x: -80,
        y: 50,
        rotation: 3,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.out',
      }, '<+=0.06')
      .from(card4Ref.current, {
        x: 80,
        y: 50,
        rotation: -3,
        scale: 0.84,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.65,
        ease: 'power3.out',
      }, '<+=0.06')
      // 3. Мгновенная посадка 3D-иконок
      .from('.standard-3d-icon', {
        scale: 0.7,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.2)',
      }, '-=0.5');
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="standards"
      ref={sectionRef}
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div
        ref={containerRef}
        className="relative w-full rounded-[20px] bg-black border border-white/10 overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-16"
      >
        {/* Фоновые сапфировые градиентные свечения */}
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-blue-700/10 blur-[120px]" />

        {/* 1. Шапка секции */}
        <StandardsHeader
          headerTagRef={headerTagRef}
          headerTitleRef={headerTitleRef}
          headerDescRef={headerDescRef}
        />

        {/* 2. Сетка 3x3 по схеме (Frame 1, Frame 2, Frame 6, Frame 7, Frame 8) */}
        <StandardsGrid
          card1Ref={card1Ref}
          card2Ref={card2Ref}
          centerRef={centerRef}
          card3Ref={card3Ref}
          card4Ref={card4Ref}
          onOrderClick={onOrderClick}
        />

        {/* 3. Подвал секции */}
        <StandardsFooterBar />
      </div>
    </section>
  );
};
