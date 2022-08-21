import { expect } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/device/:id', () => {
  it('should update a device', async () => {
    await server
      .patch('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .send({
        name: 'Device update',
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Device update');
      });
  });

  it('should not found device to update', async () => {
    await server
      .patch('/api/v1/device/wrong')
      .send({
        name: 'Device update',
      })
      .expect(404);
  });
});
