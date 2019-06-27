import Scene from '../../src/models/scene';

const create = async () => {
  await Scene.bulkCreate([
    {
      id: '2452964a-a225-47dd-9b83-d88d57ed280e',
      name: 'Test scene',
      description: 'A scene for the tests ;) ',
      triggerId: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514'
    }
  ]);
};

const destroy = async () => {
  Scene.destroy({where: {}});
};

export {
  create,
  destroy
};
