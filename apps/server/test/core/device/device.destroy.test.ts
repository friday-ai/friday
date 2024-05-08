import { assert } from "chai";
import type Device from "../../../src/core/device/device";
import { NotFoundError } from "../../../src/utils/decorators/error";

let device: Device;

describe("Device.destroy", () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it("should destroy a device", async () => {
    await device.destroy("22b5b9ce-cd9e-404a-8c31-97350d684fd3");
  });

  it("should not found an device to destroy", async () => {
    const promise = device.destroy("39144f78-36e7-4c8b-88d1-b42dead53a09");
    await assert.isRejected(promise, NotFoundError);
  });
});
