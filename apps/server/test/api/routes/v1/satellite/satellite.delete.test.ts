import { expect } from 'chai';
import server from '../../../../utils/request';

describe('DELETE /api/v1/satellite/:id', () => {
  it('should delete a satellite', async () => {
    await server
      .delete('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('should not found satellite to delete', async () => {
    await server.delete('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894333').expect(404);
  });
});
