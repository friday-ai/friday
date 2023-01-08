import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('POST /api/v1/scene', () => {
  it('should create a scene', async () => {
    const scene = {
      id: '46e6a6e2-db6f-4f72-a2e9-4d41c420da33',
      name: 'Test Scene 2',
      description: 'A test to create a scene',
    };

    await server
      .post('/api/v1/scene')
      .send(scene)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, scene);
      });
  });

  it('should not create a scene with an empty name', async () => {
    await server
      .post('/api/v1/scene')
      .send({
        id: '0d0b207c-7972-4d79-bf71-b0fc6b6a549e',
        name: '',
        description: 'A test to create a scene',
      })
      .expect(422);
  });
});
