import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				'pixel-regular': ['jersey15', 'inter'],
				'pixel-tiny': ['tiny5', 'inter'],
			},
		}
	},

	plugins: []
} satisfies Config;
