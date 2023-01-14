import { expect } from 'chai';
import { HouseAttributes } from '@friday/shared';
import server from '../../../../utils/request';

describe('GET /api/v1/house', () => {
  it('should return all houses', async () => {
    await server
      .get('/api/v1/house')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((house: HouseAttributes) => {
          expect(house).to.be.an('object');
          expect(house).to.contains.keys(['id', 'name', 'latitude', 'longitude']);
        });
      });
  });

  it('should return all houses with full scope', async () => {
    await server
      .get('/api/v1/house')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((house: HouseAttributes) => {
          expect(house).to.be.an('object');
          expect(house).to.contains.keys(['id', 'name', 'latitude', 'longitude', 'rooms', 'state']);

          expect(house.state).to.be.an('object');
          expect(house.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

          expect(house.rooms).to.be.an('array');
          house.rooms.forEach((room) => {
            expect(room).to.be.an('object');
            expect(room).to.contains.keys(['id', 'name', 'houseId']);
          });
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
        expect(res.body).to.be.an('array');
        res.body.forEach((house: HouseAttributes) => {
          expect(house).to.be.an('object');
          expect(house).to.contains.keys(['id', 'name', 'latitude', 'longitude', 'state']);

          expect(house.state).to.be.an('object');
          expect(house.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
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
        expect(res.body).to.be.an('array');
        res.body.forEach((house: HouseAttributes) => {
          expect(house).to.be.an('object');
          expect(house).to.contains.keys(['id', 'name', 'latitude', 'longitude', 'rooms']);

          expect(house.rooms).to.be.an('array');
          house.rooms.forEach((room) => {
            expect(room).to.be.an('object');
            expect(room).to.contains.keys(['id', 'name', 'houseId']);
          });
        });
      });
  });
});
