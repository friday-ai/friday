import { expect } from 'chai';
import server from '../../../../utils/request';

describe('POST /api/v1/user/login', () => {
  it('should login an user', async () => {
    await server
      .post('/api/v1/user/login')
      .send({
        email: 'john@pepperwood.com',
        password: 'mysuperpassword',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body.revoked).to.equal(false);
        expect(res.body.user.email).to.equal('john@pepperwood.com');
      });
  });

  it('should not login an user with bad password', async () => {
    await server
      .post('/api/v1/user/login')
      .send({
        email: 'john@pepperwood.com',
        password: 'mysuperpasword',
      })
      .expect('Content-Type', /json/)
      .expect(403);
  });
});
