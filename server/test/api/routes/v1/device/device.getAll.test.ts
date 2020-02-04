import TestServer from '../../../../utils/testServer';
import DeviceType from '../../../../../src/core/device/device.interface';

describe('device.getAll', () => {

  it('should return all devices', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/device')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
            name: 'Light',
            type: 'light',
            subType: 'light_rgb',
            variable: '',
            unit: '',
            value: 'on',
            roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
            pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e'
          },
          {
            id: 'cc306435-eb0f-455c-b79d-a684b171e04d',
            name: 'Temperature',
            type: 'sensor',
            subType: 'sensor_temperature',
            variable: '',
            unit: '°C',
            value: '23',
            roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
            pluginId: '88b48273-15e6-4729-9199-0682677475f4'
          }
        ]);
      });

  });

  it('should return all devices with full scope', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/device')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let devices = res.body;
        expect(devices).toBeArray();
        devices.forEach((device: DeviceType) => {
          expect(device).toBeObject();
          expect(device).toContainAllKeys(
            ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'room', 'plugin', 'state']
          );
          if (device.state !== null) {
            expect(device.state).toBeObject();
            expect(device.state).toHaveProperty('id');
            expect(device.state).toHaveProperty('owner');
            expect(device.state).toHaveProperty('ownerType');
            expect(device.state).toHaveProperty('value');
          }

          expect(device.room).toBeObject();
          expect(device.room).toHaveProperty('id');
          expect(device.room).toHaveProperty('name');
          expect(device.room).toHaveProperty('houseId');

          if (device.plugin !== null) {
            expect(device.plugin).toBeObject();
            expect(device.plugin).toHaveProperty('id');
            expect(device.plugin).toHaveProperty('name');
            expect(device.plugin).toHaveProperty('version');
            expect(device.plugin).toHaveProperty('url');
            expect(device.plugin).toHaveProperty('enabled');
            expect(device.plugin).toHaveProperty('satelliteId');
          }
        });
    });
  });

  it('should return all devices with state', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/device')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let devices = res.body;
        expect(devices).toBeArray();
        devices.forEach((device: DeviceType) => {
          expect(device).toBeObject();
          expect(device).toContainAllKeys(
            ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'state']
          );
          if (device.state !== null) {
            expect(device.state).toBeObject();
            expect(device.state).toHaveProperty('id');
            expect(device.state).toHaveProperty('owner');
            expect(device.state).toHaveProperty('ownerType');
            expect(device.state).toHaveProperty('value');
          }
        });
      });
  });

  it('should return all Devices with room', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/device')
      .query({'scope' : 'withRoom'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let devices = res.body;
        expect(devices).toBeArray();
        devices.forEach((device: DeviceType) => {
          expect(device).toBeObject();
          expect(device).toContainAllKeys(
            ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'room']
          );

          expect(device.room).toBeObject();
          expect(device.room).toHaveProperty('id');
          expect(device.room).toHaveProperty('name');
          expect(device.room).toHaveProperty('houseId');
        });
      });
  });

  it('should return all Devices with plugin', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/device')
      .query({'scope' : 'withPlugin'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let devices = res.body;
        expect(devices).toBeArray();
        devices.forEach((device: DeviceType) => {
          expect(device).toBeObject();
          expect(device).toContainAllKeys(
            ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'plugin']
          );

          if (device.plugin !== null) {
            expect(device.plugin).toBeObject();
            expect(device.plugin).toHaveProperty('id');
            expect(device.plugin).toHaveProperty('name');
            expect(device.plugin).toHaveProperty('version');
            expect(device.plugin).toHaveProperty('url');
            expect(device.plugin).toHaveProperty('enabled');
            expect(device.plugin).toHaveProperty('satelliteId');
          }
        });
      });
  });

});
