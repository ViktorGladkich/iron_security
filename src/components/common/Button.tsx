import React from 'react';

import { cn } from '../../lib/cn';
import { LetterRoller } from './LetterRoller';

type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'outline' | 'gradient';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
type IconPosition = 'left' | 'right' | 'swap-right-to-left';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  /** Позиционирование и кинетика стрелки/иконки */
  iconPosition?: IconPosition;
  /** Размер тактического среза углов, px. */
  chamferSize?: number;
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  xs: 'h-[38px] px-4 text-[10px]',
  sm: 'h-[38px] px-5 text-[11px]',
  md: 'h-[48px] px-7 text-[11px] sm:text-xs',
  lg: 'h-[54px] px-9 text-sm',
};

const VARIANT_STYLES: Record<ButtonVariant, { surface: string; rest: string; hover: string }> = {
  primary: { surface: 'bg-[#f2f4f7]', rest: 'text-[#0f1115]', hover: 'text-white font-bold' },
  secondary: { surface: 'bg-[#0f1115]', rest: 'text-white', hover: 'text-white font-bold' },
  glass: { surface: 'bg-white/15', rest: 'text-white', hover: 'text-white font-bold' },
  outline: { surface: 'bg-transparent border border-white/30', rest: 'text-white', hover: 'text-white font-bold' },
  gradient: { surface: 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7]', rest: 'text-white font-bold', hover: 'text-white font-bold' },
};

const FILL_GRADIENT = 'bg-gradient-to-r from-[#081d45] via-[#1d4ed8] to-[#0284c7]';

const chamferPolygon = (size: number) =>
  `polygon(${size}px 0%, 100% 0%, 100% calc(100% - ${size}px), calc(100% - ${size}px) 100%, 0% 100%, 0% ${size}px)`;

/**
 * Тактическая кнопка со срезанными углами:
 * - Поддерживает градиентный фон по умолчанию или въезжающий сапфировый градиент при наведении.
 * - Поддерживает кинетический перелет стрелки (справа налево при наведении).
 * - Подпись перекатывается по буквам через LetterRoller.
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  chamferSize = 12,
  className,
  type = 'button',
  ...props
}) => {
  const palette = VARIANT_STYLES[variant];
  const clip = chamferPolygon(chamferSize);

  return (
    <button
      type={type}
      style={{ clipPath: clip, WebkitClipPath: clip }}
      className={cn(
        'roller-host group/btn relative inline-flex items-center justify-center gap-2',
        'font-sans font-bold uppercase tracking-wider overflow-hidden cursor-pointer select-none',
        variant === 'gradient'
          ? 'shadow-[0_8px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_35px_rgba(37,99,235,0.55)]'
          : 'shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.35)]',
        'transition-[box-shadow,background-color,border-color,outline-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400',
        SIZE_STYLES[size],
        palette.surface,
        palette.rest,
        className,
      )}
      {...props}
    >
      {/* Слой заливки: для gradient въезжает черный цвет #0f1115, для остальных — сапфировый градиент */}
      {variant === 'gradient' ? (
        <span
          className={cn(
            'absolute inset-0 z-0 pointer-events-none -translate-x-full group-hover/btn:translate-x-0',
            'transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)]',
            'bg-[#0f1115]',
          )}
        />
      ) : (
        <span
          className={cn(
            'absolute inset-0 z-0 pointer-events-none -translate-x-full group-hover/btn:translate-x-0',
            'transition-transform duration-400 ease-[cubic-bezier(0.65,0,0.35,1)]',
            FILL_GRADIENT,
          )}
        />
      )}

      {/* Иконка слева (при swap-right-to-left она изначально скрыта и плавно выезжает при hover) */}
      {icon && iconPosition === 'swap-right-to-left' && (
        <span className="relative z-10 flex items-center overflow-hidden max-w-0 opacity-0 -translate-x-2 group-hover/btn:max-w-[24px] group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 ease-out shrink-0">
          {icon}
        </span>
      )}

      {/* Обычная иконка слева */}
      {icon && iconPosition === 'left' && (
        <span className="relative z-10 flex items-center shrink-0">{icon}</span>
      )}

      {/* Текст кнопки */}
      <span className="relative z-10 flex items-center justify-center">
        {typeof children === 'string' ? (
          <LetterRoller text={children} restClassName={palette.rest} hoverClassName={palette.hover} />
        ) : (
          children
        )}
      </span>

      {/* Обычная иконка справа */}
      {icon && iconPosition === 'right' && (
        <span className="relative z-10 flex items-center shrink-0">{icon}</span>
      )}

      {/* Иконка справа (при swap-right-to-left она изначально видна и скрывается при hover) */}
      {icon && iconPosition === 'swap-right-to-left' && (
        <span className="relative z-10 flex items-center overflow-hidden max-w-[24px] opacity-100 translate-x-0 group-hover/btn:max-w-0 group-hover/btn:opacity-0 group-hover/btn:translate-x-2 transition-all duration-300 ease-out shrink-0">
          {icon}
        </span>
      )}
    </button>
  );
};
