import { expect } from 'chai';
import server from '../../../../utils/request';
import { admin, guest, habitant } from '../../../../utils/apiToken';

describe('DELETE /api/v1/variable/:id', () => {
  it('should delete a variable', async () => {
    await server
      .delete('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it("admin should't have to delete a variable", async () => {
    await server.delete('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32', admin).expect(403);
  });

  it("habitant should't have to delete a variable", async () => {
    await server.delete('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32', habitant).expect(403);
  });

  it("guest should't have to delete a variable", async () => {
    await server.delete('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8f32', guest).expect(403);
  });

  it('should not found variable to delete', async () => {
    await server.delete('/api/v1/variable/a2b9ba3a-72f1-4a24-b268-e3813c1e8333').expect(404);
  });
});
