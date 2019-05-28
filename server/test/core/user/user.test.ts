import { User, Constants } from '../../../src/core/friday';

describe ('user.create', () => {
    const user = new User();
    it('should create a user', async () => {
        const newUser = await user.create({
            id: '0cd30aef-9c4e-4a23-88e3-3547971296e5',
            name: 'Doe',
            first_name: 'John',
            email: 'demo@demo.com',
            password_hash: '$2a$10$jsgdfTRYM4r5ainVwZdRsus44xtLYZn/mWhyBY2ch005MO15BS62u', // mysuperpassword
            language: Constants.Available_languages.EN,
            role: Constants.User_role.ADMIN,
            birth_date: '12-12-1990'
          })
    });
  });
