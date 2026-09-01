import React from 'react';

export interface ManifestoWord {
  text: string;
  highlight?: boolean;
}

export interface AboutStat {
  value: string;
  suffix?: string;
  label: string;
  accent?: boolean;
}

export const MANIFESTO_WORDS: ManifestoWord[] = [
  { text: 'IRON', highlight: true },
  { text: 'SECURITY', highlight: true },
  { text: '—' },
  { text: 'це' },
  { text: 'еталон' },
  { text: 'силової' },
  { text: 'безпеки' },
  { text: 'та' },
  { text: 'персонального' },
  { text: 'захисту' },
  { text: 'в' },
  { text: 'Києві.', highlight: true },
  { text: 'Ми' },
  { text: 'поєднуємо' },
  { text: 'дисципліну' },
  { text: 'професійного' },
  { text: 'спорту,' },
  { text: 'тактичні' },
  { text: 'навички' },
  { text: 'поводження' },
  { text: 'зі' },
  { text: 'зброєю' },
  { text: 'та' },
  { text: 'цілодобовий' },
  { text: 'ситуаційний' },
  { text: 'відеомоніторинг' },
  { text: 'для' },
  { text: 'безкомпромісного' },
  { text: 'захисту' },
  { text: 'вашого' },
  { text: 'бізнесу' },
  { text: 'та' },
  { text: 'родини.', highlight: true },
];

export const STATS: AboutStat[] = [
  { value: '500', suffix: '+', label: "Об'єктів у Києві" },
  { value: '< 10 хв', label: 'Середній час прибуття', accent: true },
  { value: '100', suffix: '%', label: 'Озброєний штат' },
  { value: '24/7', label: 'Ситуаційний центр' },
];

export const ACCENT_GRADIENT =
  'bg-gradient-to-r from-[#2563eb] via-[#60a5fa] to-[#38bdf8] bg-clip-text text-transparent';

export const WORD_INITIAL_STYLE: React.CSSProperties = {
  opacity: 0.18,
  filter: 'blur(4px)',
  transform: 'translateY(4px)',
};

export const WORDS_FROM = { opacity: 0.18, filter: 'blur(4px)', y: 4 };

export const WORDS_TO = {
  opacity: 1,
  filter: 'blur(0px)',
  y: 0,
  stagger: 0.03,
  ease: 'none' as const,
  immediateRender: true,
};
