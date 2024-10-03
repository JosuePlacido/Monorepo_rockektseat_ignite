import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
	return dirname(require.resolve(join(value, 'package.json')));
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: ['../src/pages/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		getAbsolutePath('@storybook/addon-onboarding'),
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/addon-interactions'),
		getAbsolutePath('@storybook/addon-a11y')
	],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {}
	},
	viteFinal: (config, { configType }) => {
		if (configType === 'PRODUCTION') {
			config.output.publicPath =
				'/Monorepo_rockektseat_ignite/packages/ignite-call/packages/docs/storybook-static/';
			config.base = '/Monorepo_rockektseat_ignite/';
		}
		return config;
	}
};
export default config;
