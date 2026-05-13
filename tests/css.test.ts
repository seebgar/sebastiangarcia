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

  it('gates smooth scroll and the contact parallax under prefers-reduced-motion: no-preference', () => {
    const mediaMatch = css.match(
      /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{([\s\S]*?)\n\}/,
    );
    expect(mediaMatch).not.toBeNull();
    const inside = mediaMatch![1];
    expect(inside).toMatch(/scroll-behavior:\s*smooth/);
    expect(inside).toMatch(/animation:\s*parallax/);
    expect(inside).toMatch(/animation-timeline:\s*view\(\)/);
  });

  it('does not declare scroll-behavior:smooth outside the reduced-motion gate', () => {
    const htmlBody = blockFor('html');
    expect(htmlBody).not.toBeNull();
    expect(htmlBody).not.toMatch(/scroll-behavior:\s*smooth/);
  });

  it('does not declare the parallax animation on the base .contact__txt__section rule', () => {
    const body = blockFor('.contact__txt__section');
    expect(body).not.toBeNull();
    expect(body).not.toMatch(/animation:\s*parallax/);
  });
});
