import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Склеивает классы и детерминированно разрешает конфликты Tailwind-утилит:
 * последний переданный класс выигрывает вне зависимости от порядка в бандле.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
