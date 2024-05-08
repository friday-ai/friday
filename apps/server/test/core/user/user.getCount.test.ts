import { expect } from "chai";
import type User from "../../../src/core/user/user";

let user: User;

describe("User.getCount", () => {
  before(async () => {
    user = global.FRIDAY.user;
  });

  it("should return the number of registered users", async () => {
    const usersCount = await user.count();

    expect(usersCount).to.to.be.an("number");
    expect(usersCount).to.equal(2);
  });
});
