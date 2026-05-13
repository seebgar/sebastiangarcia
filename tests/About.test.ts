import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, it, expect } from 'vitest';
import About from '../src/components/About.astro';
import { getDict, locales } from '../src/i18n';

for (const locale of locales) {
  describe(`About [${locale}]`, () => {
    const dict = getDict(locale);

    it('renders localized title, subtitle and bio in the #about section', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(About, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const section = document.querySelector('section.about');
      expect(section?.getAttribute('id')).toBe('about');

      expect(document.querySelector('.about__txt__title')?.textContent).toBe(dict.about.title);
      expect(document.querySelector('.about__txt__subtitle')?.textContent).toBe(
        dict.about.subtitle,
      );
    });

    it('declares Person microdata with the canonical name, address and sameAs links', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(About, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const person = document.querySelector('section.about[itemtype="https://schema.org/Person"]');
      expect(person).not.toBeNull();
      expect(person?.hasAttribute('itemscope')).toBe(true);

      const name = person?.querySelector('meta[itemprop="name"]');
      expect(name?.getAttribute('content')).toBe('Sebastian Garcia');

      const sameAs = [...(person?.querySelectorAll('link[itemprop="sameAs"]') ?? [])].map((l) =>
        l.getAttribute('href'),
      );
      expect(sameAs).toContain('https://www.linkedin.com/in/sebastiangarcialopez');
      expect(sameAs).toContain('https://github.com/seebgar');

      const address = person?.querySelector('meta[itemprop="address"]')?.getAttribute('content');
      expect(address).toContain('Bogotá');
      expect(address).toContain('Colombia');
    });

    it('keeps the section grid clean (only text-section and image as direct children render)', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(About, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const section = document.querySelector('section.about');
      const renderingChildren = [...(section?.children ?? [])].filter((el) => {
        const tag = el.tagName.toLowerCase();
        return tag !== 'meta' && tag !== 'link';
      });
      expect(renderingChildren.length).toBe(2);
      expect(renderingChildren[0].className).toBe('about__txt__section');
      expect(renderingChildren[1].tagName.toLowerCase()).toBe('img');
    });

    it('renders an LCP-prioritized image with localized alt and 2:3 aspect ratio', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(About, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const img = document.querySelector('.about__image') as HTMLImageElement | null;
      expect(img).not.toBeNull();
      expect(img!.getAttribute('alt')).toBe(dict.about.imageAlt);
      expect(img!.getAttribute('loading')).toBe('eager');
      expect(img!.getAttribute('decoding')).toBe('async');
      expect(img!.getAttribute('fetchpriority')).toBe('high');

      const width = Number(img!.getAttribute('width'));
      const height = Number(img!.getAttribute('height'));
      expect(width).toBe(400);
      expect(height).toBe(600);
      expect(height / width).toBeCloseTo(1.5, 5);
    });
  });
}
