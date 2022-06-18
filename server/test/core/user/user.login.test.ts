import { expect, assert } from 'chai';
import User from '../../../src/core/user/user';
import { NotFoundError, AuthError } from '../../../src/utils/decorators/error';

describe('User.login', () => {
  const user = new User();

  it('should log a user', async () => {
    const loggedUser = await user.login('john@pepperwood.com', 'mysuperpassword');

    expect(loggedUser).not.to.have.property('password');
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
