import Scene from '../scene/scene.interface';
import { ActionsType } from '../../utils/constants';

/**
 * Action interface
 */
export default interface ActionType {
  id?: string;
  name?: string;
  description?: string;
  type?: ActionsType;
  subType?: string;
  variableKey?: any;
  variableValue?: string;
  sceneId?: string;
  scene?: Scene;
}
