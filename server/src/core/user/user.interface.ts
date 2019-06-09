import { User_role, Available_languages } from '../../utils/constants';
import VariableType from '../variable/variable.interface';

export default interface UserType {
  id: string;
  name?: string;
  first_name?: string;
  email?: string;
  password?: string;
  birth_date?: Date;
  role?: User_role;
  language?: Available_languages;
  state?: string;
  variables?: Array<VariableType[]>;
}
