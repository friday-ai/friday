import { assert } from 'chai';
import User from '../../../src/core/user';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('User.destoy', () => {
  const user = new User();

  it('should destroy a user', async () => {
    await user.destroy('0cd30aef-9c4e-4a23-81e3-3547971296e5');
  });

  it('should not found a user to destroy', async () => {
    const promise = user.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
