import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /**
   * Насколько заранее считать элемент видимым. По умолчанию 0: слот, лежащий
   * сразу под первым экраном, с положительным запасом «виден» уже при
   * загрузке, и отложить его монтирование не получилось бы.
   */
  rootMargin?: string;
}

/**
 * Сообщает, приблизился ли элемент к вьюпорту. Возвращает `true` один раз
 * и больше не переключается: используется для ленивого монтирования секций,
 * откатывать которое назад не нужно.
 */
export const useInView = <T extends Element>({ rootMargin = '0px' }: UseInViewOptions = {}) => {
  const ref = useRef<T>(null);
  // Без IntersectionObserver показываем секцию сразу, ещё до первого эффекта.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) setInView(true);
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
};
