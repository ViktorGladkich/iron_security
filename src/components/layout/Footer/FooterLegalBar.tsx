import { forwardRef } from 'react';

export const FooterLegalBar = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4 will-change-transform"
    >
      <div>
        © {new Date().getFullYear()} IRON SECURITY. Всі права захищено.
      </div>

      <div className="flex flex-wrap items-center gap-6 text-[11px]">
        <a href="#" className="hover:text-zinc-300 transition-colors cursor-pointer">
          ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ
        </a>
        <a href="#" className="hover:text-zinc-300 transition-colors cursor-pointer">
          УМОВИ NDA
        </a>
      </div>
    </div>
  );
});

FooterLegalBar.displayName = 'FooterLegalBar';
