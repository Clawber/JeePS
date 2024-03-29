import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	esbuild: {
		drop: ['console', 'debugger'],
	},
	build: {
		rollupOptions: {
			plugins: [
				{
					name: 'no-treeshake',
					transform(_, id) {
						if (id.includes('leaflet-polylinedecorator')) {
							return { moduleSideEffects: 'no-treeshake' }
						}
					}
				}
			]
		}
	}
});
