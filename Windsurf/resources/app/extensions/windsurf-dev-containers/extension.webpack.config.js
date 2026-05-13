//@ts-check

import copyPlugin from 'copy-webpack-plugin';
import withDefaults from '../shared.webpack.config.mjs';

export default withDefaults({
	context: import.meta.dirname,
	entry: {
		extension: './src/extension.ts',
	},
	resolve: {
		mainFields: ['module', 'main'],
	},
	plugins: [
		new copyPlugin({
			patterns: [
				{
					from: 'node_modules/@devcontainers/cli/dist/spec-node/devContainersSpecCLI.js',
					to: '@devcontainers/cli/dist/spec-node/devContainersSpecCLI.js',
				},
				{
					from: 'node_modules/@devcontainers/cli/scripts',
					to: '@devcontainers/cli/scripts',
				},
			],
		}),
	],
});
