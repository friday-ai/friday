import House from '../../models/house';
import { GetOptions } from '../../utils/constants';
import HouseType from './house.interface';
import Log from '../../utils/log';

const logger = new Log();
const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

export default async function getAll(options?: GetOptions): Promise<HouseType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let houses;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      houses = await House.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      houses = await House.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const housesPlain = <HouseType[]>houses.map((house) => {
      const housePlain = house.get({ plain: true });
      return housePlain;
    });

    return housesPlain;
  } catch (e) {
    throw logger.error(e);
  }
}
