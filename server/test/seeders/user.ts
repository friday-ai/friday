import User from '../../src/models/user';

const create = async () => {
  await User.bulkCreate([
    {
      id: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      name: 'Pepperwood',
      firstName: 'John',
      email: 'john@pepperwood.com',
      password: '$2y$10$WWDhMPJTFEA77Al25/x6xecS7FJtk6rInHxmdj7uOiaE2q5L1M.Ym', // mysuperpassword
      birthDate: new Date(1996, 12, 20)
    },
    {
      id: 'c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a',
      name: 'Pepperwood',
      firstName: 'Jess',
      email: 'jess@pepperwood.com',
      password: '$2y$10$qcwZ4pcAv8QfKY034O5dHO5xDSxILb5HtXyX.32FhvbbdkudjiiK.', // mysuperpassword2
      birthDate: new Date(1996, 12, 20)
    }
  ]);
};

const destroy = async () => {
  User.destroy({where: {}});
};

export {
  create,
  destroy
};
