
import Scene from '../scene/scene.interface';
import { ActionsType } from '../../utils/constants';

export default interface DeviceType {
  id: string;
  name?: string;
  description?: string;
  type?: ActionsType;
  subType?: string;
  variableKey?: any;
  variableValue?: string;
  sceneId?: string;
  scene?: Scene;
}
