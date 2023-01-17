import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/scene/:id', () => {
  it('should update a scene', async () => {
    await server
      .patch('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .send({
        name: 'Scene update',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Scene update');
      });
  });

  it("should not update a scene's id", async () => {
    const scene = {
      id: '228f118c-be02-4c34-b38e-345a304fd71d',
      name: "Scene's name updated but not his id",
    };

    await server
      .patch('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed280e')
      .send(scene)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.not.equal(scene.id);
        expect(res.body.name).to.equal(scene.name);
      });
  });

  it('should not found scene to update', async () => {
    await server
      .patch('/api/v1/scene/2452964a-a225-47dd-9b83-d88d57ed2333')
      .send({
        name: 'Scene update',
      })
      .expect(404);
  });
});
