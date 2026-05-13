import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import IndexPage from "../src/pages/index.astro";

describe("index page", () => {
    it("composes Header, About, Resume, Contact and Footer in order", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(IndexPage);
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
        const container = await AstroContainer.create();
        const html = await container.renderToString(IndexPage);
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
        const container = await AstroContainer.create();
        const html = await container.renderToString(IndexPage);
        const { document } = parseHTML(html);

        const wrappers = document.querySelectorAll("main .pre__section");
        expect(wrappers.length).toBe(3);
    });
});
