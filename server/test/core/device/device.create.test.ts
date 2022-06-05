import { expect, assert } from 'chai';
import Device from '../../../src/core/device';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/errors/coreError';
import { DEVICE_SUBTYPE_LIST } from '../../../src/utils/device.constants';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';

describe('Device.create', () => {
  const event = new Event();
  const variable = new Variable();
  const state = new State(event, variable);
  const device = new Device(event, state);

  it('should create a device', async () => {
    const createdDevice = await device.create({
      id: '890ee886-5e5e-4510-93e5-0556ff5fbef3',
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
      id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
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
      id: '17a2725c-22f8-48d5-a9c0-47be11741ab7',
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
      id: '41ffa9b2-8c72-4867-8f04-04526f516eaf',
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
      id: '4610110a-f1a1-40c2-b357-cc7ac202900c',
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
      id: '5d88a89a-7e74-4ded-828e-7630019ca453',
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
      id: 'c7cb2fe9-b95c-4a30-9fec-603a6d7fc44b',
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
      id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
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
      id: 'b1fb1e55-030c-49f9-b7e1-80f1b4025c72',
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
