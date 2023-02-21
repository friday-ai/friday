import { SessionAttributes } from '@friday-ai/shared';
import { expect } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/session', () => {
  it('should return all sessions', async () => {
    await server
      .get('/api/v1/session')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((s: SessionAttributes) => {
          expect(s).to.contains.keys(['id', 'refreshToken', 'revoked', 'validUntil', 'userId']);
          expect(s.revoked).to.equal(false);
        });
      });
  });

  it('should return all sessions with full scope', async () => {
    await server
      .get('/api/v1/session')
      .query({
        scope: 'full',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((s: SessionAttributes) => {
          expect(s).to.contains.keys(['id', 'refreshToken', 'revoked', 'validUntil', 'userId', 'user']);
          expect(s.revoked).to.equal(false);

          expect(s.user).to.be.an('object');
          expect(s.user).not.to.have.property('password');
          expect(s.user).to.contains.keys(['id', 'userName', 'email', 'theme', 'role']);
        });
      });
  });
});
