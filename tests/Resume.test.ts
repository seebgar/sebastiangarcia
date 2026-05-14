import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, it, expect } from 'vitest';
import Resume from '../src/components/Resume.astro';
import { getDict, locales } from '../src/i18n';

for (const locale of locales) {
  describe(`Resume [${locale}]`, () => {
    const dict = getDict(locale);

    it('renders the Resume heading as h2 (subordinate to page h1)', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Resume, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const heading = document.querySelector('#resume');
      expect(heading?.tagName.toLowerCase()).toBe('h2');
      expect(heading?.textContent).toBe(dict.resume.title);
    });

    it('renders Certifications, Skills, then Education as the three top blocks of the resume grid', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Resume, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const resume = document.querySelector('section.resume');
      const blocks = [...(resume?.children ?? [])];
      expect(blocks.length).toBe(3);
      expect(blocks[0].classList.contains('resume__certifications')).toBe(true);
      expect(blocks[1].classList.contains('resume__skills')).toBe(true);
      expect(blocks[2].classList.contains('resume__education')).toBe(true);

      const certSubtitle = blocks[0].querySelector('.resume__txt__subtitle');
      expect(certSubtitle?.textContent).toBe(dict.resume.sections.certifications);
      const eduSubtitle = blocks[2].querySelector('.resume__txt__subtitle');
      expect(eduSubtitle?.textContent).toBe(dict.resume.sections.education);
    });

    it('renders one entry per certification, each with a title paragraph and a date/issuer paragraph', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Resume, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const certBlock = document.querySelector('.resume__certifications');
      const entries = certBlock?.querySelectorAll('.resume__entry');
      expect(entries?.length).toBe(dict.resume.certifications.length);

      const first = dict.resume.certifications[0];
      const firstEntry = entries?.[0];
      const title = firstEntry?.querySelector('.resume__txt__experience__company');
      expect(title?.textContent?.trim()).toBe(first.title);

      const meta = firstEntry?.querySelector('.resume__txt__period');
      expect(meta?.textContent).toContain(first.date);
      expect(meta?.textContent).toContain(first.issuer);
      expect(meta?.querySelector('br')).not.toBeNull();
    });

    it('renders verifiable certifications as external links and others as plain text', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Resume, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const certBlock = document.querySelector('.resume__certifications');
      const verifiable = dict.resume.certifications.filter((c) => c.verifyUrl);
      const links = [
        ...(certBlock?.querySelectorAll('a[target="_blank"]') ?? []),
      ] as HTMLAnchorElement[];
      expect(links.length).toBe(verifiable.length);
      for (const link of links) {
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
        expect(link.getAttribute('href')).toMatch(/^https:\/\//);
      }
      const hrefs = links.map((a) => a.getAttribute('href'));
      for (const cert of verifiable) {
        expect(hrefs).toContain(cert.verifyUrl);
      }
    });

    it('renders one entry per education item with school, period and degree in the meta line', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Resume, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const eduBlock = document.querySelector('.resume__education');
      const entries = eduBlock?.querySelectorAll('.resume__entry');
      expect(entries?.length).toBe(dict.resume.education.length);

      const first = dict.resume.education[0];
      const firstEntry = entries?.[0];
      const school = firstEntry?.querySelector('.resume__txt__experience__company');
      expect(school?.textContent?.trim()).toBe(first.school);
      const meta = firstEntry?.querySelector('.resume__txt__period');
      expect(meta?.textContent).toContain(first.period);
      expect(meta?.textContent).toContain(first.degree);
    });

    it('renders one skill card per dictionary category with localized alt text and lazy loading', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Resume, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const expectedCardCount = Object.keys(dict.resume.skills).length;

      const cards = document.querySelectorAll('.resume__skills__card');
      expect(cards.length).toBe(expectedCardCount);

      const icons = [
        ...document.querySelectorAll('img.resumen__skills__icon'),
      ] as HTMLImageElement[];
      expect(icons.length).toBe(expectedCardCount);

      const expectedAlts = [
        dict.resume.skills.backendApis.alt,
        dict.resume.skills.webMobile.alt,
        dict.resume.skills.cloudDevOpsTools.alt,
      ];
      for (let i = 0; i < icons.length; i++) {
        expect(icons[i].getAttribute('alt')).toBe(expectedAlts[i]);
        expect(icons[i].getAttribute('loading')).toBe('lazy');
        expect(icons[i].getAttribute('decoding')).toBe('async');
        expect(icons[i].getAttribute('width')).toBe('75');
        expect(icons[i].getAttribute('height')).toBe('75');
      }
    });

    it('renders all experience entries plus the additional experience block with its period', async () => {
      const container = await AstroContainer.create();
      const html = await container.renderToString(Resume, {
        props: { locale },
      });
      const { document } = parseHTML(html);

      const experienceSection = document.querySelector('.resume_experience');
      const subtitles = experienceSection?.querySelectorAll('.resume__txt__subtitle');
      expect(subtitles?.length).toBe(2);
      expect(subtitles?.[0].textContent).toBe(dict.resume.sections.experience);
      expect(subtitles?.[1].textContent).toBe(dict.resume.sections.additionalExperience);

      const separators = experienceSection?.querySelectorAll('hr');
      expect(separators?.length).toBe(dict.resume.experience.length - 1);

      const additionalPeriod = dict.resume.additionalExperience[0].period;
      expect(experienceSection?.textContent).toContain(additionalPeriod);
    });
  });
}
