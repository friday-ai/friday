import { assert, expect } from 'chai';
import Plugin from '../../../src/core/plugin';
import { NotFoundError } from '../../../src/utils/errors/coreError';
import Event from '../../../src/utils/event';
import Variable from '../../../src/core/variable';
import State from '../../../src/core/state';
import Docker from '../../../src/core/docker';

describe('Plugin.update', () => {
  const event = Event;
  const variable = new Variable();
  const state = new State(event, variable);
  const docker = new Docker();
  const plugin = new Plugin('e2cz8cc-60a7-4c40-87d2-b25048b1aa04', docker, state);

  it('should update a plugin', async () => {
    await plugin.update('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', {
      name: 'dceb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14b5',
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
    });

    const updatedPlugin = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');

    expect(updatedPlugin.name).to.equal('dceb36579197d8c8e2cdd8c722a7d1f5659ec2bcc5e7b69732dd0798e98d14b5');
  });

  it('should not found plugin to update', async () => {
    const promise = plugin.update('580efda9-6fa1-4bef-865f-d4ef04ea57d6', {
      name: '14c39f7a-fdda-453b-ab0a-7c47d36b90f8',
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
