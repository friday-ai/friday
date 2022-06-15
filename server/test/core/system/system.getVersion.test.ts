import { expect } from 'chai';
import { SystemVariablesNames } from '../../../src/utils/constants';
import { version as packageVersion } from '../../../package.json';

describe('System.getVersion', () => {
  it('should get friday version', async () => {
    // @ts-ignore
    const friday = global.FRIDAY;
    const version = await friday.getVersion();
    expect(version).to.equal(packageVersion);
  });

  it('should get friday version even if variable not exist', async () => {
    // @ts-ignore
    const friday = global.FRIDAY;

    const variable = await friday.variable.getValue(SystemVariablesNames.FRIDAY_VERSION);
    await friday.variable.destroy(variable.id);

    const version = await friday.getVersion();
    expect(version).to.equal(packageVersion);
  });
});
