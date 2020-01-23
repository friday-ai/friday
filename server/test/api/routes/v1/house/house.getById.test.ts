import TestServer from "../../../../utils/helper";
import RoomType from "../../../../../src/core/room/room.interface";

describe('house.getById', () => {
  it('should return a house', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let device = res.body;
        expect(device).toBeObject();
        expect(device).toEqual(
          {
            id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
            name: 'Main House',
            latitude: '34.0012295',
            longitude: '-118.8067245'
          });
      });
  });

  it('should return a house with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let house = res.body;
        expect(house).toBeObject();
        expect(house).toContainAllKeys(
          ["id", "name", "latitude", "longitude", "rooms", "state"]
        );

        if (house.state !== null) {
          expect(house.state).toBeObject();
          expect(house.state).toContainAllKeys(
            ["id", "owner", "ownerType", "value"]
          );
        }

        if (house.rooms !== null) {
          expect(house.rooms).toBeArray();
          house.rooms!.forEach((room: RoomType) => {
            expect(room).toBeObject();
            expect(room).toContainAllKeys(
              ["id", "name", "houseId"]
            );
          });
        }
      });
  });

  it('should return a house with state', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let house = res.body;
        expect(house).toBeObject();
        expect(house).toContainAllKeys(
          ["id", "name", "latitude", "longitude", "state"]
        );

        if (house.state !== null) {
          expect(house.state).toBeObject();
          expect(house.state).toContainAllKeys(
            ["id", "owner", "ownerType", "value"]
          );
        }
      });
  });

  it('should return a house with rooms', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .query({'scope' : 'withRooms'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let house = res.body;
        expect(house).toBeObject();
        expect(house).toContainAllKeys(
          ["id", "name", "latitude", "longitude", "rooms"]
        );

        if (house.rooms !== null) {
          expect(house.rooms).toBeArray();
          house.rooms!.forEach((room: RoomType) => {
            expect(room).toBeObject();
            expect(room).toContainAllKeys(
              ["id", "name", "houseId"]
            );
          });
        }
      });
  });
});
