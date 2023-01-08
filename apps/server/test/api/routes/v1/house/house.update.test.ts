import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/house/:id', () => {
  it('should update a house', async () => {
    await server
      .patch('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .send({
        name: 'House update',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('House update');
      });
  });

  it('should not found house to update', async () => {
    await server
      .patch('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc4333')
      .send({
        name: 'House update',
      })
      .expect(404);
  });
});
