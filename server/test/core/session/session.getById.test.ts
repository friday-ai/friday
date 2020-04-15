import { expect } from 'chai';
import Session from '../../../src/core/session';

describe('Session.getById', () => {
  const session = new Session('secretJwt');

  it('should return an session', async () => {
    const sessionRetruned = await session.getById('894b93df-a7ab-494c-92f6-7d88ae9164b3');
    expect(sessionRetruned).to.have.property('id');
    expect(sessionRetruned).to.have.property('refreshToken');
    expect(sessionRetruned).to.have.property('validUntil');
    expect(sessionRetruned).to.have.property('userId');
  });

  it('should return an session with full scope', async () => {
    const sessionRetruned = await session.getById('894b93df-a7ab-494c-92f6-7d88ae9164b3', 'full');

    expect(sessionRetruned).to.have.property('id');
    expect(sessionRetruned).to.have.property('refreshToken');
    expect(sessionRetruned).to.have.property('validUntil');
    expect(sessionRetruned).to.have.property('userId');
    expect(sessionRetruned.user).to.be.an('object');
    expect(sessionRetruned.user).not.to.have.property('password');
  });
});
