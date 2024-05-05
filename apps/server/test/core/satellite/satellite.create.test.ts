import { assert } from "chai";
import type Satellite from "../../../src/core/satellite/satellite";
import { DatabaseValidationError } from "../../../src/utils/decorators/error";

let satellite: Satellite;

describe("Satellite.create", () => {
  before(async () => {
    satellite = global.FRIDAY.satellite;
  });

  it("should create a satellite", async () => {
    const satelliteToCreate = {
      name: "Satellite 3",
      roomId: "c97ba085-ba97-4a30-bdd3-b7a62f6514dc",
      lastHeartbeat: new Date(),
    };

    const createdSatellite = await satellite.create(satelliteToCreate);

    assert.deepInclude(createdSatellite, satelliteToCreate);
  });

  it("should not create a satellite with an empty name", async () => {
    const promise = satellite.create({
      name: "",
      roomId: "c97ba085-ba97-4a30-bdd3-b7a62f6514dc",
      lastHeartbeat: new Date(),
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it("should not create a satellite  with an empty room", async () => {
    const promise = satellite.create({
      name: "Satellite with an room",
      roomId: "",
      lastHeartbeat: new Date(),
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
