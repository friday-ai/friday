import { UserRole, AvailableLanguages } from '../../utils/constants';
import VariableType from '../variable/variable.interface';
import StateType from '../state/state.interface';

/**
 * @name UserType
 * @description User interface.
 * @param {String} id - Id of user.
 * @param {String} name - Name of user.
 * @param {String} firstName - Frist name of user.
 * @param {String} email - Email of user.
 * @param {String} password - Password of user.
 * @param {Date} birthDate - Birth date of user.
 * @param {UserRole} role - Role of user.
 * @param {AvailableLanguages} language - Language of user.
 */
export default interface UserType {
  id: string;
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
