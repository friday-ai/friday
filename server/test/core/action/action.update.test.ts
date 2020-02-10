import Action from '../../../src/core/action';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('action.update', () => {
  const action = new Action();

  it('should update an action', async () => {
    const updatedAction = await action.update('33ab56b0-4064-40d0-b1f4-1e426bff1ea3', {
      id: '33ab56b0-4064-40d0-b1f4-1e426bff1ea3',
      name: 'Action update'
    });

    expect(updatedAction.name).toEqual('Action update');
  });

  it('should not found action to update', async () => {
    expect.assertions(1);

    await action.update('163c08d4-c707-44b9-8ce0-37a45efeb05d', {
      id: '163c08d4-c707-44b9-8ce0-37a45efeb05d'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
