import { sel } from './hero.constants';

export interface IntroStep {
  /** Что анимируем. */
  target: string;
  /** Абсолютная позиция на таймлайне, s. */
  at: number;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

/**
 * Партитура появления Hero.
 *
 * Позиции заданы абсолютными числами, а не цепочкой `-=`. В цепочке сдвиг
 * длительности любого шага перетаскивает за собой все последующие, и подобрать
 * тайминг одного элемента, не сломав остальные, невозможно. Здесь каждая
 * строка читается независимо, а вся партитура — как дорожки на таймлайне.
 *
 * Правила, которых придерживается таблица:
 *  - только `transform` и `opacity` — никаких `filter`, чтобы кадр не требовал
 *    повторной растеризации поддерева;
 *  - никаких упругих ease (`back`, `elastic`): перелёт с возвратом визуально
 *    неотличим от подвисания;
 *  - всё укладывается в ~1.8 s, а не в 3.5 s — последние элементы больше
 *    не попадают в хвост загрузки страницы.
 */
export const INTRO_STEPS: IntroStep[] = [
  {
    target: sel.frame,
    at: 0,
    from: { scale: 0.95, yPercent: 1.2, opacity: 0 },
    to: { scale: 1, yPercent: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
  },
  {
    target: sel.glow,
    at: 0.2,
    from: { scale: 0.45, opacity: 0 },
    to: { scale: 1, opacity: 0.5, duration: 1.8, ease: 'power2.out' },
  },
  {
    target: sel.titleLetter,
    at: 0.35,
    from: { yPercent: 35, opacity: 0, scale: 0.88 },
    to: {
      yPercent: 0,
      opacity: 1,
      scale: 1,
      duration: 1.3,
      stagger: 0.09,
      ease: 'power3.out',
      clearProps: 'transform',
    },
  },
  {
    target: sel.operative,
    at: 0.45,
    from: { yPercent: 14, scale: 0.9, opacity: 0 },
    to: { yPercent: 0, scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' },
  },
  {
    target: sel.headerCutout,
    at: 0.65,
    // clearProps возвращает элементу `-translate-x-1/2`: GSAP читает эту
    // центровку из матрицы как пиксели и после ресайза вырез уехал бы вбок.
    from: { yPercent: -100, opacity: 0, scaleY: 0.6 },
    to: { yPercent: 0, opacity: 1, scaleY: 1, duration: 1.1, ease: 'power3.out', clearProps: 'transform' },
  },
  {
    target: sel.headerSide,
    at: 0.8,
    from: { y: -20, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out', clearProps: 'transform' },
  },
  {
    target: sel.statsBar,
    at: 0.9,
    from: { xPercent: 12, yPercent: 25, opacity: 0 },
    to: { xPercent: 0, yPercent: 0, opacity: 1, duration: 1.2, ease: 'power3.out', clearProps: 'transform' },
  },
  {
    target: sel.offerItem,
    at: 1.05,
    from: { x: -32, opacity: 0 },
    to: { x: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out', clearProps: 'transform' },
  },
  {
    target: sel.statItem,
    at: 1.15,
    from: { y: 15, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'transform' },
  },
  {
    target: sel.card,
    at: 1.05,
    // Плавное проявление на месте с мягким масштабированием
    from: { scale: 0.9, yPercent: 6, opacity: 0 },
    to: { scale: 1, yPercent: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
  },
];

/** Слои, которые стоит промоутить на время интро и отпустить после него. */
export const PROMOTED_DURING_INTRO = [sel.frame, sel.operative, sel.card, sel.statsBar].join(', ');

/**
 * Потолок ожидания шрифтов и картинок перед стартом интро.
 * Держим низким: лучше сыграть по неготовым ассетам, чем показывать пустой экран.
 */
export const ASSETS_TIMEOUT_MS = 700;
