import React, { useRef } from 'react';
import { SERVICE_CARDS } from '../../../data/serviceCards';
import { ServicesHeader } from './ServicesHeader';
import { ServiceDetailItem } from './ServiceDetailItem';
import { ServicesImageStack } from './ServicesImageStack';
import { ServicesFooterBar } from './ServicesFooterBar';
import { useServicesArchAnimation } from './useServicesArchAnimation';

interface ServicesProps {
  onOrderClick?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOrderClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // ── Десктопная анимация скролла и масочного раскрытия ──────────────
  useServicesArchAnimation(sectionRef, archRef, rightColRef);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div className="relative w-full rounded-[20px] bg-[#f2f4f7] px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-14">
        
        {/* 1. Шапка секции */}
        <ServicesHeader />

        {/* 2. Двухколоночный блок (Arch Scroll Layout) */}
        <div
          ref={archRef}
          className="relative max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-16 items-start justify-between"
        >
          {/* Левая колонка: последовательный скролл карточек описания */}
          <div className="w-full md:w-1/2 flex flex-col">
            {SERVICE_CARDS.map((service) => (
              <ServiceDetailItem
                key={service.id}
                service={service}
                onOrderClick={onOrderClick}
              />
            ))}
          </div>

          {/* Правая колонка: Pinned Sticky сцена со стопкой изображений */}
          <ServicesImageStack ref={rightColRef} />
        </div>

        {/* 3. Подвал секции */}
        <ServicesFooterBar />

      </div>
    </section>
  );
};
