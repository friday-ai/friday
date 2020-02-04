import Trigger from '../../../src/core/trigger';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('trigger.update', () => {
  const trigger = new Trigger();

  it('should update a trigger', async () => {
    const updatedTrigger = await trigger.update('a0f02b72-73e0-4cfd-a049-5caaa0b80514', {
      id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
      name: 'Trigger update'
    });

    expect(updatedTrigger.name).toEqual('Trigger update');
  });

  it('should not found trigger to update', async () => {

    await trigger.update('0cd30aef-9c4e-4a23-81e3-3544971296e5', {
      id: '0cd30aef-9c4e-4a23-81e3-3544971296e5'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
