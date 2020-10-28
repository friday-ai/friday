import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('POST /api/v1/satellite', () => {
  it('should create a satellite', async () => {
    const satellite = {
      id: '37225fcb-ff7d-40a7-aacc-ee2a041feebd',
      name: 'Satellite 3',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      lastHeartbeat: '2020-10-28T21:08:00.535Z',
    };

    await server
      .post('/api/v1/satellite')
      .send(satellite)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, satellite);
      });
  });

  it('should not create a satellite with an empty name', async () => {
    await server
      .post('/api/v1/satellite')
      .send({
        id: '5218d483-d147-4541-bc56-9ad39a105293',
        name: '',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      })
      .expect(422);
  });

  it('should not create a satellite  with an empty room', async () => {
    await server
      .post('/api/v1/satellite')
      .send({
        id: '7e8913ac-5f87-418a-a483-424a9cbcd942',
        name: 'Satellite with an room',
        roomId: '',
      })
      .expect(422);
  });
});
