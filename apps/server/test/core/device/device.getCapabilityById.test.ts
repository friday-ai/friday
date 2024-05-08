import { assert, expect } from "chai";
import type Device from "../../../src/core/device/device";
import { NotFoundError } from "../../../src/utils/decorators/error";

let device: Device;

describe("Device.getCapabilityById", () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it("should return a device capability", async () => {
    const capabilityReturned = await device.getCapabilityById("d39593a9-f54a-4823-8d6c-017be8f57eed");

    expect(capabilityReturned).to.be.an("object");
    expect(capabilityReturned).to.contains.keys(["id", "defaultName", "name", "type", "externalId", "deviceId", "roomId"]);
  });

  it("should return a device capability with full scope", async () => {
    const capabilityReturned = await device.getCapabilityById("d39593a9-f54a-4823-8d6c-017be8f57eed", "full");

    expect(capabilityReturned).to.be.an("object");
    expect(capabilityReturned).to.contains.keys(["id", "defaultName", "name", "type", "externalId", "deviceId", "roomId"]);

    expect(capabilityReturned.state).to.be.an("object");
    expect(capabilityReturned.state).to.contains.keys(["id", "capabilityId", "value"]);
  });

  it("should not found a device capability", async () => {
    const promise = device.getCapabilityById("bbfd8e91-f53f-4622-ba6b-16104ec4cf3a");
    await assert.isRejected(promise, NotFoundError);
  });
});
