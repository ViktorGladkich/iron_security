import React from 'react';

import { SPOTLIGHT_SIZE } from './services.constants';

interface ConsoleBackdropProps {
  spotRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Подложка панели: мягкое световое пятно, скользящее за курсором.
 */
export const ConsoleBackdrop: React.FC<ConsoleBackdropProps> = ({ spotRef }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      ref={spotRef}
      className="absolute top-0 left-0 rounded-full"
      style={{
        width: SPOTLIGHT_SIZE,
        height: SPOTLIGHT_SIZE,
        background:
          'radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0.06) 38%, rgba(37,99,235,0) 68%)',
      }}
    />
  </div>
);
