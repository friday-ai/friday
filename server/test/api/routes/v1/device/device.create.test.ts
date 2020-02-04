import { AvailableSubTypeOfDevice, AvailableTypeOfDevice } from '../../../../../src/utils/constants';
import TestServer from '../../../../utils/testServer';

describe('device.create', () => {

  it('should create a device', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/device')
      .send({
        id: '890ee886-5e5e-4510-93e5-0556ff5fbef3',
        name: 'Light 1',
        type: AvailableTypeOfDevice.LIGHT,
        subType: AvailableSubTypeOfDevice.LIGHT_RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: ''
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        let body = res.body;
        expect(body).toBeObject();
        expect(body).toContainAllKeys(
          ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId', 'updatedAt', 'createdAt']
        );
        expect(
          body.id === '890ee886-5e5e-4510-93e5-0556ff5fbef3' &&
          body.name === 'Light 1' &&
          body.type === AvailableTypeOfDevice.LIGHT &&
          body.subType === AvailableSubTypeOfDevice.LIGHT_RGB &&
          body.variable === '' &&
          body.unit === '' &&
          body.value === 'on' &&
          body.roomId === 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc' &&
          body.pluginId === ''
        ).toEqual(true);
      });

  });

  it('should not create a device with an existing name', async () => {

    const server = await new TestServer();

    await server
      .post('/api/v1/device')
      .send({
        id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
        name: 'Light 1',
        type: AvailableTypeOfDevice.LIGHT,
        subType: AvailableSubTypeOfDevice.LIGHT_RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: ''
      })
      .expect(409);
  });
});
