import Trigger from '../trigger/trigger.interface';
import Action from '../action/action.interface';

/**
 * @name SceneType
 * @description Scene interface.
 * @param {String} id - Id of scene.
 * @param {String} name - Name of scene.
 * @param {String} description - Description of scene.
 * @param {String} triggerId - Id of trigger.
 */
export default interface SceneType {
  id: string;
  name?: string;
  description?: string;
  triggerId?: string;
  trigger?: Array<Trigger[]>;
  actions?: Array<Action[]>;
}
