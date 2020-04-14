import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/scene/:id', () => {
  it('should update a scene', async () => {

    await server
      .patch('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .send({
        name: 'Scene update'
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Scene update');
      });
  });

  it('should not found scene to update', async () => {

    await server
      .patch('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed2333')
      .send({
        name: 'Scene update'
      })
      .expect(404);

  });
});
