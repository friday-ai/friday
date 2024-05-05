import { AvailableState, StateOwner } from "@friday-ai/shared";
import { assert, expect } from "chai";
import server from "../../../../utils/request";

describe("POST /api/v1/state", () => {
  it("should create a state", async () => {
    const state = {
      owner: "0cd30aef-9c4e-4a23-81e3-3547971296e5",
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      last: true,
    };

    await server
      .post("/api/v1/state")
      .send(state)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        assert.deepInclude(res.body, state);
      });
  });

  it("should not create a state with a provided id", async () => {
    const state = {
      id: "8be88a4d-9379-48d5-b3dc-0f989c65d1d4",
      owner: "0cd30aef-9c4e-4a23-81e3-3547971296e5",
      ownerType: StateOwner.USER,
      value: AvailableState.USER_AT_HOME,
      last: true,
    };

    await server
      .post("/api/v1/state")
      .send(state)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an("object");
        expect(res.body.id).to.not.equal(state.id);
        expect(res.body.owner).to.equal("0cd30aef-9c4e-4a23-81e3-3547971296e5");
        expect(res.body.ownerType).to.equal(StateOwner.USER);
      });
  });

  it("should not create a state with a empty owner id", async () => {
    await server
      .post("/api/v1/state")
      .send({
        id: "658343ba-4d4f-4767-a134-78cc01e7f06c",
        owner: "",
        ownerType: StateOwner.USER,
        value: AvailableState.USER_AT_HOME,
      })
      .expect(422);
  });

  it("should not create a state with a wrong owner id", async () => {
    await server
      .post("/api/v1/state")
      .send({
        id: "ee688e4d-619c-4938-9189-fc3f21923308",
        owner: "33586095-0d16-4dee-9120-7d77448a803b",
        ownerType: StateOwner.USER,
        value: AvailableState.USER_AT_HOME,
      })
      .expect(422);
  });
});
