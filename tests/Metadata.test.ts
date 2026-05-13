import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, it, expect } from 'vitest';
import Metadata from '../src/components/Metadata.astro';
import { getDict, locales, localeHref } from '../src/i18n';

for (const locale of locales) {
  describe(`Metadata [${locale}]`, () => {
    const dict = getDict(locale);

    it('emits an absolute canonical and hreflang alternates for every locale plus x-default', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Metadata, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const canonical = document.querySelector("link[rel='canonical']")?.getAttribute('href');
      expect(canonical).toMatch(/^https:\/\//);
      expect(canonical?.endsWith(localeHref(locale))).toBe(true);

      const alternates = [
        ...document.querySelectorAll("link[rel='alternate']"),
      ] as HTMLLinkElement[];

      const hreflangs = alternates.map((l) => l.getAttribute('hreflang'));
      for (const loc of locales) {
        expect(hreflangs).toContain(loc);
      }
      expect(hreflangs).toContain('x-default');

      for (const loc of locales) {
        const alt = alternates.find((l) => l.getAttribute('hreflang') === loc);
        expect(alt?.getAttribute('href')).toMatch(/^https:\/\//);
        expect(alt?.getAttribute('href')?.endsWith(localeHref(loc))).toBe(true);
      }

      const xDefault = alternates.find((l) => l.getAttribute('hreflang') === 'x-default');
      expect(xDefault?.getAttribute('href')).toMatch(/^https:\/\//);
    });

    it('emits Open Graph tags with absolute URLs and locale alternates', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Metadata, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const og = (property: string) =>
        document.querySelector(`meta[property='${property}']`)?.getAttribute('content');

      expect(og('og:type')).toBe('website');
      expect(og('og:site_name')).toBe('Sebastian Garcia');
      expect(og('og:url')).toMatch(/^https:\/\//);
      expect(og('og:title')).toBe(dict.meta.title);
      expect(og('og:description')).toBe(dict.meta.description);
      expect(og('og:image')).toMatch(/^https:\/\/.+\.(jpg|jpeg|webp|png)/);
      expect(og('og:image:width')).toBe('1200');
      expect(og('og:image:height')).toBe('1200');
      expect(og('og:image:alt')).toBe(dict.about.imageAlt);
      expect(og('og:locale')).toMatch(/^[a-z]{2}_[A-Z]{2}$/);

      const alternates = [...document.querySelectorAll("meta[property='og:locale:alternate']")].map(
        (m) => m.getAttribute('content'),
      );
      expect(alternates.length).toBe(locales.length - 1);
      for (const alt of alternates) {
        expect(alt).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
      }
    });

    it('emits Twitter Card tags', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Metadata, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const tw = (name: string) =>
        document.querySelector(`meta[name='${name}']`)?.getAttribute('content');

      expect(tw('twitter:card')).toMatch(/^summary/);
      expect(tw('twitter:title')).toBe(dict.meta.title);
      expect(tw('twitter:description')).toBe(dict.meta.description);
      expect(tw('twitter:image')).toMatch(/^https:\/\//);
      expect(tw('twitter:image:alt')).toBe(dict.about.imageAlt);
    });
  });
}
