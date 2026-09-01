import { forwardRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { SERVICE_CARDS } from '../../../data/serviceCards';

export const ServicesImageStack = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div
      ref={ref}
      className="hidden md:flex w-full md:w-1/2 sticky top-24 lg:top-28 h-[480px] lg:h-[560px] items-center justify-center shrink-0"
    >
      <div className="relative w-full h-[440px] lg:h-[520px] rounded-[20px] overflow-hidden bg-[#0b0f19] isolate transform-gpu">
        {SERVICE_CARDS.map((service, index) => {
          const zIndex = (SERVICE_CARDS.length - index) * 10;

          return (
            <div
              key={service.id}
              className="arch-img-wrapper absolute inset-0 w-full h-full will-change-[clip-path]"
              style={{ zIndex }}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover will-change-transform brightness-95 contrast-105"
                loading="lazy"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

              {/* Фірмовий трапецієподібний SVG-виріз зверху */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[220px] sm:w-[260px] h-[36px] sm:h-[40px] pointer-events-none">
                <svg
                  viewBox="0 0 260 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M 0 0 L 260 0 Q 248 0 243 10 L 232 30 Q 227 40 216 40 L 44 40 Q 33 40 28 30 L 17 10 Q 12 0 0 0 Z"
                    fill="#f2f4f7"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center gap-2 pb-1 text-[#0f1115] font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase select-none">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>IRON SECURITY // 24/7</span>
                </div>
              </div>

              {/* Фірмовий виріз знизу з номером і назвою */}
              <div className="absolute bottom-0 left-0 z-30 w-[300px] sm:w-[350px] lg:w-[380px] h-[50px] sm:h-[54px] pointer-events-none">
                <svg
                  viewBox="0 0 380 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M 0 54 L 0 0 L 280 0 Q 302 0 312 20 L 326 40 Q 334 54 350 54 L 380 54 L 0 54 Z"
                    fill="#f2f4f7"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center px-5 sm:px-6 gap-3 pt-1">
                  <span className="font-tactical text-2xl sm:text-[26px] font-black text-blue-600 leading-none">
                    {service.number}
                  </span>
                  <div className="h-5 w-px bg-black/15" />
                  <span className="font-['PP_Neue_Montreal'] font-bold text-sm sm:text-base text-[#0f1115] tracking-tight uppercase truncate">
                    {service.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ServicesImageStack.displayName = 'ServicesImageStack';
