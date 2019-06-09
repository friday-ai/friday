module.exports = {
	setupFilesAfterEnv: [
    "<rootDir>/test/setup.ts",
    "jest-extended"
	  ],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json'
		}
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	testRegex: [
		"/test/.*test\\.(ts|tsx|js)$"
	],
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
	],
	testPathIgnorePatterns : ["<rootDir>/dist/", "<rootDir>/node_modules/"]
}
