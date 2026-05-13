import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import NotFound from "../src/pages/404.astro";

describe("404 page", () => {
    it("renders a single h1 with the 404 marker and a link home", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(NotFound);
        const { document } = parseHTML(html);

        const h1s = document.querySelectorAll("h1");
        expect(h1s.length).toBe(1);
        expect(h1s[0].textContent).toContain("404");

        const home = document.querySelector("a[href='/']");
        expect(home).not.toBeNull();
    });
});
