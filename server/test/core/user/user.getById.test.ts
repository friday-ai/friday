import { expect, assert } from 'chai';
import User from '../../../src/core/user';

describe('User.getById', () => {
  const user = new User();

  it('should return user', async () => {
    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5');

    expect(userRetruned).to.be.an('object');
    assert.deepEqual(userRetruned, {
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'john@pepperwood.com',
      birthDate: '1997-01-20',
    });
  });

  it('should return user with full scope', async () => {
    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'full');

    expect(userRetruned).to.have.property('state');
    expect(userRetruned).to.have.property('variables');
    expect(userRetruned.variables).to.be.an('array');

    // TODO: The state cannot must be null
    if (userRetruned.state !== null) {
      expect(userRetruned.state).to.be.an('object');
      expect(userRetruned.state).to.have.property('id');
      expect(userRetruned.state).to.have.property('owner');
      expect(userRetruned.state).to.have.property('ownerType');
      expect(userRetruned.state).to.have.property('value');
    }

    userRetruned.variables!.forEach((v) => {
      expect(v).to.have.property('key');
      expect(v).to.have.property('value');
      expect(v).to.have.property('owner');
      expect(v).to.have.property('ownerType');
    });
  });

  it('should return user with state', async () => {
    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withState');

    expect(userRetruned).to.have.property('id');
    expect(userRetruned).to.have.property('name');
    expect(userRetruned).to.have.property('role');
    expect(userRetruned).to.have.property('state');

    // TODO: The state cannot must be null
    if (userRetruned.state !== null) {
      expect(userRetruned.state).to.be.an('object');
      expect(userRetruned.state).to.have.property('id');
      expect(userRetruned.state).to.have.property('owner');
      expect(userRetruned.state).to.have.property('ownerType');
      expect(userRetruned.state).to.have.property('value');
    }
  });

  it('should return user with variables', async () => {
    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withVariables');

    expect(userRetruned).to.have.property('id');
    expect(userRetruned).to.have.property('name');
    expect(userRetruned).to.have.property('role');
    expect(userRetruned).to.have.property('variables');
    expect(userRetruned.variables).to.be.an('array');

    userRetruned.variables!.forEach((v) => {
      expect(v).to.have.property('key');
      expect(v).to.have.property('value');
      expect(v).to.have.property('owner');
      expect(v).to.have.property('ownerType');
    });
  });
});
