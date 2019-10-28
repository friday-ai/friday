import { Trigger } from '../../../src/core/friday';
import { NotFoundError } from '../../../src/utils/error';

describe('trigger.update', () => {
  const trigger = new Trigger();

  it('should update a trigger', async () => {
    const updatedTrigger = await trigger.update({
      id: 'a0f02b72-73e0-4cfd-a049-5caaa0b80514',
      name: 'Trigger update'
    });

    expect(updatedTrigger.name).toEqual('Trigger update');
  });

  it('should not found trigger to update', async () => {

    await trigger.update({
      id: '0cd30aef-9c4e-4a23-81e3-3544971296e5'
    })
      .catch((err) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
