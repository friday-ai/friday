import House from '../../../src/core/house';
import 'jest-extended';

describe('house.getById', () => {
  const house = new House();

  it('should return a house', async () => {

    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c');

    expect(houseReturned).toEqual(
      {
        id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
        name: 'Main House',
        latitude: '34.0012295',
        longitude: '-118.8067245'
      }
    );

  });

  it('should return a house with full scope', async () => {

    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'full');

    expect(houseReturned).toHaveProperty('id');
    expect(houseReturned).toHaveProperty('name');
    expect(houseReturned).toHaveProperty('latitude');
    expect(houseReturned).toHaveProperty('longitude');

    // TODO: The state cannot must be null
    if (houseReturned.state !== null) {
      expect(houseReturned.state).toBeObject();
      expect(houseReturned.state).toHaveProperty('id');
      expect(houseReturned.state).toHaveProperty('owner');
      expect(houseReturned.state).toHaveProperty('ownerType');
      expect(houseReturned.state).toHaveProperty('value');
    }

    if (houseReturned.rooms !== null) {
      expect(houseReturned.rooms).toBeArray();
      houseReturned.rooms!.forEach(r => {
        expect(r).toBeObject();
        expect(r).toHaveProperty('id');
        expect(r).toHaveProperty('name');
        expect(r).toHaveProperty('houseId');
      });
    }

  });

  it('should return a houses with state', async () => {

    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'withState');

    expect(houseReturned).toHaveProperty('id');
    expect(houseReturned).toHaveProperty('name');
    expect(houseReturned).toHaveProperty('latitude');
    expect(houseReturned).toHaveProperty('longitude');

    // TODO: The state cannot must be null
    if (houseReturned.state !== null) {
      expect(houseReturned.state).toBeObject();
      expect(houseReturned.state).toHaveProperty('id');
      expect(houseReturned.state).toHaveProperty('owner');
      expect(houseReturned.state).toHaveProperty('ownerType');
      expect(houseReturned.state).toHaveProperty('value');
    }

  });

  it('should return a house with rooms', async () => {

    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'withRooms');

    expect(houseReturned).toHaveProperty('id');
    expect(houseReturned).toHaveProperty('name');
    expect(houseReturned).toHaveProperty('latitude');
    expect(houseReturned).toHaveProperty('longitude');

    if (houseReturned.rooms !== null) {
      expect(houseReturned.rooms).toBeArray();
      houseReturned.rooms!.forEach(r => {
        expect(r).toBeObject();
        expect(r).toHaveProperty('id');
        expect(r).toHaveProperty('name');
        expect(r).toHaveProperty('houseId');
      });
    }

  });

});
