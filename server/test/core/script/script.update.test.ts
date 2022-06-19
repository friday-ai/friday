import { assert, expect } from 'chai';
import Script from '../../../src/core/script/script';
import { NotFoundError } from '../../../src/utils/decorators/error';

let script: Script;

describe('Script.update', () => {
  before(async () => {
    script = global.FRIDAY.script;
  });

  it('should update a script', async () => {
    const updatedScript = await script.update('d354cede-3895-4dac-8a90-73d970b4617c', {
      name: 'Script update',
    });

    expect(updatedScript.name).to.equal('Script update');
  });

  it('should not found script to update', async () => {
    const promise = script.update('4783ca07-e03c-4bc7-ae7c-da51025f23cc', {});

    await assert.isRejected(promise, NotFoundError);
  });
});
