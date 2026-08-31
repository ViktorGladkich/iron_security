/** Пользователь просил ОС минимизировать анимации. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Настоящая мышь/трекпад: только здесь параллакс имеет смысл. */
export const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;
