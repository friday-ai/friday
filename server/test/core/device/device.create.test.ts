import { assert, expect } from 'chai';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/decorators/error';
import { DEVICE_SUBTYPE_LIST } from '../../../src/config/device';
import Device from '../../../src/core/device/device';

let device: Device;

describe('Device.create', () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it('should create a device', async () => {
    const createdDevice = await device.create({
      name: 'Light 1',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    });

    expect(createdDevice).to.have.property('id');
    expect(createdDevice).to.have.property('name');
    expect(createdDevice).to.have.property('type');
    expect(createdDevice).to.have.property('subType');
    expect(createdDevice).to.have.property('variable');
    expect(createdDevice).to.have.property('unit');
    expect(createdDevice).to.have.property('value');
    expect(createdDevice).to.have.property('roomId');
    expect(createdDevice).to.have.property('pluginId');
  });

  it('should not create a device with an existing name', async () => {
    const promise = device.create({
      name: 'Light',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create a device with a empty name', async () => {
    const promise = device.create({
      name: '',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a device with a empty room', async () => {
    const promise = device.create({
      name: 'Light 1',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: '',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a device with a empty plugin', async () => {
    const promise = device.create({
      name: 'Light 1',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a device with a wrong room', async () => {
    const promise = device.create({
      name: 'Light 1',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: '34db8173-101f-4309-945e-0c273004e171',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a device with a wrong plugin', async () => {
    const promise = device.create({
      name: 'Light 1',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: 'e9c6b375-071a-4ff6-8c3b-cd813f01cfcb',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a device with a subtype not validate', async () => {
    const promise = device.create({
      name: 'Light',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.SENSOR.TEMPERATURE,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a device with a type not validate', async () => {
    const promise = device.create({
      name: 'Light',
      type: 'LIGHTE',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.DIMMABLE,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
