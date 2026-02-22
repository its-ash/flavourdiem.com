import { defineConfig } from 'vite';
import viteStatic from 'vite-plugin-static';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    cors: true
  },
  plugins: [
    viteStatic({
      partials: {
        root: 'components',
        ext: '.html'
      }
    })
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: false,
    sourcemap: false,
    minify: 'terser'
  },
  preview: {
    port: 4173
  }
})
