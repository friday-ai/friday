import { expect } from 'chai';
import { DeviceAttributes, VariableAttributes } from '@friday/shared';
import server from '../../../../utils/request';
import { admin, guest, habitant } from '../../../../utils/apiToken';

describe('GET /api/v1/plugin/:id', () => {
  it('should return a plugin', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'dockerId', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat']);
        expect(res.body.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
      });
  });

  it('should return a plugin with full scope', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
        expect(res.body).to.contains.keys([
          'id',
          'name',
          'dockerId',
          'version',
          'url',
          'enabled',
          'satelliteId',
          'lastHeartbeat',
          'satellite',
          'state',
          'devices',
          'variables',
        ]);

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

        expect(res.body.satellite).to.be.an('object');
        expect(res.body.satellite).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);

        expect(res.body.devices).to.be.an('array');
        res.body.devices?.forEach((d: DeviceAttributes) => {
          expect(d).to.be.an('object');
          expect(d).to.contains.keys([
            'id',
            'defaultName',
            'defaultManufacturer',
            'defaultModel',
            'name',
            'type',
            'manufacturer',
            'model',
            'pluginSelector',
            'viaDevice',
            'roomId',
            'pluginId',
          ]);
        });

        expect(res.body.variables).to.be.an('array');
        res.body.variables?.forEach((v: VariableAttributes) => {
          expect(v).to.be.an('object');
          expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
        });
      });
  });

  it('admin should have to read a plugin with full scope', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', admin)
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
        expect(res.body).to.contains.keys([
          'id',
          'name',
          'dockerId',
          'version',
          'url',
          'enabled',
          'satelliteId',
          'lastHeartbeat',
          'satellite',
          'state',
          'devices',
          'variables',
        ]);

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

        expect(res.body.satellite).to.be.an('object');
        expect(res.body.satellite).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);

        expect(res.body.devices).to.be.an('array');
        res.body.devices?.forEach((d: DeviceAttributes) => {
          expect(d).to.be.an('object');
          expect(d).to.contains.keys([
            'id',
            'defaultName',
            'defaultManufacturer',
            'defaultModel',
            'name',
            'type',
            'manufacturer',
            'model',
            'pluginSelector',
            'viaDevice',
            'roomId',
            'pluginId',
          ]);
        });

        expect(res.body.variables).to.be.an('array');
        res.body.variables?.forEach((v: VariableAttributes) => {
          expect(v).to.be.an('object');
          expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
        });
      });
  });

  it('habitant should have to read a plugin with full scope', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', habitant)
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
        expect(res.body).to.contains.keys([
          'id',
          'name',
          'dockerId',
          'version',
          'url',
          'enabled',
          'satelliteId',
          'lastHeartbeat',
          'satellite',
          'state',
          'devices',
          'variables',
        ]);

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

        expect(res.body.satellite).to.be.an('object');
        expect(res.body.satellite).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);

        expect(res.body.devices).to.be.an('array');
        res.body.devices?.forEach((d: DeviceAttributes) => {
          expect(d).to.be.an('object');
          expect(d).to.contains.keys([
            'id',
            'defaultName',
            'defaultManufacturer',
            'defaultModel',
            'name',
            'type',
            'manufacturer',
            'model',
            'pluginSelector',
            'viaDevice',
            'roomId',
            'pluginId',
          ]);
        });

        expect(res.body.variables).to.be.an('array');
        res.body.variables?.forEach((v: VariableAttributes) => {
          expect(v).to.be.an('object');
          expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
        });
      });
  });

  it("guest shouldn't have to read a plugin with full scope", async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', guest)
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(403);
  });

  it('should return a plugin with satellite', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'withSatellite' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
        expect(res.body).to.contains.keys(['id', 'name', 'dockerId', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat', 'satellite']);

        expect(res.body.satellite).to.be.an('object');
        expect(res.body.satellite).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
      });
  });

  it('should return a plugin with state', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
        expect(res.body).to.contains.keys(['id', 'name', 'dockerId', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat', 'state']);

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
      });
  });

  it('should return a plugin with devices', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'withDevices' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
        expect(res.body).to.contains.keys(['id', 'name', 'dockerId', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat', 'devices']);

        expect(res.body.devices).to.be.an('array');
        res.body.devices?.forEach((d: DeviceAttributes) => {
          expect(d).to.be.an('object');
          expect(d).to.contains.keys([
            'id',
            'defaultName',
            'defaultManufacturer',
            'defaultModel',
            'name',
            'type',
            'manufacturer',
            'model',
            'pluginSelector',
            'viaDevice',
            'roomId',
            'pluginId',
          ]);
        });
      });
  });

  it('should return a plugin with variables', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'withVariables' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
        expect(res.body).to.contains.keys(['id', 'name', 'dockerId', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat', 'variables']);

        expect(res.body.variables).to.be.an('array');
        res.body.variables?.forEach((v: VariableAttributes) => {
          expect(v).to.be.an('object');
          expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
        });
      });
  });
});
