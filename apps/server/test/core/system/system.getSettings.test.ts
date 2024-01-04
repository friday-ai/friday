import { SystemVariablesNames } from '@friday-ai/shared';
import { assert, expect } from 'chai';
import Friday from '../../../src/core/friday';
import { NotFoundError } from '../../../src/utils/decorators/error';

let friday: Friday;

describe('System.getSettings', () => {
  before(async () => {
    friday = global.FRIDAY;
  });

  it("should get friday's settings", async () => {
    const settings = await friday.getSettings();
    expect(settings).to.contains.keys(['version', 'units', 'history']);
  });

  it('should not found settings', async () => {
    const variable = await friday.variable.getValue(SystemVariablesNames.FRIDAY_VERSION);
    await friday.variable.destroy(variable.id);

    const promise = friday.getSettings();
    await assert.isRejected(promise, NotFoundError);
  });
});
