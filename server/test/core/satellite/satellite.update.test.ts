import { expect, assert } from 'chai';
import Satellite from '../../../src/core/satellite';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Satellite.update', () => {
  const satellite = new Satellite();

  it('should update a satellite', async () => {
    const updatedSatellite = await satellite.update('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', {
      id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      name: 'Satellite update'
    });

    expect(updatedSatellite.name).to.equal('Satellite update');
  });

  it('should not found satellite to update', async () => {
    const promise = satellite.update('4017c89a-8d02-4d9b-9aec-1e1bcb93a3a7', {
      id: '4017c89a-8d02-4d9b-9aec-1e1bcb93a3a7'
    });

    await assert.isRejected(promise, NotFoundError);
  });

});
