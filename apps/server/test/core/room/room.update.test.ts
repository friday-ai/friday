import { assert, expect } from "chai";
import type Room from "../../../src/core/room/room";
import { NotFoundError } from "../../../src/utils/decorators/error";

let room: Room;

describe("Room.update", () => {
  before(async () => {
    room = global.FRIDAY.room;
  });

  it("should update a room", async () => {
    const updatedRoom = await room.update("c97ba085-ba97-4a30-bdd3-b7a62f6514dc", {
      name: "Room update",
    });

    expect(updatedRoom.name).to.equal("Room update");
  });

  it("should not found room to update", async () => {
    const promise = room.update("8b513ecf-2c2d-4cc7-aefc-0ac8eba85827", {});

    await assert.isRejected(promise, NotFoundError);
  });
});
