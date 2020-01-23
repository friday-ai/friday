import TestServer from "../../../../utils/helper";
import SessionType from "../../../../../src/core/session/session.interface";

describe('session.getAll', () => {

  it('should return all sessions', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/session')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let sessions = res.body;
        expect(sessions).toBeArray();
        sessions.forEach((session: SessionType) => {
          expect(session).toContainAllKeys(
            ["id", "refreshToken", "validUntil", "userId", "revoked"]
          );
          expect(session.revoked).toEqual(false);
        })
      });
  });

  it('should return all sessions with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/session')
      .query({
        scope: "full"
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let sessions = res.body;
        expect(sessions).toBeArray();
        sessions.forEach((session: SessionType) => {
          expect(session).toContainAllKeys(
            ["id", "refreshToken", "validUntil", "userId", "revoked", "user"]
          );
          expect(session.revoked).toEqual(false);
          expect(session.user).toBeObject();
          expect(session.user).not.toHaveProperty('password');
        })
      });
  });
});
