import { expect } from 'chai';
import server from '../../../../utils/request';
import { admin, guest, habitant } from '../../../../utils/apiToken';

describe('PATCH /api/v1/user/:id', () => {
  it('should update a user', async () => {
    await server
      .patch('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5')
      .send({
        userName: 'User update',
      })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.userName).to.equal('User update');
      });
  });

  it('admin should have to update a user', async () => {
    await server
      .patch('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5', admin)
      .send({
        userName: 'User update',
      })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(body.userName).to.equal('User update');
      });
  });

  it("habitant shouldn't have to update a user", async () => {
    await server
      .patch('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5', habitant)
      .send({
        userName: 'User update',
      })
      .expect(403);
  });

  it("guest shouldn't have to update a user", async () => {
    await server
      .patch('/api/v1/user/0cd30aef-9c4e-4a23-81e3-3547971296e5', guest)
      .send({
        userName: 'User update',
      })
      .expect(403);
  });

  it('should not found user to update', async () => {
    await server
      .patch('/api/v1/scene/0cd30aef-9c4e-4a23-81e3-354797129333')
      .send({
        userName: 'User update',
      })
      .expect(404);
  });
});
