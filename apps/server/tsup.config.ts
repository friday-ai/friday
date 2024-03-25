/* eslint-disable import/prefer-default-export */
import type { Options } from 'tsup';
import { dependencies } from './package.json';

export const tsup: Options = {
  entryPoints: ['src/server.ts'],
  bundle: true,
  minify: true,
  clean: true,
  skipNodeModulesBundle: false,
  platform: 'node',
  noExternal: Object.keys(dependencies),
  external: ['pg-hstore', 'aws-sdk', 'nock', 'mock-aws-s3', 'cpu-features'],
};
