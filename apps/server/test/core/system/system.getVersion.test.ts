import { expect } from 'chai';
import { SystemVariablesNames } from '../../../src/config/constants';
import { version as packageVersion } from '../../../package.json';
import Friday from '../../../src/core/friday';

let friday: Friday;

describe('System.getVersion', () => {
  before(async () => {
    friday = global.FRIDAY;
  });

  it('should get friday version', async () => {
    const version = await friday.getVersion();
    expect(version).to.equal(packageVersion);
  });

  it('should get friday version even if variable not exist', async () => {

    const variable = await friday.variable.getValue(SystemVariablesNames.FRIDAY_VERSION);
    await friday.variable.destroy(variable.id!);

    const version = await friday.getVersion();
    expect(version).to.equal(packageVersion);
  });
});
