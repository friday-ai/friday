import { expect } from 'chai';
import Device from '../../../src/core/device/device';

let device: Device;

describe('Device.listAll', () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it('should return all devices', async () => {
    const devices = await device.listAll();

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
        'externalId',
        'viaDevice',
        'roomId',
        'pluginId',
      ]);
    });
  });

  it('should return all devices with full scope', async () => {
    const devices = await device.listAll({ scope: 'full' });

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
        'externalId',
        'viaDevice',
        'roomId',
        'pluginId',
      ]);

      expect(d.capabilities).to.be.an('array');
      d.capabilities.forEach((c) => {
        expect(c).to.contains.keys(['id', 'defaultName', 'name', 'type', 'externalId', 'deviceId', 'roomId']);
      });
    });
  });
});
