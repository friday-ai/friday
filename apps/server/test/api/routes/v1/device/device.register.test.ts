import { DevicesCapabilities, DevicesTypes } from '@friday-ai/shared';
import { assert, expect } from 'chai';
import server from '../../../../utils/request';

const fakeDevice = {
  defaultName: 'Dimmer',
  defaultManufacturer: 'Fibaro',
  defaultModel: 'Dimmer Switch',
  type: DevicesTypes.PHYSICAL,
  externalId: 'LIGHT-105',
  pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
  capabilities: [
    {
      defaultName: 'Switch-105',
      type: DevicesCapabilities.ONOFF,
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
        expect(res.body).to.be.an('object');
        delete res.body.capabilities[0].id; // Delete id because is not know
        delete res.body.capabilities[0].deviceId; // Delete id because is not know
        assert.deepInclude(res.body, fakeDevice);
      });
  });

  it('should not register a device with a provided id', async () => {
    const newFakeDevice = { ...fakeDevice, id: '0a93526e-92d1-4e61-b8be-c4e8ab5924df' };
    await server
      .post('/api/v1/device')
      .send(newFakeDevice)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.not.equal(newFakeDevice.id);
        expect(res.body.defaultName).to.equal('Dimmer');
      });
  });

  it('should not register a device with empty plugin id', async () => {
    fakeDevice.pluginId = '';
    await server.post('/api/v1/device').send(fakeDevice).expect('Content-Type', /json/).expect(422);
  });

  it('should not register a device with wrong plugin id', async () => {
    fakeDevice.pluginId = 'wrong id';
    await server.post('/api/v1/device').send(fakeDevice).expect('Content-Type', /json/).expect(422);
  });
});
