import { House } from '../../../src/core/friday';
import 'jest-extended';

describe('house.getAll', () => {
  const house = new House();

  it('should return all houses', async () => {

    const houses = await house.getAll();

    expect(houses).toEqual([
      {
        id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
        name: 'Main House',
        latitude: '34.0012295',
        longitude: '-118.8067245'
      }
    ]);

  });

  it('should return all houses with full scope', async () => {

    const houses = await house.getAll({ scope: 'full' });

    expect(houses).toBeArray();
    houses.forEach(h => {
      expect(h).toHaveProperty('id');
      expect(h).toHaveProperty('name');
      expect(h).toHaveProperty('latitude');
      expect(h).toHaveProperty('longitude');

      // TODO: The state cannot must be null
      if (h.state !== null) {
        expect(h.state).toBeObject();
        expect(h.state).toHaveProperty('id');
        expect(h.state).toHaveProperty('owner');
        expect(h.state).toHaveProperty('ownerType');
        expect(h.state).toHaveProperty('value');
      }

      if (h.rooms !== null) {
        expect(h.rooms).toBeArray();
        h.rooms!.forEach(r => {
          expect(r).toBeObject();
          expect(r).toHaveProperty('id');
          expect(r).toHaveProperty('name');
          expect(r).toHaveProperty('houseId');
        });
      }

    });

  });

  it('should return all houses with state', async () => {

    const houses = await house.getAll({ scope: 'withState' });

    expect(houses).toBeArray();
    houses.forEach(h => {
      expect(h).toHaveProperty('id');
      expect(h).toHaveProperty('name');
      expect(h).toHaveProperty('latitude');
      expect(h).toHaveProperty('longitude');

      // TODO: The state cannot must be null
      if (h.state !== null) {
        expect(h.state).toBeObject();
        expect(h.state).toHaveProperty('id');
        expect(h.state).toHaveProperty('owner');
        expect(h.state).toHaveProperty('ownerType');
        expect(h.state).toHaveProperty('value');
      }

    });

  });

  it('should return all houses with rooms', async () => {

    const houses = await house.getAll({ scope: 'withRooms' });

    expect(houses).toBeArray();
    houses.forEach(h => {
      expect(h).toHaveProperty('id');
      expect(h).toHaveProperty('name');
      expect(h).toHaveProperty('latitude');
      expect(h).toHaveProperty('longitude');

      if (h.rooms !== null) {
        expect(h.rooms).toBeArray();
        h.rooms!.forEach(r => {
          expect(r).toBeObject();
          expect(r).toHaveProperty('id');
          expect(r).toHaveProperty('name');
          expect(r).toHaveProperty('houseId');
        });
      }

    });

  });

});
