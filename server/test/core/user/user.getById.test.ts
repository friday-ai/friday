import User from '../../../src/core/user';
import 'jest-extended';

describe('user.getById', () => {
  const user = new User();

  it('should return user', async () => {

    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5');
    expect(userRetruned).toEqual(
      {
        id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        name: 'Pepperwood',
        firstName: 'John',
        email: 'john@pepperwood.com',
        birthDate: '1997-01-20'
      }
    );

  });

  it('should return user with full scope', async () => {

    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'full');

    expect(userRetruned).toHaveProperty('state');
    expect(userRetruned).toHaveProperty('variables');
    expect(userRetruned.variables).toBeArray();

    // TODO: The state cannot must be null
    if (userRetruned.state !== null) {
      expect(userRetruned.state).toBeObject();
      expect(userRetruned.state).toHaveProperty('id');
      expect(userRetruned.state).toHaveProperty('owner');
      expect(userRetruned.state).toHaveProperty('ownerType');
      expect(userRetruned.state).toHaveProperty('value');
    }

    userRetruned.variables!.forEach(v => {
      expect(v).toHaveProperty('key');
      expect(v).toHaveProperty('value');
      expect(v).toHaveProperty('owner');
      expect(v).toHaveProperty('ownerType');
    });

  });

  it('should return user with state', async () => {

    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withState');

    expect(userRetruned).toHaveProperty('id');
    expect(userRetruned).toHaveProperty('name');
    expect(userRetruned).toHaveProperty('role');
    expect(userRetruned).toHaveProperty('state');

    // TODO: The state cannot must be null
    if (userRetruned.state !== null) {
      expect(userRetruned.state).toBeObject();
      expect(userRetruned.state).toHaveProperty('id');
      expect(userRetruned.state).toHaveProperty('owner');
      expect(userRetruned.state).toHaveProperty('ownerType');
      expect(userRetruned.state).toHaveProperty('value');
    }

  });

  it('should return user with variables', async () => {

    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withVariables');

    expect(userRetruned).toHaveProperty('id');
    expect(userRetruned).toHaveProperty('name');
    expect(userRetruned).toHaveProperty('role');
    expect(userRetruned).toHaveProperty('variables');
    expect(userRetruned.variables).toBeArray();

    userRetruned.variables!.forEach(v => {
      expect(v).toHaveProperty('key');
      expect(v).toHaveProperty('value');
      expect(v).toHaveProperty('owner');
      expect(v).toHaveProperty('ownerType');
    });

  });
});
