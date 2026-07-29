import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'direct-dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/main.jsx',
      name: 'LinsSpace',
      formats: ['iife'],
      fileName: () => 'lin-space.js',
    },
  },
});
