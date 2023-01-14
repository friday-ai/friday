import { assert, expect } from 'chai';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Satellite from '../../../src/core/satellite/satellite';

let satellite: Satellite;

describe('Satellite.heartbeat', () => {
  before(async () => {
    satellite = global.FRIDAY.satellite;
  });

  it('should send heartbeat of satellite', async () => {
    const satelliteReturned = await satellite.heartbeat('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');
    expect(satelliteReturned).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
    expect(satelliteReturned.id).to.equal('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');
  });

  it('should not found a satellite to update his heartbeat', async () => {
    const promise = satellite.heartbeat('580efda9-6fa1-4bef-865f-d4ef04ea57d6');
    await assert.isRejected(promise, NotFoundError);
  });
});
