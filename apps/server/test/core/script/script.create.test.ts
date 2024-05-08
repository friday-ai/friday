import { assert } from "chai";
import type Script from "../../../src/core/script/script";
import { DatabaseValidationError } from "../../../src/utils/decorators/error";

let script: Script;

describe("Script.create", () => {
  before(async () => {
    script = global.FRIDAY.script;
  });

  it("should create a script", async () => {
    const scriptToCreate = {
      name: "Test Script 2",
      code: "console.log('Hey ! This script is a test ! :)')",
    };

    const createdScript = await script.create(scriptToCreate);

    assert.deepInclude(createdScript, scriptToCreate);
  });

  it("should not create a script with an empty name", async () => {
    const promise = script.create({
      name: "",
      code: "console.log('Hey ! This script is a test ! :)')",
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
