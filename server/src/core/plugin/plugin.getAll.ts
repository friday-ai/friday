import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import error from '../../utils/errors/coreError';
import { GetOptions } from '../../utils/interfaces';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * Get all plugins.
 * @param {GetOptions} options - Options of the query.
 * @returns {Promise<PluginType[]>} Resolve with plugin array.
 * @example
 * ````
 * friday.plugin.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<PluginType[]> {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let plugins;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      plugins = await Plugin.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    } else {
      plugins = await Plugin.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    }

    const pluginsPlain = <PluginType[]>plugins.map((plugin) => {
      const pluginPlain = plugin.get({ plain: true });
      return pluginPlain;
    });

    return pluginsPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
