import TestServer from '../../../../utils/testServer';

describe('device.getById', () => {
  it('should return a device', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
        expect(device).toBeObject();
        expect(device).toEqual(
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
          });
      });
  });

  it('should return a device with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
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

  it('should return a device with state', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
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

  it('should return a device with room', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({'scope' : 'withRoom'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
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

  it('should return all Devices with plugin', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({'scope' : 'withPlugin'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
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
