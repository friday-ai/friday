import { expect } from 'chai';
import Session from '../../../src/core/session';

describe('Session.getAll', () => {
  const session = new Session('secretJwt');

  it('should return all sessions', async () => {
    const sessions = await session.getAll();

    sessions.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('refreshToken');
      expect(s).to.have.property('validUntil');
      expect(s).to.have.property('userId');
      expect(s.revoked).to.equal(false);
    });
  });

  it('should return all sessions with full scope', async () => {
    const sessions = await session.getAll({ scope: 'full' });

    sessions.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('refreshToken');
      expect(s).to.have.property('validUntil');
      expect(s).to.have.property('userId');
      expect(s.revoked).to.equal(false);
      expect(s.user).to.be.an('object');
      expect(s.user).not.to.have.property('password');
    });
  });
});
