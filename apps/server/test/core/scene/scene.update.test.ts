import { assert, expect } from "chai";
import type Scene from "../../../src/core/scene/scene";
import { NotFoundError } from "../../../src/utils/decorators/error";

let scene: Scene;

describe("Scene.update", () => {
  before(async () => {
    scene = global.FRIDAY.scene;
  });

  it("should update a scene", async () => {
    const updatedScene = await scene.update("2452964a-a225-47dd-9b83-d88d57ed280e", {
      name: "Scene update",
    });

    expect(updatedScene.name).to.equal("Scene update");
  });

  it("should not found scene to update", async () => {
    const promise = scene.update("edfca72c-89bf-4cee-a4b6-fabbef87528a", {});

    await assert.isRejected(promise, NotFoundError);
  });
});
