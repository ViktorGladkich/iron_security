import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { REVIEWS_DATA, type ReviewItem } from '../../../data/reviews';
import { prefersReducedMotion } from '../../../lib/media';

gsap.registerPlugin(ScrollTrigger);

const CARD_RADIAL_GRADIENTS: Record<string, string> = {
  c1: 'radial-gradient(46% 52% at 74% 30%, #3b82f6 0%, rgba(59,130,246,0) 68%), radial-gradient(40% 44% at 88% 62%, #1e5fd6 0%, rgba(30,95,214,0) 70%), radial-gradient(34% 38% at 62% 18%, #67e8f9 0%, rgba(103,232,249,0) 72%)',
  c2: 'radial-gradient(52% 48% at 22% 72%, #2563eb 0%, rgba(37,99,235,0) 70%), radial-gradient(38% 42% at 8% 40%, #60a5fa 0%, rgba(96,165,250,0) 72%)',
  c3: 'radial-gradient(50% 46% at 82% 78%, #2563eb 0%, rgba(37,99,235,0) 70%), radial-gradient(36% 40% at 66% 92%, #38bdf8 0%, rgba(56,189,248,0) 74%)',
  c4: 'radial-gradient(44% 50% at 30% 18%, #3b82f6 0%, rgba(59,130,246,0) 70%), radial-gradient(40% 44% at 12% 8%, #1e5fd6 0%, rgba(30,95,214,0) 72%)',
};

const GAP = 20;

interface ExtendedReviewItem extends ReviewItem {
  extKey: string;
  realIndex: number;
}

const EXTENDED_REVIEWS: ExtendedReviewItem[] = [
  { ...REVIEWS_DATA[3], extKey: 'clone-prev-4', realIndex: 3 },
  { ...REVIEWS_DATA[0], extKey: 'real-1', realIndex: 0 },
  { ...REVIEWS_DATA[1], extKey: 'real-2', realIndex: 1 },
  { ...REVIEWS_DATA[2], extKey: 'real-3', realIndex: 2 },
  { ...REVIEWS_DATA[3], extKey: 'real-4', realIndex: 3 },
  { ...REVIEWS_DATA[0], extKey: 'clone-next-1', realIndex: 0 },
];

