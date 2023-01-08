import { assert, expect } from 'chai';
import Script from '../../../src/core/script/script';
import { DatabaseValidationError } from '../../../src/utils/decorators/error';

let script: Script;

describe('Script.create', () => {
  before(async () => {
    script = global.FRIDAY.script;
  });

  it('should create a script', async () => {
    const createdScript = await script.create({
      name: 'Test Script 2',
      code: 'console.log(\'Hey ! This script is a test ! :)\')',
    });

    expect(createdScript).to.have.property('id');
    expect(createdScript).to.have.property('name');
    expect(createdScript).to.have.property('code');
  });

  it('should not create a script with an empty name', async () => {
    const promise = script.create({
      name: '',
      code: 'console.log(\'Hey ! This script is a test ! :)\')',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
