import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	test: {
		expect: { requireAssertions: true },
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest-setup-client.ts'],
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['src/lib/server/**']
	}
});
