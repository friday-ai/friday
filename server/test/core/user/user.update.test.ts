import { User } from '../../../src/core/friday';
import { NotFoundError } from '../../../src/utils/error';

describe('user.update', () => {
  const user = new User();

  it('should update a user', async () => {

    const updatedUser = await user.update({
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      firstName: 'John update'
    });

    expect(updatedUser).not.toHaveProperty('password');
    expect(updatedUser.firstName).toEqual('John update');
  });

  it('should not found user to update', async () => {

    await user.update({
      id: '0cd30aef-9c4e-4a23-81e3-3544971296e5'
    })
      .catch((err) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });
  });
});
