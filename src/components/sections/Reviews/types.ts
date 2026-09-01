import { REVIEWS_DATA, type ReviewItem } from '../../../data/reviews';

export const CARD_RADIAL_GRADIENTS: Record<string, string> = {
  c1: 'radial-gradient(46% 52% at 74% 30%, #3b82f6 0%, rgba(59,130,246,0) 68%), radial-gradient(40% 44% at 88% 62%, #1e5fd6 0%, rgba(30,95,214,0) 70%), radial-gradient(34% 38% at 62% 18%, #67e8f9 0%, rgba(103,232,249,0) 72%)',
  c2: 'radial-gradient(52% 48% at 22% 72%, #2563eb 0%, rgba(37,99,235,0) 70%), radial-gradient(38% 42% at 8% 40%, #60a5fa 0%, rgba(96,165,250,0) 72%)',
  c3: 'radial-gradient(50% 46% at 82% 78%, #2563eb 0%, rgba(37,99,235,0) 70%), radial-gradient(36% 40% at 66% 92%, #38bdf8 0%, rgba(56,189,248,0) 74%)',
  c4: 'radial-gradient(44% 50% at 30% 18%, #3b82f6 0%, rgba(59,130,246,0) 70%), radial-gradient(40% 44% at 12% 8%, #1e5fd6 0%, rgba(30,95,214,0) 72%)',
};

export const GAP = 20;

export interface ExtendedReviewItem extends ReviewItem {
  extKey: string;
  realIndex: number;
}

export const EXTENDED_REVIEWS: ExtendedReviewItem[] = [
  { ...REVIEWS_DATA[3], extKey: 'clone-prev-4', realIndex: 3 },
  { ...REVIEWS_DATA[0], extKey: 'real-1', realIndex: 0 },
  { ...REVIEWS_DATA[1], extKey: 'real-2', realIndex: 1 },
  { ...REVIEWS_DATA[2], extKey: 'real-3', realIndex: 2 },
  { ...REVIEWS_DATA[3], extKey: 'real-4', realIndex: 3 },
  { ...REVIEWS_DATA[0], extKey: 'clone-next-1', realIndex: 0 },
];
