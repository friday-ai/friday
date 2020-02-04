import Script from '../../../src/core/script';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('script.update', () => {
  const script = new Script();

  it('should update a script', async () => {

    const updatedScript = await script.update('d354cede-3895-4dac-8a90-73d970b4617c', {
      id: 'd354cede-3895-4dac-8a90-73d970b4617c',
      name: 'Script update'
    });

    expect(updatedScript.name).toEqual('Script update');
  });

  it('should not found script to update', async () => {

    await script.update('d354cede-3895-4dac-8a90-73d970b4617c', {
      id: '76fd7e15-22e5-4e0e-904a-619fb062dec1'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });
  });
});
