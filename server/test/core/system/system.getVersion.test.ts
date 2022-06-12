import { expect } from 'chai';
import { version as packageVersion } from '../../../package.json';

describe('System.getVersion', () => {
  it('should get friday version', async () => {
    // @ts-ignore
    const friday = global.FRIDAY;
    const version = await friday.getVersion();
    expect(version).to.equal(packageVersion);
  });
});
