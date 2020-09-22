import { QueryInterface } from 'sequelize';
import { AvailableConditions } from '../src/utils/constants';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('trigger', [
    {
      id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
      name: 'Test',
      description: 'A trigger test',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23',
      }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('trigger', {}, {}),
};
