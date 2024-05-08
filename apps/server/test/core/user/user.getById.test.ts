import { assert, expect } from "chai";
import type User from "../../../src/core/user/user";
import { NotFoundError } from "../../../src/utils/decorators/error";

let user: User;

describe("User.getById", () => {
  before(async () => {
    user = global.FRIDAY.user;
  });

  it("should return user", async () => {
    const userReturned = await user.getById("0cd30aef-9c4e-4a23-81e3-3547971296e5");

    expect(userReturned).to.be.an("object");
    expect(userReturned).to.contains.keys(["id", "userName", "email", "theme", "role"]);
    expect(userReturned).to.not.contains.keys(["password"]);
    expect(userReturned.id).to.equal("0cd30aef-9c4e-4a23-81e3-3547971296e5");
  });

  it("should return user with full scope", async () => {
    const userReturned = await user.getById("0cd30aef-9c4e-4a23-81e3-3547971296e5", "full");

    expect(userReturned).to.be.an("object");
    expect(userReturned).to.contains.keys(["id", "userName", "email", "theme", "role", "state", "variables"]);
    expect(userReturned).to.not.contains.keys(["password"]);
    expect(userReturned.id).to.equal("0cd30aef-9c4e-4a23-81e3-3547971296e5");

    expect(userReturned.state).to.be.an("object");
    expect(userReturned.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

    expect(userReturned.variables).to.be.an("array");

    for (const v of userReturned.variables) {
      expect(v).to.be.an("object");
      expect(v).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
    }
  });

  it("should return user with state", async () => {
    const userReturned = await user.getById("0cd30aef-9c4e-4a23-81e3-3547971296e5", "withState");

    expect(userReturned).to.be.an("object");
    expect(userReturned).to.contains.keys(["id", "userName", "email", "theme", "role", "state"]);
    expect(userReturned).to.not.contains.keys(["password"]);
    expect(userReturned.id).to.equal("0cd30aef-9c4e-4a23-81e3-3547971296e5");

    expect(userReturned.state).to.be.an("object");
    expect(userReturned.state).to.contains.keys(["id", "owner", "ownerType", "value"]);
  });

  it("should return user with variables", async () => {
    const userReturned = await user.getById("0cd30aef-9c4e-4a23-81e3-3547971296e5", "withVariables");

    expect(userReturned).to.be.an("object");
    expect(userReturned).to.contains.keys(["id", "userName", "email", "theme", "role", "variables"]);
    expect(userReturned).to.not.contains.keys(["password"]);
    expect(userReturned.id).to.equal("0cd30aef-9c4e-4a23-81e3-3547971296e5");

    expect(userReturned.variables).to.be.an("array");

    for (const v of userReturned.variables) {
      expect(v).to.be.an("object");
      expect(v).to.contains.keys(["id", "key", "value", "owner", "ownerType"]);
    }
  });

  it("should not found a user", async () => {
    const promise = user.getById("edfca72c-89bf-4cee-a4b6-fabbef87528a");

    await assert.isRejected(promise, NotFoundError);
  });
});
