import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import Footer from '../src/components/Footer.astro';
import { getDict, locales } from '../src/i18n';

for (const locale of locales) {
  describe(`Footer [${locale}]`, () => {
    const dict = getDict(locale);

    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('renders the current year in the copyright', async () => {
      vi.setSystemTime(new Date('2030-07-04T12:00:00Z'));
      const container = await AstroContainer.create();
      const html = await container.renderToString(Footer, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const strong = document.querySelector('footer strong');
      expect(strong?.textContent).toContain('2030');
      expect(strong?.textContent).toContain('Sebastian Garcia');
    });

    it('renders role and location lines from the dictionary', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Footer, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const paragraphs = [...document.querySelectorAll('footer p')].map((p) =>
        p.textContent?.trim(),
      );
      expect(paragraphs).toContain(dict.footer.role);
      expect(paragraphs).toContain(dict.footer.location);
    });

    it('renders the language selector', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Footer, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const selector = document.querySelector('footer .footer__lang');
      expect(selector).not.toBeNull();
      const links = selector!.querySelectorAll('a');
      expect(links.length).toBe(locales.length);
    });
  });
}
