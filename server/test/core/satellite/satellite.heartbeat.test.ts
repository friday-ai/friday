import { expect, assert } from 'chai';
import Satellite from '../../../src/core/satellite/satellite';
import { NotFoundError } from '../../../src/utils/decorators/error';

describe('Satellite.heartbeat', () => {
  const satellite = new Satellite();

  it('should send heartbeat of satellite', async () => {
    const satelliteReturned = await satellite.heartbeat('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');
    expect(satelliteReturned).to.contains.keys(
      ['id', 'name', 'roomId', 'lastHeartbeat'],
    );
  });

  it('should not send heartbeat of satellite', async () => {
    const promise = satellite.heartbeat('580efda9-6fa1-4bef-865f-d4ef04ea57d6');
    await assert.isRejected(promise, NotFoundError);
  });
});
