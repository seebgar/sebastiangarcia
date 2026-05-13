import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import Footer from "../src/components/Footer.astro";

describe("Footer", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders the current year in the copyright", async () => {
        vi.setSystemTime(new Date("2030-07-04T12:00:00Z"));
        const container = await AstroContainer.create();
        const html = await container.renderToString(Footer);
        const { document } = parseHTML(html);

        const strong = document.querySelector("footer strong");
        expect(strong?.textContent).toContain("2030");
        expect(strong?.textContent).toContain("Sebastian Garcia");
    });

    it("renders role and location lines", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Footer);
        const { document } = parseHTML(html);

        const paragraphs = [...document.querySelectorAll("footer p")].map(
            (p) => p.textContent?.trim(),
        );
        expect(paragraphs).toContain("Software Engineer");
        expect(paragraphs).toContain("Bogotá, Colombia");
    });
});
