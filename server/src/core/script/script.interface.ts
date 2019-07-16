
/**
 * @name ScriptType
 * @description Script interface.
 * @param {String} id - Id of script.
 * @param {String} name - Name of script.
 * @param {Any} code - Code of script. (Must be a JSON)
 */
export default interface ScriptType {
  id: string;
  name?: string;
  code?: Object;
}
