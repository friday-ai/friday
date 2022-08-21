import { QueryInterface } from 'sequelize';
import { DevicesCapabilityType } from '../src/config/device';

module.exports = {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('device_capability', [
      {
        id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilityType.ONOFF,
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2e6a90de-b05c-47ca-8895-59b23953531c',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilityType.BRIGHTNESS,
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd4b11be4-30fa-4bc4-9b65-482d5c63c0bc',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilityType.ONOFF,
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '14541459-2672-4755-b57a-6c6955b47f17',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) =>
    queryInterface.bulkDelete('device_capability', {}, {}),
};
