import { Script } from '../../../src/core/friday';
import { NotFoundError } from '../../../src/utils/error';

describe('script.update', () => {
  const script = new Script();

  it('should update a script', async () => {

    const updatedScript = await script.update({
      id: 'd354cede-3895-4dac-8a90-73d970b4617c',
      name: 'Script update'
    });

    expect(updatedScript.name).toEqual('Script update');
  });

  it('should not found script to update', async () => {

    await script.update({
      id: '76fd7e15-22e5-4e0e-904a-619fb062dec1'
    })
      .catch((err) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });
  });
});
