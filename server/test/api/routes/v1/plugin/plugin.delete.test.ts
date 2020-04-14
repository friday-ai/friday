import { expect } from 'chai';
import server from '../../../../utils/request';

describe('DELETE /api/v1/plugin/:id', () => {
  it('should delete a plugin', async () => {

    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('should not found house to delete', async () => {

    await server
      .delete('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0333')
      .expect(404);
  });

});
