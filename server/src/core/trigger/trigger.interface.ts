import Scene from '../scene/scene.interface';
import { AvailableConditions } from '../../utils/constants';

/**
 * Trigger interface.
 */
export default interface TriggerType {
  id: string;
  name?: string;
  description?: string;
  type?: AvailableConditions;
  rules?: any;
  scenes?: Array<Scene[]>;
}
