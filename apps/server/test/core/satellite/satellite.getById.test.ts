import { assert, expect } from "chai";
import type Satellite from "../../../src/core/satellite/satellite";
import { NotFoundError } from "../../../src/utils/decorators/error";

let satellite: Satellite;

describe("Satellite.getById", () => {
  before(async () => {
    satellite = global.FRIDAY.satellite;
  });

  it("should return a satellite", async () => {
    const satelliteReturned = await satellite.getById("a7ef5f08-2bad-4489-95bf-b73fcf894d8f");

    expect(satelliteReturned).to.be.an("object");
    expect(satelliteReturned).to.contains.keys(["id", "name", "roomId", "lastHeartbeat"]);
  });

  it("should return a satellite with full scope", async () => {
    const satelliteReturned = await satellite.getById("a7ef5f08-2bad-4489-95bf-b73fcf894d8f", "full");

    expect(satelliteReturned).to.be.an("object");

    expect(satelliteReturned).to.have.property("id");
    expect(satelliteReturned).to.have.property("name");
    expect(satelliteReturned).to.have.property("roomId");
    expect(satelliteReturned).to.have.property("lastHeartbeat");
    expect(satelliteReturned).to.have.property("room");
    expect(satelliteReturned).to.have.property("state");
    expect(satelliteReturned).to.have.property("variables");
    expect(satelliteReturned).to.have.property("plugins");

    expect(satelliteReturned.room).to.be.an("object");
    expect(satelliteReturned.room).to.have.property("id");
    expect(satelliteReturned.room).to.have.property("name");
    expect(satelliteReturned.room).to.have.property("houseId");

    if (satelliteReturned.state !== null) {
      expect(satelliteReturned.state).to.be.an("object");
      expect(satelliteReturned.state).to.have.property("id");
      expect(satelliteReturned.state).to.have.property("owner");
      expect(satelliteReturned.state).to.have.property("ownerType");
      expect(satelliteReturned.state).to.have.property("value");
    }

    if (satelliteReturned.variables !== null) {
      expect(satelliteReturned.variables).to.be.an("array");

      for (const v of satelliteReturned.variables) {
        expect(v).to.be.an("object");
        expect(v).to.have.property("id");
        expect(v).to.have.property("key");
        expect(v).to.have.property("value");
        expect(v).to.have.property("owner");
        expect(v).to.have.property("ownerType");
      }
    }

    if (satelliteReturned.plugins !== null) {
      expect(satelliteReturned.plugins).to.be.an("array");

      for (const p of satelliteReturned.plugins) {
        expect(p).to.be.an("object");
        expect(p).to.have.property("id");
        expect(p).to.have.property("name");
        expect(p).to.have.property("version");
        expect(p).to.have.property("url");
        expect(p).to.have.property("enabled");
        expect(p).to.have.property("satelliteId");
      }
    }
  });

  it("should return a satellite with room", async () => {
    const satelliteReturned = await satellite.getById("a7ef5f08-2bad-4489-95bf-b73fcf894d8f", "withRoom");

    expect(satelliteReturned).to.be.an("object");

    expect(satelliteReturned).to.have.property("id");
    expect(satelliteReturned).to.have.property("name");
    expect(satelliteReturned).to.have.property("roomId");
    expect(satelliteReturned).to.have.property("lastHeartbeat");
    expect(satelliteReturned).to.have.property("room");

    expect(satelliteReturned.room).to.be.an("object");
    expect(satelliteReturned.room).to.have.property("id");
    expect(satelliteReturned.room).to.have.property("name");
    expect(satelliteReturned.room).to.have.property("houseId");
  });

  it("should return a satellite with state", async () => {
    const satelliteReturned = await satellite.getById("a7ef5f08-2bad-4489-95bf-b73fcf894d8f", "withState");

    expect(satelliteReturned).to.be.an("object");

    expect(satelliteReturned).to.have.property("id");
    expect(satelliteReturned).to.have.property("name");
    expect(satelliteReturned).to.have.property("roomId");
    expect(satelliteReturned).to.have.property("lastHeartbeat");
    expect(satelliteReturned).to.have.property("state");

    // TODO: The state cannot must be null
    if (satelliteReturned.state !== null) {
      expect(satelliteReturned.state).to.be.an("object");
      expect(satelliteReturned.state).to.have.property("id");
      expect(satelliteReturned.state).to.have.property("owner");
      expect(satelliteReturned.state).to.have.property("ownerType");
      expect(satelliteReturned.state).to.have.property("value");
    }
  });

  it("should return a satellite with variables", async () => {
    const satelliteReturned = await satellite.getById("a7ef5f08-2bad-4489-95bf-b73fcf894d8f", "withVariables");

    expect(satelliteReturned).to.be.an("object");

    expect(satelliteReturned).to.have.property("id");
    expect(satelliteReturned).to.have.property("name");
    expect(satelliteReturned).to.have.property("roomId");
    expect(satelliteReturned).to.have.property("lastHeartbeat");
    expect(satelliteReturned).to.have.property("variables");

    if (satelliteReturned.variables !== null) {
      expect(satelliteReturned.variables).to.be.an("array");

      for (const v of satelliteReturned.variables) {
        expect(v).to.be.an("object");
        expect(v).to.have.property("id");
        expect(v).to.have.property("key");
        expect(v).to.have.property("value");
        expect(v).to.have.property("owner");
        expect(v).to.have.property("ownerType");
      }
    }
  });

  it("should return a satellite with plugins", async () => {
    const satelliteReturned = await satellite.getById("a7ef5f08-2bad-4489-95bf-b73fcf894d8f", "withPlugins");

    expect(satelliteReturned).to.be.an("object");

    expect(satelliteReturned).to.have.property("id");
    expect(satelliteReturned).to.have.property("name");
    expect(satelliteReturned).to.have.property("roomId");
    expect(satelliteReturned).to.have.property("lastHeartbeat");
    expect(satelliteReturned).to.have.property("plugins");

    if (satelliteReturned.plugins !== null) {
      expect(satelliteReturned.plugins).to.be.an("array");

      for (const p of satelliteReturned.plugins) {
        expect(p).to.be.an("object");
        expect(p).to.have.property("id");
        expect(p).to.have.property("name");
        expect(p).to.have.property("version");
        expect(p).to.have.property("url");
        expect(p).to.have.property("enabled");
        expect(p).to.have.property("satelliteId");
      }
    }
  });

  it("should not found a satelilte", async () => {
    const promise = satellite.getById("edfca72c-89bf-4cee-a4b6-fabbef87528a");

    await assert.isRejected(promise, NotFoundError);
  });
});
