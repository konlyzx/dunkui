import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	esbuild: {
		jsx: 'automatic'
	},
	optimizeDeps: {
		include: [
			'face-api.js',
			'postprocessing',
			'three',
			'@react-three/fiber',
			'@react-three/drei'
		]
	}
});
