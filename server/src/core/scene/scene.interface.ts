import Trigger from '../trigger/trigger.interface';
import Action from '../action/action.interface';

export default interface SatelliteType {
  id: string;
  name?: string;
  description?: string;
  triggerId?: string;
  trigger?: Array<Trigger[]>;
  actions?: Array<Action[]>;
}
