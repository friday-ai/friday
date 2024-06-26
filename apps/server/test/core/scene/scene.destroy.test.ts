import { assert } from "chai";
import type Scene from "../../../src/core/scene/scene";
import { NotFoundError } from "../../../src/utils/decorators/error";

let scene: Scene;

describe("Scene.destroy", () => {
  before(async () => {
    scene = global.FRIDAY.scene;
  });

  it("should destroy an scene", async () => {
    await scene.destroy("2452964a-a225-47dd-9b83-d88d57ed280e");
  });

  it("should not found an scene to destroy", async () => {
    const promise = scene.destroy("a58c31cc-61d2-4c18-b9f6-b8ba8609d12e");
    await assert.isRejected(promise, NotFoundError);
  });
});
