import { assert, expect } from 'chai';
import Session from '../../../src/core/session/session';
import { NotFoundError } from '../../../src/utils/decorators/error';

describe('Session.getById', () => {
  const session = new Session('secretJwt');

  it('should return an session', async () => {
    const sessionReturned = await session.getById('894b93df-a7ab-494c-92f6-7d88ae9164b3');
    expect(sessionReturned).to.have.property('id');
    expect(sessionReturned).to.have.property('refreshToken');
    expect(sessionReturned).to.have.property('validUntil');
    expect(sessionReturned).to.have.property('userId');
  });

  it('should return an session with full scope', async () => {
    const sessionReturned = await session.getById('894b93df-a7ab-494c-92f6-7d88ae9164b3', 'full');

    expect(sessionReturned).to.have.property('id');
    expect(sessionReturned).to.have.property('refreshToken');
    expect(sessionReturned).to.have.property('validUntil');
    expect(sessionReturned).to.have.property('userId');
    expect(sessionReturned.user).to.be.an('object');
    expect(sessionReturned.user).not.to.have.property('password');
  });

  it('should not found an session', async () => {
    const promise = session.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
