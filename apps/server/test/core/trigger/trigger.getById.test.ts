import { assert, expect } from 'chai';
import { SceneAttributes } from '@friday/shared';
import Trigger from '../../../src/core/trigger/trigger';
import { NotFoundError } from '../../../src/utils/decorators/error';

let trigger: Trigger;

describe('Trigger.getById', () => {
  before(async () => {
    trigger = global.FRIDAY.trigger;
  });

  it('should return a trigger', async () => {
    const triggerReturned = await trigger.getById('a0f02b72-73e0-4cfd-a049-5caaa0b80514');

    expect(triggerReturned).to.be.an('object');
    expect(triggerReturned).to.contains.keys(['id', 'name', 'description', 'type', 'rules']);
    expect(triggerReturned.id).to.equal('a0f02b72-73e0-4cfd-a049-5caaa0b80514');
  });

  it('should return a trigger with full scope', async () => {
    const triggerReturned = await trigger.getById('a0f02b72-73e0-4cfd-a049-5caaa0b80514', 'full');

    expect(triggerReturned).to.be.an('object');
    expect(triggerReturned).to.contains.keys(['id', 'name', 'description', 'type', 'rules']);
    expect(triggerReturned.id).to.equal('a0f02b72-73e0-4cfd-a049-5caaa0b80514');

    expect(triggerReturned.scenes).to.be.an('array');
    triggerReturned.scenes.forEach((s: SceneAttributes) => {
      expect(s).to.contains.keys(['id', 'name', 'description', 'triggerId']);
    });
  });

  it('should not found a trigger', async () => {
    const promise = trigger.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
