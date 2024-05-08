import { SystemVariablesNames } from "@friday-ai/shared";
import { version as packageVersion } from "../../../package.json";
import error, { NotFoundError } from "../../utils/decorators/error";
import type System from "./system";

/**
 * Get actual version and last saved version of Friday
 * @returns {Promise<Array<String>>} Resolve with an array
 */
export default async function getVersion(this: System): Promise<Array<string>> {
  let savedVersion = "";
  try {
    const variable = await this.variable.getValue(SystemVariablesNames.FRIDAY_VERSION);
    savedVersion = variable.value;
    return [packageVersion, savedVersion];
  } catch (e) {
    if (e.constructor === NotFoundError) {
      return [packageVersion, savedVersion];
    }
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
