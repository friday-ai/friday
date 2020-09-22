import System from '.';
import error from '../../utils/errors/coreError';
import {
  house, room, satellite, variables,
} from '../../config/init';

/**
 * Function to create necessary elements in database at first run of Friday system
 */
export default async function init(this: System): Promise<void> {
  try {
    const houseCreated = await this.house.create(house);
    room.houseId = houseCreated.id;

    const roomCreated = await this.room.create(room);
    satellite.roomId = roomCreated.id;

    const satelliteCreated = await this.satellite.create(satellite);

    await variables.map(async (variable) => {
      variable.owner = satelliteCreated.id;
      await this.variable.create(variable);
    });

    return;
  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
