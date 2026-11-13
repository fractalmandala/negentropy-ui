import { sveltekit } from "@sveltejs/kit/vite"
import adapter from '@sveltejs/adapter-cloudflare';
import tailwindcss from "@tailwindcss/vite"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
		tailwindcss(), 
		sveltekit({
			alias: {
				'$lib': 'src/lib'
			},
			adapter: adapter({
				// See below for an explanation of these options
				config: undefined,
				platformProxy: {
					configPath: undefined,
					environment: undefined,
					persist: undefined
				},
				fallback: 'plaintext',
				routes: {
					include: ['/*'],
					exclude: ['<all>']
				}
			}),
			preprocess: vitePreprocess(),
		})
	],
})