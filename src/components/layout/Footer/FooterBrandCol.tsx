import { forwardRef } from 'react';

export const FooterBrandCol = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="lg:col-span-5 flex flex-col justify-between gap-4 will-change-transform">
      <div>
        <a href="#" className="inline-flex items-center gap-3.5 mb-5 group cursor-pointer">
          <img
            src="/images/iron_shield_icon.png"
            alt="IRON SECURITY"
            className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display font-medium text-2xl tracking-wider text-white">
            IRON SECURITY
          </span>
        </a>

        <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
          Лідер ліцензованої фізичної та пультової безпеки в Києві. Комплексний захист бізнесу, приватних осіб та об’єктів підвищеного ризику.
        </p>
      </div>
    </div>
  );
});

FooterBrandCol.displayName = 'FooterBrandCol';
