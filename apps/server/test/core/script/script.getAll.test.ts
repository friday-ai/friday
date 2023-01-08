import { assert, expect } from 'chai';
import Script from '../../../src/core/script/script';

let script: Script;

describe('Script.listAll', () => {
  before(async () => {
    script = global.FRIDAY.script;
  });

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
