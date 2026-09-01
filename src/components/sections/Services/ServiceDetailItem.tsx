import React from 'react';
import { ShieldCheck } from 'lucide-react';
import type { ServiceCardData } from '../../../data/serviceCards';
import { Button } from '../../common/Button';

interface ServiceDetailItemProps {
  service: ServiceCardData;
  onOrderClick?: () => void;
}

export const ServiceDetailItem: React.FC<ServiceDetailItemProps> = ({ service, onOrderClick }) => {
  return (
    <div className="min-h-[50vh] md:min-h-[85vh] flex flex-col justify-center py-6 sm:py-8 md:py-14 first:pt-0 last:pb-12">
      <div className="max-w-lg">
        {/* Заголовок послуги */}
        <h3 className="font-['PP_Neue_Montreal'] font-medium text-2xl sm:text-4xl lg:text-[40px] leading-[1.15] text-[#0f1115] uppercase tracking-tight mb-3 sm:mb-4">
          {service.title}
        </h3>

        {/* Детальний опис */}
        <p className="font-sans text-sm sm:text-lg text-[#0f1115]/80 leading-relaxed tracking-tight mb-6 sm:mb-8">
          {service.shortDesc}
        </p>

        {/* Мобільне фото (тільки на екранах < 768px) */}
        <div className="relative block md:hidden mb-6 sm:mb-8 h-[240px] sm:h-[280px] w-full rounded-[20px] overflow-hidden bg-zinc-950 isolate transform-gpu">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

          {/* Фірмовий вираз зверху */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[200px] sm:w-[220px] h-[32px] sm:h-[34px] pointer-events-none">
            <svg
              viewBox="0 0 260 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M 0 0 L 260 0 Q 248 0 243 10 L 232 30 Q 227 40 216 40 L 44 40 Q 33 40 28 30 L 17 10 Q 12 0 0 0 Z"
                fill="#f2f4f7"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center gap-1.5 sm:gap-2 pb-1 text-[#0f1115] font-mono text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>IRON SECURITY // 24/7</span>
            </div>
          </div>

          {/* Вираз знизу для номера */}
          <div className="absolute bottom-0 left-0 z-20 w-[260px] sm:w-[280px] h-[44px] sm:h-[48px] pointer-events-none">
            <svg
              viewBox="0 0 380 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M 0 54 L 0 0 L 280 0 Q 302 0 312 20 L 326 40 Q 334 54 350 54 L 380 54 L 0 54 Z"
                fill="#f2f4f7"
              />
            </svg>
            <div className="absolute inset-0 flex items-center px-4 gap-2.5 pt-1">
              <span className="font-tactical text-lg sm:text-xl font-black text-blue-600 leading-none">
                {service.number}
              </span>
              <div className="h-4 w-px bg-black/15" />
              <span className="font-['PP_Neue_Montreal'] font-bold text-xs text-[#0f1115] tracking-tight uppercase truncate">
                {service.title}
              </span>
            </div>
          </div>
        </div>

        {/* Кнопка замовлення */}
        <div>
          <Button
            variant="gradient"
            size="md"
            onClick={onOrderClick}
            className="w-full sm:w-auto"
          >
            Замовити послугу
          </Button>
        </div>
      </div>
    </div>
  );
};
