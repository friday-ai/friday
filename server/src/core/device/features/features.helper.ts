import { glob as Glob } from 'glob';
import { KVArr } from '../../../utils/interfaces';

export default async function getFeatures(deviceType: string, featureTypeList: KVArr<string>): Promise<KVArr<Function>> {
  const featuresList: KVArr<Function> = {};

  return new Promise((resolve) => {
    Glob
      .sync(`@(${deviceType}|common)/*.ts`, { cwd: `${__dirname}/` })
      .map(async (filename) => {
        const feats = await import(`${__dirname}/${filename}`);
        Object.keys(feats)
          .map(async (property: string) => {
            const funcName = property === 'default' ? feats[property].name : property;
            const func = property === 'default' ? feats.default : feats[property];
            if (Object.values(featureTypeList).includes(funcName)) {
              featuresList[funcName] = func;
            }
          });
        resolve(featuresList);
      });
  });
}
