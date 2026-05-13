import eslintPluginAstro from 'eslint-plugin-astro';

export default [
	{
		ignores: ['dist/**', '.astro/**', 'node_modules/**', 'public/**'],
	},
	...eslintPluginAstro.configs.recommended,
	{
		files: ['**/*.astro'],
		rules: {
			'astro/no-conflict-set-directives': 'error',
			'astro/no-unused-define-vars-in-style': 'error',
			'astro/semi': ['error', 'always'],
		},
	},
];
