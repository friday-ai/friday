import { expect } from 'chai';
import server from '../../../../utils/request';

describe('DELETE /api/v1/device/:id', () => {
  it('should delete a device', async () => {
    await server
      .delete('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('should not found device to delete', async () => {
    await server
      .delete('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684333')
      .expect(404);
  });
});
