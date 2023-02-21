import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('POST /api/v1/room', () => {
  it('should create a room', async () => {
    const room = {
      name: 'A room test',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    };

    await server
      .post('/api/v1/room')
      .send(room)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepInclude(res.body, room);
      });
  });

  it('should not create a room with a provided id', async () => {
    const room = {
      id: 'b14c5677-b1dc-4b26-8829-79168bb5cbb9',
      name: 'Random room',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    };

    await server
      .post('/api/v1/room')
      .send(room)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.not.equal(room.id);
        expect(res.body.name).to.equal('Random room');
      });
  });

  it('should not create a room with a existing name', async () => {
    await server
      .post('/api/v1/room')
      .send({
        id: '4f015db8-f3bf-454e-b9f4-3f8cd1a5b22a',
        name: 'Bedroom',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
      })
      .expect(409);
  });

  it('should not create a room with an empty name', async () => {
    await server
      .post('/api/v1/room')
      .send({
        id: 'af3cc3b1-b4e4-4def-ad7a-38ec70e23e62',
        name: '',
        houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
      })
      .expect(422);
  });

  it('should not create a room  with an empty house', async () => {
    await server
      .post('/api/v1/room')
      .send({
        id: '34c490f0-a9f9-4151-84bf-a7321c5f1bea',
        name: 'A room test',
        houseId: '',
      })
      .expect(422);
  });
});
