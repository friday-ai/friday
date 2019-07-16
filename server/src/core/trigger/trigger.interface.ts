import Scene from '../scene/scene.interface';
import { AvailableConditions } from '../../utils/constants';

/**
 * @name TriggerType
 * @description Trigger interface.
 * @param {String} id - Id of trigger.
 * @param {String} name - Name of trigger.
 * @param {String} description - Description of trigger.
 * @param {AvailableConditions} type - Type of condition.
 * @param {Any} rules - Code of trigger. (Must be a JSON)
 */
export default interface TriggerType {
  id: string;
  name?: string;
  description?: string;
  type?: AvailableConditions;
  rules?: any;
  scenes?: Array<Scene[]>;
}
