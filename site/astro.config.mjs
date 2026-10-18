import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL || 'https://localhost:4321',
  base: process.env.PUBLIC_BASE_PATH || '/',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/_catalogue')
    })
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
});
