import { QueryInterface } from 'sequelize';
import { AvailableState, StateOwner } from '../src/utils/constants';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('state', [
    {
      id: '17ea7282-507b-496b-b496-a6d8ce7fac17',
      owner: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'cc306435-eb0f-455c-b79d-a684b171e04d',
      owner: '2a017156-6e63-4c05-891f-0d6f372cb375',
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_CONNECTED,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4080f7b6-831c-47ad-b7a1-21ebcb6f2984',
      owner: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
      ownerType: StateOwner.HOUSE,
      value: AvailableState.HOUSE_NOT_EMPTY,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '1af6f5b9-c06b-4f8d-9f96-77ed20c27f75',
      owner: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      ownerType: StateOwner.PLUGIN,
      value: AvailableState.PLUGIN_INSTALLED,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '9027a374-978c-4874-9dcb-278138a4c125',
      owner: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      ownerType: StateOwner.ROOM,
      value: AvailableState.ROOM_EMTPY,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '63eb546c-ef81-4d76-99c0-4998a9c5a8c7',
      owner: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
      ownerType: StateOwner.SATELLITE,
      value: AvailableState.SATELLITE_CONNECTED,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('state', {}, {}),
};
