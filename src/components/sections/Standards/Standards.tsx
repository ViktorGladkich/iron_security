import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

import { STANDARDS_DATA, type StandardItem } from '../../../data/standards';
import { Button } from '../../common/Button';

interface StandardsProps {
  onOrderClick?: () => void;
}

export const Standards: React.FC<StandardsProps> = ({ onOrderClick }) => {
  return (
    <section
      id="standards"
      className="relative z-10 flex w-full items-center justify-center px-[15px] pb-[15px]"
    >
      <div className="relative w-full rounded-[20px] bg-black border border-white/10 overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-16">
        
        {/* Фоновые сапфировые градиентные свечения */}
        <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-blue-700/10 blur-[120px]" />

        {/* ── Шапка секции ─────────────────────────────────────────────── */}
        <header className="relative z-10 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <span className="mb-2 block font-mono text-xs font-bold tracking-widest text-blue-400 uppercase sm:text-sm">
              03 // КАДРОВИЙ СТАНДАРТ
            </span>
            <h2 className="font-sans text-2xl font-normal tracking-tight text-white uppercase sm:text-3xl md:text-4xl">
              ЕТАЛОННИЙ ВІДБІР ТА{' '}
              <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#93c5fd] bg-clip-text text-transparent font-medium">
                ПІДГОТОВКА
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed tracking-tight">
              Ми не наймаємо випадкових людей. Кожен боєць IRON SECURITY проходить 4 рівні кваліфікаційного відбору та регулярні атестації.
            </p>
          </div>
        </header>

        {/* ── Сетка 4 карточек стандартов (в стиле референса с 3D-иконками и таб-вырезом) ── */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-12 sm:mb-16">
          {STANDARDS_DATA.map((item: StandardItem) => (
            <article
              key={item.id}
              onClick={onOrderClick}
              className="group relative flex flex-col h-[340px] sm:h-[370px] rounded-[20px] bg-[#0c0e14] border border-white/10 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-blue-500/40 transition-colors duration-500 cursor-pointer isolate transform-gpu select-none"
            >
              {/* Фоновый блок: 3D иконка на глубоком сапфировом градиенте */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#111a38] via-[#0b1022] to-[#070912] flex items-center justify-center p-6 pb-12">
                
                {/* Фоновое радиальное свечение */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.25)_0%,transparent_70%)] group-hover:scale-125 transition-transform duration-700" />
                
                {/* 3D Иконка */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  loading="lazy"
                />
              </div>

              {/* Выдвижная панель: в спокойном состоянии виден только номер (44px), при наведении плавно выезжает описание */}
              <div className="absolute bottom-0 left-0 right-0 z-20 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[calc(100%-44px)] group-hover:translate-y-0 will-change-transform">
                {/* Фирменный ступенчатый SVG-таб с номером карточки (виден всегда) */}
                <div className="relative w-full h-11 pointer-events-none">
                  <svg
                    viewBox="0 0 320 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M 0 0 L 125 0 Q 140 0 148 14 L 160 32 Q 168 44 184 44 L 320 44 L 320 44 L 0 44 Z"
                      fill="#f2f4f7"
                    />
                  </svg>

                  {/* Большой номер карточки (01, 02, 03, 04) в приподнятом табе */}
                  <div className="absolute top-0 left-0 h-11 w-[125px] flex items-center pl-5">
                    <span className="font-tactical text-2xl font-black text-[#0f1115] tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.number}
                    </span>
                  </div>

                  {/* Иконка стрелочки на правой нижней полке */}
                  <div className="absolute top-[18px] right-4 w-6 h-6 rounded-full bg-black/5 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0f1115]/60 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Нижняя часть карточки: Заголовок и описание на светлом фоне #f2f4f7 (выезжает при ховере) */}
                <div className="px-5 pb-6 pt-2 bg-[#f2f4f7]">
                  <h3 className="font-['PP_Neue_Montreal'] font-bold text-base sm:text-lg text-[#0f1115] mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#0f1115]/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Нижняя информационная панель с гарантией и кнопкой заказа ── */}
        <div className="relative z-10 p-6 sm:p-8 rounded-[20px] bg-white/[0.02] border border-blue-600/30 shadow-[0_10px_30px_rgba(29,78,216,0.1)] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
              <span>100% ОФІЦІЙНА ЮРИДИЧНА ВІДПОВІДАЛЬНІСТЬ</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Кожен договір закріплює персональну матеріальну та юридичну відповідальність за безпеку вашого життя, сімʼї та комерційних активів за стандартами МВС України.
            </p>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={onOrderClick}
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Підібрати охорону
            </Button>
          </div>
        </div>

        {/* ── Подвал секции ────────────────────────────────────────────── */}
        <footer className="relative z-10 mt-12 sm:mt-16 pt-8 border-t border-white/10 flex items-center justify-center text-center w-full">
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            ЛІЦЕНЗІЯ МВС УКРАЇНИ // КИЇВ 24/7
          </span>
        </footer>

      </div>
    </section>
  );
};
