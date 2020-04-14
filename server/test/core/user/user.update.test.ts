import { expect, assert } from 'chai';
import User from '../../../src/core/user';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('User.update', () => {
  const user = new User();

  it('should update a user', async () => {
    const updatedUser = await user.update('0cd30aef-9c4e-4a23-81e3-3547971296e5', {
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      firstName: 'John update'
    });

    expect(updatedUser).not.to.have.property('password');
    expect(updatedUser.firstName).to.equal('John update');
  });

  it('should not found user to update', async () => {
    const promise = user.update('0cd30aef-9c4e-4a23-81e3-3544971296e5', {
      id: '0cd30aef-9c4e-4a23-81e3-3544971296e5'
    });

    await assert.isRejected(promise, NotFoundError);
  });
});
