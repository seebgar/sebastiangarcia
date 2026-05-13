// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
    build: {
        inlineStylesheets: 'always',
    },
    compressHTML: true,
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'es', 'fr'],
        routing: {
            prefixDefaultLocale: false,
        },
    },
});
