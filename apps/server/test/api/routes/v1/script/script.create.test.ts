import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('POST /api/v1/script', () => {
  it('should create a script', async () => {
    const script = {
      id: '9a559e84-6f8f-486c-ae97-e6051b62b7b3',
      name: 'Test Script 2',
      code: 'console.log(\'Hey ! This script is a test ! :)\')',
    };

    await server
      .post('/api/v1/script')
      .send(script)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).to.be.an('object');
        // See issue, https://github.com/sequelize/sequelize/issues/11566
        delete res.body.createdAt;
        delete res.body.updatedAt;
        assert.deepEqual(res.body, script);
      });
  });

  it('should not create a script with an empty name', async () => {
    await server
      .post('/api/v1/script')
      .send({
        id: 'b9c7b560-8eb6-4d0e-989f-2a2f363590a3',
        name: '',
        code: 'console.log(\'Hey ! This script is a test ! :)\')',
      })
      .expect(422);
  });
});
