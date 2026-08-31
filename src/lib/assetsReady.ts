/**
 * Ожидание момента, когда главный поток перестанет дёргать первый экран.
 *
 * Вступительная анимация страдает не от собственной сложности, а от чужой
 * работы в те же кадры: декодирование картинок и подмена веб-шрифтов —
 * это длинные задачи в главном потоке. Пока они идут, кадры не рисуются,
 * а после — таймлайн навёрстывает пропущенное время рывком.
 *
 * Поэтому интро стартует, когда шрифты применены, а изображения первого
 * экрана уже декодированы. Ожидание жёстко ограничено таймаутом: медленная
 * сеть не должна оставить пользователя перед пустым экраном.
 */
const decodeAll = (root: ParentNode): Promise<unknown> =>
  Promise.all(
    Array.from(root.querySelectorAll('img')).map((img) =>
      // decode() ждёт и загрузку, и распаковку; отсутствие картинки — не повод падать.
      img.decode?.().catch(() => undefined) ?? Promise.resolve(),
    ),
  );

const fontsReady = (): Promise<unknown> =>
  typeof document !== 'undefined' && 'fonts' in document
    ? document.fonts.ready.catch(() => undefined)
    : Promise.resolve();

export const waitForCriticalAssets = (root: ParentNode, timeoutMs: number): Promise<void> => {
  const ready = Promise.all([fontsReady(), decodeAll(root)]).then(() => undefined);
  const cap = new Promise<void>((resolve) => {
    setTimeout(resolve, timeoutMs);
  });

  return Promise.race([ready, cap]);
};
