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
      {
        id: 'aedd9623-2312-4e2f-bb8b-40d8cb2a9c73',
        capabilityId: 'fefff2d0-c37c-4b04-829d-6980af072ca5',
        settings: '{"min":15,"max":45}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'a5941192-7ba5-4174-816f-4eb536ae07db',
        capabilityId: '5ed78e9c-25ed-44cb-b769-6292f9090023',
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '969ae42a-7180-43ca-b234-e2111a206cd9',
        capabilityId: '5ed78e9c-25ed-44cb-b769-6292f9090023',
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3a4ce479-e26d-4df5-8239-714840bc982e',
        capabilityId: '8e90fc03-2487-4c96-bec0-f2c73c73168a',
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '483fbd6c-3a19-4a62-9461-b51b2494136b',
        capabilityId: '6252b82d-5c45-48c1-8938-4f066a3c8028',
        settings: '{"unit":"W"}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '602e1b9b-35a2-4e78-a254-06bd261da503',
        capabilityId: 'fe0a0a04-986a-455d-94f0-b710c6944014',
        settings: '{"unit":"mA"}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '51bc2b86-a26c-4a47-8afa-780120f03644',
        capabilityId: 'e3b066ee-7974-4d92-9587-cd113f26c4f4',
        settings: '{"unit":"m3"}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2137c8fa-01c3-4ac7-9e78-ecc943e621cf',
        capabilityId: 'f7710371-928a-4b2e-8a27-b00de697fded',
        settings: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '23b28d51-09f1-4ad0-9907-6a99538ecefb',
        capabilityId: 'fe8d3c87-0927-49ce-a19b-bacd78754880',
        settings: '{"unit":"lux"}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) =>
    queryInterface.bulkDelete('device_capability_settings', {}, {}),
};
