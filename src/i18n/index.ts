import en from './en';
import es from './es';
import fr from './fr';
import type { Dict, Locale } from './types';

export const locales = ['en', 'es', 'fr'] as const;

export const defaultLocale: Locale = 'en';

export const siteUrl = 'https://sebastiangarcia.net';

export const careerStartYear = 2020;

export const yearsOfExperience = (now: Date = new Date()): number =>
  now.getFullYear() - careerStartYear;

const dictionaries: Record<Locale, Dict> = { en, es, fr };

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value);

export const getDict = (locale: Locale): Dict => dictionaries[locale];

export const localeHref = (locale: Locale): string =>
  locale === defaultLocale ? '/' : `/${locale}/`;

export const getLocalePaths = () =>
  locales.filter((l) => l !== defaultLocale).map((lang) => ({ params: { lang } }));

export const localeMetadata: Record<Locale, { code: string; name: string; ogLocale: string }> = {
  en: { code: 'EN', name: 'English', ogLocale: 'en_US' },
  es: { code: 'ES', name: 'Español', ogLocale: 'es_CO' },
  fr: { code: 'FR', name: 'Français', ogLocale: 'fr_FR' },
};
