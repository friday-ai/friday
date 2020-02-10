import Trigger from '../../../src/core/trigger';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('trigger.destoy', () => {
  const trigger = new Trigger();

  it('should destroy a trigger', async () => {
    expect.assertions(0);
    await trigger.destroy('a0f02b72-73e0-4cfd-a049-5caaa0b80514');
  });

  it('should not found a trigger to destroy', async () => {
    expect.assertions(1);
    await trigger.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
