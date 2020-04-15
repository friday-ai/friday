import { expect, assert } from 'chai';
import User from '../../../src/core/user';

describe('user.getAll', () => {
  const user = new User();

  it('should return all users', async () => {
    const users = await user.getAll();

    expect(users).to.be.an('array');
    assert.deepEqual(users, [{
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'john@pepperwood.com',
      birthDate: '1997-01-20',
    },
    {
      id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      name: 'Pepperwood',
      firstName: 'Jess',
      email: 'jess@pepperwood.com',
      birthDate: '1997-01-20',
    }]);
  });

  it('should return all users with full scope', async () => {
    const users = await user.getAll({ scope: 'full' });

    expect(users).to.be.an('array');

    users.forEach((u) => {
      expect(u).to.have.property('id');
      expect(u).to.have.property('name');
      expect(u).to.have.property('role');
      expect(u).to.have.property('state');
      expect(u).to.have.property('variables');
      expect(u.variables).to.be.an('array');

      // TODO: The state cannot must be null
      if (u.state !== null) {
        expect(u.state).to.be.an('object');
        expect(u.state).to.have.property('id');
        expect(u.state).to.have.property('owner');
        expect(u.state).to.have.property('ownerType');
        expect(u.state).to.have.property('value');
      }

      u.variables!.forEach((v) => {
        expect(v).to.have.property('key');
        expect(v).to.have.property('value');
        expect(v).to.have.property('owner');
        expect(v).to.have.property('ownerType');
      });
    });
  });

  it('should return all users with state', async () => {
    const users = await user.getAll({ scope: 'withState' });

    expect(users).to.be.an('array');

    users.forEach((u) => {
      expect(u).to.have.property('id');
      expect(u).to.have.property('name');
      expect(u).to.have.property('role');
      expect(u).to.have.property('state');

      // TODO: The state cannot must be null
      if (u.state !== null) {
        expect(u.state).to.be.an('object');
        expect(u.state).to.have.property('id');
        expect(u.state).to.have.property('owner');
        expect(u.state).to.have.property('ownerType');
        expect(u.state).to.have.property('value');
      }
    });
  });

  it('should return all users with variables', async () => {
    const users = await user.getAll({ scope: 'withVariables' });

    expect(users).to.be.an('array');

    users.forEach((u) => {
      expect(u).to.have.property('id');
      expect(u).to.have.property('name');
      expect(u).to.have.property('role');
      expect(u).to.have.property('variables');
      expect(u.variables).to.be.an('array');

      u.variables!.forEach((v) => {
        expect(v).to.have.property('key');
        expect(v).to.have.property('value');
        expect(v).to.have.property('owner');
        expect(v).to.have.property('ownerType');
      });
    });
  });
});
