import { expect, assert } from 'chai';
import Session from '../../../src/core/session';
import { BadParametersError, NotFoundError } from '../../../src/utils/errors/coreError';

describe('Session.revoke', () => {
  const session = new Session('secretJwt');

  it('should revoke an session', async () => {
    const revokedSession = await session.revoke('0cd30aef-9c4e-4a23-81e3-3547971296e5', '894b93df-a7ab-494c-92f6-7d88ae9164b3');
    expect(revokedSession.revoked).to.equal(true);
  });

  it('should not revoke an session', async () => {
    const promise = session.revoke('', '');
    await assert.isRejected(promise, BadParametersError);
  });

  it('should not revoke an session', async () => {
    const promise = session.revoke('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'test');
    await assert.isRejected(promise, NotFoundError);
  });
});
