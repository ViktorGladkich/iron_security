export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  tag: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  location: string;
  workingHours: string;
  telegram: string;
}
