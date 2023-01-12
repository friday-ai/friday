import { PluginAttributes } from '@friday/shared';
import { NotFoundError } from '../../utils/decorators/error';
import Plugin from '../../models/plugin';

export default async function heartbeat(id: string): Promise<PluginAttributes> {
  const pluginToUpdate = await Plugin.findByPk(id);
  if (pluginToUpdate === null) {
    throw new NotFoundError({ name: 'Update a Plugin', message: 'Plugin not found', metadata: id });
  }

  const pluginFind = pluginToUpdate.get({ plain: true });
  pluginFind.lastHeartbeat = new Date();
  await pluginToUpdate.update(pluginFind);

  return <PluginAttributes>pluginToUpdate.get({ plain: true });
}
