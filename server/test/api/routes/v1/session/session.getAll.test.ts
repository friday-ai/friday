import { expect } from 'chai';
import server from '../../../../utils/request';
import { SessionType } from '../../../../../src/config/entities';

describe('GET /api/v1/session', () => {
  it('should return all sessions', async () => {
    await server
      .get('/api/v1/session')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const sessions = res.body;
        expect(sessions).to.be.an('array');
        sessions.forEach((session: SessionType) => {
          expect(session).to.contains.keys(
            ['id', 'refreshToken', 'validUntil', 'userId', 'revoked'],
          );
          expect(session.revoked).to.equal(false);
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
        const sessions = res.body;
        expect(sessions).to.be.an('array');
        sessions.forEach((session: SessionType) => {
          expect(session).to.contains.keys(
            ['id', 'refreshToken', 'validUntil', 'userId', 'revoked', 'user'],
          );
          expect(session.revoked).to.equal(false);
          expect(session.user).to.be.an('object');
          expect(session.user).not.to.have.property('password');
        });
      });
  });
});
