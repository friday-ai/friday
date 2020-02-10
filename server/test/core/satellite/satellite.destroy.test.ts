import Satellite from '../../../src/core/satellite';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('satellite.destoy', () => {
  const satellite = new Satellite();

  it('should destroy a satellite', async () => {
    expect.assertions(0);
    await satellite.destroy('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');
  });

  it('should not found a satellite to destroy', async () => {
    expect.assertions(1);
    await satellite.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
