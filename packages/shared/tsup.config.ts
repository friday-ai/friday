import type { Options } from 'tsup';

export const tsup: Options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  clean: true,
  dts: true,
  skipNodeModulesBundle: false,
  format: ['cjs', 'esm'],
  outDir: 'lib',
};
