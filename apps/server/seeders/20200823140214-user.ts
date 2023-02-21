import { QueryInterface } from 'sequelize';
import { hash } from '../src/utils/password';

export default {
  up: async (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('user', [
      {
        id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        userName: 'JohnPepperwood',
        email: 'john@pepperwood.com',
        password: await hash('mysuperpassword'),
        theme: 'light',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
        userName: 'JessPepperwood',
        email: 'jess@pepperwood.com',
        password: await hash('mysuperpassword2'),
        theme: 'light',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('user', {}, {}),
};
