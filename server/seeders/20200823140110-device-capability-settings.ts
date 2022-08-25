import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('device_capability_settings', [
      {
        id: 'be5ad7ee-3988-402f-bd79-489ad4076e2a',
        capabilityId: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '28500f8d-40d3-4b66-84e2-356fa93c997e',
        capabilityId: '2e6a90de-b05c-47ca-8895-59b23953531c',
        settings: '{"min":0,"max":100,"step":1}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5e7383ed-4bef-471a-a96b-9277cab75c34',
        capabilityId: 'd4b11be4-30fa-4bc4-9b65-482d5c63c0bc',
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7cd0d44a-b750-4f3e-a4f6-46b2d6e2af98',
        capabilityId: '9da3f67d-37b9-498d-bc48-efb45c60591a',
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8837d35c-d643-49de-bf71-a51d0e504bef',
        capabilityId: 'c0afdcbd-7d11-479f-a946-57107504295c',
        settings: '{"min":0,"max":1,"step":1}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'bc6e71f9-96d3-4f04-af99-e27b6e8b4d2c',
        capabilityId: '2808a1f3-a6a1-407b-a936-db71d74b8a30',
        settings: '{"min":0,"max":6500,"unit":"Kelvin"}', // see https://reductionrevolution.com.au/blogs/how-to/colour-temperature
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5d82aa39-7a98-461d-9c57-90725ccfc3b3',
        capabilityId: 'b2250d79-4d9f-4b5f-a02c-3600950f8b94',
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) =>
    queryInterface.bulkDelete('device_capability_settings', {}, {}),
};
