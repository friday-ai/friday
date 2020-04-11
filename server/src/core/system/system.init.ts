import System from '.';
import error from '../../utils/errors/coreError';
import * as elements from '../../config/init';

let room = elements.room;
let satellite = elements.satellite;
let variables = elements.variables;

/**
 * Function to create necessary elements in database at first run of Friday system
 */
export default async function init(this: System) {
  try {
    const houseCreated = await this.house.create(elements.house);
    room.houseId = houseCreated.id;

    const roomCreated = await this.room.create(room);
    satellite.roomId = roomCreated.id;

    const satelliteCreated = await this.satellite.create(satellite);

    variables.forEach(async variable => {
      variable.owner = satelliteCreated.id;
      await this.variable.create(variable);
    });

  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e});
  }

}
