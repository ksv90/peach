import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
  },
  server: {
    port: 2001,
  },
  plugins: [react(), tsconfigPaths(), dts()],
});
