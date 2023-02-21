import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('room', [
      {
        id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        name: 'Bedroom',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6d619c11-5ff8-4489-93cf-348cf28c335b',
        name: 'Living room',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '406cd39b-eb55-433a-a36e-408c10869f58',
        name: 'Kitchen',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '007d89b5-452e-4b4c-83a2-e6526e09dbf3',
        name: 'Dining room',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('room', {}, {}),
};
