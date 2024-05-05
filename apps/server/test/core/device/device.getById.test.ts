import { assert, expect } from "chai";
import type Device from "../../../src/core/device/device";
import { NotFoundError } from "../../../src/utils/decorators/error";

let device: Device;

describe("Device.getById", () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it("should return a device", async () => {
    const deviceReturned = await device.getById("22b5b9ce-cd9e-404a-8c31-97350d684fd3");

    expect(deviceReturned).to.be.an("object");
    expect(deviceReturned).to.contains.keys([
      "id",
      "defaultName",
      "defaultManufacturer",
      "defaultModel",
      "name",
      "type",
      "manufacturer",
      "model",
      "externalId",
      "viaDevice",
      "roomId",
      "pluginId",
    ]);
  });

  it("should return a device with full scope", async () => {
    const deviceReturned = await device.getById("22b5b9ce-cd9e-404a-8c31-97350d684fd3", "full");

    expect(deviceReturned).to.be.an("object");
    expect(deviceReturned).to.contains.keys([
      "id",
      "defaultName",
      "defaultManufacturer",
      "defaultModel",
      "name",
      "type",
      "manufacturer",
      "model",
      "externalId",
      "viaDevice",
      "roomId",
      "pluginId",
    ]);

    expect(deviceReturned.capabilities).to.be.an("array");

    for (const c of deviceReturned.capabilities) {
      expect(c).to.contains.keys(["id", "defaultName", "name", "type", "externalId", "deviceId", "roomId"]);
    }
  });

  it("should return a device with capabilities scope (with their settings)", async () => {
    const deviceReturned = await device.getById("22b5b9ce-cd9e-404a-8c31-97350d684fd3", "withCapabilities");

    expect(deviceReturned).to.be.an("object");
    expect(deviceReturned).to.contains.keys([
      "id",
      "defaultName",
      "defaultManufacturer",
      "defaultModel",
      "name",
      "type",
      "manufacturer",
      "model",
      "externalId",
      "viaDevice",
      "roomId",
      "pluginId",
      "capabilities",
    ]);

    expect(deviceReturned.capabilities).to.be.an("array");

    for (const c of deviceReturned.capabilities) {
      expect(c).to.contains.keys(["id", "defaultName", "name", "type", "externalId", "deviceId", "roomId", "settings"]);
      expect(c.settings).to.be.an("object");
    }
  });

  it("should not found a device", async () => {
    const promise = device.getById("f9d9ba6a-00b8-4dde-9746-e66f36ecbe84");
    await assert.isRejected(promise, NotFoundError);
  });
});
