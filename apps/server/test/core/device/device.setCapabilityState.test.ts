import { assert, expect } from "chai";
import type Device from "../../../src/core/device/device";
import { BadParametersError, DatabaseValidationError } from "../../../src/utils/decorators/error";

let device: Device;

describe("Device.setCapabilityState", () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it("should set a capability state", async () => {
    const newState = await device.setCapabilityState({
      capabilityId: "2e6a90de-b05c-47ca-8895-59b23953531c",
      value: 56,
    });

    expect(newState).to.be.an("object");
    expect(newState.value).to.equal(56);
  });

  it("should not set a capability state with empty capability id", async () => {
    const promise = device.setCapabilityState({
      capabilityId: "",
      value: 100,
    });

    await assert.isRejected(promise, BadParametersError);
  });

  it("should not set a capability state with wrong capability id", async () => {
    const promise = device.setCapabilityState({
      capabilityId: "c16c4f35-fb7a-45dd-82bf-b80c97589509",
      value: 100,
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
