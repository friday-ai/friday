import { expect } from 'chai';
import server from '../../../../utils/request';

describe('DELETE /api/v1/action/:id', () => {
  it('should delete an action', async () => {
    await server
      .delete('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('should not found action to delete', async () => {
    await server
      .delete('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1333')
      .expect(404);
  });
});
