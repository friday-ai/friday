import { assert, expect } from 'chai';
import Trigger from '../../../src/core/trigger/trigger';
import { AvailableConditions } from '../../../src/config/constants';
import { NotFoundError } from '../../../src/utils/decorators/error';

let trigger: Trigger;

describe('Trigger.getById', () => {
  before(async () => {
    trigger = global.FRIDAY.trigger;
  });

  it('should return a trigger', async () => {
    const triggerReturned = await trigger.getById('a0f02b72-73e0-4cfd-a049-5caaa0b80514');

    expect(triggerReturned).to.be.an('object');

    assert.deepEqual(triggerReturned, {
      id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
      name: 'Test',
      description: 'A trigger test',
      type: AvailableConditions.DEVICE_VALUE,
      rules: {
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23',
      },
    });
  });

  it('should return a trigger with full scope', async () => {
    const triggerReturned = await trigger.getById('a0f02b72-73e0-4cfd-a049-5caaa0b80514', 'full');

    expect(triggerReturned).to.be.an('object');
    assert.deepEqual(triggerReturned, {
      id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
      name: 'Test',
      description: 'A trigger test',
      type: AvailableConditions.DEVICE_VALUE,
      rules: {
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23',
      },
      scenes: [{
        id: '2452964a-a225-47dd-9b83-d88d57ed280e',
        name: 'Test scene',
        description: 'A scene for the tests ;) ',
        triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
      },
      ],
    });
  });

  it('should not found a trigger', async () => {
    const promise = trigger.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
