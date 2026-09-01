import { forwardRef } from 'react';

export const ContactVideoBlock = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="lg:col-span-5 flex flex-col will-change-transform">
      <div className="relative h-full min-h-[260px] sm:min-h-[440px] lg:min-h-full rounded-[26px] overflow-hidden bg-black border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] group isolate">
        <video
          src="/video/about.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
      </div>
    </div>
  );
});

ContactVideoBlock.displayName = 'ContactVideoBlock';
