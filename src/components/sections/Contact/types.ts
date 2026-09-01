export const SERVICE_OPTIONS = [
  'Особиста охорона',
  'Охорона об’єктів',
  'Супровід бізнесу',
  'ГШР / Сигналізація',
  'Аудит безпеки',
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
