import { User } from '../../../src/core/friday';

describe('user.getById', () => {
  const user = new User();

  it('should return user', async () => {

    const users = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5');
    expect(users).toEqual(
      {
        id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        name: 'Pepperwood',
        first_name: 'John',
        email: 'john@pepperwood.com',
        birth_date: '1997-01-20'
      }
    );

  });

  it('should return user with full scope', async () => {

    const users = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'full');
    expect(users).toEqual({
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'john@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      state: null,
      variables: []
    });
  });

  it('should return user with state', async () => {

    const users = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withState');
    expect(users).toEqual({
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'john@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      state: null
    });
  });

  it('should return user with variables', async () => {

    const users = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withVariables');
    expect(users).toEqual({
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      first_name: 'John',
      email: 'john@pepperwood.com',
      birth_date: '1997-01-20',
      role: 'habitant',
      language: 'en',
      variables: []
    });
  });
});
