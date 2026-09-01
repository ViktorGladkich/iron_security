import React, { forwardRef } from 'react';
import { EXTENDED_REVIEWS, type ExtendedReviewItem } from './types';
import { ReviewCard } from './ReviewCard';

interface ReviewsTrackProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  trackRef: React.Ref<HTMLDivElement>;
}

export const ReviewsTrack = forwardRef<HTMLDivElement, ReviewsTrackProps>(
  (
    {
      activeIndex,
      onSelectIndex,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      trackRef,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="relative flex-1 h-[380px] sm:h-[400px] overflow-hidden rounded-[24px] select-none"
      >
        {/* Мягкая левая маска затухания внутри трека */}
        <div className="absolute top-0 bottom-0 left-0 z-20 w-[24px] sm:w-[45px] pointer-events-none bg-gradient-to-r from-[#f2f4f7] to-transparent" />

        {/* Мягкая правая маска затухания внутри трека */}
        <div className="absolute top-0 bottom-0 right-0 z-20 w-[30px] sm:w-[55px] pointer-events-none bg-gradient-to-l from-[#f2f4f7] to-transparent" />

        {/* Сам трек со слайдами */}
        <div
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          <div
            ref={trackRef}
            className="flex gap-5 will-change-transform h-full items-stretch"
          >
            {EXTENDED_REVIEWS.map((item: ExtendedReviewItem) => (
              <ReviewCard
                key={item.extKey}
                item={item}
                isActive={item.realIndex === activeIndex}
                onSelect={() => onSelectIndex(item.realIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ReviewsTrack.displayName = 'ReviewsTrack';
