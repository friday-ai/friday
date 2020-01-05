import Session from '../../../src/core/session';
import 'jest-extended';

describe('session.getById', () => {
  const session = new Session('secretJwt');

  it('should return an session', async () => {

    const sessionRetruned = await session.getById('894b93df-a7ab-494c-92f6-7d88ae9164b3');
    expect(sessionRetruned).toHaveProperty('id');
    expect(sessionRetruned).toHaveProperty('refreshToken');
    expect(sessionRetruned).toHaveProperty('validUntil');
    expect(sessionRetruned).toHaveProperty('userId');

  });

  it('should return an session with full scope', async () => {

    const sessionRetruned = await session.getById('894b93df-a7ab-494c-92f6-7d88ae9164b3', 'full');

    expect(sessionRetruned).toHaveProperty('id');
    expect(sessionRetruned).toHaveProperty('refreshToken');
    expect(sessionRetruned).toHaveProperty('validUntil');
    expect(sessionRetruned).toHaveProperty('userId');
    expect(sessionRetruned.user).toBeObject();
    expect(sessionRetruned.user).not.toHaveProperty('password');

  });

});
