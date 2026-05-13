import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import About from "../src/components/About.astro";

describe("About", () => {
    it("renders title, subtitle and bio copy inside the #about section", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(About);
        const { document } = parseHTML(html);

        const section = document.querySelector("section.about");
        expect(section?.getAttribute("id")).toBe("about");

        expect(document.querySelector(".about__txt__title")?.textContent).toBe(
            "I'm Sebastian Garcia",
        );
        expect(
            document.querySelector(".about__txt__subtitle")?.textContent,
        ).toContain("Software engineer");
    });

    it("renders an LCP-prioritized image with non-empty alt and 2:3 aspect ratio", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(About);
        const { document } = parseHTML(html);

        const img = document.querySelector(
            ".about__image",
        ) as HTMLImageElement | null;
        expect(img).not.toBeNull();
        expect(img!.getAttribute("alt")).toBeTruthy();
        expect(img!.getAttribute("loading")).toBe("eager");
        expect(img!.getAttribute("decoding")).toBe("async");
        expect(img!.getAttribute("fetchpriority")).toBe("high");

        const width = Number(img!.getAttribute("width"));
        const height = Number(img!.getAttribute("height"));
        expect(width).toBe(400);
        expect(height).toBe(600);
        expect(height / width).toBeCloseTo(1.5, 5);
    });
});
