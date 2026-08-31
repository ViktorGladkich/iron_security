import React from 'react';
import { cn } from '../../lib/cn';

interface LetterRollerProps {
  /** Текст, который разбивается на буквы-ролики. */
  text: string;
  /** Классы буквы в состоянии покоя. */
  restClassName?: string;
  /** Классы дубля буквы, выезжающего снизу при наведении. */
  hoverClassName?: string;
  /** Шаг каскада между буквами. */
  stepMs?: number;
  className?: string;
}

/**
 * Каскадный посимвольный роллер (Awwwards staggered letter wave).
 *
 * Реакция на наведение живёт в CSS (`.roller-host:hover`, см. index.css),
 * поэтому компонент не зависит от того, какой `group/*`-вариант использует
 * родитель, и бесплатно получает состояние `:focus-visible` для клавиатуры.
 * Родителю достаточно класса `roller-host`.
 */
export const LetterRoller: React.FC<LetterRollerProps> = ({
  text,
  restClassName,
  hoverClassName,
  stepMs = 14,
  className,
}) => {
  const chars = Array.from(text);

  return (
    <span className={cn('roller', className)} style={{ '--roller-step': `${stepMs}ms` } as React.CSSProperties}>
      {/*
        Прозрачный (не `invisible`) текст держит геометрию И остаётся доступным
        именем для скринридеров: `visibility: hidden` выбросил бы подпись из
        дерева доступности, а буквы-ролики помечены aria-hidden.
      */}
      <span className="opacity-0 select-none whitespace-pre">{text}</span>

      <span aria-hidden className="absolute inset-0 flex items-center justify-center whitespace-nowrap select-none">
        {chars.map((char, index) => {
          const glyph = char === ' ' ? '\u00A0' : char;
          const style = { '--roller-index': index } as React.CSSProperties;

          return (
            <span key={`${char}-${index}`} className="roller__char">
              <span className={cn('roller__face roller__face--out', restClassName)} style={style}>
                {glyph}
              </span>
              <span className={cn('roller__face roller__face--in', hoverClassName)} style={style}>
                {glyph}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
};
