import { QueryInterface } from 'sequelize';

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('device_capability_state', [
      {
        id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        capabilityId: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
        value: 'ON',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '28500f8d-40d3-4b66-84e2-356fa93c997e',
        capabilityId: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
        value: 'OFF',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5e7383ed-4bef-471a-a96b-9277cab75c34',
        capabilityId: '2e6a90de-b05c-47ca-8895-59b23953531c',
        value: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8bb02e82-42fb-43e5-a66a-80a92937547e',
        capabilityId: '2e6a90de-b05c-47ca-8895-59b23953531c',
        value: '50',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '610522d7-7b24-4039-bca8-7e8ae3010129',
        capabilityId: '2e6a90de-b05c-47ca-8895-59b23953531c',
        value: '100',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3103daf1-f545-4d99-bcdd-758799ca4d96',
        capabilityId: 'd4b11be4-30fa-4bc4-9b65-482d5c63c0bc',
        value: 'ON',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2a5ba41e-1a52-4c0a-8c2a-83633cf0d55a',
        capabilityId: 'd4b11be4-30fa-4bc4-9b65-482d5c63c0bc',
        value: 'OFF',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('device_capability_state', {}, {}),
};
