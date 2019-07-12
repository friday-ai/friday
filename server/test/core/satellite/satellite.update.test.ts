import { Satellite } from '../../../src/core/friday';

describe('satellite.update', () => {
  const satellite = new Satellite();

  it('should update a satellite', async () => {
    const updatedSatellite = await satellite.update(    {
      id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      name: 'Satellite update'
    });

    expect(updatedSatellite.name).toEqual('Satellite update');
  });

  it('should not found satellite to update', async () => {

    await satellite.update({
      id: '4017c89a-8d02-4d9b-9aec-1e1bcb93a3a7'
    })
      .catch((err) => {
        expect(`${err}`).toContain('Satellite not found');
      });

  });

});
