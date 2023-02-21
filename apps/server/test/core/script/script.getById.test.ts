import { assert, expect } from 'chai';
import Script from '../../../src/core/script/script';
import { NotFoundError } from '../../../src/utils/decorators/error';

let script: Script;

describe('Script.getById', () => {
  before(async () => {
    script = global.FRIDAY.script;
  });

  it('should return script', async () => {
    const scriptReturned = await script.getById('d354cede-3895-4dac-8a90-73d970b4617c');

    expect(scriptReturned).to.be.an('object');
    expect(scriptReturned).to.contains.keys(['id', 'name', 'code']);
    expect(scriptReturned.id).to.equal('d354cede-3895-4dac-8a90-73d970b4617c');
  });

  it('should not found a script', async () => {
    const promise = script.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
