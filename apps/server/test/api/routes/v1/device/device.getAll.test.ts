import { DeviceAttributes } from '@friday/shared';
import { expect } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/device', () => {
  it('should return all devices', async () => {
    await server
      .get('/api/v1/device')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((d: DeviceAttributes) => {
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

  it('should return all devices with full scope', async () => {
    await server
      .get('/api/v1/device')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((d: DeviceAttributes) => {
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

          expect(d.capabilities).to.be.an('array');
          d.capabilities.forEach((c) => {
            expect(c).to.contains.keys(['id', 'defaultName', 'name', 'type', 'deviceId', 'roomId']);
          });
        });
      });
  });
});
