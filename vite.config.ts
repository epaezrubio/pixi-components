import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/main.ts'),
      name: 'pixi-components',
      formats: ['cjs', 'es', 'umd'],
    },
    sourcemap: true,
    rollupOptions: {
      external: ['pixi.js'],
    },
  },
  plugins: [],
});
