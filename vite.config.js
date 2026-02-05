import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'sites',
  publicDir: '../src/assets',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "../src/scss/utils/_variables" as *; @use "../src/scss/utils/_mixins" as *;`
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        'homepage': resolve(__dirname, 'sites/homepage-rebuild/index.html'),
        'features': resolve(__dirname, 'sites/features-rebuild/index.html'),
        'competitive': resolve(__dirname, 'sites/competitive-analysis/index.html'),
        'design-system': resolve(__dirname, 'sites/design-system/index.html'),
        'bonus': resolve(__dirname, 'sites/bonus-site/index.html')
      }
    },
    outDir: '../dist'
  },
  server: {
    port: 3000,
    open: true
  }
});
