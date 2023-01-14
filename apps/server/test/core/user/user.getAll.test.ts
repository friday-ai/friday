import { UserAttributes } from '@friday/shared';
import { expect } from 'chai';
import User from '../../../src/core/user/user';

let user: User;

describe('User.listAll', () => {
  before(async () => {
    user = global.FRIDAY.user;
  });

  it('should return all users', async () => {
    const users = await user.listAll();

    expect(users).to.be.an('array');
    users.forEach((u: UserAttributes) => {
      expect(u).to.contains.keys(['id', 'userName', 'email', 'theme', 'role']);
      expect(u).to.not.contains.keys(['password']);
    });
  });

  it('should return all users with full scope', async () => {
    const users = await user.listAll({ scope: 'full' });

    expect(users).to.be.an('array');
    users.forEach((u: UserAttributes) => {
      expect(u).to.contains.keys(['id', 'userName', 'email', 'theme', 'role', 'state', 'variables']);
      expect(u).to.not.contains.keys(['password']);

      expect(u.state).to.be.an('object');
      expect(u.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

      expect(u.variables).to.be.an('array');
      u.variables.forEach((v) => {
        expect(v).to.be.an('object');
        expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
      });
    });
  });

  it('should return all users with state', async () => {
    const users = await user.listAll({ scope: 'withState' });

    expect(users).to.be.an('array');
    users.forEach((u: UserAttributes) => {
      expect(u).to.contains.keys(['id', 'userName', 'email', 'theme', 'role', 'state']);
      expect(u).to.not.contains.keys(['password']);

      expect(u.state).to.be.an('object');
      expect(u.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
    });
  });

  it('should return all users with variables', async () => {
    const users = await user.listAll({ scope: 'withVariables' });

    expect(users).to.be.an('array');
    users.forEach((u: UserAttributes) => {
      expect(u).to.contains.keys(['id', 'userName', 'email', 'theme', 'role', 'variables']);
      expect(u).to.not.contains.keys(['password']);

      expect(u.variables).to.be.an('array');
      u.variables.forEach((v) => {
        expect(v).to.be.an('object');
        expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
      });
    });
  });
});
