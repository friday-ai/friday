import { expect } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/user/count', () => {
  it('should return the number of registered users', async () => {
    await server
      .get('/api/v1/user/count')
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('number');
        expect(res.body).to.equal(2);
      });
  });
});
