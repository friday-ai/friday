import Satellite from '../../src/models/satellite';

const create = async () => {
  await Satellite.bulkCreate([
    {
      id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      name: 'Main satellite',
      roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
    },
    {
      id: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
      name: 'Satellite 2',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc'
    }
  ]);
};

const destroy = async () => {
  Satellite.destroy({where: {}});
};

export {
  create,
  destroy
};
