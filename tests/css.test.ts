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

  it('declares scroll-behavior: smooth on the html element', () => {
    const htmlBody = blockFor('html');
    expect(htmlBody).not.toBeNull();
    expect(htmlBody).toMatch(/scroll-behavior:\s*smooth/);
  });

  it('declares the contact parallax inside the min-width: 768px breakpoint', () => {
    const mediaMatch = css.match(/@media\s*\(min-width:\s*768px\)\s*\{([\s\S]*?)\n\}/);
    expect(mediaMatch).not.toBeNull();
    const inside = mediaMatch![1];
    expect(inside).toMatch(/animation:\s*parallax/);
    expect(inside).toMatch(/animation-timeline:\s*view\(\)/);
  });

  it('does not declare the parallax animation on the base .contact__txt__section rule', () => {
    const body = blockFor('.contact__txt__section');
    expect(body).not.toBeNull();
    expect(body).not.toMatch(/animation:\s*parallax/);
  });

  it('does not gate motion behind prefers-reduced-motion', () => {
    expect(css).not.toMatch(/prefers-reduced-motion/);
  });

  it('allows long contact links to wrap so they fit narrow cards', () => {
    expect(css).toMatch(/\.contact__txt__subtitle a\s*\{[^}]*overflow-wrap:\s*anywhere/);
  });
});
