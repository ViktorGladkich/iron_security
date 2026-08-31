import React from 'react';
import { Phone } from 'lucide-react';
import { companyInfo } from '../../data/companyInfo';

interface HeaderProps {
  onOrderClick?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="absolute top-0 inset-x-0 z-30 px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between pointer-events-auto">
      {/* 1. Левая часть: логотип IRON SECURITY + статус */}
      <a href="#" className="header-logo-elem flex items-center gap-2.5 sm:gap-3 group">
        <img
          src="/images/iron_shield_icon.png"
          alt="IRON SECURITY Shield"
          className="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex flex-col">
          <span className="font-display font-medium text-sm sm:text-base tracking-wider text-zinc-300 flex items-center gap-1.5 leading-none transition-colors group-hover:text-white">
            IRON SECURITY
          </span>
        </div>
      </a>

      {/* 2. Центральный SVG-вырез с навигацией: расширен до 620px, чтобы края не прилипали */}
      <div className="header-cutout-nav absolute top-0 left-1/2 -translate-x-1/2 w-[480px] sm:w-[620px] h-[52px] sm:h-[58px] pointer-events-auto">
        <svg
          viewBox="0 0 620 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Трапециевидный вырез: 620px, широкая ровная нижняя грань (472px) и компактные скосы */}
          <path
            d="M 0 0 
               L 620 0 
               Q 598 0 590 14 
               L 568 46 
               Q 560 58 546 58 
               L 74 58 
               Q 60 58 52 46 
               L 30 14 
               Q 22 0 0 0 Z"
            fill="#f2f4f7"
          />
        </svg>

        {/* Навигационные ссылки внутри выреза с Awwwards кинетическим роллером текста */}
        <nav className="absolute inset-0 flex items-center justify-center px-12 sm:px-16 gap-4 sm:gap-7 text-[11px] sm:text-xs font-['PP_Neue_Montreal'] font-medium text-black uppercase tracking-wider pb-0.5 select-none">
          {[
            { label: 'Про фірму', href: '#about' },
            { label: 'Послуги', href: '#services' },
            { label: 'Стандарти', href: '#standards' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Контакти', href: '#contact' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group/link relative flex items-center justify-center cursor-pointer whitespace-nowrap"
            >
              {/* Невидимый текст для сохранения точных пропорций */}
              <span className="invisible select-none whitespace-pre">{item.label}</span>

              {/* Посимвольный каскадный роллер букв (Awwwards Staggered Letter Wave) */}
              <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
                {item.label.split('').map((char, index) => (
                  <span key={index} className="relative inline-block overflow-hidden h-[1.3em]">
                    {/* 1. Исходная буква уезжает вверх */}
                    <span
                      className="inline-block transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/link:-translate-y-full text-black/85"
                      style={{ transitionDelay: `${index * 14}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                    {/* 2. Новая буква выезжает снизу в глубоком благородном синем цвете */}
                    <span
                      className="absolute inset-0 inline-block transition-transform duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] translate-y-full group-hover/link:translate-y-0 text-blue-700 font-semibold"
                      style={{ transitionDelay: `${index * 14}ms` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  </span>
                ))}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* 3. Правая часть: телефон черговой части */}
      <div className="header-right-elem flex items-center">
        <a
          href={`tel:${companyInfo.phone}`}
          className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400" />
          <span>{companyInfo.phoneDisplay}</span>
        </a>
      </div>
    </header>
  );
};
