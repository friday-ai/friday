import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import { DEVICE_SUBTYPE_LIST } from '../../../../../src/utils/device.constants';

describe('POST /api/v1/device', () => {
  it('should create a device', async () => {
    const device = {
      id: '890ee886-5e5e-4510-93e5-0556ff5fbef3',
      name: 'Light 1',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    };

    await server
      .post('/api/v1/device')
      .send(device)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, device);
      });
  });

  it('should not create a device with an existing name', async () => {
    await server
      .post('/api/v1/device')
      .send({
        id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
        name: 'Light',
        type: 'LIGHT',
        subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      })
      .expect(409);
  });

  it('should not create a device with an empty name', async () => {
    await server
      .post('/api/v1/device')
      .send({
        id: 'd8294ca5-c2c4-4ab9-8f79-93f04d09fdf9',
        name: '',
        type: 'LIGHT',
        subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      })
      .expect(422);
  });

  it('should not create a device with an empty room', async () => {
    await server
      .post('/api/v1/device')
      .send({
        id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
        name: 'Light 3',
        type: 'LIGHT',
        subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: '',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      })
      .expect(422);
  });

  it('should not create a device with an empty plugin', async () => {
    await server
      .post('/api/v1/device')
      .send({
        id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
        name: 'Light 4',
        type: 'LIGHT',
        subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '',
      })
      .expect(422);
  });

  it('should not create a device with a wrong room', async () => {
    await server
      .post('/api/v1/device')
      .send({
        id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
        name: 'Light 5',
        type: 'LIGHT',
        subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'e2b6bfd9-60cf-40f7-beee-cc02afa25748',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      })
      .expect(422);
  });

  it('should not create a device with a wrong plugin', async () => {
    await server
      .post('/api/v1/device')
      .send({
        id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
        name: 'Light 6',
        type: 'LIGHT',
        subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '8d2257ac-da9d-496b-973c-2b5087af434d',
      })
      .expect(422);
  });

  it('should not create a device with a subtype not validate', async () => {
    await server
      .post('/api/v1/device')
      .send({
        id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
        name: 'Light 6',
        type: 'LIGHT',
        subType: DEVICE_SUBTYPE_LIST.SENSOR.TEMPERATURE,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '8d2257ac-da9d-496b-973c-2b5087af434d',
      })
      .expect(422);
  });

  it('should not create a device with a type not validate', async () => {
    await server
      .post('/api/v1/device')
      .send({
        id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
        name: 'Light 6',
        type: 'SENSORE',
        subType: DEVICE_SUBTYPE_LIST.SENSOR.TEMPERATURE,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '8d2257ac-da9d-496b-973c-2b5087af434d',
      })
      .expect(422);
  });
});
