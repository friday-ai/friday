import { assert } from "chai";
import type Trigger from "../../../src/core/trigger/trigger";
import { NotFoundError } from "../../../src/utils/decorators/error";

let trigger: Trigger;

describe("Trigger.destroy", () => {
  before(async () => {
    trigger = global.FRIDAY.trigger;
  });

  it("should destroy a trigger", async () => {
    await trigger.destroy("a0f02b72-73e0-4cfd-a049-5caaa0b80514");
  });

  it("should not found a trigger to destroy", async () => {
    const promise = trigger.destroy("a58c31cc-61d2-4c18-b9f6-b8ba8609d12e");
    await assert.isRejected(promise, NotFoundError);
  });
});
