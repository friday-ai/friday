import { User } from '../../../src/core/friday';

describe('user.update', () => {
  const user = new User();

  it('should update a user', async () => {

    await user.create({
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'test@test.com',
      password: 'mysuperpassword',
      birth_date: new Date(1996, 12, 20)
    });

    const updatedUser = await user.update({
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      first_name: 'John update'
    });

    expect(updatedUser).not.toHaveProperty('password');
    expect(updatedUser.first_name).toEqual('John update');

  });

  it('should not found user to update', async () => {

    await user.update({
      id: '0cd30aef-9c4e-4a23-81e3-3544971296e5'
    })
      .catch((err) => {
        expect(`${err}`).toContain('User not found');
      });

  });
});
