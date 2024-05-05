import { assert, expect } from "chai";
import type Scene from "../../../src/core/scene/scene";
import { NotFoundError } from "../../../src/utils/decorators/error";

let scene: Scene;

describe("Scene.getById", () => {
  before(async () => {
    scene = global.FRIDAY.scene;
  });

  it("should return one scene", async () => {
    const sceneReturned = await scene.getById("2452964a-a225-47dd-9b83-d88d57ed280e");

    expect(sceneReturned).to.be.an("object");
    expect(sceneReturned).to.contains.keys(["id", "name", "description", "triggerId"]);
    expect(sceneReturned.id).to.equal("2452964a-a225-47dd-9b83-d88d57ed280e");
  });

  it("should return a scene with full scope", async () => {
    const sceneReturned = await scene.getById("2452964a-a225-47dd-9b83-d88d57ed280e", "full");

    expect(sceneReturned).to.be.an("object");
    expect(sceneReturned).to.contains.keys(["id", "name", "description", "triggerId", "trigger", "actions"]);
    expect(sceneReturned.id).to.equal("2452964a-a225-47dd-9b83-d88d57ed280e");

    expect(sceneReturned.trigger).to.be.an("object");
    expect(sceneReturned.trigger).to.contains.keys(["id", "name", "description", "type", "rules"]);

    expect(sceneReturned.actions).to.be.an("array");

    for (const a of sceneReturned.actions) {
      expect(a).to.be.an("object");
      expect(a).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]);
    }
  });

  it("should return a scene with trigger", async () => {
    const sceneReturned = await scene.getById("2452964a-a225-47dd-9b83-d88d57ed280e", "withTrigger");

    expect(sceneReturned).to.be.an("object");
    expect(sceneReturned).to.contains.keys(["id", "name", "description", "triggerId", "trigger"]);
    expect(sceneReturned.id).to.equal("2452964a-a225-47dd-9b83-d88d57ed280e");

    expect(sceneReturned.trigger).to.be.an("object");
    expect(sceneReturned.trigger).to.contains.keys(["id", "name", "description", "type", "rules"]);
  });

  it("should return a scene with actions", async () => {
    const sceneReturned = await scene.getById("2452964a-a225-47dd-9b83-d88d57ed280e", "withActions");

    expect(sceneReturned).to.be.an("object");
    expect(sceneReturned).to.contains.keys(["id", "name", "description", "triggerId", "actions"]);
    expect(sceneReturned.id).to.equal("2452964a-a225-47dd-9b83-d88d57ed280e");

    expect(sceneReturned.actions).to.be.an("array");

    for (const a of sceneReturned.actions) {
      expect(a).to.be.an("object");
      expect(a).to.contains.keys(["id", "name", "description", "type", "subType", "variableKey", "variableValue", "sceneId"]);
    }
  });

  it("should not found a scene", async () => {
    const promise = scene.getById("edfca72c-87bf-4cee-a4b6-fabbef87528a");

    await assert.isRejected(promise, NotFoundError);
  });
});
