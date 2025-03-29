const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
	mode: "production",
	entry: {
		popup: "./src/popup.ts",
		content: "./src/content.ts",
		background: "./src/background.ts",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		// Copies HTML and CSS files to dist folder
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./src/popup.html", to: "popup.html" },
				{ from: "./src/styles.css", to: "styles.css" },
				{ from: "./src/manifest.json", to: "manifest.json" }, // Include the manifest file
				{ from: "./icon16.png", to: "icon16.png" }, // Copy icon if you have one
				{ from: "./icon48.png", to: "icon48.png" }, // Copy icon if you have one
				{ from: "./icon128.png", to: "icon128.png" }, // Copy icon if you have one
			],
		}),
	],
};
