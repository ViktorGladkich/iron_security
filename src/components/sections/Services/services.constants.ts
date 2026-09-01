/**
 * Якоря анимации секции «Послуги».
 * Разметка вешает `sx.*`, таймлайн скана адресует `sel.*`.
 */
export const sx = {
  grid: 'services-grid',
  card: 'services-card',
  shutter: 'services-shutter',
  photo: 'services-photo',
  spec: 'services-spec',
  scanBeam: 'services-scan-beam',
  progress: 'services-progress',
} as const;

type Anchor = keyof typeof sx;

export const sel = Object.fromEntries(
  (Object.keys(sx) as Anchor[]).map((key) => [key, `.${sx[key]}`]),
) as Record<Anchor, string>;

/** Радиус светового пятна под курсором, px. */
export const SPOTLIGHT_SIZE = 640;
