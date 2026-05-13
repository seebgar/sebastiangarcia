import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, it, expect, beforeAll } from 'vitest';

const cssPath = fileURLToPath(new URL('../src/styles/global.css', import.meta.url));

let css = '';

beforeAll(async () => {
  css = await readFile(cssPath, 'utf8');
});

const blockFor = (selector: string) => {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^${escaped}\\s*\\{([^}]*)\\}`, 'ms');
  const match = css.match(re);
  return match ? match[1] : null;
};

const mediaBlock = (query: RegExp) => {
  const re = new RegExp(`@media\\s*\\(${query.source}\\)\\s*\\{([\\s\\S]*?\\n\\})`, 'm');
  const match = css.match(re);
  return match ? match[1] : null;
};

describe('global.css contract', () => {
  it('defines a .skip-link rule', () => {
    const body = blockFor('.skip-link');
    expect(body).not.toBeNull();
    expect(body).toMatch(/position:\s*absolute/);
    expect(body).toMatch(/top:\s*-?\d/);
  });

  it('defines the focus reveal for .skip-link', () => {
    expect(css).toMatch(/\.skip-link:focus[^{]*\{[^}]*top:\s*var\(/m);
  });

  it('declares scroll-behavior: smooth on the html element', () => {
    const htmlBody = blockFor('html');
    expect(htmlBody).not.toBeNull();
    expect(htmlBody).toMatch(/scroll-behavior:\s*smooth/);
  });

  it('sizes the contact background image by aspect-ratio, not viewport-height units', () => {
    const body = blockFor('.contact__bg');
    expect(body).not.toBeNull();
    expect(body).toMatch(/aspect-ratio:\s*\d/);
    expect(body).not.toMatch(/height:\s*\d+(s|d|l)?vh/);
  });

  it('places the contact background image and contact card in a shared grid cell', () => {
    expect(css).toMatch(/\.contact__bg\s*,\s*\.contact__card\s*\{[^}]*grid-area:\s*1\s*\/\s*1/);
  });

  it('does not size the contact section by viewport-height units', () => {
    const body = blockFor('.contact');
    expect(body).not.toBeNull();
    expect(body).not.toMatch(/min-height:\s*\d+(s|d|l)?vh/);
    expect(body).not.toMatch(/height:\s*\d+(s|d|l)?vh/);
  });

  it('declares three parallax keyframes with monotonically increasing range', () => {
    expect(css).toMatch(/@keyframes\s+parallax-sm\s*\{[\s\S]*?translateY\(15%\)/);
    expect(css).toMatch(/@keyframes\s+parallax-md\s*\{[\s\S]*?translateY\(30%\)/);
    expect(css).toMatch(/@keyframes\s+parallax-lg\s*\{[\s\S]*?translateY\(45%\)/);
  });

  it('runs the contact parallax at every breakpoint via animation-name overrides', () => {
    expect(css).toMatch(
      /\.contact__card\s*\{[^}]*animation-name:\s*parallax-sm[^}]*animation-timeline:\s*view\(\)/,
    );

    const md = mediaBlock(/min-width:\s*768px/);
    expect(md).not.toBeNull();
    expect(md!).toMatch(/\.contact__card[^{]*\{[^}]*animation-name:\s*parallax-md/);

    const lg = mediaBlock(/min-width:\s*1280px/);
    expect(lg).not.toBeNull();
    expect(lg!).toMatch(/\.contact__card[^{]*\{[^}]*animation-name:\s*parallax-lg/);
  });

  it('disables the contact parallax when prefers-reduced-motion is reduced', () => {
    const reduced = mediaBlock(/prefers-reduced-motion:\s*reduce/);
    expect(reduced).not.toBeNull();
    expect(reduced!).toMatch(/\.contact__card[^{]*\{[^}]*animation:\s*none/);
  });

  it('allows long contact links to wrap so they fit narrow cards', () => {
    expect(css).toMatch(/\.contact__card__links a\s*\{[^}]*overflow-wrap:\s*anywhere/);
  });
});
