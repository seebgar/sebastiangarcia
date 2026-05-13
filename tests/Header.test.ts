import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import Header from "../src/components/Header.astro";

describe("Header", () => {
    it("renders a primary nav with the three section anchors", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Header);
        const { document } = parseHTML(html);

        const nav = document.querySelector("nav");
        expect(nav?.getAttribute("aria-label")).toBe("Primary");

        const links = [
            ...document.querySelectorAll(".header__nav__list a"),
        ] as HTMLAnchorElement[];
        expect(links.map((a) => a.getAttribute("href"))).toEqual([
            "#about",
            "#resume",
            "#contact",
        ]);
        expect(links.map((a) => a.textContent?.trim())).toEqual([
            "About",
            "Resume",
            "Contact",
        ]);
    });

    it("uses internal anchor hrefs only (no external links)", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Header);
        const { document } = parseHTML(html);

        const links = [
            ...document.querySelectorAll("a"),
        ] as HTMLAnchorElement[];
        for (const a of links) {
            expect(a.getAttribute("href")).toMatch(/^#/);
            expect(a.getAttribute("target")).toBeNull();
        }
    });
});
