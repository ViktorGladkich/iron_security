export interface ServiceCardData {
  id: string;
  number: string;
  tag: string;
  title: string;
  /** Слово в заголовке, окрашенное фирменным градиентом. */
  highlightWord: string;
  shortDesc: string;
  specs?: string[];
  image: string;
}

export const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: 'vip-bodyguard',
    number: '01',
    tag: 'VIP PROTECT',
    title: 'ОСОБИСТА ОХОРОНА',
    highlightWord: 'ОХОРОНА',
    shortDesc:
      'Персональний фізичний захист перших осіб, топ-менеджерів та їхніх родин. Наші співробітники — майстри спорту з тактичною та вогнепальною підготовкою. Забезпечуємо повний превентивний контроль маршрутів, протокольний супровід на заходах та суворе дотримання 100% NDA.',
    image: '/images/service_vip_bodyguard.jpg',
  },
  {
    id: 'object-security',
    number: '02',
    tag: 'ESTATE & FACILITY',
    title: 'ОХОРОНА НЕРУХОМОСТІ',
    highlightWord: 'НЕРУХОМОСТІ',
    shortDesc:
      'Цілодобовий фізичний та периметральний контроль заміських резиденцій, маєтків, котеджних містечок та логістичних комплексів. Облаштовуємо контрольно-пропускні пункти, проводимо регулярне патрулювання території та унеможливлюємо несанкціоноване проникнення.',
    image: '/images/service_object_security.jpg',
  },
  {
    id: 'business-security',
    number: '03',
    tag: 'CORP SECURITY',
    title: 'БЕЗПЕКА БІЗНЕСУ',
    highlightWord: 'БІЗНЕСУ',
    shortDesc:
      'Комплексна безпека бізнес-центрів, корпоративних офісів, фінансових установ та ТРЦ. Впроваджуємо електронні системи контролю доступу (СКУД), фейс-контроль відвідувачів, проводимо аудит вразливостей і захищаємо компанію від витоку комерційної таємниці.',
    image: '/images/service_business_security.jpg',
  },
  {
    id: 'alarm-response',
    number: '04',
    tag: 'RAPID RESPONSE',
    title: 'ПУЛЬТОВА ОХОРОНА',
    highlightWord: 'ПУЛЬТОВА',
    shortDesc:
      'Підключення обʼєктів до єдиного цілодобового ситуаційного центру моніторингу в Києві та області. У разі спрацювання датчиків тривоги екіпаж озброєної групи швидкого реагування прибуває на місце за регламентом до 10 хвилин і бере периметр під повний контроль.',
    image: '/images/service_alarm_response.jpg',
  },
];
