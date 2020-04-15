import { expect, assert } from 'chai';
import Script from '../../../src/core/script';

describe('scipt.getById', () => {
  const script = new Script();

  it('should return script', async () => {
    const scriptRetruned = await script.getById('d354cede-3895-4dac-8a90-73d970b4617c');

    expect(scriptRetruned).to.be.an('object');
    assert.deepEqual(scriptRetruned, {
      id: 'd354cede-3895-4dac-8a90-73d970b4617c',
      name: 'Test Script',
      code: 'console.log(\'Hey ! This script is a test ! :)\')',
    });
  });
});
