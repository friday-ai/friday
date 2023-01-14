import { expect } from 'chai';
import server from '../../../../utils/request';
import { admin, habitant } from '../../../../utils/apiToken';

describe('PATCH /api/v1/plugin/:id', () => {
  it('should update a plugin', async () => {
    await server
      .patch('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .send({
        name: 'Plugin update',
      })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(res.body.name).to.equal('Plugin update');
      });
  });

  it('admin should have access to update a plugin', async () => {
    await server
      .patch('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', admin)
      .send({
        name: 'Plugin update',
      })
      .expect(200)
      .then((res) => {
        const { body } = res;
        expect(body).to.be.an('object');
        expect(res.body.name).to.equal('Plugin update');
      });
  });

  it("habitant should't have access to update a plugin", async () => {
    await server
      .patch('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', habitant)
      .send({
        name: 'Plugin update',
      })
      .expect(403);
  });

  it("guest should't have access to update a plugin", async () => {
    await server
      .patch('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', habitant)
      .send({
        name: 'Plugin update',
      })
      .expect(403);
  });

  it('should not found plugin to update', async () => {
    await server
      .patch('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0333')
      .send({
        name: 'Plugin update',
      })
      .expect(404);
  });
});
