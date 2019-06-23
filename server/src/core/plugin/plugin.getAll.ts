import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import Log from '../../utils/log';
import { GetOptions } from '../../utils/constants';

const logger = new Log();
const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

export default async function getAll(options?: GetOptions): Promise<PluginType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let plugins;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      plugins = await Plugin.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      plugins = await Plugin.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const pluginsPlain = <PluginType[]>plugins.map((plugin) => {
      const pluginPlain = plugin.get({ plain: true });
      return pluginPlain;
    });

    return pluginsPlain;
  } catch (e) {
    throw logger.error(e);
  }
}
