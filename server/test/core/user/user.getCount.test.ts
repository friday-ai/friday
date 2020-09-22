import { expect } from 'chai';
import User from '../../../src/core/user';

describe('User.getCount', () => {
  const user = new User();

  it('should return the number of registered users', async () => {
    const usersCount = await user.getCount();

    expect(usersCount).to.to.be.an('number');
    expect(usersCount).to.equal(2);
  });
});
