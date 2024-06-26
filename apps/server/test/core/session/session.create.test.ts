import { UserRole } from "@friday-ai/shared";
import { expect } from "chai";
import type Session from "../../../src/core/session/session";

// tokenHash: 'c090007e57736654afa0b637f0e6e7a6d7dddbe476e2892c0d62fdd601d0807d', // hash of 'refresh-token-test-create'

let session: Session;

describe("Session.create", () => {
  before(async () => {
    session = global.FRIDAY.session;
  });

  it("should create an session", async () => {
    const createdSession = await session.create({
      id: "0cd30aef-9c4e-4a23-81e3-3547971296e5",
      userName: "JohnPepperwood",
      email: "john@pepperwood.com",
      role: UserRole.HABITANT,
    });

    expect(createdSession).to.have.property("refreshToken");
    expect(createdSession).to.have.property("accessToken");
    expect(createdSession).to.have.property("id");
  });
});
