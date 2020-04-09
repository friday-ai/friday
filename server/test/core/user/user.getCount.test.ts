import User from '../../../src/core/user';

describe('user.getCount', () => {
  const user = new User();

  it('should return the number of registered users', async () => {

    const usersCount = await user.getCount();

    expect(usersCount).toBeNumber();
    expect(usersCount).toEqual(2);
  });
});
