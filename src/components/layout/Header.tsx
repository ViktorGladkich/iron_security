import React from 'react';
import { Phone } from 'lucide-react';

import { LetterRoller } from '../common/LetterRoller';
import { companyInfo } from '../../data/companyInfo';
// Импорт из листового модуля, а не из бочки: Hero рендерит Header,
// и barrel-импорт замкнул бы цикл.
import { hx } from '../sections/Hero/hero.constants';

interface HeaderProps {
  onOrderClick?: () => void;
}

const NAV_ITEMS = [
  { label: 'Про фірму', href: '#about' },
  { label: 'Послуги', href: '#services' },
  { label: 'Стандарти', href: '#standards' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакти', href: '#contacts' },
] as const;

const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth' });
};

/** Шапка внутри фрейма Hero: логотип, трапециевидный SVG-вырез с меню, телефон. */
export const Header: React.FC<HeaderProps> = () => (
  <header className="absolute top-0 inset-x-0 z-30 px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between pointer-events-auto">
    <a href="#" className={`${hx.headerSide} flex items-center gap-2.5 sm:gap-3 group`}>
      <img
        src="/images/iron_shield_icon.png"
        alt="IRON SECURITY"
        width={137}
        height={160}
        className="h-7 sm:h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-transform duration-300 group-hover:scale-105"
      />
      <span className="font-display font-medium text-sm sm:text-base tracking-wider text-zinc-300 leading-none transition-colors group-hover:text-white">
        IRON SECURITY
      </span>
    </a>

    <div
      className={`${hx.headerCutout} absolute top-0 left-1/2 -translate-x-1/2 w-[480px] sm:w-[620px] h-[52px] sm:h-[58px] pointer-events-auto origin-top`}
    >
      {/* Трапециевидный вырез с широкой ровной нижней гранью */}
      <svg
        viewBox="0 0 620 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M 0 0 L 620 0 Q 598 0 590 14 L 568 46 Q 560 58 546 58 L 74 58 Q 60 58 52 46 L 30 14 Q 22 0 0 0 Z"
          fill="#f2f4f7"
        />
      </svg>

      <nav className="absolute inset-0 flex items-center justify-center px-12 sm:px-16 gap-4 sm:gap-7 text-[11px] sm:text-xs font-medium uppercase tracking-wider pb-0.5 select-none">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(event) => scrollToSection(event, item.href)}
            className="roller-host relative flex items-center justify-center cursor-pointer whitespace-nowrap rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
          >
            <LetterRoller
              text={item.label}
              restClassName="text-black/85"
              hoverClassName="text-blue-700 font-semibold"
            />
          </a>
        ))}
      </nav>
    </div>

    <div className={`${hx.headerSide} flex items-center`}>
      <a
        href={`tel:${companyInfo.phone.replace(/[^+\d]/g, '')}`}
        className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-blue-400" />
        <span>{companyInfo.phoneDisplay}</span>
      </a>
    </div>
  </header>
);
