import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["legacy-js-api"],
                // Установка API на modern-compiler
                api: 'modern' // или "modern-compiler"
            }
        }
    }
});
