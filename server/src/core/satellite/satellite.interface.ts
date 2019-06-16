import VariableType from '../variable/variable.interface';
import Room from '../room';

export default interface SatelliteType {
  id: string;
  name?: string;
  roomId?: string;
  room?: Room;
  state?: string;
  variables?: Array<VariableType[]>;
}
