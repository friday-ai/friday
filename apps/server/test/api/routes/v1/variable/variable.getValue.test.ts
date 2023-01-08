import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import { admin, guest } from '../../../../utils/apiToken';

describe('GET /api/v1/variable/:key', () => {
  it('should return a variable value', async () => {
    await server
      .get('/api/v1/variable')
      .query({
        key: 'test_key0',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
          id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
          key: 'test_key0',
          value: 'test_value0',
          owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
          ownerType: 'user',
        });
      });
  });

  it('admin should have to read a variable value', async () => {
    await server
      .get('/api/v1/variable', admin)
      .query({
        key: 'test_key0',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
          id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
          key: 'test_key0',
          value: 'test_value0',
          owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
          ownerType: 'user',
        });
      });
  });

  it('habitant should have to read a variable value', async () => {
    await server
      .get('/api/v1/variable', admin)
      .query({
        key: 'test_key0',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
          id: 'a2b9ba3a-72f1-4a24-b268-e3813c1e8f32',
          key: 'test_key0',
          value: 'test_value0',
          owner: '0cd30aef-9c4e-4a23-81e3-3547971296e5',
          ownerType: 'user',
        });
      });
  });

  it('guest should\'t have to read a variable value', async () => {
    await server
      .get('/api/v1/variable', guest)
      .query({
        key: 'test_key0',
      })
      .expect('Content-Type', /json/)
      .expect(403);
  });

  it('should not found variable to return', async () => {
    await server
      .get('/api/v1/variable')
      .query({
        key: 'key100',
      })
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
