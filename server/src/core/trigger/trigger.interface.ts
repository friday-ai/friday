import Scene from '../scene/scene.interface';
import { AvailableConditions } from '../../utils/constants';

export default interface TriggerType {
  id: string;
  name?: string;
  description?: string;
  type?: AvailableConditions;
  rules?: any;
  scenes?: Array<Scene[]>;
}
