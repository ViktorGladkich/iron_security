export interface StandardItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
}

export const STANDARDS_DATA: StandardItem[] = [
  {
    id: 'athletic',
    number: '01',
    tag: 'ФІЗИЧНА ПІДГОТОВКА',
    title: 'Спортивний склад',
    desc: 'Вік 23–35 років, відмінна фізична форма. 100% особового складу — спортсмени та розрядники з боксу, боротьби, самбо та ММА з регулярним тестуванням нормативів.',
    image: '/images/card-physical-training.png',
  },
  {
    id: 'tactical',
    number: '02',
    tag: 'ЛІЦЕНЗІЯ МВС',
    title: 'Вогнева підготовка',
    desc: 'Офіційний дозвіл та ліцензія МВС на носіння та застосування зброї. Щомісячні стрілецькі полігони: стрільба з авто, робота в CQB та екстрена евакуація.',
    image: '/images/card-tactical-shooting.png',
  },
  {
    id: 'medical',
    number: '03',
    tag: 'ПРОТОКОЛ TCCC',
    title: 'Тактична медицина',
    desc: 'Сертифікація за міжнародними стандартами Tactical Combat Casualty Care (MARCH). Навички зупинки кровотеч та індивідуальна тактична аптечка IFAK у кожного бійця.',
    image: '/images/card-tactical-medicine.png',
  },
  {
    id: 'security-check',
    number: '04',
    tag: '100% NDA',
    title: 'Бекграунд-чек & NDA',
    desc: 'Поглиблена перевірка біографії власною службою безпеки: відсутність судимостей, бездоганна репутація та юридична угода про повну конфіденційність.',
    image: '/images/card-confidentiality-nda.png',
  },
];
