import { expect } from 'chai';
import server from '../../../../utils/request';
import { DeviceType } from '../../../../../src/config/entities';

describe('GET /api/v1/device', () => {
  it('should return all devices', async () => {
    await server
      .get('/api/v1/device')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const devices = res.body as DeviceType[];
        expect(devices).to.be.an('array');
        devices.forEach((d) => {
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
        const devices = res.body as DeviceType[];
        expect(devices).to.be.an('array');
        devices.forEach((d) => {
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
          d.capabilities!.forEach((c) => {
            expect(c).to.contains.keys([
              'id',
              'defaultName',
              'name',
              'type',
              'deviceId',
              'roomId',
            ]);
          });
        });
      });
  });
});
