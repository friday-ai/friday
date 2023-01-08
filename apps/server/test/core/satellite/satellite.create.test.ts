import { assert, expect } from 'chai';
import { DatabaseValidationError } from '../../../src/utils/decorators/error';
import Satellite from '../../../src/core/satellite/satellite';

let satellite: Satellite;

describe('Satellite.create', () => {
  before(async () => {
    satellite = global.FRIDAY.satellite;
  });

  it('should create a satellite', async () => {
    const createdSatellite = await satellite.create({
      name: 'Satellite 3',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
    });

    expect(createdSatellite).to.have.property('id');
    expect(createdSatellite).to.have.property('name');
    expect(createdSatellite).to.have.property('roomId');
  });

  it('should not create a satellite with an empty name', async () => {
    const promise = satellite.create({
      name: '',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a satellite  with an empty room', async () => {
    const promise = satellite.create({
      name: 'Satellite with an room',
      roomId: '',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
