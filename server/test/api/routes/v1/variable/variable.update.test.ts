import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/variable/:id', () => {
  it('should update a variable with a id', async () => {
    await server
      .patch('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32')
      .send({
        value: 'Variable update',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.value).to.equal('Variable update');
      });
  });

  it('should update a variable with a key', async () => {
    await server
      .patch('/api/v1/variable/test_key0')
      .send({
        value: 'Variable update2',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.value).to.equal('Variable update2');
      });
  });

  it('should not found variable to update', async () => {
    await server
      .patch('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8333')
      .send({
        value: 'Variable update',
      })
      .expect(404);
  });
});
