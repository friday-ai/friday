import Device from '../../../src/core/device';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('device.update', () => {
  const device = new Device();

  it('should update a device', async () => {
    const updatedDevice = await device.update('22b5b9ce-cd9e-404a-8c31-97350d684fd3', {
      id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
      name: 'Device update'
    });

    expect(updatedDevice.name).toEqual('Device update');
  });

  it('should not found device to update', async () => {
    expect.assertions(1);

    await device.update('449b2033-105f-4c18-91e8-a56ad1831796', {
      id: '449b2033-105f-4c18-91e8-a56ad1831796'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
