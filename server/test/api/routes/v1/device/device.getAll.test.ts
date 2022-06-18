import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import { DeviceType } from '../../../../../src/config/entities';
import { DEVICE_SUBTYPE_LIST } from '../../../../../src/config/device';

describe('GET /api/v1/device', () => {
  it('should return all devices', async () => {
    await server
      .get('/api/v1/device')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        assert.deepEqual(res.body, [{
          id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
          name: 'Light',
          pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
          type: 'LIGHT',
          unit: '',
          value: 'on',
          variable: {},
        },
        {
          id: '28500f8d-40d3-4b66-84e2-356fa93c997e',
          name: 'Light:SIMPLE',
          pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.LIGHT.SIMPLE,
          type: 'LIGHT',
          unit: '',
          value: 'on',
          variable: {},
        },
        {
          id: '5e7383ed-4bef-471a-a96b-9277cab75c34',
          name: 'Device:without:type',
          pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: '',
          type: '',
          unit: '',
          value: 'on',
          variable: {},
        },
        {
          id: '8bb02e82-42fb-43e5-a66a-80a92937547e',
          name: 'Device:alarm:co2',
          pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.ALARM.CO2,
          type: 'ALARM',
          unit: '',
          value: 'on',
          variable: {},
        },
        {
          id: '610522d7-7b24-4039-bca8-7e8ae3010129',
          name: 'Device:cover:door',
          pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.COVER.DOOR,
          type: 'COVER',
          unit: '',
          value: 'on',
          variable: {},
        },
        {
          id: '3103daf1-f545-4d99-bcdd-758799ca4d96',
          name: 'Device:cover:garage',
          pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.COVER.GARAGE,
          type: 'COVER',
          unit: '',
          value: 'on',
          variable: {},
        },
        {
          id: '2a5ba41e-1a52-4c0a-8c2a-83633cf0d55a',
          name: 'Device:alarm:door',
          pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.ALARM.DOOR,
          type: 'ALARM',
          unit: '',
          value: 'on',
          variable: {},
        },
        {
          id: 'cc306435-eb0f-455c-b79d-a684b171e04d',
          name: 'Temperature',
          pluginId: '88b48273-15e6-4729-9199-0682677475f4',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.SENSOR.TEMPERATURE,
          type: 'SENSOR',
          unit: '°C',
          value: '23',
          variable: {},
        },
        {
          id: '4da9c716-de70-43f1-9279-2b088bb90c58',
          name: 'Temperature:mode',
          pluginId: '88b48273-15e6-4729-9199-0682677475f4',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.SENSOR.TEMPERATURE,
          type: 'SENSOR',
          unit: '',
          value: 'device.manual',
          variable: {},
        },
        {
          id: 'aa88e801-7631-4dab-9ecb-cfc2590dbb78',
          name: 'Camera:ip',
          pluginId: '88b48273-15e6-4729-9199-0682677475f4',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.CAMERA.IP,
          type: 'CAMERA',
          unit: '',
          value: '',
          variable: {},
        },
        {
          id: '3000d014-dc58-42a3-9b3d-374a2919cf18',
          name: 'Outlet:multiple',
          pluginId: '88b48273-15e6-4729-9199-0682677475f4',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.OUTLET.MULTIPLE,
          type: 'OUTLET',
          unit: '',
          value: '',
          variable: {},
        },
        {
          id: 'b651126b-078c-4e89-b843-b66fa4bd0231',
          name: 'Switch:push',
          pluginId: '88b48273-15e6-4729-9199-0682677475f4',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.SWITCH.PUSH,
          type: 'SWITCH',
          unit: '',
          value: '',
          variable: {},
        },
        {
          id: '9f9af769-3086-4e3f-a716-024618c56e01',
          name: 'Thermostat:temperature',
          pluginId: '88b48273-15e6-4729-9199-0682677475f4',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.THERMOSTAT.TEMPERATURE,
          type: 'THERMOSTAT',
          unit: '',
          value: '',
          variable: {},
        },
        {
          id: '9c338f0e-6397-4797-9f35-7cf90be6408a',
          name: 'Media:video',
          pluginId: '88b48273-15e6-4729-9199-0682677475f4',
          roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          subType: DEVICE_SUBTYPE_LIST.MEDIA.VIDEO,
          type: 'MEDIA',
          unit: '',
          value: '',
          variable: {},
        },
        ]);
      });
  });

  it('should return all devices with full scope', async () => {
    await server
      .get('/api/v1/device')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const devices = res.body;
        expect(devices).to.be.an('array');
        devices.forEach((device: DeviceType) => {
          expect(device).to.be.an('object');
          expect(device).to.contains.keys(
            ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'room', 'plugin', 'state'],
          );
          if (device.state !== null) {
            expect(device.state).to.be.an('object');
            expect(device.state).to.have.property('id');
            expect(device.state).to.have.property('owner');
            expect(device.state).to.have.property('ownerType');
            expect(device.state).to.have.property('value');
          }

          expect(device.room).to.be.an('object');
          expect(device.room).to.have.property('id');
          expect(device.room).to.have.property('name');
          expect(device.room).to.have.property('houseId');

          if (device.plugin !== null) {
            expect(device.plugin).to.be.an('object');
            expect(device.plugin).to.have.property('id');
            expect(device.plugin).to.have.property('name');
            expect(device.plugin).to.have.property('version');
            expect(device.plugin).to.have.property('url');
            expect(device.plugin).to.have.property('enabled');
            expect(device.plugin).to.have.property('satelliteId');
          }
        });
      });
  });

  it('should return all devices with state', async () => {
    await server
      .get('/api/v1/device')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const devices = res.body;
        expect(devices).to.be.an('array');
        devices.forEach((device: DeviceType) => {
          expect(device).to.be.an('object');
          expect(device).to.contains.keys(
            ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'state'],
          );
          if (device.state !== null) {
            expect(device.state).to.be.an('object');
            expect(device.state).to.have.property('id');
            expect(device.state).to.have.property('owner');
            expect(device.state).to.have.property('ownerType');
            expect(device.state).to.have.property('value');
          }
        });
      });
  });

  it('should return all Devices with room', async () => {
    await server
      .get('/api/v1/device')
      .query({ scope: 'withRoom' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const devices = res.body;
        expect(devices).to.be.an('array');
        devices.forEach((device: DeviceType) => {
          expect(device).to.be.an('object');
          expect(device).to.contains.keys(
            ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'room'],
          );

          expect(device.room).to.be.an('object');
          expect(device.room).to.have.property('id');
          expect(device.room).to.have.property('name');
          expect(device.room).to.have.property('houseId');
        });
      });
  });

  it('should return all Devices with plugin', async () => {
    await server
      .get('/api/v1/device')
      .query({ scope: 'withPlugin' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const devices = res.body;
        expect(devices).to.be.an('array');
        devices.forEach((device: DeviceType) => {
          expect(device).to.be.an('object');
          expect(device).to.contains.keys(
            ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'plugin'],
          );

          if (device.plugin !== null) {
            expect(device.plugin).to.be.an('object');
            expect(device.plugin).to.have.property('id');
            expect(device.plugin).to.have.property('name');
            expect(device.plugin).to.have.property('version');
            expect(device.plugin).to.have.property('url');
            expect(device.plugin).to.have.property('enabled');
            expect(device.plugin).to.have.property('satelliteId');
          }
        });
      });
  });
});
