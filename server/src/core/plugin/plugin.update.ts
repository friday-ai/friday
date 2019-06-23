import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(plugin: PluginType): Promise<PluginType> {
  try {

    const pluginToUpdate = await Plugin.findByPk(plugin.id);

    if (pluginToUpdate === null) {
      throw logger.error('Plugin not found');
    }
    pluginToUpdate.update(Plugin);
    let pluginToReturn = <PluginType>pluginToUpdate.get({ plain: true });
    return pluginToReturn;

  } catch (e) {
    throw logger.error(e);
  }
}
