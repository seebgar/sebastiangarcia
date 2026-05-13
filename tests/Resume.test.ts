import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import Resume from "../src/components/Resume.astro";

describe("Resume", () => {
    it("renders the Resume heading anchor target", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Resume);
        const { document } = parseHTML(html);

        const heading = document.querySelector("#resume");
        expect(heading?.tagName.toLowerCase()).toBe("h1");
        expect(heading?.textContent).toBe("Resume.");
    });

    it("renders three education entries", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Resume);
        const { document } = parseHTML(html);

        const section = document.querySelector(".resume__txt__section");
        const companies = section?.querySelectorAll(
            ".resume__txt__experience__company",
        );
        expect(companies?.length).toBe(3);
        expect(companies?.[0].textContent?.trim()).toBe(
            "University of the Andes",
        );
    });

    it("renders three skill icons with non-empty alt text and lazy loading", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Resume);
        const { document } = parseHTML(html);

        const icons = [
            ...document.querySelectorAll("img.resumen__skills__icon"),
        ] as HTMLImageElement[];
        expect(icons.length).toBe(3);
        for (const icon of icons) {
            expect(icon.getAttribute("alt")).toBeTruthy();
            expect(icon.getAttribute("loading")).toBe("lazy");
            expect(icon.getAttribute("decoding")).toBe("async");
            expect(icon.getAttribute("width")).toBe("75");
            expect(icon.getAttribute("height")).toBe("75");
        }
    });

    it("renders three primary experience entries and the additional experience block", async () => {
        const container = await AstroContainer.create();
        const html = await container.renderToString(Resume);
        const { document } = parseHTML(html);

        const experienceSection = document.querySelector(".resume_experience");
        const subtitles = experienceSection?.querySelectorAll(
            ".resume__txt__subtitle",
        );
        expect(subtitles?.length).toBe(2);
        expect(subtitles?.[0].textContent).toBe("Experience");
        expect(subtitles?.[1].textContent).toBe("Additional Experience");

        const separators = experienceSection?.querySelectorAll("hr");
        expect(separators?.length).toBe(2);
    });
});
