import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import Layout from "../src/layouts/Layout.astro";
import { getDict, locales, localeHref } from "../src/i18n";

for (const locale of locales) {
    describe(`Layout [${locale}]`, () => {
        const dict = getDict(locale);

        it("renders the document shell with localized title and slot content", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
                slots: {
                    default: "<div id='slotted'>slotted content</div>",
                },
            });
            const { document } = parseHTML(html);

            expect(document.documentElement.getAttribute("lang")).toBe(locale);
            expect(document.querySelector("title")?.textContent).toBe(
                dict.meta.title,
            );
            expect(document.querySelector("#slotted")?.textContent).toBe(
                "slotted content",
            );
        });

        it("declares charset UTF-8, viewport, and a localized description", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            expect(
                document
                    .querySelector("meta[charset]")
                    ?.getAttribute("charset"),
            ).toMatch(/^utf-8$/i);
            expect(
                document
                    .querySelector("meta[name='viewport']")
                    ?.getAttribute("content"),
            ).toContain("width=device-width");
            expect(
                document
                    .querySelector("meta[name='description']")
                    ?.getAttribute("content"),
            ).toBe(dict.meta.description);
        });

        it("sets a valid #-prefixed theme-color", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const theme = document
                .querySelector("meta[name='theme-color']")
                ?.getAttribute("content");
            expect(theme).toMatch(/^#[0-9a-fA-F]{3,8}$/);
        });

        it("sets a Referrer-Policy meta", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const referrer = document
                .querySelector("meta[name='referrer']")
                ?.getAttribute("content");
            expect(referrer).toBe("strict-origin-when-cross-origin");
        });

        it("does not ship a Content-Security-Policy meta", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const csp = document.querySelector(
                "meta[http-equiv='Content-Security-Policy']",
            );
            expect(csp).toBeNull();
        });

        it("preloads the critical fonts with crossorigin", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const preloads = [
                ...document.querySelectorAll(
                    "link[rel='preload'][as='font']",
                ),
            ] as HTMLLinkElement[];

            const hrefs = preloads.map((l) => l.getAttribute("href"));
            expect(hrefs).toContain("/fonts/Inter.woff2");
            expect(hrefs).toContain("/fonts/NotoSansJP.woff2");

            for (const link of preloads) {
                expect(link.getAttribute("type")).toBe("font/woff2");
                expect(link.hasAttribute("crossorigin")).toBe(true);
            }
        });

        it("emits an absolute canonical and hreflang alternates for every locale", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const canonical = document
                .querySelector("link[rel='canonical']")
                ?.getAttribute("href");
            expect(canonical).toMatch(/^https:\/\//);
            expect(canonical?.endsWith(localeHref(locale))).toBe(true);

            const alternates = [
                ...document.querySelectorAll("link[rel='alternate']"),
            ] as HTMLLinkElement[];

            const hreflangs = alternates.map((l) => l.getAttribute("hreflang"));
            for (const loc of locales) {
                expect(hreflangs).toContain(loc);
            }
            expect(hreflangs).toContain("x-default");

            for (const loc of locales) {
                const alt = alternates.find(
                    (l) => l.getAttribute("hreflang") === loc,
                );
                expect(alt?.getAttribute("href")).toMatch(/^https:\/\//);
                expect(alt?.getAttribute("href")?.endsWith(localeHref(loc)))
                    .toBe(true);
            }
        });

        it("sets indexable robots directives", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const robots = document
                .querySelector("meta[name='robots']")
                ?.getAttribute("content");
            expect(robots).toContain("index");
            expect(robots).toContain("follow");
            expect(robots).toContain("max-image-preview:large");
        });

        it("emits Open Graph tags with absolute URLs and locale alternates", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const og = (property: string) =>
                document
                    .querySelector(`meta[property='${property}']`)
                    ?.getAttribute("content");

            expect(og("og:type")).toBe("website");
            expect(og("og:site_name")).toBe("Sebastian Garcia");
            expect(og("og:url")).toMatch(/^https:\/\//);
            expect(og("og:title")).toBe(dict.meta.title);
            expect(og("og:description")).toBe(dict.meta.description);
            expect(og("og:image")).toMatch(/^https:\/\/.+\.(jpg|jpeg|webp|png)/);
            expect(og("og:image:width")).toBe("1200");
            expect(og("og:image:height")).toBe("1200");
            expect(og("og:image:alt")).toBe(dict.about.imageAlt);
            expect(og("og:locale")).toMatch(/^[a-z]{2}_[A-Z]{2}$/);

            const alternates = [
                ...document.querySelectorAll(
                    "meta[property='og:locale:alternate']",
                ),
            ].map((m) => m.getAttribute("content"));
            expect(alternates.length).toBe(locales.length - 1);
        });

        it("emits Twitter Card tags", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const tw = (name: string) =>
                document
                    .querySelector(`meta[name='${name}']`)
                    ?.getAttribute("content");

            expect(tw("twitter:card")).toMatch(/^summary/);
            expect(tw("twitter:title")).toBe(dict.meta.title);
            expect(tw("twitter:description")).toBe(dict.meta.description);
            expect(tw("twitter:image")).toMatch(/^https:\/\//);
            expect(tw("twitter:image:alt")).toBe(dict.about.imageAlt);
        });

        it("references icon and manifest assets from /", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Layout, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const manifest = document
                .querySelector("link[rel='manifest']")
                ?.getAttribute("href");
            expect(manifest).toBe("/site.webmanifest");

            const apple = document
                .querySelector("link[rel='apple-touch-icon']")
                ?.getAttribute("href");
            expect(apple).toBe("/apple-touch-icon.png");

            const favicons = [
                ...document.querySelectorAll("link[rel='icon']"),
            ] as HTMLLinkElement[];
            expect(favicons.length).toBeGreaterThanOrEqual(2);
            for (const f of favicons) {
                expect(f.getAttribute("href")).toMatch(/^\//);
            }
        });
    });
}
