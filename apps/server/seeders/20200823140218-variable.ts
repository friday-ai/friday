import { QueryInterface } from 'sequelize';
import { VariableOwner } from '@friday-ai/shared';
import { version as packageVersion } from '../package.json';

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('variable', [
      {
        id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
        key: 'test_key0',
        value: 'test_value0',
        owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        ownerType: VariableOwner.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8e8136c7-9c42-41b0-a37e-f4fb1ecacbea',
        key: 'test_key1',
        value: 'test_value1',
        owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        ownerType: VariableOwner.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cef551c0-dae7-46ce-b88a-50222a9b7a41',
        key: 'test_key2',
        value: 'test_value2',
        owner: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
        ownerType: VariableOwner.SATELLITE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'dc997324-27de-41f8-a273-093b2ae48fe0',
        key: 'test_key3',
        value: 'test_value3',
        owner: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
        ownerType: VariableOwner.PLUGIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
        key: 'friday_version',
        value: packageVersion,
        owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        ownerType: 'satellite',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7ef5f08-2bad-4489-95bf-b73fcf854d8f',
        key: 'system_units',
        value: 'metric',
        owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        ownerType: 'satellite',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a7ef5f08-2bad-4489-95bf-b73fcf694d8f',
        key: 'history_state_in_days',
        value: '30',
        owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        ownerType: 'satellite',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('variable', {}, {}),
};
