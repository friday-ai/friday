import Action from '../../../src/core/action';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('action.destoy', () => {
  const action = new Action();

  it('should destroy an action', async () => {
    expect.assertions(0);
    await action.destroy('33ab56b0-4064-40d0-b1f4-1e426bff1ea3');
  });

  it('should not found an action to destroy', async () => {
    expect.assertions(1);
    await action.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
