import { assert } from "chai";
import type Plugin from "../../../src/core/plugin/plugin";
import { NotFoundError } from "../../../src/utils/decorators/error";

let plugin: Plugin;

describe("Plugin.destroy", () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
  });

  it("should destroy a plugin", async function destroy() {
    this.timeout(30000);
    await plugin.destroy("33ddf1e2-3c51-4426-93af-3b0453ac0c1e");
  });

  it("should not found a plugin to destroy", async () => {
    const promise = plugin.destroy("a58c31cc-61d2-4c18-b9f6-b8ba8609d12e");
    await assert.isRejected(promise, NotFoundError);
  });
});
