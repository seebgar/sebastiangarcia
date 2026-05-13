import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, it, expect } from 'vitest';
import LanguageSelector from '../src/components/LanguageSelector.astro';
import {
  defaultLocale,
  getDict,
  getLocalePaths,
  isLocale,
  localeHref,
  localeMetadata,
  locales,
} from '../src/i18n';
import type { Locale } from '../src/i18n/types';

const collectKeyPaths = (value: unknown, prefix = ''): string[] => {
  if (value === null || typeof value !== 'object') return [prefix];
  if (Array.isArray(value)) {
    if (value.length === 0) return [prefix];
    return collectKeyPaths(value[0], `${prefix}[]`);
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([k, v]) =>
    collectKeyPaths(v, prefix ? `${prefix}.${k}` : k),
  );
};

describe('i18n helpers', () => {
  it('isLocale narrows valid locale strings', () => {
    for (const loc of locales) {
      expect(isLocale(loc)).toBe(true);
    }
    for (const value of ['de', 'EN', '', null, undefined, 42, {}]) {
      expect(isLocale(value)).toBe(false);
    }
  });

  it('localeHref maps default to / and others to /<locale>/', () => {
    expect(localeHref(defaultLocale)).toBe('/');
    for (const loc of locales) {
      if (loc === defaultLocale) continue;
      expect(localeHref(loc)).toBe(`/${loc}/`);
    }
  });

  it('getDict returns a non-empty meta.title for every locale', () => {
    for (const loc of locales) {
      expect(getDict(loc).meta.title.length).toBeGreaterThan(0);
      expect(getDict(loc).meta.description.length).toBeGreaterThan(0);
    }
  });

  it('every locale dictionary has the same key shape', () => {
    const reference = collectKeyPaths(getDict(defaultLocale)).sort();
    for (const loc of locales) {
      if (loc === defaultLocale) continue;
      const shape = collectKeyPaths(getDict(loc)).sort();
      expect(shape).toEqual(reference);
    }
  });

  it('every locale dictionary has the same array lengths for content collections', () => {
    const refDict = getDict(defaultLocale);
    for (const loc of locales) {
      if (loc === defaultLocale) continue;
      const dict = getDict(loc);
      expect(dict.resume.education.length).toBe(refDict.resume.education.length);
      expect(dict.resume.experience.length).toBe(refDict.resume.experience.length);
      expect(dict.resume.additionalExperience.length).toBe(
        refDict.resume.additionalExperience.length,
      );
      for (let i = 0; i < dict.resume.experience.length; i++) {
        expect(dict.resume.experience[i].bullets.length).toBe(
          refDict.resume.experience[i].bullets.length,
        );
      }
    }
  });

  it('getLocalePaths returns one entry per non-default locale', () => {
    const paths = getLocalePaths();
    expect(paths.length).toBe(locales.length - 1);
    const langs = paths.map((p) => p.params.lang);
    for (const loc of locales) {
      if (loc === defaultLocale) {
        expect(langs).not.toContain(loc);
      } else {
        expect(langs).toContain(loc);
      }
    }
  });

  it('localeMetadata has a code, name, and ogLocale for every locale', () => {
    for (const loc of locales) {
      expect(localeMetadata[loc].code).toMatch(/^[A-Z]{2}$/);
      expect(localeMetadata[loc].name.length).toBeGreaterThan(0);
      expect(localeMetadata[loc].ogLocale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
    }
  });
});

describe('LanguageSelector', () => {
  for (const current of locales as readonly Locale[]) {
    it(`marks the current locale (${current}) with aria-current`, async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(LanguageSelector, {
        props: { current },
      });
      const { document } = parseHTML(html);

      const links = [...document.querySelectorAll('a')] as HTMLAnchorElement[];
      expect(links.length).toBe(locales.length);

      const hrefs = links.map((a) => a.getAttribute('href'));
      for (const loc of locales) {
        expect(hrefs).toContain(localeHref(loc));
      }

      const activeLinks = links.filter((a) => a.getAttribute('aria-current') === 'page');
      expect(activeLinks.length).toBe(1);
      expect(activeLinks[0].getAttribute('href')).toBe(localeHref(current));
    });
  }
});
