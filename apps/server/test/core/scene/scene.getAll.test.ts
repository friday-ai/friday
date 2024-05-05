import { expect } from "chai";
import type Scene from "../../../src/core/scene/scene";

let scene: Scene;

describe("Scene.listAll", () => {
  before(async () => {
    scene = global.FRIDAY.scene;
  });

  it("should return all scenes", async () => {
    const scenes = await scene.listAll();

    expect(scenes).to.be.an("array");

    for (const s of scenes) {
      expect(s).to.contains.keys(["id", "name", "description", "triggerId"]);
    }
  });

  it("should return all scenes with full scope", async () => {
    const scenes = await scene.listAll({ scope: "full" });

    expect(scenes).to.be.an("array");

    for (const s of scenes) {
      expect(s).to.contains.keys(["id", "name", "description", "triggerId", "trigger", "actions"]);

      expect(s.trigger).to.be.an("object");
      expect(s.trigger).to.contains.keys(["id", "name", "description", "type", "rules"]);

      for (const a of s.actions) {
        expect(a).to.be.an("object");
        expect(a).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]);
      }
    }
  });

  it("should return all scenes with trigger", async () => {
    const scenes = await scene.listAll({ scope: "withTrigger" });

    expect(scenes).to.be.an("array");

    for (const s of scenes) {
      expect(s).to.contains.keys(["id", "name", "description", "triggerId", "trigger"]);

      expect(s.trigger).to.be.an("object");
      expect(s.trigger).to.contains.keys(["id", "name", "description", "type", "rules"]);
    }
  });

  it("should return all scenes with actions", async () => {
    const scenes = await scene.listAll({ scope: "withActions" });

    expect(scenes).to.be.an("array");

    for (const s of scenes) {
      expect(s).to.contains.keys(["id", "name", "description", "triggerId", "actions"]);

      for (const a of s.actions) {
        expect(a).to.be.an("object");
        expect(a).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]);
      }
    }
  });
});
