import { AvailableConditions } from "@friday-ai/shared";
import { assert } from "chai";
import type Trigger from "../../../src/core/trigger/trigger";
import { DatabaseValidationError } from "../../../src/utils/decorators/error";

let trigger: Trigger;

describe("Trigger.create", () => {
  before(async () => {
    trigger = global.FRIDAY.trigger;
  });

  it("should create a trigger", async () => {
    const triggerToCreate = {
      name: "Test Trigger 2",
      description: "A trigger for a test :)",
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: "cc306435-eb0f-455c-b79d-a684b171e04d",
        value: "23",
      }),
    };

    const createdTrigger = await trigger.create(triggerToCreate);

    assert.deepInclude(createdTrigger, triggerToCreate);
  });

  it("should not create a trigger with an empty name", async () => {
    const promise = trigger.create({
      name: "",
      description: "A trigger for a test :)",
      type: AvailableConditions.DEVICE_VALUE,
      rules: JSON.stringify({
        device: "cc306435-eb0f-455c-b79d-a684b171e04d",
        value: "23",
      }),
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
