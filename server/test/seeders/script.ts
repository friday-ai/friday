import Script from '../../src/models/script';

const create = async () => {
  await Script.bulkCreate([
    {
      id: 'd354cede-3895-4dac-8a90-73d970b4617c',
      name: 'Test Script',
      code: 'console.log(\'Hey ! This script is a test ! :)\')'
    }
  ]);
};

const destroy = async () => {
  Script.destroy({where: {}});
};

export {
  create,
  destroy
};
