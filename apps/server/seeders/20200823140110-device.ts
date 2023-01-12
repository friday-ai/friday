import { QueryInterface } from 'sequelize';
import { DevicesTypes } from '@friday/shared';

export default {
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
        type: DevicesTypes.PHYSICAL,
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
        type: DevicesTypes.PHYSICAL,
        pluginSelector: 'LIGHT-10',
        viaDevice: '',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '440d1887-65c6-4f35-b179-cd58db2fc935',
        defaultName: 'Door sensor',
        defaultManufacturer: 'Xioami',
        defaultModel: 'Aqara',
        name: '',
        manufacturer: '',
        model: '',
        type: DevicesTypes.PHYSICAL,
        pluginSelector: 'SENSOR-10',
        viaDevice: '',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '88b48273-15e6-4729-9199-0682677475f4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '51d31033-08db-40b8-9eef-5c5cdb2a20d5',
        defaultName: 'Energy sensor',
        defaultManufacturer: 'SONOFF',
        defaultModel: 'Sensor',
        name: '',
        manufacturer: '',
        model: '',
        type: DevicesTypes.PHYSICAL,
        pluginSelector: 'SENSOR-20',
        viaDevice: '',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '88b48273-15e6-4729-9199-0682677475f4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '83a74e82-b8a5-4a76-9919-d64bc53d7995',
        defaultName: 'Motion sensor',
        defaultManufacturer: 'Netatmo',
        defaultModel: 'Sensor',
        name: '',
        manufacturer: '',
        model: '',
        type: DevicesTypes.PHYSICAL,
        pluginSelector: 'SENSOR-30',
        viaDevice: '',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '88b48273-15e6-4729-9199-0682677475f4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('device', {}, {}),
};
