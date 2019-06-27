import Plugin from '../../src/models/plugin';

const create = async () => {
  await Plugin.bulkCreate([
    {
      id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      name: 'Zwave',
      version: '1.2.0',
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
    },
    {
      id: '88b48273-15e6-4729-9199-0682677475f4',
      name: 'Xiaomi',
      version: '1.0.0',
      satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1'
    },
    {
      id: '3a6b4974-6159-4792-a327-c3656f8bb9af',
      name: 'Philips Hue',
      version: '1.5.0',
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
    }
  ]);
};

const destroy = async () => {
  Plugin.destroy({where: {}});
};

export {
  create,
  destroy
};
