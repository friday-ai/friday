import { AvailableState, StateOwner, SystemVariablesNames, VariableOwner } from '@friday/shared';
import System from './system';
import { CoreError } from '../../utils/decorators/error';
import { version as packageVersion } from '../../../package.json';

/**
 * Function to create necessary elements in database at first run of Friday system
 */
export default async function init(this: System): Promise<string> {
  // Find id of master
  const satellites = await this.satellite.listAll();
  let master = satellites.filter((s) => s.name === 'Master')[0];

  // If is first start, master does not exist
  if (!master) {
    // So create it
    const room = await this.room.listAll({ take: 1 });
    master = await this.satellite.create({ name: 'Master', roomId: room[0].id, lastHeartbeat: new Date() });

    // Create state of Master
    await this.state.set({
      owner: master.id,
      ownerType: StateOwner.SATELLITE,
      value: AvailableState.SATELLITE_CONNECTED,
      last: true,
    });

    // And update/create main variables
    await this.variable.create({
      key: SystemVariablesNames.FRIDAY_VERSION,
      value: packageVersion,
      owner: master.id,
      ownerType: VariableOwner.SATELLITE,
    });

    // await this.variable.create(SystemVariablesNames.NUMBER_OF_BACKUPS, { owner: master.id });
    await this.variable.update(SystemVariablesNames.HISTORY_STATE_IN_DAYS, { owner: master.id });

    return master.id;
  }
  throw new CoreError({ name: 'Friday init error', message: 'Master satellite already exists' });
}
