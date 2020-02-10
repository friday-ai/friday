import { NotFoundError } from './errors/coreError';
import promise from 'bluebird';
import { join } from 'path';

const MODELS_PATH = join(__filename, '../../models');
const callLater = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 10);
  });

/**
 * Custom validator to find if owner exist
 * @param {string} id
 * @param {Array<string>} owners
 */
export const isOwnerExisting = async function (id: string, owners: Array<string>): Promise<void> {
  const models = owners.map((file) => require(join(MODELS_PATH, file)).default);
  const result: Array<any> = [];
  await promise.mapSeries(models, (model) => callLater().then(async () => result.push(await model.findByPk(id))));

  if (result.every(element => element === null)) {
    throw new NotFoundError({name: 'Test if owner exist', message: 'Owner not found', metadata: id});
  }
};
