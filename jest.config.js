module.exports = {
	preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
	moduleFileExtensions: ["js", "json", "vue"],
	transform: {
		".*\\.(vue)$": "vue-jest"
	}
};
