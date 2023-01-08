import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('house', [
    {
      id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
      name: 'Main House test',
      latitude: '34.0012295',
      longitude: '-118.8067245',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('house', {}, {}),
};
