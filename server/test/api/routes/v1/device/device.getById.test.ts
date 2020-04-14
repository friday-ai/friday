import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/device/:id', () => {
  it('should return a device', async () => {

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
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

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
        expect(device).to.be.an('object');
        expect(device).to.have.all.keys(
          ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'room', 'plugin', 'state']
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

  it('should return a device with state', async () => {

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
        expect(device).to.be.an('object');
        expect(device).to.have.all.keys(
          ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'state']
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

  it('should return a device with room', async () => {

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({'scope' : 'withRoom'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
        expect(device).to.be.an('object');
        expect(device).to.have.all.keys(
          ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'room']
        );

        expect(device.room).to.be.an('object');
        expect(device.room).to.have.property('id');
        expect(device.room).to.have.property('name');
        expect(device.room).to.have.property('houseId');
      });
  });

  it('should return all Devices with plugin', async () => {

    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({'scope' : 'withPlugin'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
        expect(device).to.be.an('object');
        expect(device).to.have.all.keys(
          ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'plugin']
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
