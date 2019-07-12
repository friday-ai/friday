import { User } from '../../../src/core/friday';

describe('user.getAll', () => {
  const user = new User();

  it('should return all users', async () => {

    const users = await user.getAll();
    expect(users).toEqual(
      [{
        id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        name: 'Pepperwood',
        firstName: 'John',
        email: 'john@pepperwood.com',
        birthDate: '1997-01-20'
      },
      {
        id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        name: 'Pepperwood',
        firstName: 'Jess',
        email: 'jess@pepperwood.com',
        birthDate: '1997-01-20'
      }]
    );

  });

  it('should return all users with full scope', async () => {

    const users = await user.getAll({ scope: 'full' });

    expect(users).toBeArray();

    users.forEach(u => {
      expect(u).toHaveProperty('id');
      expect(u).toHaveProperty('name');
      expect(u).toHaveProperty('role');
      expect(u).toHaveProperty('state');
      expect(u).toHaveProperty('variables');
      expect(u.variables).toBeArray();

      // TODO: The state cannot must be null
      if (u.state !== null) {
        expect(u.state).toBeObject();
        expect(u.state).toHaveProperty('id');
        expect(u.state).toHaveProperty('owner');
        expect(u.state).toHaveProperty('ownerType');
        expect(u.state).toHaveProperty('value');
      }

      u.variables!.forEach(v => {
        expect(v).toHaveProperty('key');
        expect(v).toHaveProperty('value');
        expect(v).toHaveProperty('owner');
        expect(v).toHaveProperty('ownerType');
      });
    });

  });

  it('should return all users with state', async () => {

    const users = await user.getAll({ scope: 'withState' });

    expect(users).toBeArray();

    users.forEach(u => {
      expect(u).toHaveProperty('id');
      expect(u).toHaveProperty('name');
      expect(u).toHaveProperty('role');
      expect(u).toHaveProperty('state');

      // TODO: The state cannot must be null
      if (u.state !== null) {
        expect(u.state).toBeObject();
        expect(u.state).toHaveProperty('id');
        expect(u.state).toHaveProperty('owner');
        expect(u.state).toHaveProperty('ownerType');
        expect(u.state).toHaveProperty('value');
      }
    });

  });

  it('should return all users with variables', async () => {

    const users = await user.getAll({ scope: 'withVariables' });

    expect(users).toBeArray();

    users.forEach(u => {
      expect(u).toHaveProperty('id');
      expect(u).toHaveProperty('name');
      expect(u).toHaveProperty('role');
      expect(u).toHaveProperty('variables');
      expect(u.variables).toBeArray();

      u.variables!.forEach(v => {
        expect(v).toHaveProperty('key');
        expect(v).toHaveProperty('value');
        expect(v).toHaveProperty('owner');
        expect(v).toHaveProperty('ownerType');
      });
    });

  });
});