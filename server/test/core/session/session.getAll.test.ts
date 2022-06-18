import { expect } from 'chai';
import Session from '../../../src/core/session/session';

describe('Session.listAll', () => {
  const session = new Session('secretJwt');

  it('should return all sessions', async () => {
    const sessions = await session.listAll();

    sessions.forEach((s) => {
      expect(s).to.contains.keys(
        ['id', 'refreshToken', 'validUntil', 'userId', 'revoked'],
      );
      expect(s.revoked).to.equal(false);
    });
  });

  it('should return all sessions with full scope', async () => {
    const sessions = await session.listAll({ scope: 'full' });

    sessions.forEach((s) => {
      expect(s).to.contains.keys(
        ['id', 'refreshToken', 'validUntil', 'userId', 'revoked'],
      );
      expect(s.revoked).to.equal(false);
      expect(s.user).to.be.an('object');
      expect(s.user).not.to.have.property('password');
    });
  });
});
