import Session from '../../../src/core/session';
import 'jest-extended';

describe('session.getAll', () => {
  const session = new Session('secretJwt');

  it('should return all sessions', async () => {

    const sessions = await session.getAll();

    sessions.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('refreshToken');
      expect(s).toHaveProperty('validUntil');
      expect(s).toHaveProperty('userId');
      expect(s.revoked).toEqual(false);
    });
  });

  it('should return all sessions with full scope', async () => {

    const sessions = await session.getAll({ scope: 'full' });

    sessions.forEach(s => {
      expect(s).toHaveProperty('id');
      expect(s).toHaveProperty('refreshToken');
      expect(s).toHaveProperty('validUntil');
      expect(s).toHaveProperty('userId');
      expect(s.revoked).toEqual(false);
      expect(s.user).toBeObject();
      expect(s.user).not.toHaveProperty('password');
    });
  });

});
