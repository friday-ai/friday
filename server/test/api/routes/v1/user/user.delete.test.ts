import { expect } from 'chai';
import server from '../../../../utils/request';
import { admin, guest, habitant } from '../../../../utils/apiToken';

describe('DELETE /api/v1/user/:id', () => {
  it('should delete a user', async () => {
    await server
      .delete('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('admin should have to delete a user', async () => {
    await server
      .delete('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5', admin)
      .expect(200)
      .then((res) => {
        expect(res.body.success).to.equal(true);
      });
  });

  it('habitant shouldn\'t have to delete a user', async () => {
    await server
      .delete('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5', habitant)
      .expect(403);
  });

  it('guest shouldn\'t have to delete a user', async () => {
    await server
      .delete('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5', guest)
      .expect(403);
  });

  it('should not found user to delete', async () => {
    await server
      .delete('/api/v1/user/0cd30aef-9c4e-4a23-81e3-354797129333')
      .expect(404);
  });
});
