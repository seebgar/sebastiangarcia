import en from "./en";
import es from "./es";
import fr from "./fr";
import type { Dict, Locale } from "./types";

export const locales = ["en", "es", "fr"] as const;

export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Dict> = { en, es, fr };

export const isLocale = (value: unknown): value is Locale =>
    typeof value === "string" &&
    (locales as readonly string[]).includes(value);

export const getDict = (locale: Locale): Dict => dictionaries[locale];

export const localeHref = (locale: Locale): string =>
    locale === defaultLocale ? "/" : `/${locale}/`;

export const getLocalePaths = () =>
    locales
        .filter((l) => l !== defaultLocale)
        .map((lang) => ({ params: { lang } }));

export const localeLabels: Record<
    Locale,
    { code: string; flag: string; name: string }
> = {
    en: { code: "EN", flag: "🇺🇸", name: "English" },
    es: { code: "ES", flag: "🇨🇴", name: "Español" },
    fr: { code: "FR", flag: "🇫🇷", name: "Français" },
};
