import { glob as Glob } from 'glob';
import { KVArr } from '../../../utils/interfaces';
import DeviceType from '../device.interface';

export default async function getFeatures(device: DeviceType, featureTypeList: KVArr<string>): Promise<KVArr<Function>> {
  const featuresList: KVArr<Function> = {};

  return new Promise((resolve) => {
    Glob
      .sync(`${__dirname}/@(${device.type}|common)/*.ts`)
      .map(async (filename) => {
        const feats = await import(filename);
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
