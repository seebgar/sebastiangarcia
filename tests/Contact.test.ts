import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import Contact from "../src/components/Contact.astro";

describe("Contact", () => {
    it("renders the #contact section heading", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Contact);
        const { document } = parseHTML(html);

        const section = document.querySelector("section.contact");
        expect(section?.getAttribute("id")).toBe("contact");
        expect(
            document.querySelector(".contact__txt__title")?.textContent,
        ).toBe("Contact");
    });

    it("renders a mailto link whose href matches its visible text", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Contact);
        const { document } = parseHTML(html);

        const mail = document.querySelector(
            "a[href^='mailto:']",
        ) as HTMLAnchorElement | null;
        expect(mail).not.toBeNull();

        const href = mail!.getAttribute("href")!;
        const visible = mail!.textContent!.trim();
        expect(href).toBe(`mailto:${visible}`);
        expect(visible).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    });

    it("opens external links safely with rel='noopener noreferrer'", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Contact);
        const { document } = parseHTML(html);

        const external = [
            ...document.querySelectorAll("a[target='_blank']"),
        ] as HTMLAnchorElement[];
        expect(external.length).toBeGreaterThan(0);

        for (const a of external) {
            const rel = (a.getAttribute("rel") ?? "")
                .toLowerCase()
                .split(/\s+/);
            expect(rel).toContain("noopener");
            expect(rel).toContain("noreferrer");
            expect(a.getAttribute("href")).toMatch(/^https:\/\//);
        }
    });

    it("renders the background image with non-empty alt", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Contact);
        const { document } = parseHTML(html);

        const img = document.querySelector(
            "img.contact__image",
        ) as HTMLImageElement | null;
        expect(img).not.toBeNull();
        expect(img!.getAttribute("alt")).toBeTruthy();
        expect(img!.getAttribute("loading")).toBe("lazy");
        expect(img!.getAttribute("decoding")).toBe("async");
    });
});
