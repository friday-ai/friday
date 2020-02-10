import User from '../../../src/core/user';
import { NotFoundError, AuthError } from '../../../src/utils/errors/coreError';

describe('user.login', () => {
  const user = new User();

  it('should log a user', async () => {
    const logedUser = await user.login('john@pepperwood.com', 'mysuperpassword');

    expect(logedUser).not.toHaveProperty('password');
  });

  it('should not log a user with an false email', async () => {
    expect.assertions(1);

    await user.login('test@test.fr', 'mysuperpassword')
      .catch((err: Error) => {
         expect(err).toBeInstanceOf(NotFoundError);
      });
  });

  it('should not log a user with an wrong password', async () => {
    expect.assertions(1);

    await user.login('john@pepperwood.com', 'mysuperpassword2')
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(AuthError);
      });
  });
});
