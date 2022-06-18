import { expect, assert } from 'chai';
import Script from '../../../src/core/script/script';

describe('Script.listAll', () => {
  const script = new Script();

  it('should return all script', async () => {
    const scripts = await script.listAll();

    expect(scripts).to.be.an('array');
    assert.deepEqual(scripts, [{
      id: 'd354cede-3895-4dac-8a90-73d970b4617c',
      name: 'Test Script',
      code: 'console.log(\'Hey ! This script is a test ! :)\')',
    },
    ]);
  });
});
