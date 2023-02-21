import { assert, expect } from 'chai';
import { BadParametersError, NotFoundError } from '../../../src/utils/decorators/error';
import Session from '../../../src/core/session/session';

let session: Session;

describe('Session.revoke', () => {
  before(async () => {
    session = global.FRIDAY.session;
  });

  it('should revoke an session', async () => {
    const revokedSession = await session.revoke('894b93df-a7ab-494c-92f6-7d88ae9164b3');
    expect(revokedSession.revoked).to.equal(true);
  });

  it('should not revoke an session', async () => {
    const promise = session.revoke('');
    await assert.isRejected(promise, BadParametersError);
  });

  it('should not revoke an session', async () => {
    const promise = session.revoke('test');
    await assert.isRejected(promise, NotFoundError);
  });
});
