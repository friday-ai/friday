/* eslint-disable func-names */
import { expect } from 'chai';
import * as database from '../../../src/config/database';
import { SystemVariablesNames, VariableOwner } from '../../../src/utils/constants';
import SatelliteType from '../../../src/core/satellite/satellite.interface';

describe('System.init', () => {
  it('should init friday system and go to nominal mode', async function () {
    this.timeout(8000);

    await database.database.getQueryInterface().bulkInsert('variable',
      [{
        id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f33',
        key: SystemVariablesNames.HISTORY_STATE_IN_DAYS,
        value: '6 months',
        owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
        ownerType: VariableOwner.SATELLITE,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

    // @ts-ignore
    const friday = global.FRIDAY;
    const result = await friday.init();

    expect(result).to.be.an('boolean');
    expect(result).to.equal(true);

    const satellites = await friday.satellite.getAll();
    let master = satellites.filter((s: SatelliteType) => s.name === 'Master')[0];

    expect(master.id).to.be.not.equal(null);
  });
});
