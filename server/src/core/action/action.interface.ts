
import Scene from '../scene/scene.interface';
import { ActionsType } from '../../utils/constants';

export default interface ActionType {
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
