import Scene from '../../models/scene';
import SceneType from './scene.interface';
import { GetOptions } from '../../utils/constants';
import Log from '../../utils/log';

const logger = new Log();
const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

export default async function getAll(options?: GetOptions): Promise<SceneType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let scenes;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      scenes = await Scene.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      scenes = await Scene.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const scenesPlain = <SceneType[]>scenes.map((scene) => {
      const scenePlain = scene.get({ plain: true });
      return scenePlain;
    });

    return scenesPlain;
  } catch (e) {
    throw logger.error(e);
  }
}
