module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'google',
		'plugin:@typescript-eslint/recommended',
		'eslint-config-prettier',
		'plugin:prettier/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['tsconfig.json', 'tsconfig.dev.json'],
		sourceType: 'module',
		tsconfigRootDir: __dirname
	},
	ignorePatterns: [
		'/lib/**/*' // Ignore built files.
	],
	plugins: ['@typescript-eslint', 'import', 'eslint-plugin-prettier'],
	rules: {
		'prettier/prettier': 'warn'
	}
};
