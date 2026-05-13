import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import IndexPage from "../src/pages/index.astro";
import LangPage from "../src/pages/[lang]/index.astro";
import { defaultLocale, locales } from "../src/i18n";

const renderForLocale = async (locale: string) => {
    const container = await AstroContainer.create();
    if (locale === defaultLocale) {
        return container.renderToString(IndexPage);
    }
    return container.renderToString(LangPage, { params: { lang: locale } });
};

for (const locale of locales) {
    describe(`index page [${locale}]`, () => {
        it("composes Header, About, Resume, Contact and Footer", async () => {
            const html = await renderForLocale(locale);
            const { document } = parseHTML(html);

            expect(document.querySelector("#header")).not.toBeNull();
            expect(document.querySelector("#about")).not.toBeNull();
            expect(document.querySelector("#resume")).not.toBeNull();
            expect(document.querySelector("#contact")).not.toBeNull();
            expect(document.querySelector("footer.footer")).not.toBeNull();

            const main = document.querySelector("main");
            expect(main).not.toBeNull();
            expect(main!.querySelector("#about")).not.toBeNull();
            expect(main!.querySelector("#resume")).not.toBeNull();
            expect(main!.querySelector("#contact")).not.toBeNull();
        });

        it("emits unique IDs across the rendered document", async () => {
            const html = await renderForLocale(locale);
            const { document } = parseHTML(html);

            const ids = [...document.querySelectorAll("[id]")].map((el) =>
                el.getAttribute("id"),
            );
            const duplicates = ids.filter(
                (id, i) => id !== null && ids.indexOf(id) !== i,
            );
            expect(duplicates).toEqual([]);
        });

        it("wraps each top-level section in a .pre__section container", async () => {
            const html = await renderForLocale(locale);
            const { document } = parseHTML(html);

            const wrappers = document.querySelectorAll("main .pre__section");
            expect(wrappers.length).toBe(3);
        });

        it("renders exactly one h1 on the page", async () => {
            const html = await renderForLocale(locale);
            const { document } = parseHTML(html);

            const h1s = document.querySelectorAll("h1");
            expect(h1s.length).toBe(1);
        });

        it("uses the matching html lang attribute", async () => {
            const html = await renderForLocale(locale);
            const { document } = parseHTML(html);

            expect(document.documentElement.getAttribute("lang")).toBe(locale);
        });
    });
}
