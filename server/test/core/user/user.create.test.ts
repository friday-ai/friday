import { assert, expect } from 'chai';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/decorators/error';
import User from '../../../src/core/user/user';

let user: User;

describe('User.create', () => {
  before(async () => {
    user = global.FRIDAY.user;
  });

  it('should create a user', async () => {
    const createdUser = await user.create({
      userName: 'JohnPepperwood',
      email: 'test@test.com',
      password: 'mysuperpassword',
      theme: 'light',
    });

    expect(createdUser).not.to.have.property('password');
  });

  it('should not create a user with an existing email', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: 'mysuperpassword',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create user with wrong email', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: 'johnpepperwood',
      password: 'mysuperpassword',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with password too small', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: 'test',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty password', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: '',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty userName', async () => {
    const promise = user.create({
      userName: '',
      email: 'john@pepperwood.com',
      password: 'mysuperpassword',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty email', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: '',
      password: 'mysuperpassword',
      theme: 'light',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
