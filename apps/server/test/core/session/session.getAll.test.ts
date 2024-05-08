import { expect } from "chai";
import type Session from "../../../src/core/session/session";

let session: Session;

describe("Session.listAll", () => {
  before(async () => {
    session = global.FRIDAY.session;
  });

  it("should return all sessions", async () => {
    const sessions = await session.listAll();

    for (const s of sessions) {
      expect(s).to.contains.keys(["id", "refreshToken", "revoked", "validUntil", "userId"]);
      expect(s.revoked).to.equal(false);
    }
  });

  it("should return all sessions with full scope", async () => {
    const sessions = await session.listAll({ scope: "full" });

    for (const s of sessions) {
      expect(s).to.contains.keys(["id", "refreshToken", "revoked", "validUntil", "userId", "user"]);
      expect(s.revoked).to.equal(false);
      expect(s.user).to.be.an("object");
      expect(s.user).not.to.have.property("password");
      expect(s.user).to.contains.keys(["id", "userName", "email", "theme", "role"]);
    }
  });
});
