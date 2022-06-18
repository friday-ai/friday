import { QueryInterface } from 'sequelize';
import { ActionsType } from '../src/config/constants';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('action', [
    {
      id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
      name: 'action1',
      description: 'action1 description',
      type: ActionsType.LIGHT_TURN_ON,
      subType: '',
      variableKey: 'action1 variable key',
      variableValue: 'action1 variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '0e7219cf-690d-4224-a29d-dcaf3642c569',
      name: 'action2',
      description: 'action2 description',
      type: ActionsType.NOTIFICATION_SEND,
      subType: '',
      variableKey: 'action2 variable key',
      variableValue: 'action2 variable value',
      sceneId: '2452964a-a225-47dd-9b83-d88d57ed280e',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('action', {}, {}),
};
