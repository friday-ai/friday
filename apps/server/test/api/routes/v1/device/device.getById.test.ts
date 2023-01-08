import { expect } from 'chai';
import server from '../../../../utils/request';
import { DeviceType } from '../../../../../src/config/entities';

describe('GET /api/v1/device/:id', () => {
  it('should return a device', async () => {
    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const device = res.body as DeviceType;
        expect(device).to.be.an('object');
        expect(device).to.contains.keys([
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

  it('should return a device with full scope', async () => {
    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const device = res.body as DeviceType;
        expect(device).to.be.an('object');
        expect(device).to.contains.keys([
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

        expect(device.capabilities).to.be.an('array');
        device.capabilities!.forEach((c) => {
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

  it('should return a device with capabilities scope (with their settings)', async () => {
    await server
      .get('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .query({ scope: 'withCapabilities' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const device = res.body as DeviceType;
        expect(device).to.be.an('object');
        expect(device).to.contains.keys([
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
          'capabilities',
        ]);

        expect(device.capabilities).to.be.an('array');
        device.capabilities!.forEach((c) => {
          expect(c).to.contains.keys([
            'id',
            'defaultName',
            'name',
            'type',
            'deviceId',
            'roomId',
          ]);
          expect(c.settings).to.be.an('object');
        });
      });
  });
});
