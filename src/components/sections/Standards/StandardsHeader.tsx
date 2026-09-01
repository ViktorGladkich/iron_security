import { forwardRef } from 'react';

interface StandardsHeaderProps {
  headerTagRef?: React.Ref<HTMLSpanElement>;
  headerTitleRef?: React.Ref<HTMLHeadingElement>;
  headerDescRef?: React.Ref<HTMLParagraphElement>;
}

export const StandardsHeader = forwardRef<HTMLElement, StandardsHeaderProps>(
  ({ headerTagRef, headerTitleRef, headerDescRef }, _ref) => {
    return (
      <header className="relative z-10 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <span
            ref={headerTagRef}
            className="mb-2 block font-mono text-xs font-bold tracking-widest text-blue-400 uppercase sm:text-sm will-change-transform"
          >
            03 // КАДРОВИЙ СТАНДАРТ
          </span>
          <h2
            ref={headerTitleRef}
            className="font-sans text-2xl font-normal tracking-tight text-white uppercase sm:text-3xl md:text-4xl will-change-transform"
          >
            ЕТАЛОННИЙ ВІДБІР ТА{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] via-[#60a5fa] to-[#93c5fd] bg-clip-text text-transparent font-medium">
              ПІДГОТОВКА
            </span>
          </h2>
        </div>

        <div className="max-w-md">
          <p
            ref={headerDescRef}
            className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed tracking-tight will-change-transform"
          >
            Ми не наймаємо випадкових людей. Кожен боєць IRON SECURITY проходить 4 рівні кваліфікаційного відбору та регулярні атестації.
          </p>
        </div>
      </header>
    );
  }
);

StandardsHeader.displayName = 'StandardsHeader';
