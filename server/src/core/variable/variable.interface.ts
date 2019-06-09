import { Variable_owner } from '../../utils/constants';

export default interface VariableType {
  id?: string;
  key?: string;
  value?: string;
  owner?: string;
  owner_type?: Variable_owner;
}
