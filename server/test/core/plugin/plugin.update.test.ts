import { Plugin } from '../../../src/core/friday';
import { NotFoundError } from '../../../src/utils/error';

describe('plugin.update', () => {
  const plugin = new Plugin();

  it('should update a plugin', async () => {
    const updatedPlugin = await plugin.update({
      id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      name: 'Plugin update'
    });

    expect(updatedPlugin.name).toEqual('Plugin update');
  });

  it('should not found plugin to update', async () => {

    await plugin.update({
      id: '14c39f7a-fdda-453b-ab0a-7c47d36b90f8'
    })
      .catch((err) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
