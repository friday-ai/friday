import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/satellite/:id', () => {
  it('should update a satellite', async () => {
    await server
      .patch('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .send({
        name: 'Satellite update',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Satellite update');
      });
  });

  it("should not update a satellite's id", async () => {
    const satellite = {
      id: '228f118c-be02-4c34-b38e-345a304fd71d',
      name: "satellite's name updated but not his id",
    };

    await server
      .patch('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .send(satellite)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.id).to.not.equal(satellite.id);
        expect(res.body.name).to.equal(satellite.name);
      });
  });

  it('should not found satellite to update', async () => {
    await server
      .patch('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894333')
      .send({
        name: 'Satellite update',
      })
      .expect(404);
  });
});
