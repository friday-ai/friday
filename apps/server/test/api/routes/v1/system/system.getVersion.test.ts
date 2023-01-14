import { expect } from 'chai';
import server from '../../../../utils/request';

const packageVersion: string = process.env.npm_package_version || '';

describe('GET /api/v1/system', () => {
  it('should get version of friday', async () => {
    await server
      .get('/api/v1/system')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.equal(packageVersion);
      });
  });
});
