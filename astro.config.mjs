import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://my.awkward.space',
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4321,
    host: true
  },
  devToolbar: {
    enabled: false
  },
});
