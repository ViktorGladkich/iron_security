import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { REVIEWS_DATA } from '../../../data/reviews';
import { GAP } from './types';

export const useReviewsCarousel = () => {
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

  // Расчёт позиции X для идеального центрирования активной карточки
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

  return {
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
  };
};
