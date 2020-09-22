import { expect, assert } from 'chai';
import Script from '../../../src/core/script';

describe('Script.getById', () => {
  const script = new Script();

  it('should return script', async () => {
    const scriptReturned = await script.getById('d354cede-3895-4dac-8a90-73d970b4617c');

    expect(scriptReturned).to.be.an('object');
    assert.deepEqual(scriptReturned, {
      id: 'd354cede-3895-4dac-8a90-73d970b4617c',
      name: 'Test Script',
      code: 'console.log(\'Hey ! This script is a test ! :)\')',
    });
  });
});
