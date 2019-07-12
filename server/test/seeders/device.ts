import Device from '../../src/models/device';
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice } from '../../src/utils/constants';

const create = async () => {
  await Device.bulkCreate([
    {
      id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
      name: 'Light',
      type: AvailableTypeOfDevice.LIGHT,
      subType: AvailableSubTypeOfDevice.LIGHT_RGB,
      variable: '',
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e'
    },
    {
      id: 'cc306435-eb0f-455c-b79d-a684b171e04d',
      name: 'Temperature',
      type: AvailableTypeOfDevice.SENSOR,
      subType: AvailableSubTypeOfDevice.SENSOR_TEMPERATURE,
      variable: '',
      unit: '°C',
      value: '23',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '88b48273-15e6-4729-9199-0682677475f4'
    }
  ]);
};

const destroy = async () => {
  Device.destroy({where: {}});
};

export {
  create,
  destroy
};
