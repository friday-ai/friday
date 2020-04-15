import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/script/:id', () => {
  it('should update a script', async () => {
    await server
      .patch('/api/v1/script/d354cede-3895-4dac-8a90-73d970b4617c')
      .send({
        name: 'Script update',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Script update');
      });
  });

  it('should not found script to update', async () => {
    await server
      .patch('/api/v1/scene/d354cede-3895-4dac-8a90-73d970b46333')
      .send({
        name: 'Script update',
      })
      .expect(404);
  });
});
