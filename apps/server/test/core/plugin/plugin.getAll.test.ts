import { expect } from "chai";
import type Plugin from "../../../src/core/plugin/plugin";

let plugin: Plugin;

describe("Plugin.listAll", () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
  });

  it("should return all plugins", async () => {
    const plugins = await plugin.listAll();

    expect(plugins).to.be.an("array");

    for (const p of plugins) {
      expect(p).to.contains.keys(["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat"]);
    }
  });

  it("should return all plugins with full scope", async () => {
    const plugins = await plugin.listAll({ scope: "full" });

    expect(plugins).to.be.an("array");

    for (const p of plugins) {
      expect(p).to.contains.keys([
        "id",
        "dockerId",
        "name",
        "version",
        "url",
        "enabled",
        "satelliteId",
        "lastHeartbeat",
        "state",
        "satellite",
        "devices",
        "variables",
      ]);

      expect(p.state).to.be.an("object");
      expect(p.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

      expect(p.satellite).to.be.an("object");
      expect(p.satellite).to.contains.keys(["id", "name", "roomId"]);

      expect(p.devices).to.be.an("array");

      for (const d of p.devices) {
        expect(d).to.contains.keys([
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
      }

      expect(p.variables).to.be.an("array");

      for (const v of p.variables) {
        expect(v).to.contains.keys(["id", "value", "owner", "ownerType", "value"]);
      }
    }
  });

  it("should return all plugins with satellites", async () => {
    const plugins = await plugin.listAll({ scope: "withSatellite" });

    expect(plugins).to.be.an("array");

    for (const p of plugins) {
      expect(p).to.contains.keys(["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat", "satellite"]);

      expect(p.satellite).to.be.an("object");
      expect(p.satellite).to.contains.keys(["id", "name", "roomId"]);
    }
  });

  it("should return all plugins with state", async () => {
    const plugins = await plugin.listAll({ scope: "withState" });

    expect(plugins).to.be.an("array");

    for (const p of plugins) {
      expect(p).to.contains.keys(["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat", "state"]);

      expect(p.state).to.be.an("object");
      expect(p.state).to.contains.keys(["id", "owner", "ownerType", "value"]);
    }
  });

  it("should return all plugins with devices", async () => {
    const plugins = await plugin.listAll({ scope: "withDevices" });

    expect(plugins).to.be.an("array");

    for (const p of plugins) {
      expect(p).to.contains.keys(["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat", "devices"]);

      expect(p.devices).to.be.an("array");

      for (const d of p.devices) {
        expect(d).to.contains.keys([
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
      }
    }
  });

  it("should return all plugins with variables", async () => {
    const plugins = await plugin.listAll({ scope: "withVariables" });

    expect(plugins).to.be.an("array");

    for (const p of plugins) {
      expect(p).to.contains.keys(["id", "dockerId", "name", "version", "url", "enabled", "satelliteId", "lastHeartbeat", "variables"]);

      expect(p.variables).to.be.an("array");

      for (const v of p.variables) {
        expect(v).to.contains.keys(["id", "value", "owner", "ownerType", "value"]);
      }
    }
  });
});
