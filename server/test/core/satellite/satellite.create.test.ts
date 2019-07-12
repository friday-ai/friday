import { Satellite } from '../../../src/core/friday';

describe('satellite.create', () => {
  const satellite = new Satellite();

  it('should create a satellite', async () => {
    const createdSatellite = await satellite.create({
      id: '37225fcb-ff7d-40a7-aacc-ee2a041feebd',
      name: 'Satellite 3',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc'
    });

    expect(createdSatellite).toHaveProperty('id');
    expect(createdSatellite).toHaveProperty('name');
    expect(createdSatellite).toHaveProperty('roomId');
  });

  it('should not create a satellite with an empty name', async () => {

    await satellite.create({
      id: '5218d483-d147-4541-bc56-9ad39a105293',
      name: '',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc'
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation error');
      });
  });

  it('should not create a satellite  with an empty room', async () => {

    await satellite.create({
      id: '7e8913ac-5f87-418a-a483-424a9cbcd942',
      name: 'Satellite with an room',
      roomId: ''
    })
      .catch((err) => {
        expect(`${err}`).toContain('Validation error');
      });
  });

});