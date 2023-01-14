import { expect } from 'chai';
import server from '../../../../utils/request';

describe('DELETE /api/v1/trigger/:id', () => {
  it('should delete a trigger', async () => {
    await server
      .delete('/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80514')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('should not found trigger to delete', async () => {
    await server.delete('/api/v1/trigger/a0f02b72-73e0-4cfd-a049-5caaa0b80333').expect(404);
  });
});
