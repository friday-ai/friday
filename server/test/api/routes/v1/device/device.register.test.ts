import { expect } from 'chai';
import server from '../../../../utils/request';
import { DeviceType } from '../../../../../src/config/entities';
import {
  DeviceRegisterType,
  DevicesCapabilityType,
  DevicesType,
} from '../../../../../src/config/device';

const fakeDevice: DeviceRegisterType = {
  defaultName: 'Dimmer',
  defaultManufacturer: 'Fibaro',
  defaultModel: 'Dimmer Switch',
  type: DevicesType.PHYSICAL,
  pluginSelector: 'LIGHT-105',
  pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
  capabilities: [
    {
      defaultName: 'Switch-105',
      type: DevicesCapabilityType.ONOFF,
      settings: null,
    },
  ],
};

describe('POST /api/v1/device', () => {
  it('should return registered device', async () => {
    await server
      .post('/api/v1/device')
      .send(fakeDevice)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        const newDevice = res.body as DeviceType;

        expect(newDevice).to.be.an('object');
        expect(newDevice.pluginSelector).to.equal('LIGHT-105');
        expect(newDevice).to.contains.keys( ['capabilities']);
        expect(newDevice.capabilities).to.be.an('array');
        expect(newDevice.capabilities?.length).to.equal(1);
      });
  });

  it('should not register a device with empty plugin id', async () => {
    fakeDevice.pluginId = '';
    await server
      .post('/api/v1/device')
      .send(fakeDevice)
      .expect('Content-Type', /json/)
      .expect(422);
  });

  it('should not register a device with wrong plugin id', async () => {
    fakeDevice.pluginId = 'wrong id';
    await server
      .post('/api/v1/device')
      .send(fakeDevice)
      .expect('Content-Type', /json/)
      .expect(422);
  });
});
