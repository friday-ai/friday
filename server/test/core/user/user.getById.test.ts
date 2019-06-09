import { User } from '../../../src/core/friday';
import 'jest-extended';

describe('user.getById', () => {
  const user = new User();

  it('should return user', async () => {

    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5');
    expect(userRetruned).toEqual(
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

    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'full');

    expect(userRetruned).toHaveProperty('state');
    expect(userRetruned).toHaveProperty('variables');
    expect(userRetruned.variables).toBeArray();

    userRetruned.variables!.forEach(v => {
      expect(v).toHaveProperty('key');
      expect(v).toHaveProperty('value');
      expect(v).toHaveProperty('owner');
      expect(v).toHaveProperty('owner_type');
    });


  });

  it('should return user with state', async () => {

    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withState');
    expect(userRetruned).toEqual({
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

    const userRetruned = await user.getById('0cd30aef-9c4e-4a23-81e3-3547971296e5', 'withVariables');

    expect(userRetruned).toHaveProperty('variables');
    expect(userRetruned.variables).toBeArray();

    userRetruned.variables!.forEach(v => {
      expect(v).toHaveProperty('key');
      expect(v).toHaveProperty('value');
      expect(v).toHaveProperty('owner');
      expect(v).toHaveProperty('owner_type');
    });

  });
});
