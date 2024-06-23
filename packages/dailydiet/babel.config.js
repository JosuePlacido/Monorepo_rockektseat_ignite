module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./src"],
					alias: {
						"@components": "./src/components",
						"@routes": "./src/routes",
						"@screens": "./src/screens/",
						"@assets": "./src/assets",
						"@storage": "./src/storage",
						"@models": "./src/models",
						"@theme": "./src/theme"
					}
				}
			]
		]
	};
};
