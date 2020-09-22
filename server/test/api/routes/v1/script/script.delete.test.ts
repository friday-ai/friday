import { expect } from 'chai';
import server from '../../../../utils/request';

describe('DELETE /api/v1/script/:id', () => {
  it('should delete a script', async () => {
    await server
      .delete('/api/v1/script/d354cede-3895-4dac-8a90-73d970b4617c')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('should not found satellite to delete', async () => {
    await server
      .delete('/api/v1/script/d354cede-3895-4dac-8a90-73d970b46333')
      .expect(404);
  });
});
