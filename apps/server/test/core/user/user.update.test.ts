import { assert, expect } from 'chai';
import { NotFoundError } from '../../../src/utils/decorators/error';
import User from '../../../src/core/user/user';

let user: User;

describe('User.update', () => {
  before(async () => {
    user = global.FRIDAY.user;
  });

  it('should update a user', async () => {
    const updatedUser = await user.update('0cd30aef-9c4e-4a23-81e3-3547971296e5', {
      userName: 'John update',
    });

    expect(updatedUser).not.to.have.property('password');
    expect(updatedUser.userName).to.equal('John update');
  });

  it('should not found user to update', async () => {
    const promise = user.update('0cd30aef-9c4e-4a23-81e3-3544971296e5', {});

    await assert.isRejected(promise, NotFoundError);
  });
});
