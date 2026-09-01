import React from 'react';
import { ArrowUpRight } from 'lucide-react';

import type { ServiceCardData } from '../../../data/serviceCards';
import { sx } from './services.constants';

interface ServiceCardProps {
  service: ServiceCardData;
  /** Нечётные карточки опущены — стойка мониторов, а не ровный ряд. */
  offset: boolean;
  onOrderClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, offset, onOrderClick }) => (
  <article
    onClick={onOrderClick}
    className={`${sx.card} group relative flex h-[470px] flex-col justify-end overflow-hidden rounded-[24px] bg-zinc-950/40 shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(37,99,235,0.25)] sm:h-[500px] cursor-pointer isolate transform-gpu ${
      offset ? 'lg:mt-10' : ''
    }`}
  >
    {/* Полноразмерное фоновое фото услуги на всю высоту */}
    <img
      src={service.image}
      alt={service.title}
      width={1200}
      height={896}
      loading="lazy"
      decoding="async"
      className={`${sx.photo} absolute inset-0 h-full w-full object-cover contrast-105 brightness-100 transition-transform duration-700 group-hover:scale-106 will-change-transform pointer-events-none rounded-[24px]`}
    />

    {/* Мягкое затенение сверху для бейджа */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent rounded-t-[24px]" />

    {/* Бейдж категории в верхнем правом углу */}
    <div className="absolute top-4 right-4 z-10">
      <span className="font-mono text-[9px] font-semibold tracking-wider text-white uppercase px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md shadow-sm">
        {service.tag}
      </span>
    </div>

    {/* ── Нижний блок: Настоящий Frosted Glassmorphism с вырезом таба ── */}
    <div className="relative z-10 w-full flex flex-col justify-end pointer-events-none rounded-b-[24px] overflow-hidden">
      
      {/* Фирменный SVG-вырез таба из матового стекла (всегда со скругленными нижними углами) */}
      <div className="relative w-full backdrop-blur-2xl rounded-b-[24px] overflow-hidden">
        <svg
          viewBox="0 0 320 48"
          preserveAspectRatio="none"
          className="block h-12 w-full drop-shadow-[0_-4px_16px_rgba(0,0,0,0.3)]"
          aria-hidden
        >
          {/* Полупрозрачное матовое тело выреза */}
          <path
            d="M 0,0 L 100,0 Q 120,0 120,18 L 120,28 Q 120,48 140,48 L 320,48 L 320,48 L 0,48 Z"
            fill="rgba(8, 12, 22, 0.65)"
          />
        </svg>

        {/* Номер в левом выступе */}
        <div className="absolute top-1 left-5 z-30 pointer-events-auto">
          <span className="font-tactical text-2xl font-black leading-none tracking-tight text-white transition-colors duration-500 group-hover:text-blue-400 sm:text-[28px] drop-shadow-md">
            {service.number}
          </span>
        </div>

        {/* Круглая кнопка со стрелкой справа */}
        <div className="pointer-events-auto absolute top-3 right-5 z-30">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-white transition-all duration-300 group-hover:bg-blue-600 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      {/* Раскрывающаяся стеклянная панель с описанием (Liquid Glass Drawer) */}
      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#080c16]/65 backdrop-blur-2xl saturate-150 relative rounded-b-[24px] overflow-hidden">
        {/* Внутренний градиентный стеклянный отблеск */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-transparent to-blue-500/[0.06] pointer-events-none rounded-b-[24px]" />

        <div className="overflow-hidden rounded-b-[24px]">
          <div className="relative z-10 flex flex-col justify-between px-5 pt-2 pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-100 pointer-events-auto rounded-b-[24px]">
            <div>
              <h3 className="mb-2 font-sans text-lg font-bold leading-snug tracking-tight text-white uppercase transition-colors duration-300 group-hover:text-blue-400 sm:text-xl drop-shadow-sm">
                {service.title}
              </h3>
              <p className="mb-3.5 line-clamp-3 text-xs leading-relaxed text-zinc-200 drop-shadow-sm">
                {service.shortDesc}
              </p>
            </div>

            {/* Нижняя строка со спецификациями и кнопкой */}
            <div className="flex items-center justify-between pt-3">
              <div className="flex flex-wrap gap-1.5">
                {service.specs?.slice(0, 2).map((spec: string) => (
                  <span
                    key={spec}
                    className={`${sx.spec} rounded-md bg-white/[0.12] backdrop-blur-md px-2 py-0.5 font-mono text-[9px] font-medium tracking-wider text-white uppercase shadow-sm`}
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <span className="font-mono text-[10px] font-bold tracking-wider text-blue-400 uppercase group-hover:underline drop-shadow-sm">
                Замовити
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </article>
);
