import User from '../../src/models/user';
import { hash } from '../../src/utils/password';

const create = async () => {
  await User.bulkCreate([
    {
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'john@pepperwood.com',
      password: await hash('mysuperpassword'),
      birthDate: new Date(1996, 12, 20),
    },
    {
      id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      name: 'Pepperwood',
      firstName: 'Jess',
      email: 'jess@pepperwood.com',
      password: await hash('mysuperpassword2'),
      birthDate: new Date(1996, 12, 20),
    },
  ]);
};

const destroy = async () => {
  User.destroy({ where: {} });
};

export {
  create,
  destroy,
};
