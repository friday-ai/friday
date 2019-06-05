import { User } from '../../../src/core/friday';

describe('user.create', () => {
  const user = new User();

  it('should create a user', async () => {
    const createdUser = await user.create({
      id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'test@test.com',
      password: 'mysuperpassword',
      birth_date: new Date(1996, 12, 20)
    });

    expect(createdUser).not.toHaveProperty('password');
  });

  it('should not create a user with an existing email', async () => {

    await user.create({
      id: '0cd30aef-9c4e-4a23-88e3-3544971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'john@pepperwood.com',
      password: 'mysuperpassword',
      birth_date: new Date(1996, 12, 20)
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation error');
      });
  });

  it('should not create user with wrong email', async () => {

    await user.create({
      id: '0cd30aef-9c4e-4c23-88e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'johnpepperwood',
      password: 'mysuperpassword',
      birth_date: new Date(1996, 12, 20)
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation isEmail on email failed');
      });
  });

  it('should not create user with password too small', async () => {

    await user.create({
      id: '0cd30aef-9c4e-4c23-89e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'john@pepperwood.com',
      password: 'test',
      birth_date: new Date(1996, 12, 20)
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation error');
      });
  });
});
