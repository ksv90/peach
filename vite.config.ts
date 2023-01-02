import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	base: './',
	build: {
		watch: {},
		outDir: 'build',
	},
	server: {
		port: 2001,
	},
	plugins: [react()],
});
