import { QueryInterface } from 'sequelize';
import { DEVICE_SUBTYPE_LIST } from '../src/utils/device.constants';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('device', [
    {
      id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
      name: 'Light',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: JSON.stringify({}),
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cc306435-eb0f-455c-b79d-a684b171e04d',
      name: 'Temperature',
      type: 'SENSOR',
      subType: DEVICE_SUBTYPE_LIST.SENSOR.TEMPERATURE,
      variable: JSON.stringify({}),
      unit: '°C',
      value: '23',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '88b48273-15e6-4729-9199-0682677475f4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('device', {}, {}),
};
