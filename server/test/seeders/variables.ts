import Variable from '../../src/models/variable';
import { Variable_owner } from '../../src/utils/constants';

const create = async () => {
  await Variable.bulkCreate([
    {
      id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
      key: 'test_key0',
      value: 'test_value0',
      owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      owner_type: Variable_owner.USER
    },
    {
      id: '8e8136c7-9c42-41b0-a37e-f4fb1ecacbea',
      key: 'test_key1',
      value: 'test_value1',
      owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
      owner_type: Variable_owner.USER
    }
  ]);
};

const destroy = async () => {
  Variable.destroy({where: {}});
};

export {
  create,
  destroy
};
