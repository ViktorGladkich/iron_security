import React, { forwardRef } from 'react';
import { LetterRoller } from '../../common/LetterRoller';

const NAV_LINKS = [
  { label: 'Про компанію', href: '#about' },
  { label: 'Послуги безпеки', href: '#services' },
  { label: 'Кадровий стандарт', href: '#standards' },
  { label: 'Відгуки клієнтів', href: '#reviews' },
  { label: 'Часті запитання', href: '#faq' },
  { label: 'Розрахунок вартості', href: '#contacts' },
] as const;

interface FooterNavColProps {
  onScrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const FooterNavCol = forwardRef<HTMLDivElement, FooterNavColProps>(
  ({ onScrollToSection }, ref) => {
    return (
      <div ref={ref} className="lg:col-span-3 will-change-transform">
        <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-5">
          // НАВІГАЦІЯ
        </h4>
        <ul className="space-y-3 text-xs font-mono">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => onScrollToSection(e, link.href)}
                className="roller-host relative inline-flex items-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <LetterRoller
                  text={link.label}
                  restClassName="text-zinc-400"
                  hoverClassName="text-white font-medium"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

FooterNavCol.displayName = 'FooterNavCol';
