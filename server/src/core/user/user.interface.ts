import { AvailableLanguages, UserRole } from '../../utils/constants';
import VariableType from '../variable/variable.interface';
import StateType from '../state/state.interface';

/**
 * User interface.
 */
export default interface UserType {
  id?: string;
  userName?: string;
  email?: string;
  password?: string;
  theme?: string;
  role?: UserRole;
  language?: AvailableLanguages;
  state?: StateType;
  variables?: Array<VariableType[]>;
}