export const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(440);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const wheelAccumulatorRef = useRef(0);
  const wheelCooldownRef = useRef(false);

  const totalSlides = REVIEWS_DATA.length;

  // Измеряем точную ширину одного слайда
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current && trackRef.current.firstElementChild) {
        const first = trackRef.current.firstElementChild as HTMLElement;
        setSlideWidth(first.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Расчёт позиции X для идеального центрирования активной карточки (с видимыми пиками слева и справа)
  const computeTargetX = useCallback(
    (index: number) => {
      if (!carouselWrapperRef.current) return 0;
      const containerW = carouselWrapperRef.current.offsetWidth;
      const slideExtendedIndex = index + 1; // slide 1 соответствует activeIndex = 0
      const centerPos = (containerW - slideWidth) / 2;
      return centerPos - slideExtendedIndex * (slideWidth + GAP);
    },
    [slideWidth]
  );

  // Сверхплавная интерполяция GSAP при смене слайдов (1.05s, power2.out)
  useEffect(() => {
    if (!trackRef.current) return;
    const targetX = computeTargetX(activeIndex);
    gsap.to(trackRef.current, {
      x: targetX,
      duration: 1.05,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [activeIndex, computeTargetX]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Плавная поддержка трекпада (Mac two-finger swipe)
  useEffect(() => {
    const container = carouselContainerRef.current;
    if (!container) return;

    let clearWheelTimer: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(delta) < 10) return;

      wheelAccumulatorRef.current += delta;

      clearTimeout(clearWheelTimer);
      clearWheelTimer = setTimeout(() => {
        wheelAccumulatorRef.current = 0;
      }, 200);

      if (wheelCooldownRef.current) return;

      if (wheelAccumulatorRef.current > 32) {
        e.preventDefault();
        handleNext();
        wheelCooldownRef.current = true;
        wheelAccumulatorRef.current = 0;
        setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 600);
      } else if (wheelAccumulatorRef.current < -32) {
        e.preventDefault();
        handlePrev();
        wheelCooldownRef.current = true;
        wheelAccumulatorRef.current = 0;
        setTimeout(() => {
          wheelCooldownRef.current = false;
        }, 600);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(clearWheelTimer);
    };
  }, [handleNext, handlePrev]);

  // Управление стрелками клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Обработчики Drag & Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null || !trackRef.current) return;
    const diff = e.touches[0].clientX - dragStartX;
    const currentBaseX = computeTargetX(activeIndex);
    gsap.set(trackRef.current, { x: currentBaseX + diff });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = e.changedTouches[0].clientX - dragStartX;
    if (diff < -45) {
      handleNext();
    } else if (diff > 45) {
      handlePrev();
    } else if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: computeTargetX(activeIndex),
        duration: 0.85,
        ease: 'power2.out',
      });
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null || !trackRef.current) return;
    const diff = e.clientX - dragStartX;
    const currentBaseX = computeTargetX(activeIndex);
    gsap.set(trackRef.current, { x: currentBaseX + diff });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (diff < -45) {
      handleNext();
    } else if (diff > 45) {
      handlePrev();
    } else if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: computeTargetX(activeIndex),
        duration: 0.85,
        ease: 'power2.out',
      });
    }
    setDragStartX(null);
    setIsDragging(false);
  };

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

      // 1. Шапка секции появляется быстро и синхронно
      tl.from([badgeRef.current, titleRef.current, descRef.current], {
        opacity: 0,
        y: 18,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      })
      // 2. Линия-разделитель чертится быстро
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
      // 3. Счётчик и кнопки
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

      // 4. Карточки появляются СРАЗУ без долгого ожидания
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
        
        {/* ── Шапка секции на всю ширину ─────────────────────────────────── */}
        <header className="relative z-10 mb-10 sm:mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
            <div>
              <span
                ref={badgeRef}
                className="mb-2 block font-mono text-xs font-bold tracking-widest text-blue-600 uppercase sm:text-sm will-change-transform"
              >
                04 // ВІДГУКИ КЛІЄНТІВ & ДОВІРА
              </span>
              <h2
                ref={titleRef}
                className="font-sans text-2xl font-normal tracking-tight text-[#0f1115] uppercase sm:text-3xl md:text-4xl will-change-transform"
              >
                НАМ ДОВІРЯЮТЬ{' '}
                <span className="bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] bg-clip-text text-transparent font-medium">
                  НАЙЦІННІШЕ
                </span>
              </h2>
            </div>

            <div ref={descRef} className="max-w-md will-change-transform">
              <p className="font-sans text-sm sm:text-base text-[#0f1115]/75 leading-relaxed tracking-tight">
                Клієнти, які працюють з нами від першого об’єкта до повного контуру безпеки. Прізвища скорочені на прохання замовників — умови NDA діють і після завершення співпраці.
              </p>
            </div>
          </div>

          {/* Разделительная линия */}
          <div ref={borderRef} className="h-px w-full bg-black/10 will-change-transform" />
        </header>

        {/* ── Структура: Левая колонка управления (ЧИСТАЯ) + Правый трек карточек ── */}
        <div
          ref={carouselContainerRef}
          className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10 items-stretch"
        >
          
          {/* 1. Левая панель управления (высота в точности равна высоте карточки: 380px/400px) */}
          <div className="flex lg:flex-col justify-between items-center lg:items-start shrink-0 lg:w-[200px] xl:w-[230px] lg:h-[380px] sm:lg:h-[400px] py-0 select-none">
            
            {/* Счётчик слайдов: статичный "0" + вращающаяся только вторая цифра */}
            <div
              ref={counterRef}
              className="flex items-center font-tactical font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#0f1115] leading-none tracking-tight will-change-transform"
            >
              {/* Статичный ноль на месте */}
              <span>0</span>

              {/* Вращается только вторая цифра (1, 2, 3, 4) */}
              <div className="relative h-[1.15em] w-[1.15ch] overflow-hidden shrink-0">
                <div
                  className="transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col"
                  style={{ transform: `translateY(-${(activeIndex * 100) / totalSlides}%)` }}
                >
                  {REVIEWS_DATA.map((_, i) => (
                    <div
                      key={i}
                      className="h-[1.15em] flex items-center justify-start text-[#0f1115] shrink-0 font-tactical font-bold tracking-tight"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <span className="mx-1.5 text-[#0f1115] transform rotate-[15deg] font-light text-2xl sm:text-3xl lg:text-4xl font-sans">/</span>

              <span className="text-[#0f1115] font-tactical font-bold tracking-tight">
                0{totalSlides}
              </span>
            </div>

            {/* Градиентные навигационные кнопки вровень с нижним краем карточек */}
            <div ref={buttonsRef} className="flex items-center gap-3 will-change-transform">
              {/* Кнопка PREV */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Попередній відгук"
                className="group/btn relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.55)] active:scale-95 cursor-pointer overflow-hidden isolate"
              >
                {/* Въезжающий темный слой при наведении как в Button */}
                <span className="absolute inset-0 z-0 pointer-events-none -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] bg-[#0f1115]" />

                {/* Удлинённая стрелка влево */}
                <svg
                  viewBox="0 0 24 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 w-5 h-3 text-white transition-transform duration-300 group-hover/btn:-translate-x-1"
                >
                  <path
                    d="M22 7H2M2 7L7.5 1.5M2 7L7.5 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* 4 тактических уголка при наведении */}
                <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 group-hover/btn:scale-105 z-20">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400 rounded-tl-xs" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400 rounded-tr-xs" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400 rounded-bl-xs" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400 rounded-br-xs" />
                </div>
              </button>

              {/* Кнопка NEXT */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Наступний відгук"
                className="group/btn relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.55)] active:scale-95 cursor-pointer overflow-hidden isolate"
              >
                {/* Въезжающий темный слой при наведении как в Button */}
                <span className="absolute inset-0 z-0 pointer-events-none -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] bg-[#0f1115]" />

                {/* Удлинённая стрелка вправо */}
                <svg
                  viewBox="0 0 24 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 w-5 h-3 text-white transition-transform duration-300 group-hover/btn:translate-x-1"
                >
                  <path
                    d="M2 7H22M22 7L16.5 1.5M22 7L16.5 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* 4 тактических уголка при наведении */}
                <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 group-hover/btn:scale-105 z-20">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400 rounded-tl-xs" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400 rounded-tr-xs" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400 rounded-bl-xs" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400 rounded-br-xs" />
                </div>
              </button>
            </div>
          </div>

          {/* 2. Правая изолированная зона карусели с 3 видимыми карточками (слева, центр, справа) */}
          <div
            ref={carouselWrapperRef}
            className="relative flex-1 h-[380px] sm:h-[400px] overflow-hidden rounded-[24px] select-none"
          >
            {/* Мягкая левая маска затухания внутри трека */}
            <div className="absolute top-0 bottom-0 left-0 z-20 w-[24px] sm:w-[45px] pointer-events-none bg-gradient-to-r from-[#f2f4f7] to-transparent" />

            {/* Мягкая правая маска затухания внутри трека */}
            <div className="absolute top-0 bottom-0 right-0 z-20 w-[30px] sm:w-[55px] pointer-events-none bg-gradient-to-l from-[#f2f4f7] to-transparent" />

            {/* Сам трек со слайдами */}
            <div
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                ref={trackRef}
                className="flex gap-5 will-change-transform h-full items-stretch"
              >
                {EXTENDED_REVIEWS.map((item: ExtendedReviewItem) => {
                  const isActive = item.realIndex === activeIndex;
                  const radialGrad = CARD_RADIAL_GRADIENTS[item.gradientClass] || CARD_RADIAL_GRADIENTS.c1;

                  return (
                    <div
                      key={item.extKey}
                      onClick={() => setActiveIndex(item.realIndex)}
                      className="w-[78vw] sm:w-[380px] lg:w-[420px] xl:w-[460px] shrink-0 cursor-pointer"
                    >
                      <article
                        style={{
                          background:
                            'linear-gradient(155deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.03) 34%, rgba(255,255,255,0) 62%), linear-gradient(200deg, #123a86 0%, #0d2a63 45%, #0a1f4d 100%)',
                          boxShadow:
                            'inset 0 1px 0 rgba(255,255,255,.42), inset 0 22px 46px -26px rgba(255,255,255,.25), 0 20px 40px -20px rgba(0,0,0,0.3)',
                        }}
                        className={`group relative h-[380px] sm:h-[400px] p-7 sm:p-8 rounded-[24px] border flex flex-col justify-between overflow-hidden isolate select-none transition-[border-color,box-shadow] duration-500 ${
                          isActive ? 'border-white/35 ring-1 ring-white/20' : 'border-white/[0.18] hover:border-white/30'
                        }`}
                      >
                        {/* 1. Світна пляма — Luminous Gradient (::before) */}
                        <div
                          className="pointer-events-none absolute -inset-[20%] -z-20 transform-gpu group-hover:scale-105 transition-transform duration-700"
                          style={{
                            background: radialGrad,
                            filter: 'blur(50px) saturate(170%)',
                          }}
                        />

                        {/* 2. Ребриста поверхня скла (::after) */}
                        <div
                          className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
                          style={{
                            backgroundImage:
                              'repeating-linear-gradient(90deg, rgba(255,255,255,.20) 0%, rgba(255,255,255,.04) 20%, rgba(0,0,0,.30) 50%, rgba(255,255,255,.04) 80%, rgba(255,255,255,.20) 100%)',
                            backgroundSize: '34px 100%',
                          }}
                        />

                        {/* ── Верхній ряд: Пілюлі тегів ────────────────────────── */}
                        <div className="relative z-10 flex flex-wrap items-center gap-2 mb-auto">
                          <span className="px-3.5 py-1 rounded-full border border-white/[0.42] text-[11px] font-semibold tracking-wider text-white whitespace-nowrap">
                            {item.pill1}
                          </span>
                          <span className="px-3.5 py-1 rounded-full border border-white/20 bg-white/[0.14] text-[11px] font-semibold tracking-wider text-white/80 whitespace-nowrap">
                            {item.pill2}
                          </span>
                        </div>

                        {/* ── Текст цитати відгуку ─────────────────────────────── */}
                        <blockquote className="relative z-10 mt-6 sm:mt-7 font-sans text-base sm:text-lg lg:text-[18px] font-medium leading-[1.44] tracking-tight text-white max-w-[34ch]">
                          {item.quote}
                        </blockquote>

                        {/* ── Автор відгуку ────────────────────────────────────── */}
                        <div className="relative z-10 mt-5 sm:mt-6 pt-4 border-t border-white/20 flex flex-wrap items-baseline gap-2">
                          <span className="font-['PP_Neue_Montreal'] text-[14.5px] font-bold tracking-tight text-white">
                            {item.name}
                          </span>
                          <span className="font-sans text-[13px] text-white/60">
                            {item.role}
                          </span>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
