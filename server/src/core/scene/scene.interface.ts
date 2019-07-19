import Trigger from '../trigger/trigger.interface';
import Action from '../action/action.interface';

/**
 * Scene interface.
 */
export default interface SceneType {
  id: string;
  name?: string;
  description?: string;
  triggerId?: string;
  trigger?: Array<Trigger[]>;
  actions?: Array<Action[]>;
}
