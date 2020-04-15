import { expect } from 'chai';
import server from '../../../../utils/request';

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

  it('should not found plugin to update', async () => {
    await server
      .patch('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0333')
      .send({
        name: 'Plugin update',
      })
      .expect(404);
  });
});
