import { Device } from '../../../src/core/friday';

describe('device.update', () => {
  const device = new Device();

  it('should update a device', async () => {
    const updatedDevice = await device.update({
      id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
      name: 'Device update'
    });

    expect(updatedDevice.name).toEqual('Device update');
  });

  it('should not found device to update', async () => {

    await device.update({
      id: '449b2033-105f-4c18-91e8-a56ad1831796'
    })
      .catch((err) => {
        expect(`${err}`).toContain('Device not found');
      });

  });

});