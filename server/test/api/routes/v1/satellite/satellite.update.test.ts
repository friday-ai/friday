import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/satellite/:id', () => {
  it('should update a satellite', async () => {

    await server
      .patch('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .send({
        name: 'Satellite update'
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Satellite update');
      });
  });

  it('should not found satellite to update', async () => {

    await server
      .patch('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894333')
      .send({
        name: 'Satellite update'
      })
      .expect(404);

  });
});
