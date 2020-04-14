import { expect, assert } from 'chai';
import User from '../../../src/core/user';
import { NotFoundError, AuthError } from '../../../src/utils/errors/coreError';

describe('User.login', () => {
  const user = new User();

  it('should log a user', async () => {
    const logedUser = await user.login('john@pepperwood.com', 'mysuperpassword');

    expect(logedUser).not.to.have.property('password');
  });

  it('should not log a user with an false email', async () => {
    const promise = user.login('test@test.fr', 'mysuperpassword');
    await assert.isRejected(promise, NotFoundError);
  });

  it('should not log a user with an wrong password', async () => {
    const promise = user.login('john@pepperwood.com', 'mysuperpassword2');
    await assert.isRejected(promise, AuthError);
  });
});
