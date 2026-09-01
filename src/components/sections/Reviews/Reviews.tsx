import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { prefersReducedMotion } from '../../../lib/media';
import { useReviewsCarousel } from './useReviewsCarousel';
import { ReviewsHeader } from './ReviewsHeader';
import { ReviewsControls } from './ReviewsControls';
import { ReviewsTrack } from './ReviewsTrack';

gsap.registerPlugin(ScrollTrigger);

export const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const {
    activeIndex,
    setActiveIndex,
    totalSlides,
    handlePrev,
    handleNext,
    carouselContainerRef,
    carouselWrapperRef,
    trackRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useReviewsCarousel();

  // ── GSAP ScrollTrigger Fast & Crisp Entrance Animation ───────────────────
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      // 1. Шапка секции
      tl.from([badgeRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      })
      // 2. Линия-разделитель
      .from(
        borderRef.current,
        {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform',
        },
        '-=0.4'
      )
      // 3. Счётчик и кнопки управления
      .from(
        [counterRef.current, buttonsRef.current],
        {
          opacity: 0,
          y: 14,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
        '-=0.4'
      );

      // 4. Карточки отзывов
      if (trackRef.current && trackRef.current.children.length > 0) {
        tl.from(
          trackRef.current.children,
          {
            opacity: 0,
            y: 28,
            scale: 0.96,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          },
          '-=0.45'
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div className="relative w-full rounded-[20px] bg-[#f2f4f7] overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-20">
        
        {/* 1. Шапка секции на всю ширину */}
        <ReviewsHeader
          badgeRef={badgeRef}
          titleRef={titleRef}
          descRef={descRef}
          borderRef={borderRef}
        />

        {/* 2. Структура: Левая панель управления + Правый трек карточек */}
        <div
          ref={carouselContainerRef}
          className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10 items-stretch"
        >
          {/* Левая панель управления */}
          <ReviewsControls
            activeIndex={activeIndex}
            totalSlides={totalSlides}
            onPrev={handlePrev}
            onNext={handleNext}
            counterRef={counterRef}
            buttonsRef={buttonsRef}
          />

          {/* Правая зона карусели */}
          <ReviewsTrack
            ref={carouselWrapperRef}
            activeIndex={activeIndex}
            onSelectIndex={setActiveIndex}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            trackRef={trackRef}
          />
        </div>

      </div>
    </section>
  );
};
