import { expect, assert } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/script/:id', () => {
  it('should return one script', async () => {

    await server
      .get('/api/v1/script/d354cede-3895-4dac-8a90-73d970b4617c')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
            id: 'd354cede-3895-4dac-8a90-73d970b4617c',
            name: 'Test Script',
            code: 'console.log(\'Hey ! This script is a test ! :)\')'
          });
      });
  });
});
