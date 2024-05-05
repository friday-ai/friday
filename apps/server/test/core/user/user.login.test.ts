import { assert, expect } from "chai";
import type User from "../../../src/core/user/user";
import { AuthError, NotFoundError } from "../../../src/utils/decorators/error";

let user: User;

describe("User.login", () => {
  before(async () => {
    user = global.FRIDAY.user;
  });

  it("should log a user", async () => {
    const loggedUser = await user.login("john@pepperwood.com", "mysuperpassword");

    expect(loggedUser).not.to.have.property("password");
  });

  it("should not log a user with an false email", async () => {
    const promise = user.login("test@test.fr", "mysuperpassword");
    await assert.isRejected(promise, NotFoundError);
  });

  it("should not log a user with an wrong password", async () => {
    const promise = user.login("john@pepperwood.com", "mysuperpassword2");
    await assert.isRejected(promise, AuthError);
  });
});
