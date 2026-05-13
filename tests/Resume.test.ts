import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parseHTML } from "linkedom";
import { describe, it, expect } from "vitest";
import Resume from "../src/components/Resume.astro";
import { getDict, locales } from "../src/i18n";

for (const locale of locales) {
    describe(`Resume [${locale}]`, () => {
        const dict = getDict(locale);

        it("renders the Resume heading anchor target", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Resume, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const heading = document.querySelector("#resume");
            expect(heading?.tagName.toLowerCase()).toBe("h1");
            expect(heading?.textContent).toBe(dict.resume.title);
        });

        it("renders one entry per education item", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Resume, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const section = document.querySelector(".resume__txt__section");
            const companies = section?.querySelectorAll(
                ".resume__txt__experience__company",
            );
            expect(companies?.length).toBe(dict.resume.education.length);
            expect(companies?.[0].textContent?.trim()).toBe(
                dict.resume.education[0].school,
            );
        });

        it("renders three skill icons with localized alt text and lazy loading", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Resume, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const icons = [
                ...document.querySelectorAll("img.resumen__skills__icon"),
            ] as HTMLImageElement[];
            expect(icons.length).toBe(3);
            const expectedAlts = [
                dict.resume.skills.programmingLanguages.alt,
                dict.resume.skills.webMobile.alt,
                dict.resume.skills.cloudDevOps.alt,
            ];
            for (let i = 0; i < icons.length; i++) {
                expect(icons[i].getAttribute("alt")).toBe(expectedAlts[i]);
                expect(icons[i].getAttribute("loading")).toBe("lazy");
                expect(icons[i].getAttribute("decoding")).toBe("async");
                expect(icons[i].getAttribute("width")).toBe("75");
                expect(icons[i].getAttribute("height")).toBe("75");
            }
        });

        it("renders all experience entries plus the additional experience block", async () => {
            const container = await AstroContainer.create();
            const html = await container.renderToString(Resume, {
                props: { locale },
            });
            const { document } = parseHTML(html);

            const experienceSection =
                document.querySelector(".resume_experience");
            const subtitles = experienceSection?.querySelectorAll(
                ".resume__txt__subtitle",
            );
            expect(subtitles?.length).toBe(2);
            expect(subtitles?.[0].textContent).toBe(
                dict.resume.sections.experience,
            );
            expect(subtitles?.[1].textContent).toBe(
                dict.resume.sections.additionalExperience,
            );

            const separators = experienceSection?.querySelectorAll("hr");
            expect(separators?.length).toBe(dict.resume.experience.length - 1);
        });
    });
}
