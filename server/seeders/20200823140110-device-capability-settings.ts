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
    ]),

  down: (queryInterface: QueryInterface) =>
    queryInterface.bulkDelete('device_capability_settings', {}, {}),
};
