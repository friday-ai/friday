import { assert, expect } from 'chai';
import User from '../../../src/core/user';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('User.create', () => {
  const user = new User();

  it('should create a user', async () => {
    const createdUser = await user.create({
      id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
      userName: 'JohnPepperwood',
      email: 'test@test.com',
      password: 'mysuperpassword',
      theme: 'light',
    });

    expect(createdUser).not.to.have.property('password');
  });

  it('should not create a user with an existing email', async () => {
    const promise = user.create({
      id: '0cd30aef-9c4e-4a23-88e3-3544971296e5',
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: 'mysuperpassword',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create user with wrong email', async () => {
    const promise = user.create({
      id: '0cd30aef-9c4e-4c23-88e3-3547971296e5',
      userName: 'JohnPepperwood',
      email: 'johnpepperwood',
      password: 'mysuperpassword',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with password too small', async () => {
    const promise = user.create({
      id: '0cd30aef-9c4e-4c23-89e3-3547971296e5',
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: 'test',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty password', async () => {
    const promise = user.create({
      id: '6c248c69-2695-481a-be42-5160e6ddfc0b',
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: '',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty userName', async () => {
    const promise = user.create({
      id: 'b99c29f5-d0b3-40df-81ed-ec7308d3621f',
      userName: '',
      email: 'john@pepperwood.com',
      password: 'test',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty email', async () => {
    const promise = user.create({
      id: 'da2e6a5d-201f-467a-b580-178aa3a82e9f',
      userName: 'JohnPepperwood',
      email: '',
      password: 'test',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
