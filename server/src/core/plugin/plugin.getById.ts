import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<PluginType> {
  try {

    let plugin;

    if (scope !== '' && scope !== null && scope !== undefined) {
      plugin = await Plugin.scope(scope).findByPk(id);
    } else {
      plugin = await Plugin.findByPk(id);
    }

    if (plugin === null) {
      throw logger.error('PLugin not found');
    }

    let pluginToReturn = <PluginType>plugin.get({ plain: true });

    return pluginToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
