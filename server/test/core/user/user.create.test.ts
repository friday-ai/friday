import { User } from '../../../src/core/friday';
import { DatabaseValidationError, DatabaseUniqueConstraintError } from '../../../src/utils/error';

describe('user.create', () => {
  const user = new User();

  it('should create a user', async () => {
    const createdUser = await user.create({
      id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'test@test.com',
      password: 'mysuperpassword',
      birthDate: new Date(1996, 12, 20)
    });

    expect(createdUser).not.toHaveProperty('password');
  });

  it('should not create a user with an existing email', async () => {

    await user.create({
      id: '0cd30aef-9c4e-4a23-88e3-3544971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'john@pepperwood.com',
      password: 'mysuperpassword',
      birthDate: new Date(1996, 12, 20)
    })
      .catch((err) => {
         expect(err).toBeInstanceOf(DatabaseUniqueConstraintError);
      });
  });

  it('should not create user with wrong email', async () => {

    await user.create({
      id: '0cd30aef-9c4e-4c23-88e3-3547971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'johnpepperwood',
      password: 'mysuperpassword',
      birthDate: new Date(1996, 12, 20)
    })
      .catch((err) => {
        expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });

  it('should not create user with password too small', async () => {

    await user.create({
      id: '0cd30aef-9c4e-4c23-89e3-3547971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'john@pepperwood.com',
      password: 'test',
      birthDate: new Date(1996, 12, 20)
    })
      .catch((err) => {
         expect(err).toBeInstanceOf(DatabaseValidationError);
      });
  });
});
