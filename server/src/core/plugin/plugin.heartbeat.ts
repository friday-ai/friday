import error, { NotFoundError } from '../../utils/errors/coreError';
import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';

export default async function heartbeat(id: string): Promise<PluginType> {
  try {
    const pluginToUpdate = await Plugin.findByPk(id);
    if (pluginToUpdate === null) {
      throw new NotFoundError({ name: 'Update a Plugin', message: 'Plugin not found', metadata: id });
    }
    pluginToUpdate.lastHeartbeat = new Date();
    pluginToUpdate.update(pluginToUpdate);
    const pluginToReturn = <PluginType>pluginToUpdate.get({ plain: true });
    return pluginToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
