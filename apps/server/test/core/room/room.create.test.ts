import { assert } from "chai";
import type Room from "../../../src/core/room/room";
import { DatabaseUniqueConstraintError, DatabaseValidationError } from "../../../src/utils/decorators/error";

let room: Room;

describe("Room.create", () => {
  before(async () => {
    room = global.FRIDAY.room;
  });

  it("should create a room", async () => {
    const roomToCreate = {
      name: "A room test",
      houseId: "ecb7958f-ea9e-4520-819e-be6358dc407c",
    };

    const createdRoom = await room.create(roomToCreate);

    assert.deepInclude(createdRoom, roomToCreate);
  });

  it("should not create a room with an existing name", async () => {
    const promise = room.create({
      name: "Bedroom",
      houseId: "ecb7958f-ea9e-4520-819e-be6358dc407c",
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it("should not create a room with an empty name", async () => {
    const promise = room.create({
      name: "",
      houseId: "ecb7958f-ea9e-4520-819e-be6358dc407c",
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it("should not create a room  with an empty house", async () => {
    const promise = room.create({
      name: "A room test",
      houseId: "",
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
