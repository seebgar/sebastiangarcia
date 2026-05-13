import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, it, expect } from 'vitest';
import Header from '../src/components/Header.astro';
import { getDict, locales } from '../src/i18n';

for (const locale of locales) {
  describe(`Header [${locale}]`, () => {
    const dict = getDict(locale);

    it('renders a primary nav with the three section anchors', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Header, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const nav = document.querySelector('nav');
      expect(nav?.getAttribute('aria-label')).toBe('Primary');

      const links = [...document.querySelectorAll('.header__nav__list a')] as HTMLAnchorElement[];
      expect(links.map((a) => a.getAttribute('href'))).toEqual(['#about', '#resume', '#contact']);
      expect(links.map((a) => a.textContent?.trim())).toEqual([
        dict.nav.about,
        dict.nav.resume,
        dict.nav.contact,
      ]);
    });

    it('uses internal anchor hrefs only (no external links)', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Header, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const links = [...document.querySelectorAll('a')] as HTMLAnchorElement[];
      for (const a of links) {
        expect(a.getAttribute('href')).toMatch(/^#/);
        expect(a.getAttribute('target')).toBeNull();
      }
    });
  });
}
