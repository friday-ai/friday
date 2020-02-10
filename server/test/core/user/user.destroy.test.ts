import User from '../../../src/core/user';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('user.destoy', () => {
  const user = new User();

  it('should destroy a user', async () => {
    expect.assertions(0);
    await user.destroy('0cd30aef-9c4e-4a23-81e3-3547971296e5');
  });

  it('should not found a user to destroy', async () => {
    expect.assertions(1);
    await user.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
