import { VariableOwner } from '../../utils/constants';

/**
 * @name VariableType
 * @description variable interface.
 * @param {String} id - Id of variable.
 * @param {String} key - Key of variable.
 * @param {String} value - Value of variable.
 * @param {String} owner - Owner id of variable.
 * @param {VariableOwner} ownerType - A owner type of variable.
 */
export default interface VariableType {
  id?: string;
  key?: string;
  value?: string;
  owner?: string;
  ownerType?: VariableOwner;
}
