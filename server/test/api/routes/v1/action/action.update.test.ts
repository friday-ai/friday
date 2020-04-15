import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/action/:id', () => {
  it('should update an action', async () => {
    await server
      .patch('/api/v1/action/33ab56b0-4064-40d0-b1f4-1e426bff1ea3')
      .send({
        name: 'Action update',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Action update');
      });
  });

  it('should not found action to update', async () => {
    await server
      .patch('/api/v1/action/163c08d4-c707-44b9-8ce0-37a45efeb05d')
      .send({
        name: 'Action update',
      })
      .expect(404);
  });
});
