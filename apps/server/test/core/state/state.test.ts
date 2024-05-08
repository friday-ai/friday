import { AvailableState, StateOwner } from "@friday-ai/shared";
import { assert, expect } from "chai";
import type State from "../../../src/core/state/state";
import { DatabaseValidationError, NotFoundError } from "../../../src/utils/decorators/error";

let state: State;

describe("State.set", () => {
  before(async () => {
    state = global.FRIDAY.state;
  });

  it("should create a state", async () => {
    const stateToCreate = {
      owner: "0cd30aef-9c4e-4a23-81e3-3547971296e5",
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      last: true,
    };

    const createdState = await state.set(stateToCreate);
    assert.deepInclude(createdState, stateToCreate);
  });

  it("should not create a state with a empty owner id", async () => {
    const promise = state.set({
      owner: "",
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      last: true,
    });
    await assert.isRejected(promise, DatabaseValidationError);
  });

  it("should not create a state with a wrong owner id", async () => {
    const promise = state.set({
      owner: "246291a1-9f31-4201-8996-0a938c54a8bf",
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      last: true,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});

describe("State.getByOwner", () => {
  before(async () => {
    state = global.FRIDAY.state;
  });

  it("should return a state of one owner", async () => {
    const stateReturned = await state.getByOwner("c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a");

    expect(stateReturned).to.be.an("object");
    expect(stateReturned).to.contains.keys(["id", "owner", "ownerType", "value"]);
    expect(stateReturned.owner).to.equal("c6f6ed8a-80d0-4a90-8c3f-470b9ca3696a");
  });

  it("should not found state", async () => {
    const promise = state.getByOwner("639cf491-7ff5-4e76-853d-806c81e53f8d");
    await assert.isRejected(promise, NotFoundError);
  });
});

describe("State.purge", () => {
  before(async () => {
    state = global.FRIDAY.state;
  });

  it("should purge all states", async () => {
    const promise = state.purge();
    await assert.isFulfilled(promise);
  });
});
