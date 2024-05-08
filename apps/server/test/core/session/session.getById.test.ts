import { assert, expect } from "chai";
import type Session from "../../../src/core/session/session";
import { NotFoundError } from "../../../src/utils/decorators/error";

let session: Session;

describe("Session.getById", () => {
  before(async () => {
    session = global.FRIDAY.session;
  });

  it("should return an session", async () => {
    const sessionReturned = await session.getById("894b93df-a7ab-494c-92f6-7d88ae9164b3");

    expect(sessionReturned).to.contains.keys(["id", "refreshToken", "revoked", "validUntil", "userId"]);
    expect(sessionReturned.revoked).to.equal(false);
    expect(sessionReturned.id).to.equal("894b93df-a7ab-494c-92f6-7d88ae9164b3");
  });

  it("should return an session with full scope", async () => {
    const sessionReturned = await session.getById("894b93df-a7ab-494c-92f6-7d88ae9164b3", "full");

    expect(sessionReturned).to.contains.keys(["id", "refreshToken", "revoked", "validUntil", "userId", "user"]);
    expect(sessionReturned.revoked).to.equal(false);
    expect(sessionReturned.id).to.equal("894b93df-a7ab-494c-92f6-7d88ae9164b3");
    expect(sessionReturned.user).to.be.an("object");
    expect(sessionReturned.user).not.to.have.property("password");
    expect(sessionReturned.user).to.contains.keys(["id", "userName", "email", "theme", "role"]);
  });

  it("should not found an session", async () => {
    const promise = session.getById("edfca72c-89bf-4cee-a4b6-fabbef87528a");

    await assert.isRejected(promise, NotFoundError);
  });
});
