import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import RoomType from '../../../../../src/core/room/room.interface';

describe('GET /api/v1/house/:id', () => {
  it('should return a house', async () => {
    await server
      .get('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
          id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
          name: 'Main House',
          latitude: '34.0012295',
          longitude: '-118.8067245',
        });
      });
  });

  it('should return a house with full scope', async () => {
    await server
      .get('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const house = res.body;
        expect(house).to.be.an('object');
        expect(house).to.have.all.keys(
          ['id', 'name', 'latitude', 'longitude', 'rooms', 'state'],
        );

        if (house.state !== null) {
          expect(house.state).to.be.an('object');
          expect(house.state).to.have.all.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }

        if (house.rooms !== null) {
          expect(house.rooms).to.be.an('array');
          house.rooms!.forEach((room: RoomType) => {
            expect(room).to.be.an('object');
            expect(room).to.have.all.keys(
              ['id', 'name', 'houseId'],
            );
          });
        }
      });
  });

  it('should return a house with state', async () => {
    await server
      .get('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const house = res.body;
        expect(house).to.be.an('object');
        expect(house).to.have.all.keys(
          ['id', 'name', 'latitude', 'longitude', 'state'],
        );

        if (house.state !== null) {
          expect(house.state).to.be.an('object');
          expect(house.state).to.have.all.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }
      });
  });

  it('should return a house with rooms', async () => {
    await server
      .get('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .query({ scope: 'withRooms' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const house = res.body;
        expect(house).to.be.an('object');
        expect(house).to.have.all.keys(
          ['id', 'name', 'latitude', 'longitude', 'rooms'],
        );

        if (house.rooms !== null) {
          expect(house.rooms).to.be.an('array');
          house.rooms!.forEach((room: RoomType) => {
            expect(room).to.be.an('object');
            expect(room).to.have.all.keys(
              ['id', 'name', 'houseId'],
            );
          });
        }
      });
  });
});
