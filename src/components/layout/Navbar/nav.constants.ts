import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', label: 'Про фірму', href: '#about' },
  { id: 'services', label: 'Послуги', href: '#services' },
  { id: 'standards', label: 'Стандарти', href: '#standards' },
  { id: 'reviews', label: 'Відгуки', href: '#reviews' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'contacts', label: 'Контакти', href: '#contacts' },
] as const;

/**
 * Плавный скролл к целевой секции страницы
 */
export const smoothScrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onComplete?: () => void,
) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    if (onComplete) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
