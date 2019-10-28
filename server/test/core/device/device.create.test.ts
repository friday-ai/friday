import { Device } from '../../../src/core/friday';
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice} from '../../../src/utils/constants';
import { DatabaseUniqueConstraintError } from '../../../src/utils/error';

describe('device.create', () => {
  const device = new Device();

  it('should create a device', async () => {
    const createdDevice = await device.create({
      id: '890ee886-5e5e-4510-93e5-0556ff5fbef3',
      name: 'Light 1',
      type: AvailableTypeOfDevice.LIGHT,
      subType: AvailableSubTypeOfDevice.LIGHT_RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: ''
    });

    expect(createdDevice).toHaveProperty('id');
    expect(createdDevice).toHaveProperty('name');
    expect(createdDevice).toHaveProperty('type');
    expect(createdDevice).toHaveProperty('subType');
    expect(createdDevice).toHaveProperty('variable');
    expect(createdDevice).toHaveProperty('unit');
    expect(createdDevice).toHaveProperty('value');
    expect(createdDevice).toHaveProperty('roomId');
    expect(createdDevice).toHaveProperty('pluginId');
  });

  it('should not create a device with an existing name', async () => {

    await device.create({
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
      .catch((err) => {
         expect(err).toBeInstanceOf(DatabaseUniqueConstraintError);
      });
  });

});
