/**
 * Единый источник правды для классов-«якорей» анимации.
 *
 * Разметка вешает класс через `hx.*`, таймлайн интро адресует его через `sel.*`.
 * Переименование в одном месте не может рассинхронизировать анимацию, а поиск
 * по проекту сразу показывает, кто ещё завязан на конкретный якорь
 * (например, Header использует `hx.headerCutout` / `hx.headerSide`).
 */
export const hx = {
  frame: 'hero-frame',
  glow: 'hero-glow',
  titleLetter: 'hero-title-letter',
  operative: 'hero-operative',
  offerItem: 'hero-offer-item',
  card: 'hero-card',
  statsBar: 'hero-stats-bar',
  statItem: 'hero-stat-item',
  headerCutout: 'header-cutout',
  headerSide: 'header-side',
} as const;

type Anchor = keyof typeof hx;

export const sel = Object.fromEntries(
  (Object.keys(hx) as Anchor[]).map((key) => [key, `.${hx[key]}`]),
) as Record<Anchor, string>;

/** Буквы фонового титула, разнесённые по ширине фрейма. */
export const HERO_TITLE_LETTERS = [
  { char: 'I', className: 'text-left pl-1 sm:pl-2' },
  { char: 'R', className: 'text-center -ml-4 sm:-ml-8' },
  { char: 'O', className: 'text-center ml-4 sm:ml-8' },
  { char: 'N', className: 'text-right pr-1 sm:pr-2' },
] as const;

/** Метрики в нижнем правом вырезе. */
export const HERO_STATS = [
  { value: '100%', label: 'спортсмени' },
  { value: 'A+', label: 'збройний клас' },
  { value: '<10 ХВ', label: 'прибуття в києві' },
] as const;
