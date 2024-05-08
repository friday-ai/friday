import { type DeviceRegisterAttributes, DevicesCapabilities, DevicesTypes } from "@friday-ai/shared";
import { assert, expect } from "chai";
import type Device from "../../../src/core/device/device";
import { DatabaseValidationError } from "../../../src/utils/decorators/error";

let device: Device;

const fakeDevice: DeviceRegisterAttributes = {
  defaultName: "Dimmer",
  defaultManufacturer: "Fibaro",
  defaultModel: "Dimmer Switch",
  type: DevicesTypes.PHYSICAL,
  externalId: "LIGHT-105",
  pluginId: "33ddf1e2-3c51-4426-93af-3b0453ac0c1e",
  capabilities: [
    {
      defaultName: "Switch-105",
      type: DevicesCapabilities.ONOFF,
      externalId: "LIGHT-105-SWITCH",
    },
  ],
};

describe("Device.register", () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it("should register a device", async () => {
    const newDevice = await device.register(fakeDevice);

    expect(newDevice).to.be.an("object");
    expect(newDevice.externalId).to.equal("LIGHT-105");
    expect(newDevice).to.contains.keys(["capabilities"]);
    expect(newDevice.capabilities).to.be.an("array");
    expect(newDevice.capabilities?.length).to.equal(1);
  });

  it("should not register a device with empty plugin id", async () => {
    fakeDevice.pluginId = "";
    const promise = device.register(fakeDevice);

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it("should not register a device with wrong plugin id", async () => {
    fakeDevice.pluginId = "wrong-plugin-id";
    const promise = device.register(fakeDevice);

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
