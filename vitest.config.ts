/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
    test: {
        globals: false,
        environment: "node",
        include: ["tests/**/*.test.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            include: ["src/**/*.{astro,ts}"],
            exclude: ["src/**/*.d.ts"],
            thresholds: {
                statements: 100,
                branches: 100,
                functions: 100,
                lines: 100,
            },
        },
    },
});
