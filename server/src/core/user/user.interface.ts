import { UserRole, AvailableLanguages } from '../../utils/constants';
import VariableType from '../variable/variable.interface';
import StateType from '../state/state.interface';

/**
 * User interface.
 */
export default interface UserType {
  id?: string;
  name?: string;
  firstName?: string;
  email?: string;
  password?: string;
  birthDate?: Date;
  role?: UserRole;
  language?: AvailableLanguages;
  state?: StateType;
  variables?: Array<VariableType[]>;
}
