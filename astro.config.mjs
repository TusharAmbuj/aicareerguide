// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import mdxPlugin from '@astrojs/mdx';

export default defineConfig({
  site: 'https://aicareerguide.xyz',
  integrations: [mdxPlugin(), sitemap({
    filter: (page) => !page.endsWith('/search/') && !page.endsWith('/404/'),
    namespaces: { news: false, xhtml: false, image: false, video: false },
  })],
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
