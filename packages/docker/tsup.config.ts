import type { Options } from 'tsup';
import { dependencies } from './package.json';

export const tsup: Options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  clean: true,
  dts: true,
  skipNodeModulesBundle: false,
  format: ['cjs', 'esm'],
  outDir: 'lib',
  external: ['cpu-features', 'ssh2'],
  noExternal: Object.keys(dependencies),
};
