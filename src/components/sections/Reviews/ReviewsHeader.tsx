import { forwardRef } from 'react';

interface ReviewsHeaderProps {
  badgeRef?: React.Ref<HTMLSpanElement>;
  titleRef?: React.Ref<HTMLHeadingElement>;
  descRef?: React.Ref<HTMLDivElement>;
  borderRef?: React.Ref<HTMLDivElement>;
}

export const ReviewsHeader = forwardRef<HTMLElement, ReviewsHeaderProps>(
  ({ badgeRef, titleRef, descRef, borderRef }, _ref) => {
    return (
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
    );
  }
);

ReviewsHeader.displayName = 'ReviewsHeader';
