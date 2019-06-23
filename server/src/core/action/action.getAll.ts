import Action from '../../models/action';
import ActionType from './action.interface';
import Log from '../../utils/log';
import { GetOptions } from '../../utils/constants';

const logger = new Log();
const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

export default async function getAll(options?: GetOptions): Promise<ActionType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let actions;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      actions = await Action.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      actions = await Action.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const actionsPlain = <ActionType[]>actions.map((action) => {
      const actionPlain = action.get({ plain: true });
      return actionPlain;
    });

    return actionsPlain;
  } catch (e) {
    throw logger.error(e);
  }
}
