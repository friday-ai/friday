import SatelliteClass from './satellite';

/**
 * Stop all plugins of satellite.
 * @param {String} id - Id of satellite.
 * @returns {Promise<boolean>}
 * @example
 * ````
 * friday.satellite.stopAllPlugins('833e9fe3-f753-4b2e-8949-ca4684e4f886');
 * ````
 */
export default async function stopAllPlugins(this: SatelliteClass, id: string): Promise<boolean[]> {
  const satellite = await this.getById(id, 'withPlugins');

  const result = satellite.plugins.map((plugin) => {
    return this.plugin.stop(plugin.id);
  });

  return Promise.all(result);
}
