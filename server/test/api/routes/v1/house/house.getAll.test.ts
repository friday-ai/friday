import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import HouseType from '../../../../../src/core/house/house.interface';

describe('GET /api/v1/house', () => {
  it('should return all houses', async () => {
    await server
      .get('/api/v1/house')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        assert.deepEqual(res.body, [{
          id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
          name: 'Main House test',
          latitude: '34.0012295',
          longitude: '-118.8067245',
        },
        ]);
      });
  });

  it('should return all houses with full scope', async () => {
    await server
      .get('/api/v1/house')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const houses = res.body;
        expect(houses).to.be.an('array');
        houses.forEach((house: HouseType) => {
          expect(house).to.be.an('object');
          expect(house).to.contains.keys(
            ['id', 'name', 'latitude', 'longitude', 'rooms', 'state'],
          );

          if (house.state !== null) {
            expect(house.state).to.be.an('object');
            expect(house.state).to.contains.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }

          if (house.rooms !== null) {
            expect(house.rooms).to.be.an('array');
            house.rooms!.forEach((room) => {
              expect(room).to.be.an('object');
              expect(room).to.contains.keys(
                ['id', 'name', 'houseId'],
              );
            });
          }
        });
      });
  });

  it('should return all houses with state', async () => {
    await server
      .get('/api/v1/house')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const houses = res.body;
        expect(houses).to.be.an('array');
        houses.forEach((house: HouseType) => {
          expect(house).to.be.an('object');
          expect(house).to.contains.keys(
            ['id', 'name', 'latitude', 'longitude', 'state'],
          );

          if (house.state !== null) {
            expect(house.state).to.be.an('object');
            expect(house.state).to.contains.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }
        });
      });
  });

  it('should return all houses with rooms', async () => {
    await server
      .get('/api/v1/house')
      .query({ scope: 'withRooms' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const houses = res.body;
        expect(houses).to.be.an('array');
        houses.forEach((house: HouseType) => {
          expect(house).to.be.an('object');
          expect(house).to.contains.keys(
            ['id', 'name', 'latitude', 'longitude', 'rooms'],
          );

          if (house.rooms !== null) {
            expect(house.rooms).to.be.an('array');
            house.rooms!.forEach((room) => {
              expect(room).to.be.an('object');
              expect(room).to.contains.keys(
                ['id', 'name', 'houseId'],
              );
            });
          }
        });
      });
  });
});
