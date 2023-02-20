import { QueryInterface } from 'sequelize';
import { DevicesCapabilities } from '@friday-ai/shared';

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('device_capability', [
      {
        id: 'd39593a9-f54a-4823-8d6c-017be8f57eed',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilities.ONOFF,
        externalId: 'switch-onoff',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2e6a90de-b05c-47ca-8895-59b23953531c',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilities.BRIGHTNESS,
        externalId: 'switch-brightness',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd4b11be4-30fa-4bc4-9b65-482d5c63c0bc',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilities.ONOFF,
        externalId: 'switch-onoff',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '14541459-2672-4755-b57a-6c6955b47f17',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9da3f67d-37b9-498d-bc48-efb45c60591a',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilities.COLOR,
        externalId: 'switch-color',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c0afdcbd-7d11-479f-a946-57107504295c',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilities.COLDWARM,
        externalId: 'switch-cold-warm',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2808a1f3-a6a1-407b-a936-db71d74b8a30',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilities.COLORTEMP,
        externalId: 'switch-color-temp',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b2250d79-4d9f-4b5f-a02c-3600950f8b94',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilities.WHITE,
        externalId: 'switch-white',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fefff2d0-c37c-4b04-829d-6980af072ca5',
        defaultName: 'Switch',
        name: '',
        type: DevicesCapabilities.SATURATION,
        externalId: 'switch-saturation',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5ed78e9c-25ed-44cb-b769-6292f9090023',
        defaultName: 'Sensor',
        name: '',
        type: DevicesCapabilities.TEMPERATURE,
        externalId: 'sensor-temp',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '440d1887-65c6-4f35-b179-cd58db2fc935',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '969ae42a-7180-43ca-b234-e2111a206cd9',
        defaultName: 'Sensor',
        name: '',
        type: DevicesCapabilities.HUMIDITY,
        externalId: 'sensor-humidity',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '440d1887-65c6-4f35-b179-cd58db2fc935',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '8e90fc03-2487-4c96-bec0-f2c73c73168a',
        defaultName: 'Sensor',
        name: '',
        type: DevicesCapabilities.OPENCLOSE,
        externalId: 'sensor-openclose',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '440d1887-65c6-4f35-b179-cd58db2fc935',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6252b82d-5c45-48c1-8938-4f066a3c8028',
        defaultName: 'Sensor',
        name: '',
        type: DevicesCapabilities.POWER,
        externalId: 'sensor-power',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '51d31033-08db-40b8-9eef-5c5cdb2a20d5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fe0a0a04-986a-455d-94f0-b710c6944014',
        defaultName: 'Sensor',
        name: '',
        type: DevicesCapabilities.INTENSITY,
        externalId: 'sensor-intensity',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '51d31033-08db-40b8-9eef-5c5cdb2a20d5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e3b066ee-7974-4d92-9587-cd113f26c4f4',
        defaultName: 'Sensor',
        name: '',
        type: DevicesCapabilities.WATER,
        externalId: 'sensor-water',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '51d31033-08db-40b8-9eef-5c5cdb2a20d5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f7710371-928a-4b2e-8a27-b00de697fded',
        defaultName: 'Sensor',
        name: '',
        type: DevicesCapabilities.MOTION,
        externalId: 'sensor-motion',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '83a74e82-b8a5-4a76-9919-d64bc53d7995',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fe8d3c87-0927-49ce-a19b-bacd78754880',
        defaultName: 'Sensor',
        name: '',
        type: DevicesCapabilities.LUMINOSITY,
        externalId: 'sensor-luminosity',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        deviceId: '83a74e82-b8a5-4a76-9919-d64bc53d7995',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('device_capability', {}, {}),
};
