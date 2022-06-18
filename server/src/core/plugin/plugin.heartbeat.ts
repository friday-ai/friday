import { NotFoundError } from '../../utils/decorators/error';
import Plugin from '../../models/plugin';
import { PluginType } from '../../config/entities';

export default async function heartbeat(id: string): Promise<PluginType> {
  const pluginToUpdate = await Plugin.findByPk(id);
  if (pluginToUpdate === null) {
    throw new NotFoundError({ name: 'Update a Plugin', message: 'Plugin not found', metadata: id });
  }
  pluginToUpdate.lastHeartbeat = new Date();
  await pluginToUpdate.update(pluginToUpdate);

  return <PluginType>pluginToUpdate.get({ plain: true });
}
