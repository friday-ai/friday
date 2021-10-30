import { glob as Glob } from 'glob';
import powerOn from './common/common.power-on';
import powerOff from './common/common.power-off';
import { getState, setState } from './common/common.state';
import { KVArr } from '../../../utils/interfaces';

async function getLightFeatures() {
  const lightFolder = `${__dirname}/light/`;
  const lightFeatures: KVArr<Function> = {};
  lightFeatures.powerOn = powerOn;
  lightFeatures.powerOff = powerOff;

  Glob
    .sync('*.ts', { cwd: lightFolder })
    .map(async (filename) => {
      const feats = await import(lightFolder + filename);
      feats.map((property: string) => {
        if (property === 'default') {
          const funcName = feats[property].name;
          lightFeatures[funcName] = feats.default;
        } else {
          lightFeatures[property] = feats[property];
        }
      });
    });

  return lightFeatures;
}

async function getMediaFeatures() {
  const mediaFolder = `${__dirname}/media/`;
  const mediaFeatures: KVArr<Function> = {};
  mediaFeatures.powerOn = powerOn;
  mediaFeatures.powerOff = powerOff;
  mediaFeatures.getState = getState;
  mediaFeatures.setState = setState;

  Glob
    .sync('*.ts', { cwd: mediaFolder })
    .map(async (filename) => {
      const feats = await import(mediaFolder + filename);
      feats.map((property: string) => {
        if (property === 'default') {
          const funcName = feats[property].name;
          mediaFeatures[funcName] = feats.default;
        } else {
          mediaFeatures[property] = feats[property];
        }
      });
    });

  return mediaFeatures;
}

export {
  getLightFeatures,
  getMediaFeatures,
};
