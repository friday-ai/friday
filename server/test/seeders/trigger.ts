import Trigger from '../../src/models/trigger';
import { AvailableConditions } from '../../src/utils/constants';

const create = async () => {
  await Trigger.bulkCreate([
    {
      id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
      name: 'Test',
      description: 'A trigger test',
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        value: '23',
      }),
    },
  ]);
};

const destroy = async () => {
  Trigger.destroy({ where: {} });
};

export {
  create,
  destroy,
};
