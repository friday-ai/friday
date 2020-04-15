import { assert } from 'chai';
import Satellite from '../../../src/core/satellite';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('Satellite.destoy', () => {
  const satellite = new Satellite();

  it('should destroy a satellite', async () => {
    await satellite.destroy('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');
  });

  it('should not found a satellite to destroy', async () => {
    const promise = satellite.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
