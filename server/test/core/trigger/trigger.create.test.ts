import { expect, assert } from 'chai';
import Trigger from '../../../src/core/trigger/trigger';
import { AvailableConditions } from '../../../src/config/constants';
import { DatabaseValidationError } from '../../../src/utils/decorators/error';

describe('Trigger.create', () => {
  const trigger = new Trigger();

  it('should create a trigger', async () => {
    const createdTrigger = await trigger.create({
      name: 'Test Trigger 2',
      description: 'A trigger for a test :)',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23',
      }),
    });

    expect(createdTrigger).to.have.property('id');
    expect(createdTrigger).to.have.property('name');
    expect(createdTrigger).to.have.property('description');
    expect(createdTrigger).to.have.property('type');
    expect(createdTrigger).to.have.property('rules');
  });

  it('should not create a trigger with an empty name', async () => {
    const promise = trigger.create({
      name: '',
      description: 'A trigger for a test :)',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23',
      }),
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
