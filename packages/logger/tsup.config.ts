/* eslint-disable import/prefer-default-export */
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
  noExternal: Object.keys(dependencies),
};
