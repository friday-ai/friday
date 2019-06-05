import { User } from '../../../src/core/friday';

describe('user.getAll', () => {
  const user = new User();

  it('should return all users', async () => {

    const users = await user.getAll();
    expect(users).toEqual(
      [{
        id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        name: 'Pepperwood',
        first_name: 'John',
        email: 'john@pepperwood.com',
        birth_date: '1997-01-20'
      },
      {
        id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        name: 'Pepperwood',
        first_name: 'Jess',
        email: 'jess@pepperwood.com',
        birth_date: '1997-01-20'
      }]
    );

  });

  it('should return all users with full scope', async () => {

    const users = await user.getAll({ scope: 'full' });
    expect(users).toEqual([{
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'john@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      state: null,
      variables: []
    },
    {
      id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      name: 'Pepperwood',
      first_name: 'Jess',
      email: 'jess@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      state: null,
      variables: []
    }]);
  });

  it('should return all users with state', async () => {

    const users = await user.getAll({ scope: 'withState' });
    expect(users).toEqual([{
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'john@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      state: null
    },
    {
      id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      name: 'Pepperwood',
      first_name: 'Jess',
      email: 'jess@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      state: null
    }]);
  });

  it('should return all users with variables', async () => {

    const users = await user.getAll({ scope: 'withVariables' });
    expect(users).toEqual([{
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'john@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      variables: []
    },
    {
      id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      name: 'Pepperwood',
      first_name: 'Jess',
      email: 'jess@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      variables: []
    }]);
  });
});
