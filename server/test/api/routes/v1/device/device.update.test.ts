import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('PATCH /api/v1/device/:id', () => {
  it('should update a device', async () => {

    await server
      .patch('/api/v1/device/22b5b9ce-cd9e-404a-8c31-97350d684fd3')
      .send({
        name: 'Device update'
      })
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body.name, 'Device update');
      });
  });

  it('should not found device to update', async () => {

    await server
      .patch('/api/v1/device/449b2033-105f-4c18-91e8-a56ad1831796')
      .send({
        name: 'Action update'
      })
      .expect(404);

  });
});
