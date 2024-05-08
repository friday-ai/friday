import promise from "bluebird";
import { NotFoundError } from "../decorators/error";

import { modelsObj } from "../../models/index";

const callLater = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 10);
  });

/**
 * Custom validator to find if owner exist
 * @param {string} id
 * @param {Array<string>} owners
 */
export const isOwnerExisting = async (id: string, owners: Array<string>): Promise<void> => {
  const models = owners.map((file) => modelsObj[file]);
  const result: Array<unknown> = [];
  await promise.mapSeries(models, (model) => callLater().then(async () => result.push(await model.findByPk(id))));

  if (result.every((element) => element === null)) {
    throw new NotFoundError({ name: "Test if owner exist", message: "Owner not found", metadata: id });
  }
};
