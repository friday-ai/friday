import { assert, expect } from 'chai';
import { AvailableLanguages, UserRole } from '@friday-ai/shared';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/decorators/error';
import User from '../../../src/core/user/user';

let user: User;

describe('User.create', () => {
  before(async () => {
    user = global.FRIDAY.user;
  });

  it('should create a user', async () => {
    const userToCreate = {
      userName: 'JohnPepperwood',
      email: 'test@test.com',
      password: 'mysuperpassword',
      theme: 'light',
      language: AvailableLanguages.EN,
      role: UserRole.HABITANT,
    };

    const createdUser = await user.create(userToCreate);

    expect(createdUser.userName).to.equal('JohnPepperwood');
    expect(createdUser).not.to.have.property('password');
  });

  it('should not create a user with an existing email', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: 'mysuperpassword',
      theme: 'light',
      language: AvailableLanguages.EN,
      role: UserRole.HABITANT,
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create user with wrong email', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: 'johnpepperwood',
      password: 'mysuperpassword',
      theme: 'light',
      language: AvailableLanguages.EN,
      role: UserRole.HABITANT,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with password too small', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: 'test',
      theme: 'light',
      language: AvailableLanguages.EN,
      role: UserRole.HABITANT,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty password', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: 'john@pepperwood.com',
      password: '',
      theme: 'light',
      language: AvailableLanguages.EN,
      role: UserRole.HABITANT,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty userName', async () => {
    const promise = user.create({
      userName: '',
      email: 'john@pepperwood.com',
      password: 'mysuperpassword',
      theme: 'light',
      language: AvailableLanguages.EN,
      role: UserRole.HABITANT,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create user with empty email', async () => {
    const promise = user.create({
      userName: 'JohnPepperwood',
      email: '',
      password: 'mysuperpassword',
      theme: 'light',
      language: AvailableLanguages.EN,
      role: UserRole.HABITANT,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
