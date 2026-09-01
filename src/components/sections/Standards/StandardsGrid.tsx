import React from 'react';
import { STANDARDS_DATA } from '../../../data/standards';
import { StandardCardItem } from './StandardCardItem';
import { CenterpieceCardItem } from './CenterpieceCardItem';

interface StandardsGridProps {
  card1Ref?: React.Ref<HTMLDivElement>;
  card2Ref?: React.Ref<HTMLDivElement>;
  centerRef?: React.Ref<HTMLDivElement>;
  card3Ref?: React.Ref<HTMLDivElement>;
  card4Ref?: React.Ref<HTMLDivElement>;
  onOrderClick?: () => void;
}

export const StandardsGrid: React.FC<StandardsGridProps> = ({
  card1Ref,
  card2Ref,
  centerRef,
  card3Ref,
  card4Ref,
  onOrderClick,
}) => {
  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-center max-w-6xl mx-auto mb-12 sm:mb-16">
      {/* Frame 1: Верх-Лево (01 // Спортивний склад) */}
      <div ref={card1Ref} className="lg:col-start-1 lg:row-start-1 will-change-transform">
        <StandardCardItem item={STANDARDS_DATA[0]} />
      </div>

      {/* Frame 2: Верх-Право (02 // Вогнева підготовка) */}
      <div ref={card2Ref} className="lg:col-start-3 lg:row-start-1 will-change-transform">
        <StandardCardItem item={STANDARDS_DATA[1]} />
      </div>

      {/* Frame 6: Центр (Центральная карточка с 3D-логотипом IRON SECURITY) */}
      <div
        ref={centerRef}
        className="md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-2 will-change-transform"
      >
        <CenterpieceCardItem onOrderClick={onOrderClick} />
      </div>

      {/* Frame 7: Низ-Лево (03 // Тактична медицина) */}
      <div ref={card3Ref} className="lg:col-start-1 lg:row-start-3 will-change-transform">
        <StandardCardItem item={STANDARDS_DATA[2]} />
      </div>

      {/* Frame 8: Низ-Право (04 // Бекграунд-чек & NDA) */}
      <div ref={card4Ref} className="lg:col-start-3 lg:row-start-3 will-change-transform">
        <StandardCardItem item={STANDARDS_DATA[3]} />
      </div>
    </div>
  );
};
