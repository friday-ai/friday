import { expect } from 'chai';
import server from '../../../../utils/request';

describe('DELETE /api/v1/house/:id', () => {
  it('should delete a house', async () => {
    await server
      .delete('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc407c')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('should not found house to delete', async () => {
    await server
      .delete('/api/v1/house/ecb7958f-ea9e-4520-819e-be6358dc4333')
      .expect(404);
  });
});
