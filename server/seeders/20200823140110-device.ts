import { QueryInterface } from 'sequelize';
import { DevicesType } from '../src/config/device';

module.exports = {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('device', [
      {
        id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        defaultName: 'Dimmer',
        defaultManufacturer: 'Fibaro',
        defaultModel: 'Dimmer Switch',
        name: '',
        manufacturer: '',
        model: '',
        type: DevicesType.PHYSICAL,
        pluginSelector: 'LIGHT-10',
        viaDevice: '',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '14541459-2672-4755-b57a-6c6955b47f17',
        defaultName: 'Dimmer',
        defaultManufacturer: 'Fibaro',
        defaultModel: 'Dimmer Switch',
        name: '',
        manufacturer: '',
        model: '',
        type: DevicesType.PHYSICAL,
        pluginSelector: 'LIGHT-10',
        viaDevice: '',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) =>
    queryInterface.bulkDelete('device', {}, {}),
};
