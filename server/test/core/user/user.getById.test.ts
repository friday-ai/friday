import { expect, assert } from 'chai';
import User from '../../../src/core/user';

describe('User.getById', () => {
  const user = new User();

  it('should return user', async () => {
    const userReturned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5');

    expect(userReturned).to.be.an('object');
    assert.deepEqual(userReturned, {
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'john@pepperwood.com',
      birthDate: '1997-01-20 00:00:00.000 +00:00',
    });
  });

  it('should return user with full scope', async () => {
    const userReturned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'full');

    expect(userReturned).to.have.property('state');
    expect(userReturned).to.have.property('variables');
    expect(userReturned.variables).to.be.an('array');

    // TODO: The state cannot must be null
    if (userReturned.state !== null) {
      expect(userReturned.state).to.be.an('object');
      expect(userReturned.state).to.have.property('id');
      expect(userReturned.state).to.have.property('owner');
      expect(userReturned.state).to.have.property('ownerType');
      expect(userReturned.state).to.have.property('value');
    }

    userReturned.variables!.forEach((v) => {
      expect(v).to.have.property('key');
      expect(v).to.have.property('value');
      expect(v).to.have.property('owner');
      expect(v).to.have.property('ownerType');
    });
  });

  it('should return user with state', async () => {
    const userReturned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withState');

    expect(userReturned).to.have.property('id');
    expect(userReturned).to.have.property('name');
    expect(userReturned).to.have.property('role');
    expect(userReturned).to.have.property('state');

    // TODO: The state cannot must be null
    if (userReturned.state !== null) {
      expect(userReturned.state).to.be.an('object');
      expect(userReturned.state).to.have.property('id');
      expect(userReturned.state).to.have.property('owner');
      expect(userReturned.state).to.have.property('ownerType');
      expect(userReturned.state).to.have.property('value');
    }
  });

  it('should return user with variables', async () => {
    const userReturned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withVariables');

    expect(userReturned).to.have.property('id');
    expect(userReturned).to.have.property('name');
    expect(userReturned).to.have.property('role');
    expect(userReturned).to.have.property('variables');
    expect(userReturned.variables).to.be.an('array');

    userReturned.variables!.forEach((v) => {
      expect(v).to.have.property('key');
      expect(v).to.have.property('value');
      expect(v).to.have.property('owner');
      expect(v).to.have.property('ownerType');
    });
  });
});
