import { expect } from "chai";
import type Action from "../../../src/core/action/action";

let action: Action;

describe("Action.listAll", () => {
  before(async () => {
    action = global.FRIDAY.action;
  });

  it("should return all actions", async () => {
    const actions = await action.listAll();

    expect(actions).to.be.an("array");

    for (const a of actions) {
      expect(a).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]);
    }
  });

  it("should return all actions with full scope", async () => {
    const actions = await action.listAll({ scope: "full" });

    expect(actions).to.be.an("array");

    for (const a of actions) {
      expect(a).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId", "scene"]);
      expect(a.scene).to.contains.keys(["id", "name", "description", "triggerId"]);
    }
  });
});
