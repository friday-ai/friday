import { expect } from 'chai';
import server from '../../../../utils/request';

describe('DELETE /api/v1/scene/:id', () => {
  it('should delete a scene', async () => {

    await server
      .delete('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('should not found scene to delete', async () => {

    await server
      .delete('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed2333')
      .expect(404);
  });

});
