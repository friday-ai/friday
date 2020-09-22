import { VariableOwner } from '../../utils/constants';

/**
 * Variable interface.
 */
export default interface VariableType {
  id?: string;
  key?: string;
  value?: string;
  owner?: string;
  ownerType?: VariableOwner;
}
