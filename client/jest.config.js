module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: 'tsconfig.json'
		}
	},
	transform: {
		"^.+\\.(ts|tsx)$": "<rootDir>/preprocessor.js"
	},
	testRegex: "/test/.*\\.(ts|tsx|js)$",
	testURL: "http://localhost:8080",
	moduleNameMapper: {
		"\\.(css|less|scss|sass|svg|png|jpg|jpeg|ttf|woff|woff2)$": "identity-obj-proxy",
		"^@app/(.*)$": "<rootDir>/src/$1",
		"^@components/(.*)$": "<rootDir>/src/components/$1",
		"^@styles/(.*)$": "<rootDir>/src/styles/$1",
		"^@public/(.*)$": "<rootDir>/public/$1",
		"^@assets/(.*)$": "<rootDir>/public/assets/$1"
	},
	moduleFileExtensions: [
		"ts",
		"tsx",
		"js",
		"jsx",
		"json",
		"node"
	]
}
