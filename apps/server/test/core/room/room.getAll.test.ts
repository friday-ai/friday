import { expect } from "chai";
import type Room from "../../../src/core/room/room";

let room: Room;

describe("Room.listAll", () => {
  before(async () => {
    room = global.FRIDAY.room;
  });

  it("should return all rooms", async () => {
    const rooms = await room.listAll();

    expect(rooms).to.be.an("array");

    for (const r of rooms) {
      expect(r).to.contains.keys(["id", "name", "houseId"]);
    }
  });

  it("should return all rooms with full scope", async () => {
    const rooms = await room.listAll({ scope: "full" });

    expect(rooms).to.be.an("array");

    for (const r of rooms) {
      expect(r).to.contains.keys(["id", "name", "houseId"]);

      expect(r.state).to.be.an("object");
      expect(r.state).to.contains.keys(["id", "owner", "ownerType", "value"]);

      expect(r.satellites).to.be.an("array");
      for (const s of r.satellites) {
        expect(s).to.contains.keys(["id", "name", "roomId"]);
      }

      expect(r.devices).to.be.an("array");

      for (const d of r.devices) {
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

  it("should return all rooms with house", async () => {
    const rooms = await room.listAll({ scope: "withHouse" });

    expect(rooms).to.be.an("array");

    for (const r of rooms) {
      expect(r).to.contains.keys(["id", "name", "houseId"]);

      expect(r.house).to.be.an("object");
      expect(r.house).to.contains.keys(["id", "name", "latitude", "longitude"]);
    }
  });

  it("should return all rooms with state", async () => {
    const rooms = await room.listAll({ scope: "withState" });

    expect(rooms).to.be.an("array");

    for (const r of rooms) {
      expect(r).to.contains.keys(["id", "name", "houseId"]);

      expect(r.state).to.be.an("object");
      expect(r.state).to.contains.keys(["id", "owner", "ownerType", "value"]);
    }
  });

  it("should return all rooms with devices", async () => {
    const rooms = await room.listAll({ scope: "withDevices" });

    expect(rooms).to.be.an("array");

    for (const r of rooms) {
      expect(r).to.contains.keys(["id", "name", "houseId"]);

      expect(r.devices).to.be.an("array");

      for (const d of r.devices) {
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

  it("should return all rooms with satellites", async () => {
    const rooms = await room.listAll({ scope: "withSatellites" });

    expect(rooms).to.be.an("array");

    for (const r of rooms) {
      expect(r).to.contains.keys(["id", "name", "houseId"]);

      expect(r.satellites).to.be.an("array");

      for (const s of r.satellites) {
        expect(s).to.contains.keys(["id", "name", "roomId"]);
      }
    }
  });
});
