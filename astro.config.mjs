// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdxPlugin from '@astrojs/mdx';

export default defineConfig({
  site: 'https://aicareerguide.xyz',
  integrations: [mdxPlugin(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
