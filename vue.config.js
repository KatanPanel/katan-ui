const { ContextReplacementPlugin, IgnorePlugin } = require("webpack");

process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
	runtimeCompiler: true,
	pwa: {
		name: process.env.VUE_APP_NAME,
		manifestCrossorigin: "anonymous"
	},
	chainWebpack: (config) => {
		config.module
			.rule("vue")
			.use("vue-svg-inline-loader")
			.loader("vue-svg-inline-loader");

		const supportedLanguages = require("./src/supported-languages.json");
		config
			.plugin("context-replacement")
			.use(ContextReplacementPlugin, [
				/date-fns[/\\]/,
				new RegExp(
					`[/\\\\](${supportedLanguages
						.map((locale) => locale.tag)
						.join("|")})[/\\\\]index.js$`
				)
			]);

		config.plugin("ignore-plugin").use(IgnorePlugin, [/moment$/]);

		// temporary workaround for
		// "Uncaught TypeError: Cannot read properties of undefined (reading 'charAt')"
		config.optimization.minimize(false);
	},
	transpileDependencies: ["vuex-module-decorators"]
};
