
import Scene from '../scene/scene.interface';
import { ActionsType } from '../../utils/constants';

/**
 * @name ActionType
 * @description Action interface.
 * @param {String} id - Id of action.
 * @param {String} name - Name of action.
 * @param {String} description - Description of action.
 * @param {ActionsType} type - Type of action.
 * @param {String} subType - Sub type of action.
 * @param {Any} variableKey - Variables keys of action. (Must be a JSON)
 * @param {String} variableValue - Variables values of action.
 * @param {String} sceneId - Id of the owner scene.
 */
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
