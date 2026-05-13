import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import Layout from "../src/layouts/Layout.astro";

describe("Layout", () => {
    it("renders the document shell with title and slot content", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Layout, {
            slots: { default: "<div id='slotted'>slotted content</div>" },
        });
        const { document } = parseHTML(html);

        expect(document.documentElement.getAttribute("lang")).toBe("en");
        expect(document.querySelector("title")?.textContent).toBe(
            "Sebastian Garcia",
        );
        expect(document.querySelector("#slotted")?.textContent).toBe(
            "slotted content",
        );
    });

    it("declares charset UTF-8 and a viewport meta", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Layout);
        const { document } = parseHTML(html);

        expect(document.querySelector("meta[charset]")?.getAttribute("charset"))
            .toMatch(/^utf-8$/i);
        expect(
            document.querySelector("meta[name='viewport']")?.getAttribute(
                "content",
            ),
        ).toContain("width=device-width");
    });

    it("sets a valid #-prefixed theme-color", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Layout);
        const { document } = parseHTML(html);

        const theme = document
            .querySelector("meta[name='theme-color']")
            ?.getAttribute("content");
        expect(theme).toMatch(/^#[0-9a-fA-F]{3,8}$/);
    });

    it("sets a Referrer-Policy meta", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Layout);
        const { document } = parseHTML(html);

        const referrer = document
            .querySelector("meta[name='referrer']")
            ?.getAttribute("content");
        expect(referrer).toBe("strict-origin-when-cross-origin");
    });

    it("sets a strict Content-Security-Policy meta", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Layout);
        const { document } = parseHTML(html);

        const csp = document
            .querySelector("meta[http-equiv='Content-Security-Policy']")
            ?.getAttribute("content");
        expect(csp).toBeTruthy();

        const directives = Object.fromEntries(
            csp!
                .split(";")
                .map((d) => d.trim())
                .filter(Boolean)
                .map((d) => {
                    const [name, ...rest] = d.split(/\s+/);
                    return [name, rest.join(" ")];
                }),
        );

        expect(directives["default-src"]).toBe("'self'");
        expect(directives["object-src"]).toBe("'none'");
        expect(directives["base-uri"]).toBe("'self'");
        expect(directives["frame-ancestors"]).toBe("'none'");
        expect(directives["script-src"]).toContain("'self'");
        expect(directives["script-src"]).not.toContain("'unsafe-eval'");
        expect(csp).toContain("upgrade-insecure-requests");
    });

    it("references icon and manifest assets from /", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Layout);
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
