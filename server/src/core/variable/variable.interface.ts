import { VariableOwner } from '../../utils/constants';

export default interface IVariable {
  id?: string;
  key?: string;
  value?: string;
  owner?: string;
  ownerType?: VariableOwner;
}
