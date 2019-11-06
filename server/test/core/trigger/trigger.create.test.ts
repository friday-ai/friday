import Trigger from '../../../src/core/trigger';
import { AvailableConditions } from '../../../src/utils/constants';
import { DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('trigger.create', () => {
  const trigger = new Trigger();

  it('should create a trigger', async () => {
    const createdTrigger = await trigger.create({
      id: '28c59bd7-a559-41bb-8b5e-a3670001a7bb',
      name: 'Test Trigger 2',
      description: 'A trigger for a test :)',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23'
      })
    });

    expect(createdTrigger).toHaveProperty('id');
    expect(createdTrigger).toHaveProperty('name');
    expect(createdTrigger).toHaveProperty('description');
    expect(createdTrigger).toHaveProperty('type');
    expect(createdTrigger).toHaveProperty('rules');
  });

  it('should not create a trigger with an empty name', async () => {

    await trigger.create({
      id: '8a1f51d3-b720-48c1-984a-4d188763396f',
      name: '',
      description: 'A trigger for a test :)',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23'
      })
    })
      .catch((err: Error) => {
         expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

});
