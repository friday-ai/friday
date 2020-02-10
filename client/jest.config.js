export const globals = {
  'ts-jest': {
    tsConfig: 'tsconfig.json'
  }
};
export const transform = {
  "^.+\\.(ts|tsx)$": "<rootDir>/preprocessor.js"
};
export const testRegex = "/test/.*\\.(ts|tsx|js)$";
export const testURL = "http://localhost:8080";
export const moduleNameMapper = {
  "\\.(css|less|scss|sass|svg|png|jpg|jpeg|ttf|woff|woff2)$": "identity-obj-proxy",
  "^@app/(.*)$": "<rootDir>/src/$1",
  "^@components/(.*)$": "<rootDir>/src/components/$1",
  "^@styles/(.*)$": "<rootDir>/src/styles/$1",
  "^@public/(.*)$": "<rootDir>/public/$1",
  "^@assets/(.*)$": "<rootDir>/public/assets/$1"
};
export const moduleFileExtensions = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "node"
];
