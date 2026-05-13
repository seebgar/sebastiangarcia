import { readFile, writeFile, rm } from "node:fs/promises";
import subsetFont from "subset-font";

const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) =>
        String.fromCodePoint(start + i),
    ).join("");

const LATIN_BASIC = range(0x0020, 0x007e);
const LATIN_1_SUPPLEMENT = range(0x00a0, 0x00ff);
const LATIN_EXTENDED_A = range(0x0100, 0x017f);
const GENERAL_PUNCTUATION = range(0x2000, 0x206f);
const CURRENCY = range(0x20a0, 0x20cf);
const TEXT = LATIN_BASIC + LATIN_1_SUPPLEMENT + LATIN_EXTENDED_A +
    GENERAL_PUNCTUATION + CURRENCY;

const targets = [
    {
        input: "public/fonts/Inter-VariableFont_opsz_wght.ttf",
        output: "public/fonts/Inter.woff2",
    },
    {
        input: "public/fonts/Inter-Italic-VariableFont_opsz_wght.ttf",
        output: "public/fonts/Inter-Italic.woff2",
    },
    {
        input: "public/fonts/NotoSansJP-VariableFont_wght.ttf",
        output: "public/fonts/NotoSansJP.woff2",
    },
];

for (const { input, output } of targets) {
    const buf = await readFile(input);
    const subset = await subsetFont(buf, TEXT, { targetFormat: "woff2" });
    await writeFile(output, subset);
    const ratio = ((1 - subset.length / buf.length) * 100).toFixed(1);
    console.log(
        `${input} -> ${output}: ${buf.length} -> ${subset.length} bytes (${ratio}% smaller)`,
    );
    await rm(input);
}
