import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('plugin', [
    {
      id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      name: 'Zwave',
      version: '1.2.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastHeartbeat: new Date(2020, 3, 9),
    },
    {
      id: '88b48273-15e6-4729-9199-0682677475f4',
      name: 'Xiaomi',
      version: '1.0.0',
      url: 'fake url',
      enabled: true,
      satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastHeartbeat: new Date(1992, 4, 8),
    },
    {
      id: '3a6b4974-6159-4792-a327-c3656f8bb9af',
      name: 'Philips Hue',
      version: '1.5.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastHeartbeat: new Date(2000, 12, 25),
    },
  ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('plugin', {}, {}),
};
