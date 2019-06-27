import House from '../../src/models/house';

const create = async () => {
  await House.bulkCreate([
    {
      id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
      name: 'Main House',
      latitude: '34.0012295',
      longitude: '-118.8067245'
    }
  ]);
};

const destroy = async () => {
  House.destroy({where: {}});
};

export {
  create,
  destroy
};
