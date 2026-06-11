import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://verto.pages.dev',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !page.includes('/topic/') || page.split('/topic/')[1]?.length > 0,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
