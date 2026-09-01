import React, { forwardRef } from 'react';
import { REVIEWS_DATA } from '../../../data/reviews';

interface ReviewsControlsProps {
  activeIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  counterRef?: React.Ref<HTMLDivElement>;
  buttonsRef?: React.Ref<HTMLDivElement>;
}

export const ReviewsControls = forwardRef<HTMLDivElement, ReviewsControlsProps>(
  ({ activeIndex, totalSlides, onPrev, onNext, counterRef, buttonsRef }, _ref) => {
    return (
      <div className="flex lg:flex-col justify-between items-center lg:items-start shrink-0 lg:w-[200px] xl:w-[230px] lg:h-[380px] sm:lg:h-[400px] py-0 select-none">
        {/* Счётчик слайдов: статичный "0" + вращающаяся только вторая цифра */}
        <div
          ref={counterRef}
          className="flex items-center font-tactical font-bold text-2xl sm:text-4xl lg:text-[44px] text-[#0f1115] leading-none tracking-tight will-change-transform"
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

          <span className="mx-1 sm:mx-1.5 text-[#0f1115] transform rotate-[15deg] font-light text-xl sm:text-3xl lg:text-4xl font-sans">
            /
          </span>

          <span className="text-[#0f1115] font-tactical font-bold tracking-tight">
            0{totalSlides}
          </span>
        </div>

        {/* Градиентные навигационные кнопки вровень с нижним краем карточек */}
        <div ref={buttonsRef} className="flex items-center gap-2 sm:gap-3 will-change-transform">
          {/* Кнопка PREV */}
          <button
            type="button"
            onClick={onPrev}
            aria-label="Попередній відгук"
            className="group/btn relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.55)] active:scale-95 cursor-pointer overflow-hidden isolate"
          >
            <span className="absolute inset-0 z-0 pointer-events-none -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] bg-[#0f1115]" />

            <svg
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 w-4.5 h-2.5 sm:w-5 sm:h-3 text-white transition-transform duration-300 group-hover/btn:-translate-x-1"
            >
              <path
                d="M22 7H2M2 7L7.5 1.5M2 7L7.5 12.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

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
            onClick={onNext}
            aria-label="Наступний відгук"
            className="group/btn relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7] text-white flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.55)] active:scale-95 cursor-pointer overflow-hidden isolate"
          >
            <span className="absolute inset-0 z-0 pointer-events-none -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] bg-[#0f1115]" />

            <svg
              viewBox="0 0 24 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 w-4.5 h-2.5 sm:w-5 sm:h-3 text-white transition-transform duration-300 group-hover/btn:translate-x-1"
            >
              <path
                d="M2 7H22M22 7L16.5 1.5M22 7L16.5 12.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover/btn:opacity-100 transition-all duration-300 group-hover/btn:scale-105 z-20">
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400 rounded-tl-xs" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400 rounded-tr-xs" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400 rounded-bl-xs" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400 rounded-br-xs" />
            </div>
          </button>
        </div>
      </div>
    );
  }
);

ReviewsControls.displayName = 'ReviewsControls';
