import { assert } from "chai";
import type Script from "../../../src/core/script/script";
import { NotFoundError } from "../../../src/utils/decorators/error";

let script: Script;

describe("Script.destroy", () => {
  before(async () => {
    script = global.FRIDAY.script;
  });

  it("should destroy a script", async () => {
    await script.destroy("d354cede-3895-4dac-8a90-73d970b4617c");
  });

  it("should not found a script to destroy", async () => {
    const promise = script.destroy("a58c31cc-61d2-4c18-b9f6-b8ba8609d12e");
    await assert.isRejected(promise, NotFoundError);
  });
});
