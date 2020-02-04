import TestServer from '../../../../utils/testServer';
import HouseType from '../../../../../src/core/house/house.interface';

describe('house.getAll', () => {

  it('should return all houses', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/house')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
            name: 'Main House',
            latitude: '34.0012295',
            longitude: '-118.8067245'
          }
        ]);
      });

  });

  it('should return all houses with full scope', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/house')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let houses = res.body;
        expect(houses).toBeArray();
        houses.forEach((house: HouseType) => {
          expect(house).toBeObject();
          expect(house).toContainAllKeys(
            ['id', 'name', 'latitude', 'longitude', 'rooms', 'state']
          );

          if (house.state !== null) {
            expect(house.state).toBeObject();
            expect(house.state).toContainAllKeys(
              ['id', 'owner', 'ownerType', 'value']
            );
          }

          if (house.rooms !== null) {
            expect(house.rooms).toBeArray();
            house.rooms!.forEach(room => {
              expect(room).toBeObject();
              expect(room).toContainAllKeys(
                ['id', 'name', 'houseId']
              );
            });
          }
        });
    });
  });

  it('should return all houses with state', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/house')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let houses = res.body;
        expect(houses).toBeArray();
        houses.forEach((house: HouseType) => {
          expect(house).toBeObject();
          expect(house).toContainAllKeys(
            ['id', 'name', 'latitude', 'longitude', 'state']
          );

          if (house.state !== null) {
            expect(house.state).toBeObject();
            expect(house.state).toContainAllKeys(
              ['id', 'owner', 'ownerType', 'value']
            );
          }
        });
      });
  });

  it('should return all houses with rooms', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/house')
      .query({'scope' : 'withRooms'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let houses = res.body;
        expect(houses).toBeArray();
        houses.forEach((house: HouseType) => {
          expect(house).toBeObject();
          expect(house).toContainAllKeys(
            ['id', 'name', 'latitude', 'longitude', 'rooms']
          );

          if (house.rooms !== null) {
            expect(house.rooms).toBeArray();
            house.rooms!.forEach(room => {
              expect(room).toBeObject();
              expect(room).toContainAllKeys(
                ['id', 'name', 'houseId']
              );
            });
          }
        });
      });
  });

});
